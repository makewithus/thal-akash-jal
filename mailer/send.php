<?php
/**
 * THAL AKASH JAL — Contact Form Mail Handler
 *
 * Architecture:
 *   contact.html → POST /mailer/send.php → Hostinger SMTP → admin@thalakashjal.com
 *
 * Security:
 *   - SMTP password loaded from mailer/config.php (never from JS/HTML)
 *   - All inputs sanitised + validated server-side
 *   - Header-injection prevented by using PHPMailer API (never raw headers)
 *   - Turnstile token verified against Cloudflare API
 *   - Basic per-IP rate limiting via session
 *   - Submitted data is never written to any public file
 *
 * Usage:
 *   POST /mailer/send.php
 *   Content-Type: application/x-www-form-urlencoded  (or multipart/form-data)
 *   Fields: Name, Email, Telephone, Message, checkbox, cf-turnstile-response
 *
 * Response (always JSON):
 *   { "ok": true  }
 *   { "ok": false, "error": "<human-readable message>" }
 */

declare(strict_types=1);

// ─── 0. Bootstrapping ────────────────────────────────────────────────────────

// Load SMTP credentials from a file that lives OUTSIDE public git tracking
$configFile = __DIR__ . '/config.php';
if (!file_exists($configFile)) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode(['ok' => false, 'error' => 'Server configuration missing. Please contact admin@thalakashjal.com']);
    exit;
}
require_once $configFile;

// PHPMailer — loaded via Composer autoloader (vendor/autoload.php) or a
// manually-placed copy inside mailer/PHPMailer/.
$autoloader = __DIR__ . '/vendor/autoload.php';
if (file_exists($autoloader)) {
    require_once $autoloader;
} else {
    // Fallback: bare PHPMailer source files dropped into mailer/PHPMailer/src/
    $src = __DIR__ . '/PHPMailer/src/';
    require_once $src . 'Exception.php';
    require_once $src . 'PHPMailer.php';
    require_once $src . 'SMTP.php';
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception as PHPMailerException;

// ─── 1. CORS / request method guard ─────────────────────────────────────────

header('Content-Type: application/json');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed.']);
    exit;
}

// Only accept requests originating from our own domain
$allowedOrigins = [
    'https://www.thalakashjal.com',
    'https://thalakashjal.com',
];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin && !in_array($origin, $allowedOrigins, true)) {
    http_response_code(403);
    echo json_encode(['ok' => false, 'error' => 'Forbidden.']);
    exit;
}

// ─── 2. Basic rate-limiting (session-based, per IP) ──────────────────────────

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

$now      = time();
$window   = 60;   // seconds
$maxPosts = 3;    // max submissions per window

if (!isset($_SESSION['taj_contact_timestamps'])) {
    $_SESSION['taj_contact_timestamps'] = [];
}

// Purge timestamps older than the window
$_SESSION['taj_contact_timestamps'] = array_filter(
    $_SESSION['taj_contact_timestamps'],
    fn($ts) => ($now - $ts) < $window
);

if (count($_SESSION['taj_contact_timestamps']) >= $maxPosts) {
    http_response_code(429);
    echo json_encode(['ok' => false, 'error' => 'Too many requests. Please wait a minute and try again.']);
    exit;
}

// ─── 3. Input sanitisation helpers ───────────────────────────────────────────

function sanitiseText(string $value, int $maxLen = 256): string
{
    $value = trim($value);
    $value = strip_tags($value);            // no HTML tags
    $value = substr($value, 0, $maxLen);
    return $value;
}

function sanitiseTelephone(string $value): string
{
    // Keep only digits, spaces, +, -, (, )
    return preg_replace('/[^0-9 +\-().]/', '', trim($value));
}

// ─── 4. Collect & validate fields ────────────────────────────────────────────

$name      = sanitiseText($_POST['Name']      ?? '', 256);
$email     = sanitiseText($_POST['Email']     ?? '', 256);
$telephone = sanitiseTelephone($_POST['Telephone'] ?? '');
$message   = sanitiseText($_POST['Message']   ?? '', 5000);
$consent   = $_POST['checkbox'] ?? '';
$turnstile = trim($_POST['cf-turnstile-response'] ?? '');

$errors = [];

if ($name === '') {
    $errors[] = 'Name is required.';
}

if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'A valid email address is required.';
}

if ($telephone === '') {
    $errors[] = 'Telephone is required.';
}

if ($message === '') {
    $errors[] = 'Message is required.';
}

if ($consent === '' || $consent === '0' || strtolower($consent) === 'false') {
    $errors[] = 'You must agree to the Privacy Policy.';
}

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => implode(' ', $errors)]);
    exit;
}

// ─── 5. Cloudflare Turnstile verification ────────────────────────────────────

// TURNSTILE_SECRET_KEY must be defined in config.php
if (defined('TURNSTILE_SECRET_KEY') && TURNSTILE_SECRET_KEY !== '') {
    if ($turnstile === '') {
        http_response_code(422);
        echo json_encode(['ok' => false, 'error' => 'CAPTCHA verification required. Please complete the challenge.']);
        exit;
    }

    $verifyPayload = http_build_query([
        'secret'   => TURNSTILE_SECRET_KEY,
        'response' => $turnstile,
        'remoteip' => $_SERVER['REMOTE_ADDR'] ?? '',
    ]);

    $ctx = stream_context_create([
        'http' => [
            'method'  => 'POST',
            'header'  => "Content-Type: application/x-www-form-urlencoded\r\n",
            'content' => $verifyPayload,
            'timeout' => 10,
        ],
    ]);

    $tsResponse = @file_get_contents(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        false,
        $ctx
    );

    if ($tsResponse === false) {
        // Turnstile API unreachable — fail open only in dev; fail closed here
        http_response_code(500);
        echo json_encode(['ok' => false, 'error' => 'Could not verify CAPTCHA. Please try again.']);
        exit;
    }

    $tsResult = json_decode($tsResponse, true);
    if (empty($tsResult['success'])) {
        http_response_code(422);
        echo json_encode(['ok' => false, 'error' => 'CAPTCHA verification failed. Please refresh and try again.']);
        exit;
    }
}

// ─── 6. Build & send the email via PHPMailer ─────────────────────────────────

try {
    $mail = new PHPMailer(true);          // true = throw exceptions

    // SMTP settings (defined in config.php)
    $mail->isSMTP();
    $mail->Host        = defined('SMTP_HOST')     ? SMTP_HOST     : 'smtp.hostinger.com';
    $mail->SMTPAuth    = true;
    $mail->Username    = defined('SMTP_USERNAME')  ? SMTP_USERNAME : 'admin@thalakashjal.com';
    $mail->Password    = defined('SMTP_PASSWORD')  ? SMTP_PASSWORD : '';
    $mail->SMTPSecure  = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port        = defined('SMTP_PORT')      ? (int) SMTP_PORT : 587;
    $mail->Timeout     = 15;

    // Sender: must be the authenticated SMTP account
    $mail->setFrom(SMTP_USERNAME, 'THAL AKASH JAL Website');

    // Recipient
    $mail->addAddress('admin@thalakashjal.com', 'THAL AKASH JAL Admin');

    // Reply-To: set to visitor's email so admin can reply directly
    $mail->addReplyTo($email, $name);

    // Subject
    $mail->Subject = 'New Contact Form Submission - THAL AKASH JAL';

    // Plain-text body
    $plainBody = <<<TEXT
New contact form submission received.

Name:
{$name}

Email:
{$email}

Telephone:
{$telephone}

Message:
{$message}

Submitted from:
https://thalakashjal.com/contact.html
TEXT;

    // HTML body (basic, preserves existing brand colours)
    $htmlBody = '<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Contact Form Submission</title></head>
<body style="font-family:Arial,sans-serif;background:#f4f4f4;margin:0;padding:20px;">
  <table style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
    <tr>
      <td style="background:#1a3a6b;padding:24px 32px;">
        <h1 style="color:#ffffff;margin:0;font-size:20px;">THAL AKASH JAL</h1>
        <p style="color:#a0b4d4;margin:4px 0 0;font-size:13px;">New Contact Form Submission</p>
      </td>
    </tr>
    <tr>
      <td style="padding:32px;">
        <p style="color:#333;margin:0 0 24px;">A new contact form submission has been received.</p>
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #eee;color:#666;font-size:13px;width:120px;vertical-align:top;font-weight:bold;">Name</td>
            <td style="padding:10px 0;border-bottom:1px solid #eee;color:#333;font-size:14px;">' . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . '</td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #eee;color:#666;font-size:13px;vertical-align:top;font-weight:bold;">Email</td>
            <td style="padding:10px 0;border-bottom:1px solid #eee;color:#333;font-size:14px;"><a href="mailto:' . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . '" style="color:#1a3a6b;">' . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . '</a></td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #eee;color:#666;font-size:13px;vertical-align:top;font-weight:bold;">Telephone</td>
            <td style="padding:10px 0;border-bottom:1px solid #eee;color:#333;font-size:14px;">' . htmlspecialchars($telephone, ENT_QUOTES, 'UTF-8') . '</td>
          </tr>
          <tr>
            <td style="padding:10px 0;color:#666;font-size:13px;vertical-align:top;font-weight:bold;">Message</td>
            <td style="padding:10px 0;color:#333;font-size:14px;white-space:pre-wrap;">' . nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8')) . '</td>
          </tr>
        </table>
        <p style="margin:24px 0 0;font-size:12px;color:#999;">Submitted from: <a href="https://thalakashjal.com/contact.html" style="color:#1a3a6b;">https://thalakashjal.com/contact.html</a></p>
      </td>
    </tr>
    <tr>
      <td style="background:#f9f9f9;padding:16px 32px;text-align:center;">
        <p style="margin:0;font-size:11px;color:#aaa;">© 2026 THAL AKASH JAL Defence Technologies Pvt. Ltd.</p>
      </td>
    </tr>
  </table>
</body>
</html>';

    $mail->isHTML(true);
    $mail->Body    = $htmlBody;
    $mail->AltBody = $plainBody;

    $mail->CharSet = PHPMailer::CHARSET_UTF8;

    $mail->send();

    // ── Success: record the timestamp for rate-limiting ──
    $_SESSION['taj_contact_timestamps'][] = $now;

    http_response_code(200);
    echo json_encode(['ok' => true]);

} catch (PHPMailerException $e) {
    // Log the detailed error server-side (never expose to browser)
    error_log('[TAJ Contact] PHPMailer error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'ok'    => false,
        'error' => 'Our mail server could not send your message right now. Please email us directly at admin@thalakashjal.com',
    ]);
} catch (\Throwable $e) {
    error_log('[TAJ Contact] Unexpected error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'ok'    => false,
        'error' => 'An unexpected error occurred. Please email us directly at admin@thalakashjal.com',
    ]);
}
