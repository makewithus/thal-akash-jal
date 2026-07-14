// ─── Mobile Scroll Freeze Fix ────────────────────────────────────────────────
// On non-index pages, Webflow's mobile nav can leave overflow:hidden on <html>
// after a refresh, completely freezing scroll. This clears that stuck lock
// if and only if the nav is not genuinely open at the time.
(function () {
  function fixMobileScroll() {
    var html = document.documentElement;
    var body = document.body;

    // Check whether the Webflow mobile nav is actively open
    var navMenu = document.querySelector('.w-nav-menu');
    var navOverlay = document.querySelector('.nav-overlay');
    var navIsOpen =
      (navMenu && (navMenu.classList.contains('w--open') || getComputedStyle(navMenu).display === 'block')) ||
      (navOverlay && parseFloat(getComputedStyle(navOverlay).opacity) > 0.05) ||
      html.classList.contains('w-nav-open');

    if (!navIsOpen) {
      // Clear any overflow lock Webflow may have left behind
      html.style.overflow = '';
      html.style.overflowY = '';
      body.style.overflow = '';
      body.style.overflowY = '';
      html.classList.remove('w-nav-open');
    }
  }

  // Run immediately after DOM is ready
  document.addEventListener('DOMContentLoaded', function () {
    fixMobileScroll();
    // Second pass after Webflow finishes its own init (~300 ms)
    setTimeout(fixMobileScroll, 350);
  });

  // Run after all resources (scripts) load
  window.addEventListener('load', function () {
    fixMobileScroll();
    setTimeout(fixMobileScroll, 300);
  });

  // Handle back/forward cache (bfcache) on mobile — persisted page shows
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      fixMobileScroll();
      setTimeout(fixMobileScroll, 300);
    }
  });
})();
// ─────────────────────────────────────────────────────────────────────────────

const metis = {
  pages: {
    slider() {
      var expertiseSwiper = new Swiper(".swiper-expertise", {
        a11y: false,
        loop: true,
        slidesPerView: 3,
        grabCursor: true,
        centeredSlides: true,
        navigation: {
          nextEl: ".home-next-btn",
          prevEl: ".home-prev-btn",
        },
        breakpoints: {
          0: {
            slidesPerView: 1,
          },
          478: {
            slidesPerView: 1,
          },
          767: {
            slidesPerView: 2,
          },
          988: {
            slidesPerView: 3,
          },
          1920: {
            slidesPerView: 5,
          },
        },
        autoplay: {
          delay: 2000,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
        },
      })
    },
  },

  scripts: {
    createScript(name, url, fn) {
      if (document.getElementById(name)) {
        fn()
        return
      }
      var script = document.createElement("script")
      script.type = "text/javascript"
      script.setAttribute("id", name)
      script.src = url
      script.onload = fn
      document.head.appendChild(script)
    },
  },
}
