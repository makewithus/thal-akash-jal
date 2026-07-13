$OLD_MARKER = '<!-- Cookie Banner Brand Fix -->'
$OLD_MARKER2 = '<!-- Cookie Banner Brand Fix v2 -->'
$NEW_MARKER = '<!-- Cookie Banner Remove v3 -->'

$NEW_SCRIPT = @'
  <!-- Cookie Banner Remove v3 -->
  <script>
    (function() {
      function removeCookieBanner(root) {
        var els = (root || document).querySelectorAll ? (root || document).querySelectorAll('div,section,aside') : [];
        for (var i = 0; i < els.length; i++) {
          var el = els[i];
          if (el.innerText && (el.innerText.indexOf('About Cookies') !== -1 || el.innerText.indexOf('use cookies') !== -1 || el.innerText.indexOf('Cookie settings') !== -1)) {
            var target = el;
            while (target.parentElement && target.parentElement !== document.body && target.parentElement.children.length === 1) {
              target = target.parentElement;
            }
            target.style.display = 'none';
            target.remove();
          }
        }
      }
      var mo = new MutationObserver(function(muts) {
        for (var i = 0; i < muts.length; i++) {
          var added = muts[i].addedNodes;
          for (var j = 0; j < added.length; j++) {
            if (added[j].nodeType === 1) {
              var el = added[j];
              if (el.innerText && (el.innerText.indexOf('About Cookies') !== -1 || el.innerText.indexOf('use cookies') !== -1 || el.innerText.indexOf('Cookie settings') !== -1)) {
                var target = el;
                while (target.parentElement && target.parentElement !== document.body && target.parentElement.children.length === 1) {
                  target = target.parentElement;
                }
                target.style.display = 'none';
                setTimeout(function(t){ t.remove(); }, 0, target);
              }
            }
          }
        }
      });
      mo.observe(document.documentElement, { childList: true, subtree: true });
      var iv = setInterval(function() { if (document.body) removeCookieBanner(document.body); }, 200);
      setTimeout(function() { clearInterval(iv); }, 15000);
      document.addEventListener('DOMContentLoaded', function() { removeCookieBanner(document.body); });
    })();
  </script>
'@

$allFiles = Get-ChildItem -Path "." -Include "*.html","*.htm" -Recurse
$count = 0
foreach ($file in $allFiles) {
    $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)

    # Already v3 — skip
    if ($content.Contains($NEW_MARKER)) {
        Write-Host "Already v3: $($file.Name)"
        continue
    }

    # Has v2 — replace block
    if ($content.Contains($OLD_MARKER2)) {
        $startIdx = $content.IndexOf($OLD_MARKER2)
        $endTag = '</script>'
        $endIdx = $content.IndexOf($endTag, $startIdx)
        if ($endIdx -gt 0) {
            $endIdx += $endTag.Length
            $newContent = $content.Substring(0, $startIdx) + $NEW_SCRIPT + $content.Substring($endIdx)
            [System.IO.File]::WriteAllText($file.FullName, $newContent, [System.Text.Encoding]::UTF8)
            $count++
            Write-Host "Upgraded v2->v3: $($file.Name)"
        }
        continue
    }

    # Has v1 — replace block
    if ($content.Contains($OLD_MARKER)) {
        $startIdx = $content.IndexOf($OLD_MARKER)
        $endTag = '</script>'
        $endIdx = $content.IndexOf($endTag, $startIdx)
        if ($endIdx -gt 0) {
            $endIdx += $endTag.Length
            $newContent = $content.Substring(0, $startIdx) + $NEW_SCRIPT + $content.Substring($endIdx)
            [System.IO.File]::WriteAllText($file.FullName, $newContent, [System.Text.Encoding]::UTF8)
            $count++
            Write-Host "Upgraded v1->v3: $($file.Name)"
        }
        continue
    }

    # No cookie fix — insert before </head>
    if ($content.Contains('</head>')) {
        $newContent = $content.Replace('</head>', $NEW_SCRIPT + "`r`n</head>")
        [System.IO.File]::WriteAllText($file.FullName, $newContent, [System.Text.Encoding]::UTF8)
        $count++
        Write-Host "Inserted v3: $($file.Name)"
    }
}
Write-Host "`nTotal files updated: $count"
