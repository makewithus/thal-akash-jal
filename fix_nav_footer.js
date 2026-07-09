const fs = require('fs');
const path = require('path');

const baseDir = __dirname;

// ===========================
// CORRECT nav/footer blocks
// ===========================

const rootDesktopServices = `                           <div role="list" class="megamenu__expertise-links w-dyn-items">
                            <div role="listitem" class="w-dyn-item"><a data-w-id="cee4ea34-345f-c53b-c382-6e4c1d7919d7" href="services/strategic-advisory.html" class="megamenu__link-item w-inline-block"><img src="6893263d1e27013b67b77d36/689378e7cc9f5139e3ec255a_Polygon%2017.svg" loading="lazy" alt=""><p class="text-style-nav">Strategic Advisory</p></a></div>
                            <div role="listitem" class="w-dyn-item"><a data-w-id="cee4ea34-345f-c53b-c382-6e4c1d7919d7" href="services/logistics-supply-chain.html" class="megamenu__link-item w-inline-block"><img src="6893263d1e27013b67b77d36/689378e7cc9f5139e3ec255a_Polygon%2017.svg" loading="lazy" alt=""><p class="text-style-nav">Logistics &amp; Supply Chain</p></a></div>
                            <div role="listitem" class="w-dyn-item"><a data-w-id="cee4ea34-345f-c53b-c382-6e4c1d7919d7" href="services/procurement-contract-management.html" class="megamenu__link-item w-inline-block"><img src="6893263d1e27013b67b77d36/689378e7cc9f5139e3ec255a_Polygon%2017.svg" loading="lazy" alt=""><p class="text-style-nav">Procurement &amp; Contracts</p></a></div>
                            <div role="listitem" class="w-dyn-item"><a data-w-id="cee4ea34-345f-c53b-c382-6e4c1d7919d7" href="services/gem-advisory.html" class="megamenu__link-item w-inline-block"><img src="6893263d1e27013b67b77d36/689378e7cc9f5139e3ec255a_Polygon%2017.svg" loading="lazy" alt=""><p class="text-style-nav">GeM Advisory</p></a></div>
                            <div role="listitem" class="w-dyn-item"><a data-w-id="cee4ea34-345f-c53b-c382-6e4c1d7919d7" href="services/warehouse-management.html" class="megamenu__link-item w-inline-block"><img src="6893263d1e27013b67b77d36/689378e7cc9f5139e3ec255a_Polygon%2017.svg" loading="lazy" alt=""><p class="text-style-nav">Warehouse Management</p></a></div>
                            <div role="listitem" class="w-dyn-item"><a data-w-id="cee4ea34-345f-c53b-c382-6e4c1d7919d7" href="services/human-capital-workforce.html" class="megamenu__link-item w-inline-block"><img src="6893263d1e27013b67b77d36/689378e7cc9f5139e3ec255a_Polygon%2017.svg" loading="lazy" alt=""><p class="text-style-nav">Human Capital</p></a></div>
                            <div role="listitem" class="w-dyn-item"><a data-w-id="cee4ea34-345f-c53b-c382-6e4c1d7919d7" href="services/outsourced-business-management.html" class="megamenu__link-item w-inline-block"><img src="6893263d1e27013b67b77d36/689378e7cc9f5139e3ec255a_Polygon%2017.svg" loading="lazy" alt=""><p class="text-style-nav">Outsourced Business Mgmt</p></a></div>
                            <div role="listitem" class="w-dyn-item"><a data-w-id="cee4ea34-345f-c53b-c382-6e4c1d7919d7" href="services/marine-aqua-tourism.html" class="megamenu__link-item w-inline-block"><img src="6893263d1e27013b67b77d36/689378e7cc9f5139e3ec255a_Polygon%2017.svg" loading="lazy" alt=""><p class="text-style-nav">Marine &amp; Aqua Tourism</p></a></div>
                           </div>`;

const rootMobileServices = `                            <div role="list" class="mobile__nav-dropdown-list w-dyn-items">
                              <div role="listitem" class="w-dyn-item"><a href="services/strategic-advisory.html" class="nav-link-3 bottom-border w-dropdown-link">Strategic Advisory</a></div>
                              <div role="listitem" class="w-dyn-item"><a href="services/logistics-supply-chain.html" class="nav-link-3 bottom-border w-dropdown-link">Logistics &amp; Supply Chain</a></div>
                              <div role="listitem" class="w-dyn-item"><a href="services/procurement-contract-management.html" class="nav-link-3 bottom-border w-dropdown-link">Procurement &amp; Contracts</a></div>
                              <div role="listitem" class="w-dyn-item"><a href="services/gem-advisory.html" class="nav-link-3 bottom-border w-dropdown-link">GeM Advisory</a></div>
                              <div role="listitem" class="w-dyn-item"><a href="services/warehouse-management.html" class="nav-link-3 bottom-border w-dropdown-link">Warehouse Management</a></div>
                              <div role="listitem" class="w-dyn-item"><a href="services/human-capital-workforce.html" class="nav-link-3 bottom-border w-dropdown-link">Human Capital</a></div>
                              <div role="listitem" class="w-dyn-item"><a href="services/outsourced-business-management.html" class="nav-link-3 bottom-border w-dropdown-link">Outsourced Business Mgmt</a></div>
                              <div role="listitem" class="w-dyn-item"><a href="services/marine-aqua-tourism.html" class="nav-link-3 bottom-border w-dropdown-link">Marine &amp; Aqua Tourism</a></div>
                            </div>`;

const sectorDesktopServices = `                           <div role="list" class="megamenu__expertise-links w-dyn-items">
                            <div role="listitem" class="w-dyn-item"><a data-w-id="cee4ea34-345f-c53b-c382-6e4c1d7919d7" href="../services/strategic-advisory.html" class="megamenu__link-item w-inline-block"><img src="../6893263d1e27013b67b77d36/689378e7cc9f5139e3ec255a_Polygon%2017.svg" loading="lazy" alt=""><p class="text-style-nav">Strategic Advisory</p></a></div>
                            <div role="listitem" class="w-dyn-item"><a data-w-id="cee4ea34-345f-c53b-c382-6e4c1d7919d7" href="../services/logistics-supply-chain.html" class="megamenu__link-item w-inline-block"><img src="../6893263d1e27013b67b77d36/689378e7cc9f5139e3ec255a_Polygon%2017.svg" loading="lazy" alt=""><p class="text-style-nav">Logistics &amp; Supply Chain</p></a></div>
                            <div role="listitem" class="w-dyn-item"><a data-w-id="cee4ea34-345f-c53b-c382-6e4c1d7919d7" href="../services/procurement-contract-management.html" class="megamenu__link-item w-inline-block"><img src="../6893263d1e27013b67b77d36/689378e7cc9f5139e3ec255a_Polygon%2017.svg" loading="lazy" alt=""><p class="text-style-nav">Procurement &amp; Contracts</p></a></div>
                            <div role="listitem" class="w-dyn-item"><a data-w-id="cee4ea34-345f-c53b-c382-6e4c1d7919d7" href="../services/gem-advisory.html" class="megamenu__link-item w-inline-block"><img src="../6893263d1e27013b67b77d36/689378e7cc9f5139e3ec255a_Polygon%2017.svg" loading="lazy" alt=""><p class="text-style-nav">GeM Advisory</p></a></div>
                            <div role="listitem" class="w-dyn-item"><a data-w-id="cee4ea34-345f-c53b-c382-6e4c1d7919d7" href="../services/warehouse-management.html" class="megamenu__link-item w-inline-block"><img src="../6893263d1e27013b67b77d36/689378e7cc9f5139e3ec255a_Polygon%2017.svg" loading="lazy" alt=""><p class="text-style-nav">Warehouse Management</p></a></div>
                            <div role="listitem" class="w-dyn-item"><a data-w-id="cee4ea34-345f-c53b-c382-6e4c1d7919d7" href="../services/human-capital-workforce.html" class="megamenu__link-item w-inline-block"><img src="../6893263d1e27013b67b77d36/689378e7cc9f5139e3ec255a_Polygon%2017.svg" loading="lazy" alt=""><p class="text-style-nav">Human Capital</p></a></div>
                            <div role="listitem" class="w-dyn-item"><a data-w-id="cee4ea34-345f-c53b-c382-6e4c1d7919d7" href="../services/outsourced-business-management.html" class="megamenu__link-item w-inline-block"><img src="../6893263d1e27013b67b77d36/689378e7cc9f5139e3ec255a_Polygon%2017.svg" loading="lazy" alt=""><p class="text-style-nav">Outsourced Business Mgmt</p></a></div>
                            <div role="listitem" class="w-dyn-item"><a data-w-id="cee4ea34-345f-c53b-c382-6e4c1d7919d7" href="../services/marine-aqua-tourism.html" class="megamenu__link-item w-inline-block"><img src="../6893263d1e27013b67b77d36/689378e7cc9f5139e3ec255a_Polygon%2017.svg" loading="lazy" alt=""><p class="text-style-nav">Marine &amp; Aqua Tourism</p></a></div>
                           </div>`;

const sectorMobileServices = `                                                     <div role="list" class="mobile__nav-dropdown-list w-dyn-items">
                                                        <div role="listitem" class="w-dyn-item"><a href="../services/strategic-advisory.html" class="nav-link-3 bottom-border w-dropdown-link">Strategic Advisory</a></div>
                                                        <div role="listitem" class="w-dyn-item"><a href="../services/logistics-supply-chain.html" class="nav-link-3 bottom-border w-dropdown-link">Logistics &amp; Supply Chain</a></div>
                                                        <div role="listitem" class="w-dyn-item"><a href="../services/procurement-contract-management.html" class="nav-link-3 bottom-border w-dropdown-link">Procurement &amp; Contracts</a></div>
                                                        <div role="listitem" class="w-dyn-item"><a href="../services/gem-advisory.html" class="nav-link-3 bottom-border w-dropdown-link">GeM Advisory</a></div>
                                                        <div role="listitem" class="w-dyn-item"><a href="../services/warehouse-management.html" class="nav-link-3 bottom-border w-dropdown-link">Warehouse Management</a></div>
                                                        <div role="listitem" class="w-dyn-item"><a href="../services/human-capital-workforce.html" class="nav-link-3 bottom-border w-dropdown-link">Human Capital</a></div>
                                                        <div role="listitem" class="w-dyn-item"><a href="../services/outsourced-business-management.html" class="nav-link-3 bottom-border w-dropdown-link">Outsourced Business Mgmt</a></div>
                                                        <div role="listitem" class="w-dyn-item"><a href="../services/marine-aqua-tourism.html" class="nav-link-3 bottom-border w-dropdown-link">Marine &amp; Aqua Tourism</a></div>
                                                     </div>`;

const rootFooterServices = `                                    <div class="footer__heading-flexbox"><img
                                            src="6893263d1e27013b67b77d36/6894a9853735d270b7c293a4_blue%20triangle.svg"
                                            loading="lazy" alt="">
                                        <h3 class="my-0">Our Services</h3>
                                    </div>
                                    <div class="w-dyn-list">
                                        <div role="list" class="footer__link-list w-dyn-items">
                                            <div role="listitem" class="w-dyn-item"><a href="services/strategic-advisory.html">Strategic Advisory</a></div>
                                            <div role="listitem" class="w-dyn-item"><a href="services/logistics-supply-chain.html">Logistics &amp; Supply Chain</a></div>
                                            <div role="listitem" class="w-dyn-item"><a href="services/procurement-contract-management.html">Procurement &amp; Contracts</a></div>
                                            <div role="listitem" class="w-dyn-item"><a href="services/gem-advisory.html">GeM Advisory</a></div>
                                            <div role="listitem" class="w-dyn-item"><a href="services/warehouse-management.html">Warehouse Management</a></div>
                                            <div role="listitem" class="w-dyn-item"><a href="services/human-capital-workforce.html">Human Capital &amp; Workforce</a></div>
                                            <div role="listitem" class="w-dyn-item"><a href="services/outsourced-business-management.html">Outsourced Business Mgmt</a></div>
                                            <div role="listitem" class="w-dyn-item"><a href="services/marine-aqua-tourism.html">Marine &amp; Aqua Tourism</a></div>
                                        </div>
                                    </div>`;

const sectorFooterServices = `                                    <div class="footer__heading-flexbox"><img
                                            src="../6893263d1e27013b67b77d36/6894a9853735d270b7c293a4_blue%20triangle.svg"
                                            loading="lazy" alt="">
                                        <h3 class="my-0">Our Services</h3>
                                    </div>
                                    <div class="w-dyn-list">
                                        <div role="list" class="footer__link-list w-dyn-items">
                                            <div role="listitem" class="w-dyn-item"><a href="../services/strategic-advisory.html">Strategic Advisory</a></div>
                                            <div role="listitem" class="w-dyn-item"><a href="../services/logistics-supply-chain.html">Logistics &amp; Supply Chain</a></div>
                                            <div role="listitem" class="w-dyn-item"><a href="../services/procurement-contract-management.html">Procurement &amp; Contracts</a></div>
                                            <div role="listitem" class="w-dyn-item"><a href="../services/gem-advisory.html">GeM Advisory</a></div>
                                            <div role="listitem" class="w-dyn-item"><a href="../services/warehouse-management.html">Warehouse Management</a></div>
                                            <div role="listitem" class="w-dyn-item"><a href="../services/human-capital-workforce.html">Human Capital &amp; Workforce</a></div>
                                            <div role="listitem" class="w-dyn-item"><a href="../services/outsourced-business-management.html">Outsourced Business Mgmt</a></div>
                                            <div role="listitem" class="w-dyn-item"><a href="../services/marine-aqua-tourism.html">Marine &amp; Aqua Tourism</a></div>
                                        </div>
                                    </div>`;

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        if (['node_modules','npm','js','css','img','static'].includes(file)) return;
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(fullPath));
        } else if (file.endsWith('.html') || file.endsWith('.htm')) {
            results.push(fullPath);
        }
    });
    return results;
}

const htmlFiles = walk(baseDir);

htmlFiles.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    const relPath = filePath.substring(baseDir.length + 1);
    const depth = relPath.split(path.sep).length - 1;
    const isSubDir = depth > 0;
    const isSectorOrSimilar = isSubDir;

    const desktopServicesBlock = isSectorOrSimilar ? sectorDesktopServices : rootDesktopServices;
    const mobileServicesBlock = isSectorOrSimilar ? sectorMobileServices : rootMobileServices;
    const footerServicesBlock = isSectorOrSimilar ? sectorFooterServices : rootFooterServices;

    // Fix desktop nav
    content = content.replace(
        /<div role="list" class="megamenu__expertise-links w-dyn-items">[\s\S]*?<\/div>\s*<\/div>\s*\n?\s*<\/div>\s*\n?\s*<\/div>\s*\n?\s*<\/div>\s*\n?\s*<\/nav>\s*\n?\s*<\/div>/,
        desktopServicesBlock + `\n                        </div>\n                      </div>\n                    </div>\n                  </nav>\n                </div>`
    );

    // Fix mobile nav
    content = content.replace(
        /<div role="list" class="mobile__nav-dropdown-list w-dyn-items">[\s\S]*?<\/div>\s*\n?\s*<\/div>\s*\n?\s*<\/nav>/,
        mobileServicesBlock + `\n                        </div>\n                      </nav>`
    );

    // Fix footer: first remove the duplicate
    content = content.replace(
        /(<\/div>\s*<\/div>\s*<div class="footer__right-block-wrapper-down">[\s\S]*?)<h3 class="my-0">Services<\/h3>\s*<\/div>\s*\n?<div class="w-dyn-list">\s*\n?<div role="list" class="footer__link-list w-dyn-items">[\s\S]*?<\/div>\s*\n?<\/div>\s*\n?\s*(<\/div>\s*<\/div>)/,
        '$1$2'
    );

    // Replace the remaining footer block
    content = content.replace(
        /(<div class="footer__heading-flexbox">[\s\S]*?<h3 class="my-0">Our Services<\/h3>\s*<\/div>)[\s\S]*?(<\/div>\s*<\/div>\s*<div class="footer__divider-wrapper">|<\/div>\s*<div class="footer-right-block-item">)/,
        footerServicesBlock + '\n                                </div>\n                            $2'
    );

    content = content.replace(
        /(<div class="footer__heading-flexbox">[\s\S]*?<h3 class="my-0">Services<\/h3>\s*<\/div>)\s*\n?<div class="w-dyn-list">\s*\n?<div role="list" class="footer__link-list w-dyn-items">[\s\S]*?<\/div>\s*\n?<\/div>/,
        footerServicesBlock
    );

    // Fix any remaining broken HTML closing tags where "Talk to Us" ended up outside navbar
    // Our previous script might have replaced too much in the mobile nav block.
    // If the contact block is orphaned, let's fix it by carefully checking the dom if needed.

    if (content !== original) {
        fs.writeFileSync(filePath, content);
        console.log('Fixed:', relPath);
    }
});
