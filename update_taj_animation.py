import re

taj_animation = """<span class="taj-work-animation" aria-hidden="true" style="margin: 0 auto 20px auto; display: block;">
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

for filepath in ["careers.html", "the-team.html"]:
    with open(filepath, "r") as f:
        content = f.read()
    
    pattern = r'<div class="radar-lottie-container".*?</div>'
    content = re.sub(pattern, taj_animation, content, flags=re.DOTALL)
    
    with open(filepath, "w") as f:
        f.write(content)
        
print("Updated to taj-work-animation!")
