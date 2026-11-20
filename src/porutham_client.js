/**
 * KUBERA ASTRO - MATCHMAKING & PORUTHAM CLIENT CONTROLLER
 * Full Client-Side Porutham Calculation using Dual Authentic Swiss Ephemeris Horoscopes.
 * Strictly under 300 lines compliant (Rule 6).
 */
(function () {
  'use strict';
  const BACKEND_API_URL = window.PORUTHAM_API_URL || "";
  const STORAGE_TAB_KEY = 'kubera_astro_tab';
  let currentTab = localStorage.getItem(STORAGE_TAB_KEY) || 'jathagam';
  let lastPoruthamHtml = null;
  let lastGroomName = '';
  let lastBrideName = '';
  function switchAppTab(tabName) {
    currentTab = tabName;
    try { localStorage.setItem(STORAGE_TAB_KEY, tabName); } catch (e) {}
    const tabJ = document.getElementById('tab-btn-jathagam');
    const tabP = document.getElementById('tab-btn-porutham');
    const tabN = document.getElementById('tab-btn-numerology');
    const tabAI = document.getElementById('tab-btn-ai-consultant');
    const jGrid = document.getElementById('jathagam-workspace-grid');
    const pGrid = document.getElementById('porutham-workspace-grid');
    const nGrid = document.getElementById('numerology-workspace-grid');
    const aiGrid = document.getElementById('ai-consultant-workspace-grid');
    const hTitle = document.querySelector('.hero-title');
    const hSub = document.querySelector('.hero-subtitle');
    const lang = (window.AstroClient && window.AstroClient.getCurrentLanguage()) || 'ta';
    if (tabJ) tabJ.classList.remove('active');
    if (tabP) tabP.classList.remove('active');
    if (tabN) tabN.classList.remove('active');
    if (tabAI) tabAI.classList.remove('active');
    if (jGrid) jGrid.style.display = 'none';
    if (pGrid) pGrid.style.display = 'none';
    if (nGrid) nGrid.style.display = 'none';
    if (aiGrid) aiGrid.style.display = 'none';
    if (tabName === 'porutham') {
      if (tabP) tabP.classList.add('active');
      if (pGrid) pGrid.style.display = 'block';
      if (hTitle) {
        hTitle.innerHTML = lang === 'en'
          ? 'Authentic <span>Vedic Matchmaking</span> & Marriage Compatibility'
          : 'மணமக்கள் <span>திருமணப் பொருத்தம்</span> துல்லிய கணிப்பு';
      }
      if (hSub) {
        hSub.innerHTML = lang === 'en'
          ? 'Calculate authentic 10 & 12 Poruthams, Chevvai Dosham, Papa Samyam, and Dasa Sandhi for bride and groom using live planetary degrees.'
          : 'பெண் மற்றும் ஆண் பிறந்த விவரங்களை உள்ளிட்டு 10 & 12 பொருத்தங்கள், செவ்வாய் தோஷம், பாவ சாம்யம் மற்றும் தசா சந்தி முழு ஆய்வறிக்கையை உடனடியாக பெறுங்கள்.';
      }
    } else if (tabName === 'numerology') {
      if (tabN) tabN.classList.add('active');
      if (nGrid) nGrid.style.display = 'block';
      if (hTitle) {
        hTitle.innerHTML = lang === 'en'
          ? 'Authentic <span>Vedic &amp; Chaldean</span> Numerology Analysis'
          : 'துல்லியமான <span>வேத &amp; சால்டியன்</span> எண் கணிதம்';
      }
      if (hSub) {
        hSub.innerHTML = lang === 'en'
          ? 'Instant birth, destiny and name number vibration analysis with pure 1-page PDF download.'
          : 'உங்கள் பெயர் மற்றும் பிறந்த தேதியை உள்ளிட்டு மூல எண், பாக்கிய எண், நாம எண் மற்றும் ஒத்திசைவு அறிக்கையை உடனடியாக பெறுங்கள்.';
      }
    } else if (tabName === 'ai-consultant') {
      if (tabAI) tabAI.classList.add('active');
      if (aiGrid) aiGrid.style.display = 'block';
      if (window.AIConsultantClient?.renderStandalone) {
        window.AIConsultantClient.renderStandalone();
      }
      if (hTitle) {
        hTitle.innerHTML = lang === 'en'
          ? 'AI Vedic Astrology <span>Hybrid Consultant</span>'
          : 'AI வேத ஜோதிட <span>நேரடி ஆலோசகர்</span>';
      }
      if (hSub) {
        hSub.innerHTML = lang === 'en'
          ? '#BuildHybridAI: Runs on-device with Gemini Nano in Chrome for 0ms private responses, seamlessly backed by Firebase Cloud.'
          : '#BuildHybridAI: உங்கள் சாதனத்தில் உள்ள Gemini Nano மூலம் 0ms வேகத்தில் ஆஃப்லைனில் இயங்கும்; இல்லையெனில் Firebase Cloud வழியாக வழிகாட்டும்.';
      }
    } else {
      if (tabJ) tabJ.classList.add('active');
      if (jGrid) jGrid.style.display = 'grid';
    }
    if (window.UiI18n) window.UiI18n.applyLanguage(lang);
  }
  function setupPlaceAutocomplete(inputId, dropdownId, latId, lonId) {
    const input = document.getElementById(inputId);
    const dropdown = document.getElementById(dropdownId);
    const latHidden = document.getElementById(latId);
    const lonHidden = document.getElementById(lonId);
    if (!input || !dropdown) return;
    let timer = null;
    const apiUrl = (window.AstroClient && window.AstroClient.getApiUrl()) || BACKEND_API_URL;
    input.addEventListener('input', function () {
      clearTimeout(timer);
      const q = this.value.trim().toLowerCase();
      if (q.length < 2) { dropdown.style.display = 'none'; return; }
      timer = setTimeout(async () => {
        try {
          const res = await fetch(`${apiUrl}/search_places?q=${encodeURIComponent(q)}`);
          if (!res.ok) return;
          const data = await res.json();
          if (!data || data.length === 0) { dropdown.style.display = 'none'; return; }
          dropdown.innerHTML = '';
          data.forEach(item => {
            const div = document.createElement('div');
            div.className = 'autocomplete-item';
            div.textContent = item.display_name;
            div.onclick = () => {
              input.value = item.display_name;
              if (latHidden) latHidden.value = item.lat;
              if (lonHidden) lonHidden.value = item.lon;
              dropdown.style.display = 'none';
            };
            dropdown.appendChild(div);
          });
          dropdown.style.display = 'block';
        } catch (e) {}
      }, 250);
    });
    document.addEventListener('click', (e) => {
      if (!input.contains(e.target) && !dropdown.contains(e.target)) dropdown.style.display = 'none';
    });
  }
  function parseSingleHoroscopeHtml(htmlStr) {
    const doc = new DOMParser().parseFromString(htmlStr, 'text/html');
    const details = {};
    doc.querySelectorAll('.details-row').forEach(row => {
      const lbl = row.querySelector('.label')?.textContent?.trim();
      const val = row.querySelector('.value')?.textContent?.trim();
      if (lbl) details[lbl] = val || '';
    });
    const planets = [];
    doc.querySelectorAll('table.planet-table tbody tr').forEach(tr => {
      const tds = Array.from(tr.querySelectorAll('td')).map(td => td.textContent.trim());
      if (tds.length >= 6) {
        planets.push({ name: tds[0], deg: tds[1], star: tds[2], padam: tds[3], lord: tds[4], rasi: tds[5] });
      }
    });
    const boxes = Array.from(doc.querySelectorAll('.chart-box')).map(b => b.innerHTML.trim());
    return {
      star: details['நட்சத்திரம்'] || details['Nakshatra'] || '',
      rasi: details['ராசி'] || details['Sign (Rasi)'] || details['Rasi'] || '',
      lagna: details['லக்னம்'] || details['Ascendant (Lagna)'] || details['Lagna'] || '',
      dob: details['தேதி'] || details['Date of Birth'] || details['Date'] || '',
      tob: details['நேரம்'] || details['Time of Birth'] || details['Time'] || '',
      place: details['இடம்'] || details['Place of Birth'] || details['Place'] || '',
      latLong: details['அட்ச/தீர்க்க-ரேகை'] || details['Latitude / Longitude'] || details['Lat / Long'] || '',
      planets,
      rasiBoxes: boxes.slice(0, 12),
      currentDasa: doc.querySelector('.footer-left')?.innerHTML || '',
      rawHtml: htmlStr
    };
  }
  async function calculatePorutham(formEl) {
    const btn = document.getElementById('btn-submit-porutham');
    const resultSec = document.getElementById('porutham-results-section');
    const statusEl = document.getElementById('porutham-status-text');
    const lang = (window.AstroClient && window.AstroClient.getCurrentLanguage()) || 'ta';
    const apiUrl = (window.AstroClient && window.AstroClient.getApiUrl()) || BACKEND_API_URL;
    if (btn) { btn.disabled = true; btn.innerHTML = lang === 'en' ? '⏳ Calculating Compatibility...' : '⏳ பொருத்தம் கணிக்கப்படுகிறது...'; }
    if (statusEl) { statusEl.style.display = 'block'; statusEl.textContent = lang === 'en' ? 'Fetching Swiss Ephemeris Horoscopes...' : 'பாதுகாப்பு சரிபார்ப்பு & ஜாதக கணிப்பு நடக்கிறது...'; }
    try {
      const idToken = await window.KuberaAuthBridge?.getToken();
      const formData = new FormData(formEl);
      lastBrideName = formData.get('girl_name') || (lang === 'en' ? 'Selvi' : 'செல்வி');
      lastGroomName = formData.get('boy_name') || (lang === 'en' ? 'Selvan' : 'செல்வன்');
      const girlBody = new URLSearchParams({
        name: lastBrideName, dob: formData.get('girl_dob') || '2000-06-15',
        tob: formData.get('girl_tob') || '10:30', place: formData.get('girl_place') || 'Chennai',
        lat: formData.get('girl_lat') || '13.0827', lon: formData.get('girl_lon') || '80.2707',
        gender: 'female', lang: lang === 'en' ? 'en' : 'ta'
      });
      if (idToken) girlBody.append('id_token', idToken);
      const boyBody = new URLSearchParams({
        name: lastGroomName, dob: formData.get('boy_dob') || '1998-04-20',
        tob: formData.get('boy_tob') || '08:15', place: formData.get('boy_place') || 'Vellore',
        lat: formData.get('boy_lat') || '12.9165', lon: formData.get('boy_lon') || '79.1325',
        gender: 'male', lang: lang === 'en' ? 'en' : 'ta'
      });
      if (idToken) boyBody.append('id_token', idToken);
      const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
      if (idToken) headers['Authorization'] = `Bearer ${idToken}`;
      const [resGirl, resBoy] = await Promise.all([
        fetch(`${apiUrl}/generate`, { method: 'POST', headers, body: girlBody.toString() }),
        fetch(`${apiUrl}/generate`, { method: 'POST', headers, body: boyBody.toString() })
      ]);
      if (!resGirl.ok) throw new Error(`Bride Horoscope backend status: ${resGirl.status}`);
      if (!resBoy.ok) throw new Error(`Groom Horoscope backend status: ${resBoy.status}`);
      const [htmlGirl, htmlBoy] = await Promise.all([resGirl.text(), resBoy.text()]);
      const girlChart = parseSingleHoroscopeHtml(htmlGirl);
      const boyChart = parseSingleHoroscopeHtml(htmlBoy);
      if (!window.PoruthamEngine) throw new Error("Porutham Engine module not initialized.");
      const matchData = window.PoruthamEngine.calculateMatch(girlChart, boyChart, lang);
      if (window.PoruthamPdfBuilder) {
        lastPoruthamHtml = window.PoruthamPdfBuilder.buildPrintableHtml(matchData, girlChart, boyChart, lang, lastBrideName, lastGroomName);
      }
      renderPoruthamResults(matchData);
      if (resultSec) {
        resultSec.style.display = 'block';
        resultSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      if (statusEl) statusEl.style.display = 'none';
    } catch (err) {
      console.error("Matchmaking error:", err);
      alert(`⚠️ Porutham Notice: ${err.message}`);
      if (statusEl) statusEl.textContent = `Error: ${err.message}`;
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = lang === 'en' ? '💍 Analyze Compatibility' : '💍 திருமணப் பொருத்தம் கணிக்க';
      }
    }
  }
  function renderPoruthamResults(data) {
    const vCard = document.getElementById('live-verdict-card');
    const sStrip = document.getElementById('live-score-strip');
    const tBody = document.getElementById('live-porutham-tbody');
    const dBox = document.getElementById('live-dosha-box');
    const lang = window.AstroClient ? window.AstroClient.getCurrentLanguage() : 'ta';
    if (vCard) {
      vCard.className = 'porutham-verdict-card ' + (data.verdict_class || 'warning');
      vCard.innerHTML = `<div>${data.verdict_title || ''}</div><div style="font-size:0.95rem; margin-top:4px; font-weight:600;">${data.verdict_subtitle || ''}</div>`;
    }
    if (sStrip) {
      sStrip.innerHTML = `
        <div class="score-pill-card"><div class="pill-label">${lang === 'en' ? '10 Porutham' : '10 பொருத்தம்'}</div><div class="pill-val">${data.score_10} / 10</div></div>
        <div class="score-pill-card"><div class="pill-label">${lang === 'en' ? '12 Porutham' : '12 பொருத்தம்'}</div><div class="pill-val">${data.score_12} / 12</div></div>
        <div class="score-pill-card"><div class="pill-label">${lang === 'en' ? 'Rajju Status' : 'ரஜ்ஜு பொருத்தம்'}</div><div class="pill-val" style="font-size:1.1rem; color:${data.rajju_ok ? '#10b981' : '#ef4444'}">${data.rajju_ok ? (lang === 'en' ? '✓ Safe' : '✓ உண்டு') : (lang === 'en' ? '✗ Dosham' : '✗ இல்லை')}</div></div>
        <div class="score-pill-card"><div class="pill-label">${lang === 'en' ? 'Papa Samyam' : 'பாவ சாம்யம்'}</div><div class="pill-val" style="font-size:0.95rem;">${lang === 'en' ? 'Bride' : 'பெண்'}: ${data.papa_girl_score} | ${lang === 'en' ? 'Groom' : 'ஆண்'}: ${data.papa_boy_score}</div></div>
      `;
    }
    if (tBody && data.porutham_list) {
      tBody.innerHTML = '';
      data.porutham_list.forEach(item => {
        const tr = document.createElement('tr');
        const badgeClass = item.status === 'good' ? 'ok' : (item.status === 'mid' ? 'mid' : 'no');
        tr.innerHTML = `<td style="font-weight:700;">${item.name}</td><td><span class="porutham-badge ${badgeClass}">${item.result}</span></td><td style="color:var(--text-secondary);">${item.notes || '-'}</td>`;
        tBody.appendChild(tr);
      });
    }
    if (dBox) {
      dBox.innerHTML = `
        <h4>${lang === 'en' ? 'Comprehensive Vedic Dosha & Planetary Analysis' : 'செவ்வாய் தோஷம், பாவ சாம்யம் & தசா சந்தி முழு ஆய்வு'}</h4>
        <div class="analysis-item"><strong>${lang === 'en' ? 'Bride Dosham' : 'பெண் தோஷம்'}:</strong> ${data.chevvai_girl_text || '-'}</div>
        <div class="analysis-item"><strong>${lang === 'en' ? 'Groom Dosham' : 'ஆண் தோஷம்'}:</strong> ${data.chevvai_boy_text || '-'}</div>
        <div class="analysis-item"><strong>${lang === 'en' ? 'Papa Balance' : 'பாவ சாம்யம்'}:</strong> ${data.papa_verdict || '-'}</div>
        <div class="analysis-item"><strong>${lang === 'en' ? 'Dasa Sandhi' : 'தசா சந்தி'}:</strong> ${data.dasa_sandhi_text || '-'}</div>
      `;
    }
  }
  async function downloadPoruthamPdf() {
    if (!lastPoruthamHtml) { alert("Please calculate compatibility first."); return; }
    const btn = document.getElementById('btn-download-porutham-pdf');
    if (btn) { btn.disabled = true; btn.innerHTML = '⏳ PDF தயாராகிறது... (Compiling)'; }
    const safeGirl = (lastBrideName || 'Bride').replace(/[^a-zA-Z0-9_\u0B80-\u0BFF]/g, '_');
    const safeBoy = (lastGroomName || 'Groom').replace(/[^a-zA-Z0-9_\u0B80-\u0BFF]/g, '_');
    const filename = `Porutham_${safeGirl}_${safeBoy}.pdf`;
    const opt = {
      margin: 0,
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false, scrollY: 0 },
      jsPDF: { unit: 'px', format: [790, 1115], orientation: 'portrait', hotfixes: ['px_scaling'] }
    };
    try {
      if (window.html2pdf) {
        await window.html2pdf().set(opt).from(lastPoruthamHtml).save();
      } else {
        window.print();
      }
    } catch (err) {
      console.error("PDF export error:", err);
      alert("PDF creation notice: " + err.message);
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = (window.AstroClient && window.AstroClient.getCurrentLanguage() === 'en') ? '📥 Download Matchmaking PDF' : '📥 திருமணப் பொருத்தம் PDF பதிவிறக்குக';
      }
    }
  }
  window.PoruthamClient = { switchAppTab, setupPlaceAutocomplete, calculatePorutham, downloadPoruthamPdf, getCurrentTab: () => currentTab };
  document.addEventListener('DOMContentLoaded', () => {
    setupPlaceAutocomplete('girl-place-input', 'girl-place-autocomplete-list', 'girl-lat', 'girl-lon');
    setupPlaceAutocomplete('boy-place-input', 'boy-place-autocomplete-list', 'boy-lat', 'boy-lon');
    const girlDob = document.querySelector('input[name="girl_dob"]');
    const boyDob = document.querySelector('input[name="boy_dob"]');
    if (girlDob && !girlDob.value) girlDob.value = '2000-06-15';
    if (boyDob && !boyDob.value) boyDob.value = '1998-04-20';
    if (currentTab === 'porutham') switchAppTab('porutham');
    else if (currentTab === 'numerology') switchAppTab('numerology');
  });
})();
