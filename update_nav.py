import os, re

services = [
    ("Strategic Advisory", "strategic-advisory.html"),
    ("Supply Chain Consulting", "logistics-supply-chain.html"),
    ("Procurement Management", "procurement-contract-management.html"),
    ("GeM Advisory", "gem-advisory.html"),
    ("Warehouse Optimization", "warehouse-management.html"),
    ("Workforce Analytics", "human-capital-workforce.html"),
    ("Business Management", "outsourced-business-management.html"),
    ("Marine Tourism", "marine-aqua-tourism.html"),
    ("Technology Transfer", "technology-transfer.html"),
    ("Strategic Liaison", "strategic-liaison.html"),
    ("Field Trial Management", "field-trial-management.html"),
    ("Specification Review", "specification-review.html")
]

def update_file(filepath):
    # calculate prefix
    dirname = os.path.dirname(filepath)
    prefix = ""
    # Normalize path to use forward slashes for depth calculation
    dirname = dirname.replace('\\', '/')
    if dirname not in ["", ".", "./"]:
        depth = len([p for p in dirname.split('/') if p and p != '.'])
        prefix = "../" * depth

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    orig_content = content

    desktop_template = '<div role="listitem" class="w-dyn-item"><a data-w-id="cee4ea34-345f-c53b-c382-6e4c1d7919d7" href="{prefix}sector/{slug}" class="megamenu__link-item w-inline-block"><img src="{prefix}6893263d1e27013b67b77d36/689378e7cc9f5139e3ec255a_Polygon%2017.svg" loading="lazy" alt=""><p class="text-style-nav">{name}</p></a></div>\n'
    mobile_template = '<div role="listitem" class="w-dyn-item"><a href="{prefix}sector/{slug}" class="nav-link-3 bottom-border w-dropdown-link">{name}</a></div>\n'
    footer_template = '<div role="listitem" class="w-dyn-item"><a href="{prefix}sector/{slug}">{name}</a></div>\n'

    # Desktop
    desktop_pattern = r'(class="megamenu__expertise-links w-dyn-items">\s*)(?:<div role="listitem" class="w-dyn-item">.*?</a>\s*</div>\s*)*'
    def desktop_repl(m):
        return m.group(1) + "".join([desktop_template.format(prefix=prefix, slug=s, name=n) for n, s in services])
    content = re.sub(desktop_pattern, desktop_repl, content, flags=re.DOTALL)

    # Mobile - match any w-dyn-items that currently contains sector links with the mobile dropdown class
    mobile_pattern = r'(class="[^"]*w-dyn-items[^"]*">\s*)(?:<div role="listitem" class="w-dyn-item">\s*<a href="(?:\.\./)?sector/[^"]+" class="nav-link-3 bottom-border w-dropdown-link">.*?</a>\s*</div>\s*)+'
    def mobile_repl(m):
        return m.group(1) + "".join([mobile_template.format(prefix=prefix, slug=s, name=n) for n, s in services])
    content = re.sub(mobile_pattern, mobile_repl, content, flags=re.DOTALL)
    
    # Footer
    footer_pattern = r'(<h3 class="my-0">Services</h3>\s*<div class="w-dyn-list">\s*<div role="list" class="footer__link-list w-dyn-items">\s*)(?:<div role="listitem" class="w-dyn-item">\s*<a href="(?:\.\./)?sector/[^"]+">.*?</a>\s*</div>\s*)*'
    def footer_repl(m):
        return m.group(1) + "".join([footer_template.format(prefix=prefix, slug=s, name=n) for n, s in services])
    content = re.sub(footer_pattern, footer_repl, content, flags=re.DOTALL)

    if content != orig_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

for root, dirs, files in os.walk('.'):
    for f in files:
        if f.endswith('.html') or f.endswith('.htm'):
            filepath = os.path.join(root, f)
            if '.gemini' not in filepath and 'update_nav' not in filepath:
                update_file(filepath)
