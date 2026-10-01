# Hostinger Deployment — Contact Form Setup

This document explains every manual step required on Hostinger to make the
THAL AKASH JAL contact form send emails.

---

## What Was Built

```
contact.html        → JS fetch (capture-phase intercept of Webflow)
    ↓  POST FormData
mailer/send.php     → Server-side validation + PHPMailer
    ↓  SMTP AUTH
smtp.hostinger.com:587 (STARTTLS)
    ↓
admin@thalakashjal.com
```

---

## Step 1 — Upload all new files to Hostinger

Upload **everything** in the `thal-akash-jal/` directory to your Hostinger
`public_html/` (or equivalent web root) as you normally do.

This includes the new `mailer/` subdirectory.

---

## Step 2 — Install PHPMailer (Two Options)

### Option A — Composer (Recommended if Hostinger SSH is available)

1. SSH into your Hostinger account.
2. Navigate to the `mailer/` directory inside `public_html/`:
   ```bash
   cd ~/public_html/mailer
   ```
3. Run:
   ```bash
   composer install --no-dev --optimize-autoloader
   ```
   This creates `mailer/vendor/` and installs PHPMailer automatically.

### Option B — Manual download (if Composer/SSH not available)

1. Download PHPMailer from:
   https://github.com/PHPMailer/PHPMailer/archive/refs/heads/master.zip

2. Extract the archive. Inside, find the `src/` directory containing:
   - `Exception.php`
   - `PHPMailer.php`
   - `SMTP.php`

3. Upload those three files to:
   ```
   public_html/mailer/PHPMailer/src/Exception.php
   public_html/mailer/PHPMailer/src/PHPMailer.php
   public_html/mailer/PHPMailer/src/SMTP.php
   ```

   > `send.php` automatically detects whether `vendor/autoload.php` exists
   > and falls back to loading the three files directly from `PHPMailer/src/`.

---

## Step 3 — Configure SMTP Credentials

1. On Hostinger, create/edit the file:
   ```
   public_html/mailer/config.php
   ```

2. Replace the placeholder values:
   ```php
   define('SMTP_PASSWORD', 'REPLACE_WITH_ACTUAL_SMTP_PASSWORD');
   define('TURNSTILE_SECRET_KEY', 'REPLACE_WITH_TURNSTILE_SECRET_KEY');
   ```

   **SMTP Password:**
   - Log in to Hostinger → Email → Manage → admin@thalakashjal.com
   - Use the password you set for that mailbox.

   **Turnstile Secret Key:**
   - Log in to your Cloudflare Dashboard → Turnstile
   - Find the widget for `thalakashjal.com`
   - Copy the **Secret Key** (NOT the Site Key — that's already in the HTML)

   > ⚠️ The `mailer/config.php` is in `.gitignore` and must NEVER be pushed to Git.
   > Always set it directly on the server via File Manager or SFTP.

---

## Step 4 — Verify the .htaccess is in place

Confirm `public_html/mailer/.htaccess` exists on the server.
It prevents direct browser access to `config.php` and `vendor/`.

---

## Step 5 — Test

### Quick server test (via browser address bar)
Visit: `https://thalakashjal.com/mailer/send.php`
— You should get a 405 Method Not Allowed (JSON) response, NOT a PHP error
  and NOT the raw config.php contents.

### Full form test
1. Open: `https://thalakashjal.com/contact.html`
2. Fill in all fields with real values.
3. Complete the Turnstile challenge.
4. Click Submit.
5. **Expected browser behaviour:** The success message appears:
   "Your message has been received and a member of the THALAKASHJAL team will be in touch with you shortly!"
6. **Expected email:** Check `admin@thalakashjal.com` inbox for an email with:
   - Subject: `New Contact Form Submission - THAL AKASH JAL`
   - To: admin@thalakashjal.com
   - Reply-To: visitor's submitted email
   - Body containing Name, Email, Telephone, Message

### Error/validation tests
| Test scenario                       | Expected browser result           |
|-------------------------------------|-----------------------------------|
| Submit with Name blank              | Error panel shown                 |
| Submit with invalid email (no @)    | Error panel shown                 |
| Submit with Message blank           | Error panel shown                 |
| Submit without ticking consent      | Error panel shown                 |
| Submit with wrong SMTP password     | Error panel shown (no false success) |

---

## File Summary

| File (relative to web root)         | Action      | Purpose                              |
|-------------------------------------|-------------|--------------------------------------|
| `contact.html`                      | Modified    | method=post + form handler script    |
| `mailer/send.php`                   | **Created** | Server-side endpoint                 |
| `mailer/config.php`                 | **Created** | SMTP credentials (gitignored)        |
| `mailer/.htaccess`                  | **Created** | Protect sensitive files              |
| `mailer/composer.json`              | **Created** | PHPMailer dependency manifest        |
| `.gitignore`                        | **Created** | Prevents secrets entering Git        |

---

## Security Notes

- SMTP password is only in `mailer/config.php` — never in HTML or JS.
- `mailer/config.php` is listed in `.gitignore`.
- `.htaccess` blocks direct access to all files except `send.php`.
- Server-side: all fields sanitised, email validated, header injection blocked.
- Cloudflare Turnstile verified server-side (token sent to Cloudflare API).
- Basic rate limiting: max 3 submissions per 60 seconds per session.
- No submitted data written to any file on the server.
