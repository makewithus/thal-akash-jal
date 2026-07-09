const fs = require('fs');
const path = require('path');

const baseDir = __dirname;
const siteUrl = 'https://www.thalakashjal.com';
const logoUrl = `${siteUrl}/img/taj-logo.png`;

const pages = [
  {
    file: 'index.htm',
    title: 'Defence Consulting & Strategic Advisory | THAL AKASH JAL',
    desc: 'THAL AKASH JAL Defence Technologies Pvt. Ltd. delivers expert defence consulting, strategic advisory, and government procurement services across India.',
    type: 'Organization',
    schemaType: 'Organization'
  },
  {
    file: 'about-us.html',
    title: 'About THAL AKASH JAL | Defence Technology Consulting',
    desc: 'Learn about THAL AKASH JAL Defence Technologies Pvt. Ltd., your trusted partner for Atmanirbhar Bharat initiatives and corporate strategic planning.',
    type: 'Organization',
    schemaType: 'Organization'
  },
  {
    file: 'contact.html',
    title: 'Contact THAL AKASH JAL | Defence Procurement Advisory',
    desc: 'Get in touch with THAL AKASH JAL Defence Technologies Pvt. Ltd. for expert consulting in supply chain, GeM advisory, and government liaison.',
    type: 'ContactPage',
    schemaType: 'ContactPage'
  },
  {
    file: 'services/strategic-advisory.html',
    title: 'Strategic Advisory Services | THAL AKASH JAL',
    desc: 'Accelerate your business growth with our strategic advisory services. We offer operational excellence and business strategy consulting for MSMEs.',
    type: 'Service',
    schemaType: 'Service'
  },
  {
    file: 'services/logistics-supply-chain.html',
    title: 'Logistics & Supply Chain Consulting | THAL AKASH JAL',
    desc: 'Optimize your supply chain networks and transportation planning with THAL AKASH JAL. We provide advanced logistics consulting for industrial growth.',
    type: 'Service',
    schemaType: 'Service'
  },
  {
    file: 'services/procurement-contract-management.html',
    title: 'Government Procurement Consulting | THAL AKASH JAL',
    desc: 'Master public procurement with THAL AKASH JAL. Our contract management and tender consultancy services ensure compliance and strategic advantage.',
    type: 'Service',
    schemaType: 'Service'
  },
  {
    file: 'services/gem-advisory.html',
    title: 'GeM Advisory & Registration Support | THAL AKASH JAL',
    desc: 'Navigate the Government e-Marketplace seamlessly. THAL AKASH JAL provides comprehensive GeM advisory, onboarding, and vendor management services.',
    type: 'Service',
    schemaType: 'Service'
  },
  {
    file: 'services/warehouse-management.html',
    title: 'Warehouse Management & Optimization | THAL AKASH JAL',
    desc: 'Improve inventory management and operations with our warehouse optimization services. We deliver strategic solutions for distribution efficiency.',
    type: 'Service',
    schemaType: 'Service'
  },
  {
    file: 'services/human-capital-workforce.html',
    title: 'Human Capital Consulting & Analytics | THAL AKASH JAL',
    desc: 'Enhance organizational capability with our workforce analytics and human capital consulting. THAL AKASH JAL drives leadership development.',
    type: 'Service',
    schemaType: 'Service'
  },
  {
    file: 'services/outsourced-business-management.html',
    title: 'Outsourced Business Management Services | THAL AKASH JAL',
    desc: 'Scale efficiently with outsourced business management. THAL AKASH JAL offers operational support and business process improvement for startups.',
    type: 'Service',
    schemaType: 'Service'
  },
  {
    file: 'services/marine-aqua-tourism.html',
    title: 'Marine & Aqua Tourism Development | THAL AKASH JAL',
    desc: 'Unlock the potential of coastal infrastructure with THAL AKASH JAL. We provide specialized consulting for marine tourism and aqua development.',
    type: 'Service',
    schemaType: 'Service'
  },
  {
    file: 'services/technology-transfer.html',
    title: 'Technology Transfer (ToT) Consulting | THAL AKASH JAL',
    desc: 'Drive indigenous manufacturing with our Technology Transfer (ToT) services. THAL AKASH JAL facilitates Make in India consulting and joint ventures.',
    type: 'Service',
    schemaType: 'Service'
  },
  {
    file: 'services/strategic-liaison.html',
    title: 'Strategic Liaison & Engagement | THAL AKASH JAL',
    desc: 'Strengthen stakeholder engagement with THAL AKASH JAL. We specialize in government liaison, institutional partnerships, and strategic networking.',
    type: 'Service',
    schemaType: 'Service'
  },
  {
    file: 'services/field-trial-management.html',
    title: 'Procurement Advocacy & Field Trials | THAL AKASH JAL',
    desc: 'Ensure product acceptance with our procurement advocacy and field trial management. We align defence technologies with government expectations.',
    type: 'Service',
    schemaType: 'Service'
  },
  {
    file: 'services/specification-review.html',
    title: 'Technical Specification Review | THAL AKASH JAL',
    desc: 'Improve procurement transparency with THAL AKASH JAL. We offer objective technical and commercial specification reviews for RFI and RFP processes.',
    type: 'Service',
    schemaType: 'Service'
  }
];

function generateHeadContent(page) {
  const ogImage = "https://cdn.prod.website-files.com/6893263d1e27013b67b77d36/68b5be2b52edd4499ad3f9f1_og_image.webp";
  const canonicalUrl = page.file === 'index.htm' ? siteUrl : `${siteUrl}/${page.file.replace('.html', '')}`;

  let jsonLd = '';
  if (page.schemaType === 'Organization') {
    jsonLd = `{
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "THAL AKASH JAL Defence Technologies Pvt. Ltd.",
      "alternateName": "TAJ",
      "url": "${siteUrl}",
      "logo": "${logoUrl}",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "",
        "contactType": "customer service"
      }
    }`;
  } else if (page.schemaType === 'Service') {
    jsonLd = `{
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "${page.title.split(' | ')[0]}",
      "provider": {
        "@type": "Organization",
        "name": "THAL AKASH JAL Defence Technologies Pvt. Ltd."
      },
      "description": "${page.desc}"
    }`;
  } else if (page.schemaType === 'ContactPage') {
    jsonLd = `{
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact THAL AKASH JAL",
      "description": "${page.desc}",
      "publisher": {
        "@type": "Organization",
        "name": "THAL AKASH JAL Defence Technologies Pvt. Ltd."
      }
    }`;
  }

  return `    <title>${page.title}</title>
    <meta name="description" content="${page.desc}">
    <meta property="og:title" content="${page.title}">
    <meta property="og:description" content="${page.desc}">
    <meta property="og:image" content="${ogImage}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="${canonicalUrl}">
    <meta name="twitter:title" content="${page.title}">
    <meta name="twitter:description" content="${page.desc}">
    <meta name="twitter:image" content="${ogImage}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <link rel="canonical" href="${canonicalUrl}">
    <script type="application/ld+json">
    ${jsonLd}
    </script>
    <meta content="width=device-width, initial-scale=1" name="viewport">`;
}

pages.forEach(page => {
  const filePath = path.join(baseDir, page.file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping (not found): ${page.file}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // We want to replace everything from <title> to <meta content="width=device-width, initial-scale=1" name="viewport">
  const titleRegex = /<title>[\s\S]*?<meta content="width=device-width, initial-scale=1" name="viewport">/i;
  
  if (titleRegex.test(content)) {
    content = content.replace(titleRegex, generateHeadContent(page));
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated successfully: ${page.file}`);
  } else {
    console.log(`Could not find metadata block to replace in: ${page.file}`);
  }
});
