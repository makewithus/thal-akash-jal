import os
from bs4 import BeautifulSoup

filepath = 'the-team.html'
with open(filepath, 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f, 'html.parser')

# Change the logo
for img in soup.find_all('img'):
    if img.get('src') and 'Union.svg' in img['src']:
        img['src'] = img['src'].replace('689472a143e469fbaf8a6136_Union.svg', '689603cb18e8033a1b5ba383_innovation%20icon.svg')

# Change heading
h2 = soup.find('h2', string=lambda t: t and 'meet the people behind' in t.lower())
if h2:
    h2.string = "Our Fields of Expertise"

# Change paragraph
wrapper = soup.find('div', class_='team__card-wrapper')
if wrapper:
    p = wrapper.find('p')
    if p:
        p.string = "Writeup will be provided by Varun."

# Replace faces wrapper
faces = soup.find('div', class_='team__card-faces-wrapper')
if faces:
    faces.clear()
    faces['style'] = "display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-top: 3rem;"
    
    roles = ["Sr. Maritime Diver", "Sr. Marine Constructor", "Defence Liaison Officer", "Supply Chain Expert"]
    for role in roles:
        div = soup.new_tag('div')
        div['style'] = "background: #f4f6f8; padding: 20px; border-radius: 12px; border-left: 4px solid var(--taj-blue-primary); font-weight: bold; color: #333;"
        div.string = role
        faces.append(div)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(str(soup))
