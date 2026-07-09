$baseDir = "c:\Downloaded Web Sites\metisaerospace.com"

$files = Get-ChildItem -Path $baseDir -Recurse -Filter "*.html" | Where-Object { $_.FullName -notmatch "\\node_modules\\" -and $_.FullName -notmatch "\\\.gemini\\" -and $_.FullName -match "\\sector\\" }

$oldQuote = 'The Metis system is able to detect RF transmissions originating from\s*the GCS controllers and when detected by multiple DF sensors, is able to geo-locate the GCS\s*controllers\.'
$newQuote = 'Our Unique Combination Of Military, Government, And Corporate Expertise Enables Us To Deliver Innovative, Reliable, And Strategically Aligned Advisory Solutions That Strengthen Organizational Capabilities, Optimize Resources, And Contribute To India''s Economic And Industrial Growth.'

$oldAuthor = 'UAS CDC 22 Metis’ Skyperion drone detection system has\s*received the above official feedback following testing an independent UK official MOD test and\s*evaluation body\.'
$newAuthor = 'THAL AKASH JAL DEFENCE TECHNOLOGIES PVT. LTD. (TAJ) <br>Connecting Bharat with India'

foreach ($f in $files) {
    $content = [System.IO.File]::ReadAllText($f.FullName)
    $original = $content
    
    $content = [regex]::Replace($content, $oldQuote, $newQuote)
    $content = [regex]::Replace($content, $oldAuthor, $newAuthor)
    
    if ($content -cne $original) {
        [System.IO.File]::WriteAllText($f.FullName, $content, [System.Text.Encoding]::UTF8)
        Write-Host "Updated $($f.Name)"
    }
}

# Now let's update index.htm to match the Title Cased version from the image
$indexPath = Join-Path $baseDir "index.htm"
$indexContent = [System.IO.File]::ReadAllText($indexPath)
$indexOldQuote = 'Our unique combination of military, government, and corporate expertise enables us to deliver innovative, reliable, and strategically aligned advisory solutions that strengthen organizational capabilities, optimize resources, and contribute to India''s economic and industrial growth.'
$indexContent = [regex]::Replace($indexContent, [regex]::Escape($indexOldQuote), $newQuote)
[System.IO.File]::WriteAllText($indexPath, $indexContent, [System.Text.Encoding]::UTF8)
Write-Host "Updated index.htm"

Write-Host "Done"
