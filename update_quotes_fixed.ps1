$baseDir = "c:\Downloaded Web Sites\metisaerospace.com"
$files = Get-ChildItem -Path $baseDir -Recurse -Filter "*.html" | Where-Object { $_.FullName -notmatch "\\node_modules\\" -and $_.FullName -notmatch "\\\.gemini\\" -and $_.FullName -match "\\sector\\" }

$newQuote = 'Our Unique Combination Of Military, Government, And Corporate Expertise Enables Us To Deliver Innovative, Reliable, And Strategically Aligned Advisory Solutions That Strengthen Organizational Capabilities, Optimize Resources, And Contribute To India''s Economic And Industrial Growth.'
$newAuthor = 'THAL AKASH JAL DEFENCE TECHNOLOGIES PVT. LTD. (TAJ) <br>Connecting Bharat with India'

foreach ($f in $files) {
    $content = [System.IO.File]::ReadAllText($f.FullName)
    $original = $content
    
    $content = [regex]::Replace($content, '(?s)(<p[^>]*class="text-style-quote"[^>]*>).*?(</p>)', "`${1}$newQuote`${2}")
    $content = [regex]::Replace($content, '(?s)(<p[^>]*class="text-style-quote-author"[^>]*>).*?(</p>)', "`${1}$newAuthor`${2}")
    
    if ($content -cne $original) {
        [System.IO.File]::WriteAllText($f.FullName, $content, [System.Text.Encoding]::UTF8)
        Write-Host "Updated $($f.Name)"
    }
}
Write-Host "Done"
