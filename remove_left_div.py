import os
from bs4 import BeautifulSoup

directories = ['services', 'products']

for d in directories:
    for filename in os.listdir(d):
        if not filename.endswith('.html'):
            continue
        
        filepath = os.path.join(d, filename)
            
        with open(filepath, 'r', encoding='utf-8') as f:
            soup = BeautifulSoup(f, 'html.parser')
            
        # Find the left side wrapper
        left_div = soup.find('div', class_='solutions__card-img-wrapper')
        if left_div:
            left_div.decompose()
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(str(soup))
            print(f"Removed left div in {filepath}")

