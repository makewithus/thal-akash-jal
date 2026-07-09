import os
import re
import glob

workspace = r"c:\Downloaded Web Sites\metisaerospace.com"
html_files = glob.glob(os.path.join(workspace, "**/*.htm*"), recursive=True)

logo_pattern = re.compile(r'<img loading="lazy"[^>]*?src="[^"]*metis-logo-svg\.svg"[^>]*?class="logo-img">')
logo_replacement = r'<div class="logo-img" style="color: white; font-weight: bold; font-size: 1.5rem; display: flex; align-items: center; letter-spacing: 1px; padding-top: 5px;">THAL AKASH JAL</div>'

company_desktop_pattern = re.compile(r'<div data-delay="0" data-hover="false" data-w-id="61163a2f-005b-6c43-a0cf-e3f01d933b67".*?</nav>\s*</div>', re.DOTALL)
solutions_desktop_pattern = re.compile(r'<div data-delay="0" data-hover="false" data-w-id="61163a2f-005b-6c43-a0cf-e3f01d933b91".*?</nav>\s*</div>', re.DOTALL)

company_mobile_pattern = re.compile(r'<li class="nav-list-item no-padding">\s*<div data-delay="0" data-hover="false" class="w-dropdown">\s*<div class="nav-dropdown-2 w-dropdown-toggle">\s*<div class="text-style-nav">Company</div>.*?</nav>\s*</div>\s*</li>', re.DOTALL)
solutions_mobile_pattern = re.compile(r'<li class="nav-list-item no-padding">\s*<div data-delay="0" data-hover="false" class="w-dropdown">\s*<div class="nav-dropdown-2 w-dropdown-toggle">\s*<div class="text-style-nav">Solutions</div>.*?</nav>\s*</div>\s*</li>', re.DOTALL)

services_desktop_pattern = re.compile(r'(<div data-delay="0" data-hover="false" data-w-id="cee4ea34-345f-c53b-c382-6e4c1d7919ca".*?</nav>\s*</div>)', re.DOTALL)
services_mobile_pattern = re.compile(r'(<li class="nav-list-item no-padding">\s*<div data-delay="0" data-hover="false" class="w-dropdown">\s*<div class="nav-dropdown-2 w-dropdown-toggle">\s*<div class="text-style-nav">Services</div>.*?</nav>\s*</div>\s*</li>)', re.DOTALL)

count = 0
for file in html_files:
    rel_path = os.path.relpath(file, workspace)
    depth = rel_path.count(os.sep)
    prefix = '../' * depth
    
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
        
    orig_content = content

    content = logo_pattern.sub(logo_replacement, content)
    
    content = company_desktop_pattern.sub('', content)
    content = solutions_desktop_pattern.sub('', content)
    content = company_mobile_pattern.sub('', content)
    content = solutions_mobile_pattern.sub('', content)
    
    about_us_desktop = f'<a href="{prefix}about-us.html" class="text-style-nav mx-17">About Us</a>\n                '
    the_team_desktop = f'\n                <a href="{prefix}the-team.html" class="text-style-nav mx-17">The Team</a>'
    
    if 'class="text-style-nav mx-17">About Us</a>' not in content:
        content = services_desktop_pattern.sub(lambda m: about_us_desktop + m.group(1) + the_team_desktop, content)
        
    about_us_mobile = f'<li class="nav-list-item no-padding"><a href="{prefix}about-us.html" class="text-style-nav mx-17">About Us</a></li>\n                  '
    the_team_mobile = f'\n                  <li class="nav-list-item no-padding"><a href="{prefix}the-team.html" class="text-style-nav mx-17">The Team</a></li>'
    
    if '<li class="nav-list-item no-padding"><a href="' + prefix + 'about-us.html' not in content:
        content = services_mobile_pattern.sub(lambda m: about_us_mobile + m.group(1) + the_team_mobile, content)
    
    if content != orig_content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        count += 1
        print(f"Updated {os.path.basename(file)}")

print(f"Total files updated: {count}")
