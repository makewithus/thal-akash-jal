$OLD_MARKER = '<!-- Cookie Banner Brand Fix -->'
$NEW_MARKER = '<!-- Cookie Banner Brand Fix v2 -->'

$NEW_SCRIPT = @'
  <!-- Cookie Banner Brand Fix v2 -->
  <script>
    (function() {
      var OLD = 'Metis Aerospace';
      var NEW = 'THAL AKASH JAL';
      function walkAndReplace(root) {
        var walker = document.createTreeWalker(root, 4, null, false);
        var node;
        while (node = walker.nextNode()) {
          if (node.nodeValue && node.nodeValue.indexOf(OLD) !== -1) {
            node.nodeValue = node.nodeValue.split(OLD).join(NEW);
          }
        }
      }
      var mo = new MutationObserver(function(muts) {
        for (var i = 0; i < muts.length; i++) {
          var a = muts[i].addedNodes;
          for (var j = 0; j < a.length; j++) {
            if (a[j].nodeType === 1) walkAndReplace(a[j]);
          }
          if (muts[i].type === 'characterData' && muts[i].target.nodeValue && muts[i].target.nodeValue.indexOf(OLD) !== -1) {
            muts[i].target.nodeValue = muts[i].target.nodeValue.split(OLD).join(NEW);
          }
        }
      });
      mo.observe(document.documentElement, { childList: true, subtree: true, characterData: true });
      var iv = setInterval(function() { if (document.body) walkAndReplace(document.body); }, 250);
      setTimeout(function() { clearInterval(iv); }, 15000);
      document.addEventListener('DOMContentLoaded', function() { walkAndReplace(document.body); });
    })();
  </script>
'@

$allFiles = Get-ChildItem -Path "." -Include "*.html","*.htm" -Recurse
$count = 0
foreach ($file in $allFiles) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    
    # If already has v2, skip
    if ($content.Contains($NEW_MARKER)) {
        Write-Host "Already v2: $($file.Name)"
        continue
    }
    
    # If has old version, replace it
    if ($content.Contains($OLD_MARKER)) {
        # Find and remove the old script block
        $startIdx = $content.IndexOf($OLD_MARKER)
        $endTag = '</script>'
        $endIdx = $content.IndexOf($endTag, $startIdx)
        if ($endIdx -gt 0) {
            $endIdx += $endTag.Length
            $newContent = $content.Substring(0, $startIdx) + $NEW_SCRIPT + $content.Substring($endIdx)
            [System.IO.File]::WriteAllText($file.FullName, $newContent, [System.Text.Encoding]::UTF8)
            $count++
            Write-Host "Upgraded: $($file.Name)"
        }
        continue
    }
    
    # No cookie fix at all — insert before </head>
    if ($content.Contains('</head>')) {
        $newContent = $content.Replace('</head>', $NEW_SCRIPT + "`r`n</head>")
        [System.IO.File]::WriteAllText($file.FullName, $newContent, [System.Text.Encoding]::UTF8)
        $count++
        Write-Host "Inserted: $($file.Name)"
    }
}
Write-Host "`nTotal files updated: $count"
