// ─── Mobile Scroll Freeze Fix — Intent-Tracking Approach ─────────────────────
//
// WHY THE OLD FIX FAILED:
//   metis.js is loaded last, synchronously, AFTER all Webflow chunks. By the
//   time our DOMContentLoaded fires, Webflow has already run and may have
//   applied overflow:hidden. CSS/opacity checks were unreliable because
//   Webflow's IX2 briefly animates the nav-overlay during init, making
//   isNavOpen() return true and blocking the clear.
//
// THE CORRECT FIX — Intent Tracking:
//   Track whether the USER actually clicked the hamburger button.
//   - navUserOpenedMenu = false  → page load / refresh → always forceUnlock()
//   - navUserOpenedMenu = true   → user opened menu → respect overflow:hidden
//   - Nav link clicked           → reset flag + forceUnlock() before navigate
//   - Nav closed (overlay/btn)   → reset flag
//
// This makes the guard bulletproof: it reflects USER INTENT, not CSS state.
// ─────────────────────────────────────────────────────────────────────────────
(function () {
  'use strict';

  // Tracks whether the user INTENTIONALLY opened the mobile nav on this page.
  // Always false on a fresh load/refresh — nav is never open at page start.
  var navUserOpenedMenu = false;

  // ── Core unlock helpers ───────────────────────────────────────────────────

  function forceUnlock() {
    var html = document.documentElement;
    var body = document.body;
    html.style.overflow  = '';
    html.style.overflowY = '';
    if (body) {
      body.style.overflow  = '';
      body.style.overflowY = '';
    }
    html.classList.remove('w-nav-open');
  }

  // Only clears if the user has NOT intentionally opened the nav
  function guardedUnlock() {
    if (!navUserOpenedMenu) forceUnlock();
  }

  // ── Intent listeners ─────────────────────────────────────────────────────

  function attachIntentListeners() {
    // 1. Hamburger button — user opens/closes the menu
    var navButtons = document.querySelectorAll('.w-nav-button');
    for (var i = 0; i < navButtons.length; i++) {
      navButtons[i].addEventListener('click', function () {
        // Wait one tick for Webflow to add/remove w--open before we read state
        setTimeout(function () {
          var anyOpen = false;
          var menus = document.querySelectorAll('.w-nav-menu');
          for (var j = 0; j < menus.length; j++) {
            if (menus[j].classList.contains('w--open')) { anyOpen = true; break; }
          }
          navUserOpenedMenu = anyOpen;
        }, 60);
      });
    }

    // 2. Nav overlay click (closes the menu)
    var overlay = document.querySelector('.nav-overlay');
    if (overlay) {
      overlay.addEventListener('click', function () {
        navUserOpenedMenu = false;
      });
    }

    // 3. Any link inside the mobile nav — user is navigating away.
    //    Reset flag + force-unlock so the NEXT page loads scrollable.
    var navMenus = document.querySelectorAll('.w-nav-menu');
    for (var k = 0; k < navMenus.length; k++) {
      navMenus[k].addEventListener('click', function (e) {
        var anchor = e.target;
        // Walk up to find an <a> tag in case the click hit a child element
        while (anchor && anchor.tagName !== 'A') {
          anchor = anchor.parentElement;
        }
        if (anchor && anchor.href) {
          navUserOpenedMenu = false;
          forceUnlock();           // clear before browser navigates
        }
      });
    }
  }

  // ── MutationObserver (safety net) ────────────────────────────────────────

  function startObserver() {
    var html = document.documentElement;
    var body = document.body || html;
    var timer = null;

    var obs = new MutationObserver(function () {
      clearTimeout(timer);
      // 250ms debounce — let Webflow finish its own animation first
      timer = setTimeout(guardedUnlock, 250);
    });

    obs.observe(html, { attributes: true, attributeFilter: ['style', 'class'] });
    obs.observe(body, { attributes: true, attributeFilter: ['style', 'class'] });
  }

  // ── Lifecycle ─────────────────────────────────────────────────────────────

  // metis.js is loaded LAST (synchronously, after all Webflow chunks).
  // By this point the DOM is ready and Webflow has already run its init.
  // Run forceUnlock immediately — nav is never open at this point.
  forceUnlock();

  // Then wire up listeners and observer as soon as the DOM is ready.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      forceUnlock();
      attachIntentListeners();
      startObserver();
    });
  } else {
    // DOM is already ready (script is deferred or at end of body)
    attachIntentListeners();
    startObserver();
  }

  // window.load — catches any overflow Webflow applies after all assets load
  window.addEventListener('load', function () {
    forceUnlock();
  });

  // pageshow — handles bfcache (back button on mobile)
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      navUserOpenedMenu = false;
      forceUnlock();
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
