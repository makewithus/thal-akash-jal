import re

# We want to match the whole taj-work-animation span that has the inline style `background: #0d1b3e`
new_animation = """<span class="taj-work-animation light-theme" aria-hidden="true" style="margin-bottom: 20px; align-self: flex-start; display: block;">
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

pattern_dark_animation = r'<span class="taj-work-animation" aria-hidden="true" style="margin: 0 auto 20px auto; display: block; background: #0d1b3e; box-shadow: 0 10px 25px rgba\(13, 27, 62, 0\.2\);">.*?<span class="taj-work-dot dot-two"></span>\s*</span>'

# We also need to replace the SECOND logo in careers.html which is a Union.svg
# The user wants "and the logo below this also should be animated"
pattern_union = r'<img\s+src="6893263d1e27013b67b77d36/689472a143e469fbaf8a6136_Union\.svg"\s+loading="lazy"\s+alt="">'


def update_file(filename):
    with open(filename, "r") as f:
        content = f.read()
    
    # Replace dark animation
    content = re.sub(pattern_dark_animation, new_animation, content, flags=re.DOTALL)
    
    # Replace the remaining Union.svg in careers.html
    content = re.sub(pattern_union, new_animation, content, flags=re.DOTALL)

    with open(filename, "w") as f:
        f.write(content)

update_file("index.htm")
update_file("careers.html")
update_file("the-team.html")

print("Updated animations to light theme successfully!")
