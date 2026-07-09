import os

def remove_section(content):
    start_str = '<div data-w-id="c86b6532-3c73-7b34-50b2-1a619eefe413" class="expertise-solutions__content">'
    idx = content.find(start_str)
    if idx == -1:
        # Fallback to just class name if ID changed
        start_str2 = 'class="expertise-solutions__content"'
        idx2 = content.find(start_str2)
        if idx2 != -1:
            idx = content.rfind('<div', 0, idx2)
            
    if idx == -1:
        return content

    # Find the preceding spacer__main
    preceding_spacer = '<div class="spacer__main"></div>'
    idx_spacer = content.rfind(preceding_spacer, 0, idx)
    # Check if there is only whitespace between spacer and our div
    if idx_spacer != -1 and content[idx_spacer + len(preceding_spacer):idx].strip() == '':
        start_cut = idx_spacer
        # optionally include preceding whitespace of the spacer
        ws_idx = content.rfind('\n', 0, start_cut)
        if ws_idx != -1 and content[ws_idx:start_cut].strip() == '':
            start_cut = ws_idx + 1 # keep newline
    else:
        start_cut = idx

    # Now find the matching closing div for the start_str div
    count = 0
    i = idx
    end_cut = -1
    while i < len(content):
        next_open = content.find('<div', i)
        next_close = content.find('</div', i)
        
        if next_open == -1: next_open = len(content)
        if next_close == -1: next_close = len(content)
        
        if next_close == len(content):
            break
            
        if next_open < next_close:
            count += 1
            i = next_open + 4
        else:
            count -= 1
            i = next_close + 6
            if count == 0:
                end_cut = content.find('>', i - 6) + 1
                break
                
    if end_cut != -1:
        # eat trailing whitespace up to newline
        while end_cut < len(content) and content[end_cut] in ' \t\r':
            end_cut += 1
        if end_cut < len(content) and content[end_cut] == '\n':
            end_cut += 1
        return content[:start_cut] + content[end_cut:]
    return content

def update_links(content):
    # replace "sector/" with "services/"
    content = content.replace('"sector/', '"services/')
    content = content.replace('"/sector/', '"/services/')
    content = content.replace("'sector/", "'services/")
    content = content.replace("'/sector/", "'/services/")
    content = content.replace("../sector/", "../services/")
    # also update URLs ending with sector/
    content = content.replace("/sector.html", "/services.html")
    # if it's within a JSON or JS string
    return content

directory = r"c:\Downloaded Web Sites\metisaerospace.com"

# First, process the sector folder files to remove the section
sector_dir = os.path.join(directory, "sector")
if os.path.exists(sector_dir):
    for filename in os.listdir(sector_dir):
        if filename.endswith(".html") or filename.endswith(".htm"):
            filepath = os.path.join(sector_dir, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            new_content = remove_section(content)
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Removed section from {filename}")
                
# Now update links in ALL HTML/JS files
for root, dirs, files in os.walk(directory):
    for filename in files:
        if filename.endswith(('.html', '.htm', '.js')):
            filepath = os.path.join(root, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            new_content = update_links(content)
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated links in {os.path.relpath(filepath, directory)}")

# Finally, rename the sector folder to services
services_dir = os.path.join(directory, "services")
if os.path.exists(sector_dir):
    os.rename(sector_dir, services_dir)
    print("Renamed 'sector' directory to 'services'")
