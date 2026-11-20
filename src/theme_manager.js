/**
 * KUBERA ASTRO - THEME ENGINE
 * Instant Dark & Light Theme switching with persistent user choice.
 * Strictly under 300 lines compliant (Rule 6).
 */
(function () {
  'use strict';

  const STORAGE_KEY = 'kubera_astro_theme';
  let currentTheme = localStorage.getItem(STORAGE_KEY) || 'dark';

  function applyTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {}

    const toggleBtns = [
      document.getElementById('btn-theme-toggle'),
      document.getElementById('drawer-theme-toggle')
    ];
    toggleBtns.forEach(btn => {
      if (!btn) return;
      if (theme === 'light') {
        btn.innerHTML = '🌙 Dark';
        btn.title = 'Switch to Dark Mode';
        btn.style.color = '#0f172a';
      } else {
        btn.innerHTML = '☀️ Light';
        btn.title = 'Switch to Light Mode';
        btn.style.color = 'var(--accent-gold-bright)';
      }
    });
  }

  function toggleTheme() {
    const next = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  }

  window.ThemeManager = {
    applyTheme,
    toggleTheme,
    getTheme: () => currentTheme
  };

  // Immediate init before render to prevent flash
  applyTheme(currentTheme);
})();

