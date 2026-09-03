$root = "c:\Downloaded Web Sites\metisaerospace.com"
$files = Get-ChildItem -Path $root -Recurse -Include *.html, *.htm, *.css

foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName)
    if ($content.Contains('products-dropdown-nav')) {
        $content = $content.Replace('products-dropdown-nav', 'cee4ea34-345f-c53b-c382-6e4c1d7919ca')
        [System.IO.File]::WriteAllText($file.FullName, $content)
        Write-Host "Updated: $($file.FullName)"
    }
}
Write-Host "Done!"
