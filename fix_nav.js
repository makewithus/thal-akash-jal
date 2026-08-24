const fs = require('fs');
const path = require('path');

const products = [
  { id: 'military-fuel-canister', name: 'Military Fuel Canister', icon: 'fuel' },
  { id: 'stackable-mobile-fuel-container', name: 'Stackable Mobile Fuel Container', icon: 'layers' },
  { id: 'mobile-fuel-storage-dispensing-unit', name: 'Mobile Fuel Storage & Dispensing Unit', icon: 'truck' },
  { id: 'iso-fuel-storage-container', name: 'ISO Fuel Storage Container', icon: 'box' },
  { id: 'mobile-fuel-skid-system', name: 'Mobile Fuel Skid System', icon: 'move' },
  { id: 'explosion-resistant-fuel-station', name: 'Explosion-Resistant Fuel Station', icon: 'shield-check' },
  { id: 'solar-powered-fuel-station', name: 'Solar-Powered Fuel Station', icon: 'sun' },
  { id: 'portable-fuel-storage-station', name: 'Portable Fuel Storage Station', icon: 'briefcase' }
];

function walkSync(currentDirPath, callback) {
  fs.readdirSync(currentDirPath).forEach(function (name) {
    var filePath = path.join(currentDirPath, name);
    if (name === 'node_modules' || name.startsWith('.')) return;
    var stat = fs.statSync(filePath);
    if (stat.isFile() && filePath.endsWith('.html')) {
      callback(filePath);
    } else if (stat.isDirectory()) {
      walkSync(filePath, callback);
    }
  });
}

walkSync('.', function (filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Check if we already injected Products (to avoid duplicates)
  if (content.indexOf('prod-desktop-dropdown') !== -1) {
    // Already patched Desktop
  } else {
    // Inject Desktop
    // Find: </nav>\s*</div>\s*(<a href="([^"]*)industries\.html")
    const dRegex = /(<\/nav>\s*<\/div>)(\s*<a href="[^"]*industries\.html")/i;
    const dMatch = content.match(dRegex);
    
    if (dMatch) {
      const depth = filePath.split(path.sep).length - 1;
      const prefix = depth === 0 ? '' : '../'.repeat(depth);
      
      let dProd = `
                <div data-delay="0" data-hover="false" data-w-id="prod-desktop-dropdown" class="nav__link dropdown w-dropdown">
                  <div class="dropdown-toggle dropdown w-dropdown-toggle">
                    <a href="${prefix}products.html" class="text-style-nav" style="text-decoration:none; color:inherit;">Products</a>
                    <img src="${prefix}6893263d1e27013b67b77d36/6894c2e13a69542f542191b0_white%20triangle%20down.svg" loading="lazy" alt="" class="nav__dropdown-triangle" style="padding-left:10px;">
                  </div>
                  <nav class="dropdown-list-3 w-dropdown-list">
                    <div class="megamenu__dropdown-wrapper">
                      <div class="megamenu__content">
                        <div class="megamenu__heading-wrapper">
                          <h2 class="megamenu__heading">Products</h2>
                          <div class="megamenu__divider"></div>
                        </div>
                        <div class="w-dyn-list">
                          <div role="list" class="megamenu__expertise-links w-dyn-items">`;
      
      for (let p of products) {
        dProd += `
                            <div role="listitem" class="w-dyn-item"><a href="${prefix}products/${p.id}.html" class="megamenu__link-item w-inline-block"><i data-lucide="${p.icon}" style="width: 18px; height: 18px; color: #e85d2a; flex-shrink: 0;"></i><p class="text-style-nav">${p.name}</p></a></div>`;
      }

      dProd += `
                          </div>
                        </div>
                      </div>
                    </div>
                  </nav>
                </div>`;
      
      content = content.replace(dRegex, `$1\n${dProd}$2`);
    }
  }

  // Inject Mobile
  if (content.indexOf('prod-mobile-dropdown') !== -1) {
    // Already patched Mobile
  } else {
    // Find: </nav>\s*</div>\s*</li>\s*(<li class="nav-list-item no-padding">\s*<a href="[^"]*industries\.html")
    const mRegex = /(<\/nav>\s*<\/div>\s*<\/li>)(\s*<li class="nav-list-item no-padding">\s*<a href="[^"]*industries\.html")/i;
    const mMatch = content.match(mRegex);
    
    if (mMatch) {
      const depth = filePath.split(path.sep).length - 1;
      const prefix = depth === 0 ? '' : '../'.repeat(depth);
      
      let mProd = `
                  <li class="nav-list-item no-padding prod-mobile-dropdown">
                    <div data-delay="0" data-hover="false" class="w-dropdown">
                      <div class="nav-dropdown-2 w-dropdown-toggle">
                        <a href="${prefix}products.html" class="text-style-nav" style="text-decoration:none; color:inherit;">Products</a>
                        <img src="${prefix}6893263d1e27013b67b77d36/6894c2e13a69542f542191b0_white%20triangle%20down.svg" loading="lazy" alt="" style="padding-left:10px;">
                      </div>
                      <nav class="dropdown-list-4 w-dropdown-list">
                        <div class="mobile__nav-dropdown-list w-dyn-list">
                          <div role="list" class="w-dyn-items">`;
                            
      for (let p of products) {
        mProd += `
                            <div role="listitem" class="w-dyn-item"><a href="${prefix}products/${p.id}.html" class="nav-link-3 bottom-border w-dropdown-link">${p.name}</a></div>`;
      }
      
      mProd += `
                          </div>
                        </div>
                      </nav>
                    </div>
                  </li>`;
      
      content = content.replace(mRegex, `$1\n${mProd}$2`);
    }
  }

  fs.writeFileSync(filePath, content);
  console.log('Processed:', filePath);
});
