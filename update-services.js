const fs = require('fs');
const path = require('path');

const services = {
  "human-capital-workforce.html": {
    name: "Human Capital & Workforce Analytics",
    mainContent: `                                <p><strong>Strengthen Workforce Performance Through Strategic Human Capital Solutions</strong></p>
                                <p>THALAKASHJAL provides Human Capital and Workforce Analytics services that help organizations improve workforce planning, productivity, and organizational capability. Our consulting approach enables businesses to align human resources with operational objectives while strengthening long-term organizational performance.</p>
                                <p>We support organizations through workforce planning, competency mapping, skill-gap assessments, and human resource analytics. By identifying capability gaps and improving workforce utilization, we help organizations build efficient teams capable of meeting evolving operational demands.</p>
                                <p>Our services also include leadership development, productivity measurement, and structured training programs designed to enhance employee capabilities and organizational effectiveness. Every solution is tailored to improve workforce performance while supporting sustainable business growth.</p>
                                <p>Combining operational discipline with strategic workforce planning, THALAKASHJAL helps organizations develop capable teams that contribute to operational excellence and long-term success.</p>`,
    benefits: [
      { title: "Workforce Planning", text: "Develop structured workforce plans that align human resources with business goals and operational requirements." },
      { title: "HR Analytics", text: "Utilize workforce analytics to improve productivity, resource allocation, and organizational decision-making." },
      { title: "Leadership Development", text: "Strengthen leadership capabilities through competency mapping, training, and capability enhancement programs." },
      { title: "Performance Improvement", text: "Improve workforce efficiency through skill-gap assessments, productivity measurement, and strategic planning." }
    ]
  },
  "outsourced-business-management.html": {
    name: "Outsourced Business Management Services",
    mainContent: `                                <p><strong>Comprehensive Business Management For Sustainable Growth</strong></p>
                                <p>THALAKASHJAL serves as a strategic business management partner for small and medium enterprises by managing key operational functions that support business continuity, efficiency, and long-term growth. Our consulting services enable organizations to focus on core business objectives while improving operational performance.</p>
                                <p>We provide support across operations management, procurement management, vendor coordination, supply chain management, compliance management, and project support. Through structured business processes, we help organizations improve operational efficiency and reduce administrative complexity.</p>
                                <p>Our expertise also extends to business process improvement, business development, growth planning, expansion strategies, and marketing support, including social media initiatives. Every solution is designed to strengthen organizational capability and business performance.</p>
                                <p>By combining practical management expertise with strategic planning, THALAKASHJAL delivers measurable business improvements that support sustainable organizational success.</p>`,
    benefits: [
      { title: "Operations Management", text: "Improve operational performance through structured management, planning, and business process optimization." },
      { title: "Vendor Coordination", text: "Strengthen procurement, vendor relationships, and supply chain coordination for efficient business operations." },
      { title: "Compliance Support", text: "Manage compliance requirements while improving operational control and organizational accountability." },
      { title: "Business Growth", text: "Support expansion, business development, and strategic growth through practical management solutions." }
    ]
  },
  "marine-aqua-tourism.html": {
    name: "Marine & Aqua Tourism Development",
    mainContent: `                                <p><strong>Sustainable Marine & Coastal Tourism Development Solutions</strong></p>
                                <p>THALAKASHJAL supports the development of sustainable marine, coastal, inland-water, and aqua tourism projects through strategic planning and professional advisory services. Our expertise helps organizations develop tourism initiatives that balance economic growth with operational sustainability.</p>
                                <p>We assist clients with tourism project planning, feasibility studies, viability assessments, and detailed project reports (DPRs). Our consultants also provide procurement advisory, maritime safety guidance, and project planning support to ensure successful implementation.</p>
                                <p>Our services include facilitating public-private partnerships, coastal tourism development, inland tourism initiatives, and sustainable operational planning. Every project is developed with a focus on efficiency, safety, and long-term value creation.</p>
                                <p>With a structured consulting approach, THALAKASHJAL helps organizations establish tourism projects that contribute to regional development and sustainable economic growth.</p>`,
    benefits: [
      { title: "Tourism Planning", text: "Develop structured tourism projects supported by feasibility studies and strategic implementation planning." },
      { title: "Maritime Advisory", text: "Receive expert guidance on maritime safety, coastal development, and tourism infrastructure planning." },
      { title: "Project Development", text: "Prepare detailed project reports and procurement strategies for successful project execution." },
      { title: "Sustainable Growth", text: "Promote environmentally responsible tourism through sustainable planning and operational excellence." }
    ]
  },
  "technology-transfer.html": {
    name: "Technology Transfer (ToT) & Make in India Facilitation",
    mainContent: `                                <p><strong>Accelerating Technology Transfer & Indigenous Manufacturing</strong></p>
                                <p>THALAKASHJAL facilitates Technology Transfer (ToT) and Make in India initiatives by supporting organizations in introducing advanced technologies while promoting indigenous capability development. Our consulting services help businesses establish strategic partnerships and strengthen manufacturing ecosystems.</p>
                                <p>We assist organizations with localization strategies, technology commercialization, identification of Indian manufacturing partners, and joint venture or joint development opportunities. Every engagement is aligned with national manufacturing objectives and long-term business growth.</p>
                                <p>Our consultants also facilitate strategic alliances, project implementation, and Atmanirbhar Bharat initiatives that encourage technology adoption and domestic capability enhancement. We help bridge the gap between global innovation and Indian manufacturing.</p>
                                <p>Through practical advisory and institutional engagement, THALAKASHJAL enables organizations to successfully implement technology-driven projects that support industrial development and national self-reliance.</p>`,
    benefits: [
      { title: "Technology Transfer", text: "Facilitate successful Technology Transfer projects that support innovation and industrial capability development." },
      { title: "Make in India", text: "Support localization, indigenous manufacturing, and national capability enhancement initiatives." },
      { title: "Strategic Alliances", text: "Develop partnerships through joint ventures, technology collaboration, and manufacturing partnerships." },
      { title: "Commercialization", text: "Transform innovative technologies into practical business opportunities through structured implementation." }
    ]
  },
  "strategic-liaison.html": {
    name: "Strategic Liaison & Institutional Engagement",
    mainContent: `                                <p><strong>Building Strong Industry & Government Partnerships</strong></p>
                                <p>THALAKASHJAL provides Strategic Liaison and Institutional Engagement services that strengthen collaboration between industry, government agencies, procurement organizations, technology providers, and user institutions. Our advisory approach supports effective stakeholder engagement and long-term strategic relationships.</p>
                                <p>We assist organizations with stakeholder mapping, capability alignment, product positioning, and industry-government interface facilitation. Our consultants also provide market intelligence and strategic guidance that improve institutional engagement and business opportunities.</p>
                                <p>Through structured relationship management, demonstration facilitation, and evaluation support, we help organizations communicate their capabilities effectively while strengthening procurement readiness and institutional credibility.</p>
                                <p>Our consulting services enable organizations to establish productive partnerships that contribute to sustainable business development and operational success.</p>`,
    benefits: [
      { title: "Stakeholder Engagement", text: "Build effective relationships with government agencies, procurement bodies, and industry stakeholders." },
      { title: "Market Intelligence", text: "Strengthen business decisions through strategic market analysis and institutional insights." },
      { title: "Product Positioning", text: "Improve organizational visibility through capability alignment and strategic positioning support." },
      { title: "Relationship Management", text: "Develop long-term institutional partnerships that support sustainable organizational growth." }
    ]
  },
  "field-trial-management.html": {
    name: "Procurement Advocacy, Specifications & Field Trial Management",
    mainContent: `                                <p><strong>Align Products With Government Procurement Requirements</strong></p>
                                <p>THALAKASHJAL supports organizations in aligning products and solutions with procurement requirements and operational expectations of end users. Our consulting services improve procurement readiness while strengthening product evaluation and field demonstration processes.</p>
                                <p>We assist organizations in understanding user requirements, specification alignment, product demonstrations, field trial coordination, and procurement opportunity identification. Our consultants help ensure products are effectively positioned for evaluation and institutional adoption.</p>
                                <p>Our expertise also includes capability presentation, procurement advocacy, and technology evaluation support that strengthen communication between organizations and procurement authorities.</p>
                                <p>By combining operational knowledge with procurement expertise, THALAKASHJAL enables organizations to improve product acceptance and procurement outcomes through structured advisory services.</p>`,
    benefits: [
      { title: "Requirement Analysis", text: "Understand procurement expectations and align products with operational user requirements." },
      { title: "Product Demonstration", text: "Coordinate demonstrations and field trials that support evaluation and procurement readiness." },
      { title: "Procurement Advocacy", text: "Strengthen product positioning through strategic capability presentation and procurement support." },
      { title: "Technology Evaluation", text: "Facilitate technical assessments that improve product acceptance and procurement opportunities." }
    ]
  },
  "specification-review.html": {
    name: "Technical & Commercial Specification Review",
    mainContent: `                                <p><strong>Independent Review For Transparent Government Procurement</strong></p>
                                <p>THALAKASHJAL provides independent technical and commercial specification review services that improve procurement quality, transparency, competition, and long-term operational value. Our structured review process supports organizations in developing procurement documents aligned with industry standards and operational requirements.</p>
                                <p>We conduct technical specification validation, commercial assessment, preparation and review of RFI, EOI, RFP, and tender documents, while providing vendor-neutral recommendations and technical due diligence. Every engagement focuses on improving procurement effectiveness and reducing operational risks.</p>
                                <p>Our consultants also assess trial methodologies, performance parameters, and procurement processes to strengthen evaluation quality and decision-making. The result is improved procurement transparency, enhanced competitiveness, and greater value for public expenditure.</p>
                                <p>Through objective review and practical recommendations, THALAKASHJAL helps organizations establish procurement frameworks that promote operational excellence and sustainable outcomes.</p>`,
    benefits: [
      { title: "Specification Review", text: "Validate technical and commercial specifications to improve procurement quality and compliance." },
      { title: "Tender Documentation", text: "Prepare and review RFI, EOI, RFP, and tender documents aligned with industry standards." },
      { title: "Technical Due Diligence", text: "Assess performance parameters, trial methodologies, and procurement processes objectively." },
      { title: "Better Procurement Outcomes", text: "Enhance transparency, reduce procurement risks, improve operational effectiveness, and promote innovative indigenous solutions." }
    ]
  }
};

const servicesDir = path.join(__dirname, 'services');

for (const [filename, data] of Object.entries(services)) {
  const filePath = path.join(servicesDir, filename);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    continue;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace Main Content
  const richtextRegex = /<div class="w-richtext">[\s\S]*?<\/div>\s*<\/div>\s*<div data-w-id=/;
  const newRichtext = `<div class="w-richtext">\n${data.mainContent}\n                            </div>\n                        </div>\n                        <div data-w-id=`;
  
  if (richtextRegex.test(content)) {
    content = content.replace(richtextRegex, newRichtext);
  } else {
    console.error(`Could not find w-richtext in ${filename}`);
  }

  // Replace Benefits
  const benefitsHtml = data.benefits.map(b => `                                <div class="solutions__features-item">
                                    <div class="solutions__arrow-text-wrapper"><img
                                            src="../6893263d1e27013b67b77d36/6895d0fdc948e87097c0f87e_left%20arrow.svg"
                                            loading="lazy" alt="" class="arrow__accreditations">
                                        <p class="text-style-card-heading">${b.title}</p>
                                    </div>
                                    <p class="mb-0">${b.text}</p>
                                </div>`).join('\n');

  const benefitsRegex = /<div class="solution__features-wrapper">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<div class="spacer__main"><\/div>/;
  const newBenefits = `<div class="solution__features-wrapper">\n${benefitsHtml}\n                            </div>\n                        </div>\n                    </div>\n                    <div class="spacer__main"></div>`;
  
  if (benefitsRegex.test(content)) {
    content = content.replace(benefitsRegex, newBenefits);
  } else {
    console.error(`Could not find solution__features-wrapper in ${filename}`);
  }

  // Replace form hidden input value
  const formInputRegex = /<input\s+name="Expertise Name"\s+value="[^"]*">/;
  const newFormInput = `<input name="Expertise Name" value="${data.name}">`;
  
  if (formInputRegex.test(content)) {
    content = content.replace(formInputRegex, newFormInput);
  } else {
    console.error(`Could not find form input Expertise Name in ${filename}`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Successfully updated ${filename}`);
}
