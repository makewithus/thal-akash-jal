// ── Industries Page — Data & Logic ──
(function () {
  'use strict';

  var DATA = {
    defence: {
      name: 'Defence & Security', icon: 'shield',
      desc: 'Comprehensive defence consulting, strategic advisory, and technology solutions for India\'s defence ecosystem. We bridge the gap between military requirements and industry capabilities.',
      services: [
        { name: 'Strategic Advisory', href: 'services/strategic-advisory.html', icon: 'compass', desc: 'Expert guidance on defence strategy, procurement planning, and operational excellence.' },
        { name: 'Strategic Liaison', href: 'services/strategic-liaison.html', icon: 'handshake', desc: 'Building powerful connections with key defence stakeholders and decision-makers.' },
        { name: 'Field Trial Management', href: 'services/field-trial-management.html', icon: 'clipboard-check', desc: 'Rigorous field trial management ensuring technologies are validated under real-world conditions.' },
        { name: 'Specification Review', href: 'services/specification-review.html', icon: 'file-check-2', desc: 'Meticulous specification review to guarantee projects meet exact defence requirements.' },
        { name: 'Procurement Management', href: 'services/procurement-contract-management.html', icon: 'shopping-cart', desc: 'End-to-end procurement and contract management for defence acquisitions.' },
        { name: 'Technology Transfer', href: 'services/technology-transfer.html', icon: 'arrow-right-left', desc: 'Facilitating technology transfer and Make in India initiatives for defence manufacturing.' }
      ]
    },
    government: {
      name: 'Government & Public Sector', icon: 'landmark',
      desc: 'Expert navigation of government procurement processes, GeM marketplace advisory, and public sector engagement strategies that deliver results.',
      services: [
        { name: 'GeM Advisory', href: 'services/gem-advisory.html', icon: 'landmark', desc: 'Specialized Government e-Marketplace advisory for effective public procurement.' },
        { name: 'Procurement Management', href: 'services/procurement-contract-management.html', icon: 'shopping-cart', desc: 'Streamlined procurement and contract management for government projects.' },
        { name: 'Strategic Liaison', href: 'services/strategic-liaison.html', icon: 'handshake', desc: 'Building connections with government stakeholders and decision-makers.' },
        { name: 'Strategic Advisory', href: 'services/strategic-advisory.html', icon: 'compass', desc: 'Strategic guidance for organizations working with government entities.' }
      ]
    },
    manufacturing: {
      name: 'Manufacturing & MSME', icon: 'factory',
      desc: 'Empowering MSMEs and manufacturing enterprises with strategic consulting, operational efficiency, and technology integration for sustainable growth.',
      services: [
        { name: 'Strategic Advisory', href: 'services/strategic-advisory.html', icon: 'compass', desc: 'Business strategy and operational excellence consulting for MSMEs.' },
        { name: 'Supply Chain Consulting', href: 'services/logistics-supply-chain.html', icon: 'route', desc: 'Optimized supply chain strategies for manufacturing operations.' },
        { name: 'Business Management', href: 'services/outsourced-business-management.html', icon: 'briefcase-business', desc: 'Comprehensive business management solutions for growing enterprises.' },
        { name: 'Technology Transfer', href: 'services/technology-transfer.html', icon: 'arrow-right-left', desc: 'Technology adoption and transfer for manufacturing modernization.' },
        { name: 'Warehouse Optimization', href: 'services/warehouse-management.html', icon: 'warehouse', desc: 'Optimizing warehouse operations for manufacturing efficiency.' }
      ]
    },
    marine: {
      name: 'Marine & Maritime', icon: 'ship',
      desc: 'Specialized marine solutions encompassing tourism, logistics, and maritime operations support across India\'s extensive coastline.',
      services: [
        { name: 'Marine Tourism', href: 'services/marine-aqua-tourism.html', icon: 'ship', desc: 'Comprehensive marine and aqua tourism development and management.' },
        { name: 'Supply Chain Consulting', href: 'services/logistics-supply-chain.html', icon: 'route', desc: 'Maritime supply chain and logistics optimization.' },
        { name: 'Warehouse Optimization', href: 'services/warehouse-management.html', icon: 'warehouse', desc: 'Port and maritime warehouse management solutions.' }
      ]
    },
    logistics: {
      name: 'Logistics & Supply Chain', icon: 'truck',
      desc: 'End-to-end logistics and supply chain optimization delivering efficiency, cost reduction, and operational resilience across complex networks.',
      services: [
        { name: 'Supply Chain Consulting', href: 'services/logistics-supply-chain.html', icon: 'route', desc: 'Strategic supply chain consulting for end-to-end optimization.' },
        { name: 'Warehouse Optimization', href: 'services/warehouse-management.html', icon: 'warehouse', desc: 'Advanced warehouse management and optimization solutions.' },
        { name: 'Procurement Management', href: 'services/procurement-contract-management.html', icon: 'shopping-cart', desc: 'Procurement excellence across complex supply networks.' }
      ]
    },
    technology: {
      name: 'Technology & Innovation', icon: 'cpu',
      desc: 'Driving technological advancement through structured innovation management, technology transfer, and rigorous validation processes.',
      services: [
        { name: 'Technology Transfer', href: 'services/technology-transfer.html', icon: 'arrow-right-left', desc: 'Facilitating technology transfer and adoption across sectors.' },
        { name: 'Specification Review', href: 'services/specification-review.html', icon: 'file-check-2', desc: 'Technical specification review ensuring compliance and quality.' },
        { name: 'Field Trial Management', href: 'services/field-trial-management.html', icon: 'clipboard-check', desc: 'Rigorous field testing and validation of new technologies.' },
        { name: 'Strategic Advisory', href: 'services/strategic-advisory.html', icon: 'compass', desc: 'Strategic technology advisory for innovation-driven organizations.' }
      ]
    },
    infrastructure: {
      name: 'Infrastructure', icon: 'building-2',
      desc: 'Supporting India\'s infrastructure development through strategic procurement, project advisory, and supply chain management expertise.',
      services: [
        { name: 'Procurement Management', href: 'services/procurement-contract-management.html', icon: 'shopping-cart', desc: 'Infrastructure procurement and contract management.' },
        { name: 'Strategic Advisory', href: 'services/strategic-advisory.html', icon: 'compass', desc: 'Strategic advisory for infrastructure development projects.' },
        { name: 'Warehouse Optimization', href: 'services/warehouse-management.html', icon: 'warehouse', desc: 'Logistics and warehousing solutions for infrastructure projects.' },
        { name: 'Supply Chain Consulting', href: 'services/logistics-supply-chain.html', icon: 'route', desc: 'Supply chain management for infrastructure materials and equipment.' }
      ]
    },
    'human-capital': {
      name: 'Human Capital & Workforce', icon: 'users',
      desc: 'Comprehensive workforce solutions including analytics, talent management, and organizational development for modern enterprises.',
      services: [
        { name: 'Workforce Analytics', href: 'services/human-capital-workforce.html', icon: 'users', desc: 'Advanced workforce analytics and human capital management.' },
        { name: 'Business Management', href: 'services/outsourced-business-management.html', icon: 'briefcase-business', desc: 'Organizational management and operational support.' },
        { name: 'Strategic Advisory', href: 'services/strategic-advisory.html', icon: 'compass', desc: 'Strategic workforce planning and organizational development.' }
      ]
    },
    energy: {
      name: 'Energy & Resources', icon: 'zap',
      desc: 'Strategic consulting and procurement support for the energy sector, enabling efficient resource management and sustainable operations.',
      services: [
        { name: 'Strategic Advisory', href: 'services/strategic-advisory.html', icon: 'compass', desc: 'Strategic consulting for energy sector organizations.' },
        { name: 'Procurement Management', href: 'services/procurement-contract-management.html', icon: 'shopping-cart', desc: 'Procurement management for energy projects and resources.' },
        { name: 'Technology Transfer', href: 'services/technology-transfer.html', icon: 'arrow-right-left', desc: 'Technology transfer for energy sector modernization.' },
        { name: 'Supply Chain Consulting', href: 'services/logistics-supply-chain.html', icon: 'route', desc: 'Supply chain optimization for energy distribution networks.' }
      ]
    },
    education: {
      name: 'Education & Research', icon: 'graduation-cap',
      desc: 'Supporting educational institutions and research organizations with technology integration, trial management, and specification compliance.',
      services: [
        { name: 'Technology Transfer', href: 'services/technology-transfer.html', icon: 'arrow-right-left', desc: 'Technology transfer between academic and commercial sectors.' },
        { name: 'Field Trial Management', href: 'services/field-trial-management.html', icon: 'clipboard-check', desc: 'Research trial management and data collection support.' },
        { name: 'Specification Review', href: 'services/specification-review.html', icon: 'file-check-2', desc: 'Technical specification review for research projects.' }
      ]
    }
  };

  function init() {
    var gridEl = document.getElementById('industries-grid');
    var detailEl = document.getElementById('industries-detail');
    if (!gridEl || !detailEl) return;

    // Build grid cards
    var keys = Object.keys(DATA);
    var html = '';
    for (var i = 0; i < keys.length; i++) {
      var ind = DATA[keys[i]];
      html += '<div class="industries-card industries-reveal" data-industry="' + keys[i] + '">' +
        '<i data-lucide="' + ind.icon + '" class="industries-card__icon"></i>' +
        '<p class="industries-card__name">' + ind.name + '</p>' +
        '<p class="industries-card__desc">' + ind.desc.substring(0, 100) + '...</p>' +
        '<div class="industries-card__arrow"><span>Explore</span><i data-lucide="arrow-right"></i></div>' +
        '</div>';
    }
    gridEl.innerHTML = html;

    // Render Lucide icons
    if (typeof lucide !== 'undefined') lucide.createIcons();

    // Click handlers
    gridEl.addEventListener('click', function (e) {
      var card = e.target.closest('.industries-card');
      if (!card) return;
      var key = card.getAttribute('data-industry');
      showDetail(key, gridEl, detailEl);
    });

    // Scroll reveal
    var observer = new IntersectionObserver(function (entries) {
      for (var j = 0; j < entries.length; j++) {
        if (entries[j].isIntersecting) {
          entries[j].target.classList.add('visible');
          observer.unobserve(entries[j].target);
        }
      }
    }, { threshold: 0.1 });

    setTimeout(function () {
      var els = document.querySelectorAll('.industries-reveal');
      for (var k = 0; k < els.length; k++) observer.observe(els[k]);
    }, 100);
  }

  function showDetail(key, gridEl, detailEl) {
    var ind = DATA[key];
    if (!ind) return;

    var shtml = '';
    for (var i = 0; i < ind.services.length; i++) {
      var s = ind.services[i];
      shtml += '<a href="' + s.href + '" class="industries-service-card">' +
        '<div class="industries-service-card__header">' +
        '<i data-lucide="' + s.icon + '"></i>' +
        '<p class="industries-service-card__name">' + s.name + '</p>' +
        '</div>' +
        '<p class="industries-service-card__desc">' + s.desc + '</p>' +
        '<div class="industries-service-card__cta"><span>Learn More</span><i data-lucide="arrow-right"></i></div>' +
        '</a>';
    }

    detailEl.innerHTML =
      '<button class="industries-detail__back" id="industries-back">' +
      '<i data-lucide="arrow-left"></i><span>All Industries</span></button>' +
      '<div class="industries-detail__header">' +
      '<i data-lucide="' + ind.icon + '" class="industries-detail__icon"></i>' +
      '<h2 class="industries-detail__title style__h3 my-0">' + ind.name + '</h2></div>' +
      '<p class="industries-detail__desc">' + ind.desc + '</p>' +
      '<div class="industries-detail__subtitle">' +
      '<img src="6893263d1e27013b67b77d36/6899cf307147b1d35875c7fc_Blue%20Arrow.svg" loading="lazy" alt="">' +
      '<h3>Our Services for ' + ind.name + '</h3></div>' +
      '<div class="industries-services-grid">' + shtml + '</div>';

    gridEl.classList.add('hidden');
    detailEl.classList.add('active');
    if (typeof lucide !== 'undefined') lucide.createIcons();

    document.getElementById('industries-back').addEventListener('click', function () {
      detailEl.classList.remove('active');
      gridEl.classList.remove('hidden');
      var section = document.getElementById('industries-section-anchor');
      if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    var section = document.getElementById('industries-section-anchor');
    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
