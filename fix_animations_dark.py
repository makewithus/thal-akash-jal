import re

taj_animation = """<span class="taj-work-animation" aria-hidden="true" style="margin: 0 auto 20px auto; display: block; background: #0d1b3e; box-shadow: 0 10px 25px rgba(13, 27, 62, 0.2);">
  <span class="taj-work-ring"></span>
  <span class="taj-work-sweep"></span>
  <span class="taj-work-core">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 3 18 5.5v5.2c0 3.8-2.4 7.3-6 8.6-3.6-1.3-6-4.8-6-8.6V5.5L12 3Z"></path>
      <path d="M8.5 12a3.5 3.5 0 0 1 7 0"></path>
      <path d="M12 12h6"></path>
      <circle cx="12" cy="12" r="1.25"></circle>
    </svg>
  </span>
  <span class="taj-work-dot dot-one"></span>
  <span class="taj-work-dot dot-two"></span>
</span>"""

# 1. Update index.htm
with open("index.htm", "r") as f:
    content = f.read()

# Replace Union.svg above "Strategic Solutions" with the dark taj-work-animation
pattern_index = r'<img src="6893263d1e27013b67b77d36/689472a143e469fbaf8a6136_Union\.svg" loading="lazy" alt="" style="width: 50px; margin-bottom: 20px;">\s*<div class="max-width-300px">\s*<h2 class="style__h3">Strategic Solutions'
replacement_index = taj_animation + '\n              <div class="max-width-300px">\n                <h2 class="style__h3">Strategic Solutions'
content = re.sub(pattern_index, replacement_index, content)

with open("index.htm", "w") as f:
    f.write(content)

# 2. Update careers.html and the-team.html
for filepath in ["careers.html", "the-team.html"]:
    with open(filepath, "r") as f:
        content = f.read()
    
    # Replace Union.svg in the expertise__card-text-wrapper or team__card-wrapper
    pattern = r'<img src="6893263d1e27013b67b77d36/689472a143e469fbaf8a6136_Union\.svg" loading="lazy" alt="" style="width: 50px; margin-bottom: 20px;">'
    content = re.sub(pattern, taj_animation, content)
    
    with open(filepath, "w") as f:
        f.write(content)

print("Updated animations successfully!")
