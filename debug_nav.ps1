$content = [System.IO.File]::ReadAllText('about-us.html', [System.Text.Encoding]::UTF8)
Write-Output "File length: $($content.Length)"
Write-Output "Has navbar-mobile: $($content -match 'navbar-mobile w-nav')"
Write-Output "Has nav__link dropdown: $($content -match 'nav__link dropdown w-dropdown')"
$pat = '(?s)(<li class="nav-list-item no-padding">)<div data-delay="0" data-hover="false" data-w-id="[^"]*"\s*\r?\n\s*class="nav__link dropdown w-dropdown">'
Write-Output "Pattern match: $($content -match $pat)"
# Try simpler pattern
$pat2 = 'nav-list-item no-padding.*?nav__link dropdown'
Write-Output "Simple pattern match: $($content -match $pat2)"
# Find exact location
$idx = $content.IndexOf('nav__link dropdown w-dropdown')
Write-Output "nav__link idx: $idx"
if ($idx -gt 0) {
    Write-Output "Context: $($content.Substring([Math]::Max(0,$idx-200), 400))"
}
