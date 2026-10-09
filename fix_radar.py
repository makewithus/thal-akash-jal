import re

clean_radar_html = """<div class="radar-lottie-container" style="position: relative; width: 100px; height: 100px; margin: 0 auto 20px auto; display: flex; align-items: center; justify-content: center;">
  <img src="6893263d1e27013b67b77d36/Radar_4_Dark.svg" class="lottie-spin" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;">
  <img src="6893263d1e27013b67b77d36/689472a143e469fbaf8a6136_Union.svg" style="position: relative; z-index: 2; width: 40px; height: 40px;">
</div>"""

for filepath in ["careers.html", "the-team.html"]:
    with open(filepath, "r") as f:
        content = f.read()
    
    # regex to match the custom-radar-wrapper div and its contents
    pattern = r'<div class="custom-radar-wrapper">.*?</div>'
    content = re.sub(pattern, clean_radar_html, content, flags=re.DOTALL)
    
    with open(filepath, "w") as f:
        f.write(content)
        
print("Cleaned up radar!")
