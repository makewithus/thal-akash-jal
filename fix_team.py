import os
from bs4 import BeautifulSoup

filepath = 'the-team.html'
with open(filepath, 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f, 'html.parser')

# 1. Find the logo and add lottie-spin class
wrapper = soup.find('div', class_='team__card-wrapper')
if wrapper:
    img = wrapper.find('img')
    if img:
        img['class'] = img.get('class', []) + ['lottie-spin']
        img['style'] = "width: 80px; height: 80px;"

# 2. Update team__card-faces-wrapper to include image divs
faces = soup.find('div', class_='team__card-faces-wrapper')
if faces:
    faces.clear()
    faces['style'] = "display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-top: 3rem;"
    
    roles = ["Sr. Maritime Diver", "Sr. Marine Constructor", "Defence Liaison Officer", "Supply Chain Expert"]
    for role in roles:
        card = soup.new_tag('div')
        card['style'] = "background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); display: flex; flex-direction: column; border: 1px solid #eee;"
        
        img_placeholder = soup.new_tag('div')
        img_placeholder['style'] = "background-color: #f4f6f8; height: 200px; display: flex; align-items: center; justify-content: center; color: #999; font-size: 0.9rem; border-bottom: 4px solid var(--taj-blue-primary);"
        img_placeholder.string = "[Image Placeholder]"
        
        text_div = soup.new_tag('div')
        text_div['style'] = "padding: 20px; font-weight: bold; color: #333; text-align: center;"
        text_div.string = role
        
        card.append(img_placeholder)
        card.append(text_div)
        faces.append(card)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(str(soup))

print("Fixed the-team.html")
