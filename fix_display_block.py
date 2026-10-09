import re

def update_file(filename):
    with open(filename, "r") as f:
        content = f.read()
    
    # Replace the problematic display: block; with nothing, leaving it as inline-grid from CSS
    pattern = r'(<span class="taj-work-animation light-theme"[^>]*style="[^"]*)display:\s*block;?([^"]*")'
    content = re.sub(pattern, r'\1\2', content)

    with open(filename, "w") as f:
        f.write(content)

update_file("index.htm")
update_file("careers.html")
update_file("the-team.html")

print("Removed display: block; successfully!")
