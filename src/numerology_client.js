/**
 * KUBERA ASTRO - NUMEROLOGY CLIENT CONTROLLER
 * Handles tab switching, live analysis, and PDF export for Vedic Numerology.
 * Strictly under 300 lines compliant (Rule 6).
 */
(function (root) {
  'use strict';

  var lastNumerologyHtml = null;
  var lastPersonName = '';

  function init() {
    var form = document.getElementById('numerology-input-form');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        runAnalysis();
      });
    }
  }

  function runAnalysis() {
    var nameInp = document.getElementById('num_input_name');
    var dobInp = document.getElementById('num_input_dob');
    if (!nameInp || !dobInp) return;

    var name = nameInp.value.trim();
    var dob = dobInp.value.trim();
    if (!name || !dob) {
      alert("தயவுசெய்து பெயர் மற்றும் பிறந்த தேதியை உள்ளிடவும்.");
      return;
    }

    lastPersonName = name;
    var lang = (root.AstroClient && root.AstroClient.getCurrentLanguage()) || 'ta';
    var isTa = (lang !== 'en');

    var btn = document.getElementById('btn-num-calculate');
    var loading = document.getElementById('num-live-loading');
    if (btn) btn.style.display = 'none';
    if (loading) loading.style.display = 'block';

    try {
      // 1. Instant client-side calculation
      var data = root.NumerologyEngine ? root.NumerologyEngine.analyze(name, dob, lang) : null;
      if (data) {
        renderResults(data, isTa);
        // Pre-render local pixel-perfect PDF HTML
        if (root.NumerologyPdfBuilder) {
          lastNumerologyHtml = root.NumerologyPdfBuilder.buildHtml(data, lang);
        }
      }
    } catch (e) {
      console.error("Numerology calculation error:", e);
    } finally {
      if (btn) btn.style.display = 'block';
      if (loading) loading.style.display = 'none';
    }
  }

  function renderResults(d, isTa) {
    var resultsBox = document.getElementById('numerology-results-box');
    if (!resultsBox) return;
    resultsBox.style.display = 'block';

    var bVal = document.getElementById('num-res-birth-val');
    var bSub = document.getElementById('num-res-birth-sub');
    var dVal = document.getElementById('num-res-destiny-val');
    var dSub = document.getElementById('num-res-destiny-sub');
    var nVal = document.getElementById('num-res-name-val');
    var nSub = document.getElementById('num-res-name-sub');

    if (bVal) bVal.innerText = d.birth_number;
    if (bSub) bSub.innerText = d.birth_planet;
    if (dVal) dVal.innerText = d.destiny_number;
    if (dSub) dSub.innerText = d.destiny_planet;
    if (nVal) nVal.innerText = d.name_number;
    if (nSub) nSub.innerText = (isTa ? 'கூட்டு: ' : 'Compound: ') + d.chaldean_compound;

    var vBox = document.getElementById('num-res-verdict-box');
    if (vBox) {
      vBox.className = 'verdict-box ' + d.harmony_class;
      vBox.innerText = (isTa ? 'ஒத்திசைவு: ' : 'Harmony: ') + d.harmony_status + " (" + d.harmony_score + "%)";
    }

    var tbody = document.getElementById('num-res-tbody');
    if (tbody) {
      tbody.innerHTML = [
        '<tr><td><b>' + (isTa ? 'பிறவி எண் (மூல எண்)' : 'Birth Number') + '</b></td><td><b style="color:var(--accent-gold);">' + d.birth_number + '</b></td><td>' + d.birth_planet + '</td><td>' + d.birth_traits + '</td></tr>',
        '<tr><td><b>' + (isTa ? 'விதி எண் (பாக்கிய எண்)' : 'Destiny Number') + '</b></td><td><b style="color:var(--accent-gold);">' + d.destiny_number + '</b></td><td>' + d.destiny_planet + '</td><td>' + d.destiny_traits + '</td></tr>',
        '<tr><td><b>' + (isTa ? 'பெயர் எண் (சால்டியன் முறை)' : 'Name Number (Chaldean)') + '</b></td><td><b style="color:var(--accent-gold);">' + d.name_number + '</b></td><td>' + d.name_planet + '</td><td>' + d.name_traits + '</td></tr>',
        '<tr><td><b>' + (isTa ? 'பித்தாகரஸ் பெயர் எண்' : 'Pythagorean Name Number') + '</b></td><td><b style="color:var(--accent-gold);">' + d.pythagorean_number + '</b></td><td>' + d.name_planet + '</td><td>' + (isTa ? 'கூட்டு எண்: ' : 'Compound: ') + d.pythagorean_compound + '</td></tr>'
      ].join('');
    }

    var colors = document.getElementById('num-res-colors');
    var gems = document.getElementById('num-res-gems');
    var days = document.getElementById('num-res-days');
    var friends = document.getElementById('num-res-friends');
    var enemies = document.getElementById('num-res-enemies');

    if (colors) colors.innerText = d.lucky_colors.join(', ');
    if (gems) gems.innerText = d.lucky_gems.join(', ');
    if (days) days.innerText = d.lucky_days.join(', ');
    if (friends) friends.innerText = d.friendly_numbers.join(', ');
    if (enemies) enemies.innerText = d.enemy_numbers.length ? d.enemy_numbers.join(', ') : (isTa ? 'எதுவுமில்லை' : 'None');

    resultsBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function downloadNumerologyPdf() {
    if (!lastNumerologyHtml) {
      alert("முதலில் எண் கணிதம் கணிக்கவும்.");
      return;
    }

    var tempDiv = document.createElement('div');
    tempDiv.style.position = 'fixed';
    tempDiv.style.top = '0';
    tempDiv.style.left = '0';
    tempDiv.style.width = '790px';
    tempDiv.style.zIndex = '-99999';
    tempDiv.style.background = '#ffffff';
    tempDiv.innerHTML = lastNumerologyHtml;
    document.body.appendChild(tempDiv);

    var elementToPrint = tempDiv.querySelector('.jathagam-root') || tempDiv;
    var filename = 'Numerology_' + (lastPersonName || 'Report').replace(/\s+/g, '_') + '.pdf';
    var opt = {
      margin: 0,
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false, scrollY: 0, scrollX: 0 },
      jsPDF: { unit: 'px', format: [790, 1115], orientation: 'portrait', hotfixes: ['px_scaling'] }
    };

    try {
      html2pdf().set(opt).from(elementToPrint).save();
    } finally {
      setTimeout(function () {
        if (tempDiv.parentNode) tempDiv.parentNode.removeChild(tempDiv);
      }, 1000);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  root.NumerologyClient = {
    runAnalysis: runAnalysis,
    reRenderOnLanguageChange: function () { if (lastPersonName) runAnalysis(); },
    downloadNumerologyPdf: downloadNumerologyPdf
  };
})(window);
