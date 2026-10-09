import os
import subprocess
from bs4 import BeautifulSoup

# 1. Checkout old files to a temp directory to read original content
subprocess.run(['git', 'checkout', '6ad9d83', '--', 'services', 'products'])
os.makedirs('temp_old', exist_ok=True)
subprocess.run(['cp', '-r', 'services', 'temp_old/'])
subprocess.run(['cp', '-r', 'products', 'temp_old/'])

# 2. Revert back to current files
subprocess.run(['git', 'restore', '--staged', 'services', 'products'])
subprocess.run(['git', 'checkout', 'HEAD', '--', 'services', 'products'])

# 3. For each file, extract the expertise__solutions-wrapper, modify it, and insert it into current
directories = ['services', 'products']

for d in directories:
    for filename in os.listdir(d):
        if not filename.endswith('.html'):
            continue
        
        old_path = os.path.join('temp_old', d, filename)
        new_path = os.path.join(d, filename)
        
        # Read old
        if not os.path.exists(old_path):
            continue
            
        with open(old_path, 'r', encoding='utf-8') as f:
            old_soup = BeautifulSoup(f, 'html.parser')
            
        wrapper_to_restore = old_soup.find('div', class_='expertise__solutions-wrapper')
        if not wrapper_to_restore:
            print(f"No wrapper found in {old_path}")
            continue
            
        # "Remove the left pic" -> remove .home__card-img-copy
        left_pic = wrapper_to_restore.find('div', class_='home__card-img-copy')
        if left_pic:
            left_pic.decompose()
            
        # We also might want to make it neat. Let's just restore it first.
        
        # Read new
        with open(new_path, 'r', encoding='utf-8') as f:
            new_soup = BeautifulSoup(f, 'html.parser')
            
        # Ensure it doesn't already exist
        if new_soup.find('div', class_='expertise__solutions-wrapper'):
            print(f"Already exists in {new_path}")
            continue
            
        # Find where to insert it. We want it inside `.section.expertise-card > .contain` after `.expertise__card-wrapper`.
        contain = new_soup.find('div', class_='expertise__card-wrapper')
        if contain:
            contain.insert_after(wrapper_to_restore)
            with open(new_path, 'w', encoding='utf-8') as f:
                f.write(str(new_soup))
            print(f"Restored to {new_path}")
        else:
            print(f"Could not find insertion point in {new_path}")

subprocess.run(['rm', '-rf', 'temp_old'])
