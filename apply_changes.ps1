$baseDir = "c:\Downloaded Web Sites\metisaerospace.com"

# 1. Grab navbar from index.htm
$indexContent = [System.IO.File]::ReadAllText((Join-Path $baseDir "index.htm"))
$navMatch = [regex]::Match($indexContent, '(?s)(<div class="navbar-wrapper">.*?)<div class="main">')
if (-not $navMatch.Success) {
    Write-Host "Could not find navbar in index.htm"
    exit 1
}
$baseNavbar = $navMatch.Groups[1].Value

# 2. Grab footer template (we'll just skip footer update since it was already done, but let's do it if needed)
# Actually, we just need to fix navbar, hero, and feature sections.
$featureTemplate = @"
                    <div class="expertise__solutions-wrapper">
                        <div class="solutions__card-content">
                            <div class="solutions__card-img-wrapper flexbox"><img
                                    src="../6893263d1e27013b67b77d36/689472a143e469fbaf8a6136_Union.svg" loading="lazy"
                                    alt="">
                                <div class="colour__dark">
                                    <p class="text-style-bold-no-caps">{description}</p>
                                </div>
                                <div style="background-image:url(`"../6894797e8f5bfe4f60e90a52/6895c1b584fd9b7ed4a937d7_commericial.webp`")"
                                    class="home__card-img-copy"></div>
                            </div>
                            <div class="solution__features-wrapper">
                                <div class="solutions__features-item">
                                    <div class="solutions__arrow-text-wrapper"><img
                                            src="../6893263d1e27013b67b77d36/6895d0fdc948e87097c0f87e_left%20arrow.svg"
                                            loading="lazy" alt="" class="arrow__accreditations">
                                        <p class="text-style-card-heading">{f1_title}</p>
                                    </div>
                                    <p class="mb-0">{f1_desc}</p>
                                </div>
                                <div class="solutions__features-item">
                                    <div class="solutions__arrow-text-wrapper"><img
                                            src="../6893263d1e27013b67b77d36/6895d0fdc948e87097c0f87e_left%20arrow.svg"
                                            loading="lazy" alt="" class="arrow__accreditations">
                                        <p class="text-style-card-heading">{f2_title}</p>
                                    </div>
                                    <p class="mb-0">{f2_desc}</p>
                                </div>
                                <div class="solutions__features-item">
                                    <div class="solutions__arrow-text-wrapper"><img
                                            src="../6893263d1e27013b67b77d36/6895d0fdc948e87097c0f87e_left%20arrow.svg"
                                            loading="lazy" alt="" class="arrow__accreditations">
                                        <p class="text-style-card-heading">{f3_title}</p>
                                    </div>
                                    <p class="mb-0">{f3_desc}</p>
                                </div>
                                <div class="solutions__features-item">
                                    <div class="solutions__arrow-text-wrapper"><img
                                            src="../6893263d1e27013b67b77d36/6895d0fdc948e87097c0f87e_left%20arrow.svg"
                                            loading="lazy" alt="" class="arrow__accreditations">
                                        <p class="text-style-card-heading">{f4_title}</p>
                                    </div>
                                    <p class="mb-0">{f4_desc}</p>
                                </div>
                            </div>
                        </div>
                    </div>
"@

$featuresData = @{
    "strategic-advisory.html" = @{
        "description" = "Expert guidance that cuts through complexity, delivering strategic foresight and operational excellence to safeguard your competitive advantage.";
        "f1_title" = "Actionable Insights"; "f1_desc" = "We translate complex data into clear, strategic roadmaps tailored to your unique objectives.";
        "f2_title" = "Risk Mitigation"; "f2_desc" = "Proactively identify and neutralize potential threats before they impact your operations.";
        "f3_title" = "Market Positioning"; "f3_desc" = "Leverage our deep industry expertise to secure a dominant position in your sector.";
        "f4_title" = "End-to-End Support"; "f4_desc" = "From initial planning to long-term execution, we stand by you every step of the way."
    };
    "logistics-supply-chain.html" = @{
        "description" = "Optimized logistics and supply chain strategies designed to enhance resilience, reduce costs, and ensure uninterrupted operations.";
        "f1_title" = "Resilient Networks"; "f1_desc" = "Build supply chains capable of withstanding global disruptions and local challenges.";
        "f2_title" = "Cost Efficiency"; "f2_desc" = "Streamline operations to significantly reduce overhead while maintaining high performance.";
        "f3_title" = "Real-Time Tracking"; "f3_desc" = "Implement advanced monitoring for complete visibility across your entire logistics network.";
        "f4_title" = "Scalable Solutions"; "f4_desc" = "Adapt seamlessly to growing demands with highly scalable supply chain frameworks."
    };
    "procurement-contract-management.html" = @{
        "description" = "Streamlined procurement and robust contract management ensuring compliance, value maximization, and strategic vendor alignment.";
        "f1_title" = "Vendor Optimization"; "f1_desc" = "Identify and partner with top-tier suppliers to guarantee quality and reliability.";
        "f2_title" = "Compliance Assurance"; "f2_desc" = "Ensure all contracts meet stringent regulatory and organizational standards.";
        "f3_title" = "Cost Savings"; "f3_desc" = "Negotiate better terms and streamline purchasing to drive significant cost reductions.";
        "f4_title" = "Lifecycle Management"; "f4_desc" = "Comprehensive oversight from contract creation to renewal and closeout."
    };
    "gem-advisory.html" = @{
        "description" = "Navigate government e-marketplaces with ease, leveraging our expertise for successful bidding and compliance management.";
        "f1_title" = "Seamless Registration"; "f1_desc" = "Hassle-free onboarding and profile optimization on the GeM portal.";
        "f2_title" = "Bid Management"; "f2_desc" = "Expert assistance in preparing, submitting, and winning complex government tenders.";
        "f3_title" = "Regulatory Compliance"; "f3_desc" = "Stay fully compliant with evolving government procurement rules and guidelines.";
        "f4_title" = "Performance Tracking"; "f4_desc" = "Monitor your success rates and optimize future bidding strategies."
    };
    "warehouse-management.html" = @{
        "description" = "Advanced warehouse optimization techniques that maximize space utilization, improve throughput, and enhance inventory accuracy.";
        "f1_title" = "Space Optimization"; "f1_desc" = "Intelligent layouts designed to maximize storage capacity and operational flow.";
        "f2_title" = "Inventory Control"; "f2_desc" = "Implement precise tracking systems to eliminate stockouts and reduce excess inventory.";
        "f3_title" = "Process Automation"; "f3_desc" = "Integrate cutting-edge technologies to streamline picking, packing, and shipping.";
        "f4_title" = "Workforce Efficiency"; "f4_desc" = "Equip your team with the tools and processes needed to operate at peak productivity."
    };
    "human-capital-workforce.html" = @{
        "description" = "Data-driven workforce analytics and human capital strategies to attract, retain, and develop top industry talent.";
        "f1_title" = "Talent Acquisition"; "f1_desc" = "Identify and recruit the specific skills needed to drive your organization forward.";
        "f2_title" = "Performance Analytics"; "f2_desc" = "Utilize data to measure, understand, and enhance employee productivity.";
        "f3_title" = "Skill Development"; "f3_desc" = "Targeted training programs to ensure your workforce remains at the cutting edge.";
        "f4_title" = "Retention Strategies"; "f4_desc" = "Create an engaging environment that keeps your most valuable assets on board."
    };
    "outsourced-business-management.html" = @{
        "description" = "Comprehensive outsourced management solutions allowing you to focus on core competencies while we handle operational complexities.";
        "f1_title" = "Operational Focus"; "f1_desc" = "Free up internal resources by delegating day-to-day management to our experts.";
        "f2_title" = "Scalable Resources"; "f2_desc" = "Easily adjust management support to align with your business growth and fluctuations.";
        "f3_title" = "Expert Oversight"; "f3_desc" = "Benefit from seasoned professionals managing your critical business functions.";
        "f4_title" = "Seamless Integration"; "f4_desc" = "Our teams blend perfectly with your corporate culture and operational goals."
    };
    "marine-aqua-tourism.html" = @{
        "description" = "Specialized consulting for marine and aqua tourism, balancing exceptional visitor experiences with environmental sustainability.";
        "f1_title" = "Sustainable Practices"; "f1_desc" = "Develop tourism models that protect and preserve delicate marine ecosystems.";
        "f2_title" = "Experience Design"; "f2_desc" = "Create unforgettable, safe, and engaging experiences for tourists.";
        "f3_title" = "Regulatory Navigation"; "f3_desc" = "Expert guidance through complex maritime and environmental regulations.";
        "f4_title" = "Infrastructure Planning"; "f4_desc" = "Strategic development of facilities to support high-quality marine tourism."
    };
    "technology-transfer.html" = @{
        "description" = "Facilitating seamless technology transfer and Make in India initiatives to drive localized innovation and manufacturing.";
        "f1_title" = "Strategic Partnerships"; "f1_desc" = "Connect with global and local leaders to enable smooth technology transitions.";
        "f2_title" = "IP Protection"; "f2_desc" = "Ensure your intellectual property remains secure throughout the transfer process.";
        "f3_title" = "Localization Strategy"; "f3_desc" = "Tailor international technologies to thrive within the Indian manufacturing ecosystem.";
        "f4_title" = "Implementation Support"; "f4_desc" = "Comprehensive guidance from initial agreement to final production rollout."
    };
    "strategic-liaison.html" = @{
        "description" = "Building powerful connections through strategic liaison, ensuring your voice is heard by key stakeholders and decision-makers.";
        "f1_title" = "Stakeholder Mapping"; "f1_desc" = "Identify and prioritize the key individuals and organizations vital to your success.";
        "f2_title" = "Effective Communication"; "f2_desc" = "Craft and deliver compelling messages that resonate with critical audiences.";
        "f3_title" = "Relationship Building"; "f3_desc" = "Foster long-term, mutually beneficial connections with industry and government leaders.";
        "f4_title" = "Crisis Management"; "f4_desc" = "Rapidly deploy established networks to address and mitigate unexpected challenges."
    };
    "field-trial-management.html" = @{
        "description" = "Rigorous field trial management ensuring your technologies are tested, validated, and proven under real-world conditions.";
        "f1_title" = "Test Design"; "f1_desc" = "Develop comprehensive testing protocols that challenge systems to their limits.";
        "f2_title" = "Data Collection"; "f2_desc" = "Implement robust methodologies for capturing accurate and actionable trial data.";
        "f3_title" = "Regulatory Approval"; "f3_desc" = "Ensure all trials meet the necessary standards for official certification.";
        "f4_title" = "Performance Analysis"; "f4_desc" = "Detailed reporting to identify strengths and areas for immediate improvement."
    };
    "specification-review.html" = @{
        "description" = "Meticulous specification review to guarantee your projects meet exact requirements, standards, and performance criteria.";
        "f1_title" = "Detail Orientation"; "f1_desc" = "Exhaustive analysis of all technical specifications to prevent costly oversights.";
        "f2_title" = "Standardization"; "f2_desc" = "Align your specifications with national and international industry standards.";
        "f3_title" = "Feasibility Assessment"; "f3_desc" = "Evaluate the practical viability of proposed specifications before implementation.";
        "f4_title" = "Quality Assurance"; "f4_desc" = "Establish a strong foundation for delivering high-quality, reliable end products."
    }
}

$titlesMapping = @{
    "strategic-advisory.html" = "Strategic Advisory";
    "logistics-supply-chain.html" = "Supply Chain Consulting";
    "procurement-contract-management.html" = "Procurement Management";
    "gem-advisory.html" = "GeM Advisory";
    "warehouse-management.html" = "Warehouse Optimization";
    "human-capital-workforce.html" = "Workforce Analytics";
    "outsourced-business-management.html" = "Business Management";
    "marine-aqua-tourism.html" = "Marine Tourism";
    "technology-transfer.html" = "Technology Transfer";
    "strategic-liaison.html" = "Strategic Liaison";
    "field-trial-management.html" = "Field Trial Management";
    "specification-review.html" = "Specification Review"
}

$files = Get-ChildItem -Path $baseDir -Recurse -Filter "*.html" | Where-Object { $_.FullName -notmatch "\\node_modules\\" -and $_.FullName -notmatch "\\\.gemini\\" }

foreach ($f in $files) {
    $content = [System.IO.File]::ReadAllText($f.FullName)
    $original = $content
    $relPath = $f.FullName.Substring($baseDir.Length).TrimStart('\')
    $depth = ($relPath -split '\\').Count - 1
    $prefix = ""
    for ($i=0; $i -lt $depth; $i++) { $prefix += "../" }
    
    # --- NAVBAR ---
    if ($relPath -ne "index.htm") {
        # fix base navbar links
        $newNav = [regex]::Replace($baseNavbar, '(?s)(href|src)="([^"]+)"', {
            param($m)
            $attr = $m.Groups[1].Value
            $val = $m.Groups[2].Value
            if ($val -match "^(http|#|mailto:|tel:|\.\./|/)") { return $m.Value }
            return "$attr=`"$prefix$val`""
        })
        $newNav = $newNav.Replace('href="../index.htm" aria-current="page" class="logo-link w-nav-brand w--current"', 'href="../index.htm" class="logo-link w-nav-brand"')
        $newNav = $newNav + '<div class="main">'
        $content = [regex]::Replace($content, '(?s)<div class="navbar-wrapper">.*?<div class="main">', $newNav)
    }
    
    # --- SECTOR SPECIFIC ---
    if ($depth -gt 0 -and $relPath -match "sector") {
        $filename = $f.Name
        if ($featuresData.ContainsKey($filename)) {
            $data = $featuresData[$filename]
            $fHtml = $featureTemplate -replace '\{description\}', $data['description']
            $fHtml = $fHtml -replace '\{f1_title\}', $data['f1_title'] -replace '\{f1_desc\}', $data['f1_desc']
            $fHtml = $fHtml -replace '\{f2_title\}', $data['f2_title'] -replace '\{f2_desc\}', $data['f2_desc']
            $fHtml = $fHtml -replace '\{f3_title\}', $data['f3_title'] -replace '\{f3_desc\}', $data['f3_desc']
            $fHtml = $fHtml -replace '\{f4_title\}', $data['f4_title'] -replace '\{f4_desc\}', $data['f4_desc']
            
            # Clean ALL old feature sections
            $content = [regex]::Replace($content, '(?s)<div class="expertise__solutions-wrapper">.*?<div class="spacer__main"></div>\s*', '')
            
            # Inject new one ONCE before expertise-solutions__content
            $content = [regex]::Replace($content, '(?s)(<div [^>]*class="expertise-solutions__content">)', "$fHtml`r`n                    <div class=`"spacer__main`"></div>`r`n                    `$1")
        }
        
        if ($titlesMapping.ContainsKey($filename)) {
            $title = $titlesMapping[$filename]
            # Hero Subheading
            $content = [regex]::Replace($content, '(?s)(<p[^>]*class="text-style-solution-subheading"[^>]*>).*?(</p>)', "`${1}Our Services`${2}")
            # Hero Title
            $content = [regex]::Replace($content, '(?s)(<h1[^>]*>).*?(</h1>)', "`${1}${title}`${2}")
        }
    }
    
    if ($content -cne $original) {
        [System.IO.File]::WriteAllText($f.FullName, $content, [System.Text.Encoding]::UTF8)
        Write-Host "Updated $relPath"
    }
}
Write-Host "Done"
