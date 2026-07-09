import glob

for f in glob.glob('services/*.html'):
    try:
        with open(f, 'r', encoding='utf-8') as file:
            content = file.read()
            
        old_str = 'style="background-image:url("../6894797e8f5bfe4f60e90a52/6895c1b584fd9b7ed4a937d7_commericial.webp")"'
        new_str = "style=\"background-image:url('../6894797e8f5bfe4f60e90a52/6895c1b584fd9b7ed4a937d7_commericial.webp')\""
        
        if old_str in content:
            content = content.replace(old_str, new_str)
            with open(f, 'w', encoding='utf-8') as file:
                file.write(content)
            print(f"Fixed {f}")
    except Exception as e:
        print(f"Error on {f}: {e}")
