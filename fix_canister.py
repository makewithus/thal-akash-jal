import re

with open("products/military-fuel-canister.html", "r") as f:
    content = f.read()

# 1. Reduce the size of the side picture
content = re.sub(
    r'<img alt="" data-w-id="[^"]+" loading="lazy" src="\.\./6893263d1e27013b67b77d36/689603cb18e8033a1b5ba383_innovation%20icon\.svg"/>',
    r'<img alt="" loading="lazy" style="max-width: 350px; height: auto;" src="../6893263d1e27013b67b77d36/689603cb18e8033a1b5ba383_innovation%20icon.svg"/>',
    content
)

# 2. Make right side text visible
content = re.sub(
    r'<div class="product__tiles-wrapper" data-w-id="[^"]+" style="opacity:0">',
    r'<div class="product__tiles-wrapper">',
    content
)

# 3. Add a new section matching the theme
new_section = """
<div class="section additional-content" style="padding: 60px 0; background-color: white;">
<div class="contain">
<div class="max-width-900px" style="margin: 0 auto; text-align: center; padding: 40px; background: #f4f6f8; border-radius: 12px; border-left: 4px solid var(--taj-blue-primary); box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
<h2 style="color: var(--taj-blue-primary); margin-bottom: 20px;">Product Specifications</h2>
<p style="color: #333; line-height: 1.8; font-size: 1.1rem; text-align: left;">
Replace this text with your detailed product information. This newly created section matches the theme's aesthetic perfectly, complete with the subtle blue accent border and soft shadow to make your content stand out cleanly and professionally.
</p>
</div>
</div>
</div>
"""

# Insert the new section right before the expertise-quote section
if "additional-content" not in content:
    content = content.replace(
        '<div class="section expertise-quote"',
        new_section + '\n<div class="section expertise-quote"'
    )

with open("products/military-fuel-canister.html", "w") as f:
    f.write(content)

print("Updates applied to products/military-fuel-canister.html")
