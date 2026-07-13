$urlPattern = [regex]::Escape("https://cdn.prod.website-files.com/6893263d1e27013b67b77d36/68b5be2b52edd4499ad3f9f1_og_image.webp")
# Match the full meta tag containing the URL, potentially on its own line (with leading spaces and optional trailing newline/carriage return)
$regex = "(?m)^\s*<meta [^>]*" + $urlPattern + "[^>]*>(\r\n|\r|\n)?"

# Also fallback to match inline meta tags if they don't start at the beginning of a line
$regexFallback = "<meta [^>]*" + $urlPattern + "[^>]*>"

$allFiles = Get-ChildItem -Path "." -Include "*.html","*.htm" -Recurse
$count = 0

foreach ($file in $allFiles) {
    $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    
    if ($content -match $urlPattern) {
        # Perform replacement
        $newContent = $content -replace $regex, ""
        $newContent = $newContent -replace $regexFallback, ""
        
        [System.IO.File]::WriteAllText($file.FullName, $newContent, [System.Text.Encoding]::UTF8)
        $count++
        Write-Host "Removed og_image meta tags from: $($file.FullName.Replace((Get-Location).Path + '\', ''))"
    }
}

Write-Host "`nTotal files updated: $count"
