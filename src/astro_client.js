/**
 * KUBERA ASTRO - CLIENT ENGINE & BACKEND API BRIDGE
 * Geocoding, Places Autocomplete & Secure Vercel Dispatch
 * Strictly under 300 lines compliant (Rule 6).
 */
(function () {
  'use strict';

  const VERCEL_API_URL = window.ASTRO_API_URL || "";
  let placeMap = {};
  let debounceTimer = null;

  function initPlaceAutocomplete() {
    const input = document.getElementById('birth-place-input');
    const dropdown = document.getElementById('place-autocomplete-list');
    const latHidden = document.getElementById('birth-lat');
    const lonHidden = document.getElementById('birth-lon');
    if (!input || !dropdown) return;

    input.addEventListener('input', function () {
      clearTimeout(debounceTimer);
      const query = this.value.trim().toLowerCase();
      if (query.length < 2) {
        dropdown.style.display = 'none';
        return;
      }

      debounceTimer = setTimeout(async () => {
        try {
          const res = await fetch(`${VERCEL_API_URL}/search_places?q=${encodeURIComponent(query)}`);
          if (!res.ok) return;
          const data = await res.json();
          if (!data || data.length === 0) {
            dropdown.style.display = 'none';
            return;
          }
          dropdown.innerHTML = '';
          placeMap = {};
          data.forEach(item => {
            const el = document.createElement('div');
            el.className = 'autocomplete-item';
            el.textContent = item.display_name;
            el.onclick = () => {
              input.value = item.display_name;
              latHidden.value = item.lat;
              lonHidden.value = item.lon;
              dropdown.style.display = 'none';
            };
            dropdown.appendChild(el);
            placeMap[item.display_name] = item;
          });
          dropdown.style.display = 'block';
        } catch (e) {
          console.warn("Autocomplete lookup notice:", e);
        }
      }, 250);
    });

    document.addEventListener('click', (e) => {
      if (!input.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.style.display = 'none';
      }
    });
  }

  async function requestHoroscopeGeneration(formData) {
    const btn = document.getElementById('btn-submit-generate');
    const statusEl = document.getElementById('generation-status');
    if (btn) { btn.disabled = true; btn.innerHTML = '⏳ கணிப்பு நடக்கிறது... (Calculating)'; }
    if (statusEl) { statusEl.style.display = 'block'; statusEl.textContent = 'Authenticating with security token...'; }

    try {
      // 1. Fetch Firebase Anonymous ID Token
      const idToken = await window.KuberaAuthBridge?.getToken();
      if (!idToken) {
        throw new Error("Unable to establish secure connection. Please refresh the page.");
      }

      if (statusEl) statusEl.textContent = 'Generating South Indian Vedic Charts...';

      formData.append('id_token', idToken);

      // 2. Dispatch to Vercel Backend
      const res = await fetch(`${VERCEL_API_URL}/generate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${idToken}`
        },
        body: formData
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => null);
        throw new Error((errJson && errJson.error) || `Backend request returned status ${res.status}`);
      }

      const htmlResult = await res.text();

      // 3. Render Result
      window.ChartRenderer?.renderFromBackendHtml(htmlResult, formData);

      if (statusEl) statusEl.style.display = 'none';

    } catch (err) {
      console.error("Horoscope calculation error:", err);
      alert(`⚠️ Astrological Calculation Notice: ${err.message}`);
      if (statusEl) { statusEl.style.display = 'block'; statusEl.textContent = `Error: ${err.message}`; }
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = currentLang === 'en' ? '⚡ Generate Free Vedic Horoscope' : '⚡ இலவச ஜாதகம் கணிக்க';
      }
    }
  }

  const STORAGE_LANG_KEY = 'kubera_astro_lang';
  let currentLang = localStorage.getItem(STORAGE_LANG_KEY) || 'en';

  function setLanguage(lang) {
    currentLang = lang;
    try {
      localStorage.setItem(STORAGE_LANG_KEY, lang);
    } catch (e) {}

    const langHidden = document.getElementById('form-lang-input');
    if (langHidden) langHidden.value = lang;

    // Apply comprehensive bilingual UI updates
    if (window.UiI18n) {
      window.UiI18n.applyLanguage(lang);
    }
    if (window.ArticlesI18n) {
      window.ArticlesI18n.applyLanguage(lang);
    }
    if (window.AIConsultantClient && window.AIConsultantClient.renderStandalone) {
      window.AIConsultantClient.renderStandalone();
    }
    if (window.NumerologyClient && window.NumerologyClient.reRenderOnLanguageChange) {
      window.NumerologyClient.reRenderOnLanguageChange();
    }
  }

  function initDefaultDateTime() {
    const dobInput = document.querySelector('input[name="dob"]');
    if (dobInput && !dobInput.value) {
      const now = new Date();
      const yyyy = now.getFullYear();
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      const dd = String(now.getDate()).padStart(2, '0');
      dobInput.value = `${yyyy}-${mm}-${dd}`;
    }
  }

  window.AstroClient = {
    initPlaceAutocomplete,
    requestHoroscopeGeneration,
    setLanguage,
    getCurrentLanguage: () => currentLang,
    getApiUrl: () => VERCEL_API_URL
  };

  document.addEventListener('DOMContentLoaded', () => {
    initPlaceAutocomplete();
    initDefaultDateTime();
    setLanguage(currentLang);
  });
})();
