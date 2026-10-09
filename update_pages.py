import os
import re
from bs4 import BeautifulSoup

directories = ['services', 'products']

for d in directories:
    for filename in os.listdir(d):
        if not filename.endswith('.html'):
            continue
        filepath = os.path.join(d, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            soup = BeautifulSoup(f, 'html.parser')
        
        # Replace Union.svg with innovation icon
        for img in soup.find_all('img'):
            if img.get('src') and 'Union.svg' in img['src']:
                img['src'] = img['src'].replace('689472a143e469fbaf8a6136_Union.svg', '689603cb18e8033a1b5ba383_innovation%20icon.svg')

        # Remove expertise__card-img-wrapper (the first image on the right)
        for wrapper in soup.find_all('div', class_='expertise__card-img-wrapper'):
            wrapper.decompose()

        # Remove the bottom section: expertise__solutions-wrapper
        for wrapper in soup.find_all('div', class_='expertise__solutions-wrapper'):
            wrapper.decompose()

        # If it's a product page, we change it to a "tiles format"
        # Since we just removed the image and bottom section, what's left is the text.
        # "Remove photographs and work on tiles format that can show the products specs and the listed products we have. Images are not to be inserted just the names."
        # The user wants tiles. I will change the text wrapper class for products to a tiled layout.
        if d == 'products':
            text_wrapper = soup.find('div', class_='expertise__card-text-wrapper')
            if text_wrapper:
                text_wrapper['class'] = ['product__tiles-wrapper']
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(str(soup))
