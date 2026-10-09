import os
import re

css = """
/* Custom Radar Animation */
.custom-radar-wrapper {
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-bottom: 20px;
  background: radial-gradient(circle, rgba(24, 25, 52, 0.05) 0%, transparent 70%);
}

.radar-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(24, 25, 52, 0.15);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.radar-ring-1 { width: 100%; height: 100%; }
.radar-ring-2 { width: 75%; height: 75%; border-style: dashed; }
.radar-ring-3 { width: 45%; height: 45%; }

.radar-sweep {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: conic-gradient(from 0deg, transparent 60%, rgba(24, 25, 52, 0.15) 90%, rgba(24, 25, 52, 0.5) 100%);
  animation: radar-sweep-spin 3s linear infinite;
}

@keyframes radar-sweep-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.radar-dot {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #ef4444; /* red accent */
  top: 20%;
  right: 25%;
  animation: radar-blink 3s infinite;
}
.radar-dot-2 {
  background-color: #3b82f6; /* blue accent */
  bottom: 25%;
  left: 20%;
  animation: radar-blink 3s infinite 1.5s;
}

@keyframes radar-blink {
  0%, 40%, 100% { opacity: 0.2; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.5); }
}

.custom-radar-wrapper img {
  position: relative;
  z-index: 10;
  width: 55px;
  height: 55px;
}
"""

with open("about-us-theme.css", "a") as f:
    f.write("\n" + css)

radar_html = """<div class="custom-radar-wrapper">
                <div class="radar-ring radar-ring-1"></div>
                <div class="radar-ring radar-ring-2"></div>
                <div class="radar-ring radar-ring-3"></div>
                <div class="radar-sweep"></div>
                <div class="radar-dot"></div>
                <div class="radar-dot radar-dot-2"></div>
                <img src="6893263d1e27013b67b77d36/689472a143e469fbaf8a6136_Union.svg" loading="lazy" alt="">
              </div>"""

for filepath in ["careers.html", "the-team.html"]:
    with open(filepath, "r") as f:
        content = f.read()
    
    # Replace the img tag for Radar_4_Dark.svg with the new radar_html
    pattern = r'<img[^>]*src="[^"]*Radar_4_Dark\.svg"[^>]*>'
    content = re.sub(pattern, radar_html, content)
    
    with open(filepath, "w") as f:
        f.write(content)

print("Updated radar!")
