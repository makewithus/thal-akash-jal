$root = "c:\Downloaded Web Sites\metisaerospace.com"
$files = Get-ChildItem -Path $root -Recurse -Include "*.html","*.htm" | Where-Object { $_.FullName -ne "$root\index.htm" }
$fixedCount = 0
foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    if ($content -notlike '*navbar-mobile w-nav*') { continue }
    if ($content -notlike '*nav__link dropdown w-dropdown*') { continue }
    $rel = $file.FullName.Substring($root.Length).TrimStart('\')
    $depth = ($rel.Split('\').Count) - 1
    $p = if ($depth -gt 0) { '../' } else { '' }
    $imgSrc = "${p}6893263d1e27013b67b77d36/6894c2e13a69542f542191b0_white%20triangle%20down.svg"
    $newLi = "<li class=`"nav-list-item no-padding`">`n                    <div data-delay=`"0`" data-hover=`"false`" class=`"w-dropdown`">`n                      <div class=`"nav-dropdown-2 w-dropdown-toggle`">`n                        <div class=`"text-style-nav`">Products</div><img`n                          src=`"$imgSrc`"`n                          loading=`"lazy`" alt=`"`">`n                      </div>`n                      <nav class=`"dropdown-list-4 w-dropdown-list`">`n                        <div class=`"mobile__nav-dropdown-list w-dyn-list`">`n                          <div role=`"list`" class=`"w-dyn-items`">`n                            <div role=`"listitem`" class=`"w-dyn-item`"><a href=`"${p}products/military-fuel-canister.html`" class=`"nav-link-3 bottom-border w-dropdown-link`">Military Fuel Center</a></div>`n                            <div role=`"listitem`" class=`"w-dyn-item`"><a href=`"${p}products/stackable-mobile-fuel-container.html`" class=`"nav-link-3 bottom-border w-dropdown-link`">Stackable Mobile Fuel Container</a></div>`n                            <div role=`"listitem`" class=`"w-dyn-item`"><a href=`"${p}products/mobile-fuel-storage-dispensing-unit.html`" class=`"nav-link-3 bottom-border w-dropdown-link`">Mobile Fuel Storage &amp; Dispensing</a></div>`n                            <div role=`"listitem`" class=`"w-dyn-item`"><a href=`"${p}products/iso-fuel-storage-container.html`" class=`"nav-link-3 bottom-border w-dropdown-link`">ISO Fuel Storage Container</a></div>`n                            <div role=`"listitem`" class=`"w-dyn-item`"><a href=`"${p}products/mobile-fuel-skid-system.html`" class=`"nav-link-3 bottom-border w-dropdown-link`">Mobile Fuel Skid System</a></div>`n                            <div role=`"listitem`" class=`"w-dyn-item`"><a href=`"${p}products/explosion-resistant-fuel-station.html`" class=`"nav-link-3 bottom-border w-dropdown-link`">Explosion-Resistant Fuel Station</a></div>`n                            <div role=`"listitem`" class=`"w-dyn-item`"><a href=`"${p}products/solar-powered-fuel-station.html`" class=`"nav-link-3 bottom-border w-dropdown-link`">Solar-Powered Fuel Station</a></div>`n                            <div role=`"listitem`" class=`"w-dyn-item`"><a href=`"${p}products/portable-fuel-storage-station.html`" class=`"nav-link-3 bottom-border w-dropdown-link`">Portable Fuel Storage</a></div>`n                          </div>`n                        </div>`n                      </nav>`n                    </div>`n                  </li>"
    $newBottom = "                  <li class=`"nav-list-item no-padding`"><a href=`"${p}industries.html`" class=`"text-style-nav mx-17`">Industries</a></li>`n                  <li class=`"nav-list-item no-padding`"><a href=`"${p}the-team.html`" class=`"text-style-nav mx-17`">Our Expertise</a></li>`n                  <li class=`"nav-list-item no-padding`"><a href=`"${p}careers.html`" class=`"text-style-nav mx-17`">Careers</a></li>`n                  <li class=`"nav-list-item no-padding`"><a href=`"${p}contact.html`" class=`"text-style-nav mx-17`">Contact</a></li>"
    $orig = $content
    # Fix Products block - use Singleline flag
    $opts = [System.Text.RegularExpressions.RegexOptions]::Singleline
    $pat1 = '<li class="nav-list-item no-padding"><div data-delay="0" data-hover="false" data-w-id="[^"]*"[\s\S]*?class="nav__link dropdown w-dropdown">[\s\S]*?</nav>\s*</div></li>'
    $content = [regex]::Replace($content, $pat1, $newLi, $opts)
    # Fix bottom nav
    $pat2 = '<li class="nav-list-item no-padding"><a href="[^"]*industries\.html"[^>]*>Industries</a>[\s\S]*?<a href="[^"]*contact\.html"[^>]*>Contact</a></li>'
    $content = [regex]::Replace($content, $pat2, $newBottom, $opts)
    if ($content -ne $orig) {
        $utf8NoBom = New-Object System.Text.UTF8Encoding $false
        [System.IO.File]::WriteAllText($file.FullName, $content, $utf8NoBom)
        Write-Host "FIXED: $($file.Name)"
        $fixedCount++
    } else {
        Write-Host "UNCHANGED: $($file.Name)"
    }
}
Write-Host "Total fixed: $fixedCount"
