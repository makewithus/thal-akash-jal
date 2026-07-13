# The exact old logo div (same on all pages)
$OLD_LOGO_DIV = '<div class="logo-img" style="color: white; font-weight: bold; font-size: 1.5rem; display: flex; align-items: center; letter-spacing: 1px; padding-top: 5px;">THAL AKASH JAL</div>'

$ROOT_IMG = '<img src="img/nav-logo.png" alt="THAL AKASH JAL" class="logo-img" style="height: 48px; width: auto;">'
$SUB_IMG  = '<img src="../img/nav-logo.png" alt="THAL AKASH JAL" class="logo-img" style="height: 48px; width: auto;">'

$allFiles = Get-ChildItem -Path "." -Include "*.html","*.htm" -Recurse
$count = 0

foreach ($file in $allFiles) {
    $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)

    # Skip if old pattern not present
    if (-not $content.Contains($OLD_LOGO_DIV)) {
        Write-Host "Already updated / no match: $($file.Name)"
        continue
    }

    # Determine root vs subdir
    $relativePath = $file.FullName.Replace((Get-Location).Path + "\", "")
    $isSubDir = $relativePath.Contains("\")
    $newImg = if ($isSubDir) { $SUB_IMG } else { $ROOT_IMG }

    # Replace all occurrences (desktop + mobile navbars both use the same div)
    $newContent = $content.Replace($OLD_LOGO_DIV, $newImg)

    [System.IO.File]::WriteAllText($file.FullName, $newContent, [System.Text.Encoding]::UTF8)
    $count++
    Write-Host "Updated: $relativePath"
}

Write-Host "`nTotal files updated: $count"
