import re

# 1. Update index.htm
with open("index.htm", "r") as f:
    content = f.read()

# Replace static logo above text
content = content.replace(
    'src="6893263d1e27013b67b77d36/689603cb18e8033a1b5ba383_innovation%20icon.svg" loading="lazy" alt="">\n              <div class="max-width-300px">',
    'src="6893263d1e27013b67b77d36/689472a143e469fbaf8a6136_Union.svg" loading="lazy" alt="" style="width: 50px; margin-bottom: 20px;">\n              <div class="max-width-300px">'
)

# Replace spinning logo
content = content.replace(
    'src="6893263d1e27013b67b77d36/689603cb18e8033a1b5ba383_innovation%20icon.svg" loading="lazy"\n              data-w-id="36ed50cc-efb3-5d92-5a15-6ca6051b9800"',
    'src="6893263d1e27013b67b77d36/Radar_4_Dark.svg" loading="lazy"\n              data-w-id="36ed50cc-efb3-5d92-5a15-6ca6051b9800"'
)

with open("index.htm", "w") as f:
    f.write(content)


# 2. Update careers.html and the-team.html
new_logo = '<img src="6893263d1e27013b67b77d36/689472a143e469fbaf8a6136_Union.svg" loading="lazy" alt="" style="width: 50px; margin-bottom: 20px;">'

for filepath in ["careers.html", "the-team.html"]:
    with open(filepath, "r") as f:
        content = f.read()
    
    # Remove taj-work-animation span completely and replace with simple logo
    pattern = r'<span class="taj-work-animation".*?</span>'
    content = re.sub(pattern, new_logo, content, flags=re.DOTALL)
    
    with open(filepath, "w") as f:
        f.write(content)

print("Updated logos successfully!")
