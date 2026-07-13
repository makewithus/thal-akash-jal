# Root-level pages — no ../ prefix needed
$ROOT_FAVICON_NEW = @'
  <link rel="icon" type="image/png" sizes="32x32" href="favicon/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="favicon/favicon-16x16.png">
  <link rel="shortcut icon" href="favicon/favicon.ico">
  <link rel="apple-touch-icon" sizes="180x180" href="favicon/apple-touch-icon.png">
  <link rel="manifest" href="favicon/site.webmanifest">
'@

# Subdirectory pages (services/, news/, solutions/, careers/) — need ../ prefix
$SUB_FAVICON_NEW = @'
  <link rel="icon" type="image/png" sizes="32x32" href="../favicon/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="../favicon/favicon-16x16.png">
  <link rel="shortcut icon" href="../favicon/favicon.ico">
  <link rel="apple-touch-icon" sizes="180x180" href="../favicon/apple-touch-icon.png">
  <link rel="manifest" href="../favicon/site.webmanifest">
'@

$allFiles = Get-ChildItem -Path "." -Include "*.html","*.htm" -Recurse
$count = 0

foreach ($file in $allFiles) {
    $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)

    # Determine if this is a root-level or subdirectory file
    $relativePath = $file.FullName.Replace((Get-Location).Path + "\", "")
    $isSubDir = $relativePath.Contains("\")

    $newFavicon = if ($isSubDir) { $SUB_FAVICON_NEW } else { $ROOT_FAVICON_NEW }

    # Pattern 1: Root page old favicon (no ../ prefix)
    $oldPattern1 = '<link href="6893263d1e27013b67b77d36/68b5af7485eee5b1ce43014a_favicon%2032.svg" rel="shortcut icon"'
    $oldEnd1 = 'type="image/x-icon">'
    $oldPattern2 = '<link href="6893263d1e27013b67b77d36/68b5af76eadc2053b2f3f6c8_favicon%20256.svg" rel="apple-touch-icon">'

    # Pattern 2: Subdir page old favicon (../ prefix)
    $oldPatternSub1 = '<link href="../6893263d1e27013b67b77d36/68b5af7485eee5b1ce43014a_favicon%2032.svg" rel="shortcut icon"'
    $oldEndSub1 = 'type="image/x-icon">'
    $oldPatternSub2 = '<link href="../6893263d1e27013b67b77d36/68b5af76eadc2053b2f3f6c8_favicon%20256.svg" rel="apple-touch-icon">'

    $modified = $false

    if ($content.Contains($oldPattern1) -and $content.Contains($oldPattern2)) {
        # Root page — find the full block from shortcut icon to apple-touch-icon and replace
        $start = $content.IndexOf($oldPattern1)
        $end = $content.IndexOf($oldPattern2)
        if ($start -ge 0 -and $end -gt $start) {
            $end += $oldPattern2.Length
            $content = $content.Substring(0, $start) + $newFavicon.TrimEnd() + $content.Substring($end)
            $modified = $true
        }
    } elseif ($content.Contains($oldPatternSub1) -and $content.Contains($oldPatternSub2)) {
        # Subdir page
        $start = $content.IndexOf($oldPatternSub1)
        $end = $content.IndexOf($oldPatternSub2)
        if ($start -ge 0 -and $end -gt $start) {
            $end += $oldPatternSub2.Length
            $content = $content.Substring(0, $start) + $newFavicon.TrimEnd() + $content.Substring($end)
            $modified = $true
        }
    }

    if ($modified) {
        [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
        $count++
        Write-Host "Updated favicon: $relativePath"
    } else {
        Write-Host "No old favicon found / already updated: $($file.Name)"
    }
}

Write-Host "`nTotal files updated: $count"
