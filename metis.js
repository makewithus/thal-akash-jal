// ─── Mobile Scroll Freeze Fix ────────────────────────────────────────────────
// Webflow's mobile nav sets overflow:hidden on <html>/<body> when opened and
// should clear it on close — but after a hard reload the state can get stuck.
// This IIFE watches for that stuck lock with a MutationObserver and clears it
// immediately whenever the nav is not genuinely open.
(function () {
  'use strict';

  function isNavOpen() {
    var html = document.documentElement;
    // Check all Webflow nav-open signals
    var navMenus = document.querySelectorAll('.w-nav-menu');
    var navOverlay = document.querySelector('.nav-overlay');
    var anyMenuOpen = false;
    for (var i = 0; i < navMenus.length; i++) {
      if (navMenus[i].classList.contains('w--open')) { anyMenuOpen = true; break; }
    }
    var overlayVisible = navOverlay && parseFloat(getComputedStyle(navOverlay).opacity) > 0.05;
    return anyMenuOpen || overlayVisible || html.classList.contains('w-nav-open');
  }

  function clearScrollLock() {
    if (isNavOpen()) return; // nav is genuinely open — leave it alone
    var html = document.documentElement;
    var body = document.body;
    // Only touch if actually locked (avoid unnecessary reflows)
    if (html.style.overflow || html.style.overflowY) {
      html.style.overflow = '';
      html.style.overflowY = '';
    }
    if (body && (body.style.overflow || body.style.overflowY)) {
      body.style.overflow = '';
      body.style.overflowY = '';
    }
    html.classList.remove('w-nav-open');
  }

  // ── MutationObserver: catch Webflow re-applying overflow:hidden after reload
  function startObserver() {
    var html = document.documentElement;
    var body = document.body;
    if (!html || !body) return;

    var observer = new MutationObserver(function () {
      // Debounce slightly so Webflow's own animation can complete first
      setTimeout(clearScrollLock, 50);
    });

    // Watch style and class changes on both html and body
    var config = { attributes: true, attributeFilter: ['style', 'class'] };
    observer.observe(html, config);
    observer.observe(body, config);
  }

  // ── Run at every sensible lifecycle point ────────────────────────────────
  // 1. As early as possible (inline, before DOMContentLoaded)
  if (document.readyState !== 'loading') {
    clearScrollLock();
  }

  // 2. DOM ready
  document.addEventListener('DOMContentLoaded', function () {
    clearScrollLock();
    startObserver();
    // Extra passes to catch Webflow's delayed init (it fires ~200-400 ms after DOMContentLoaded)
    setTimeout(clearScrollLock, 200);
    setTimeout(clearScrollLock, 500);
    setTimeout(clearScrollLock, 1000);
  });

  // 3. Full page load (all scripts executed)
  window.addEventListener('load', function () {
    clearScrollLock();
    setTimeout(clearScrollLock, 300);
  });

  // 4. Back/forward cache on mobile (persisted page shows)
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      clearScrollLock();
      setTimeout(clearScrollLock, 300);
    }
  });
})();
// ─────────────────────────────────────────────────────────────────────────────

const metis = {
  pages: {
    slider() {
      // Guard: only init if the Swiper container actually exists on this page
      if (!document.querySelector('.swiper-expertise')) return;
      new Swiper('.swiper-expertise', {
        a11y: false,
        loop: true,
        slidesPerView: 3,
        grabCursor: true,
        centeredSlides: true,
        navigation: {
          nextEl: '.home-next-btn',
          prevEl: '.home-prev-btn',
        },
        breakpoints: {
          0:    { slidesPerView: 1 },
          478:  { slidesPerView: 1 },
          767:  { slidesPerView: 2 },
          988:  { slidesPerView: 3 },
          1920: { slidesPerView: 5 },
        },
        autoplay: {
          delay: 2000,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
        },
      });
    },
  },

  scripts: {
    createScript(name, url, fn) {
      if (document.getElementById(name)) { fn(); return; }
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.setAttribute('id', name);
      script.src = url;
      script.onload = fn;
      document.head.appendChild(script);
    },
  },
};
