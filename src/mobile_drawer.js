/**
 * KUBERA ASTRO - MOBILE DRAWER & BURGER NAVIGATION
 * Smooth slide-out mobile menu controller.
 * Strictly under 100 lines compliant (Rule 6).
 */
(function () {
  'use strict';

  function openDrawer() {
    const drawer = document.getElementById('mobile-nav-drawer');
    if (drawer) {
      drawer.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    const drawer = document.getElementById('mobile-nav-drawer');
    if (drawer) {
      drawer.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }

  function toggleDrawer() {
    const drawer = document.getElementById('mobile-nav-drawer');
    if (drawer && drawer.classList.contains('is-open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  }

  window.MobileDrawer = {
    openDrawer,
    closeDrawer,
    toggleDrawer
  };

  document.addEventListener('DOMContentLoaded', () => {
    const drawer = document.getElementById('mobile-nav-drawer');
    if (drawer) {
      drawer.addEventListener('click', (e) => {
        if (e.target === drawer) {
          closeDrawer();
        }
      });
    }
  });
})();
