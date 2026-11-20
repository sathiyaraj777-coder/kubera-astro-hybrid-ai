/**
 * KUBERA ASTRO - MATCHMAKING PDF & TEMPLATE BUILDER
 * Strictly under 300 lines compliant (Rule 6).
 * 1:1 Pixel-Perfect Replica of Local Porutham Template Model
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.PoruthamPdfBuilder = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const PLANET_EN_ABBR = {
    'சுக்': 'Ve', 'கேது': 'Ke', 'சூரி': 'Su', 'புத': 'Me', 'சனி': 'Sa',
    'லக்': 'Lg', 'செவ்': 'Ma', 'மா': 'Md', 'சந்': 'Mo', 'குரு': 'Ju', 'ராகு': 'Ra'
  };

  const VEDIC_TERM_EN = {
    'மேஷம்': 'Aries', 'ரிஷபம்': 'Taurus', 'மிதுனம்': 'Gemini', 'கடகம்': 'Cancer',
    'சிம்மம்': 'Leo', 'கன்னி': 'Virgo', 'துலாம்': 'Libra', 'விருச்சிகம்': 'Scorpio',
    'தனுசு': 'Sagittarius', 'மகரம்': 'Capricorn', 'கும்பம்': 'Aquarius', 'மீனம்': 'Pisces',
    'அஸ்வினி': 'Ashwini', 'பரணி': 'Bharani', 'கிருத்திகை': 'Krittika', 'ரோகிணி': 'Rohini',
    'மிருகசீரிஷம்': 'Mrigashira', 'திருவாதிரை': 'Ardra', 'புனர்பூசம்': 'Punarvasu', 'பூசம்': 'Pushya',
    'ஆயில்யம்': 'Ashlesha', 'மகம்': 'Magha', 'பூரம்': 'Purva Phalguni', 'உத்திரம்': 'Uttara Phalguni',
    'அஸ்தம்': 'Hasta', 'சித்திரை': 'Chitra', 'சுவாதி': 'Swati', 'விசாகம்': 'Vishakha',
    'அனுஷம்': 'Anuradha', 'கேட்டை': 'Jyeshtha', 'மூலம்': 'Mula', 'பூராடம்': 'Purva Ashadha',
    'உத்திராடம்': 'Uttara Ashadha', 'திருவோணம்': 'Shravana', 'அவிட்டம்': 'Dhanishta', 'சதையம்': 'Shatabhisha',
    'பூரட்டாதி': 'Purva Bhadrapada', 'உத்திரட்டாதி': 'Uttara Bhadrapada', 'ரேவதி': 'Revati',
    'பாதம்': 'Pada'
  };

  function translateText(str, isEn) {
    if (!isEn || !str) return str || '';
    let out = String(str);
    for (const [k, v] of Object.entries(VEDIC_TERM_EN)) {
      out = out.split(k).join(v);
    }
    return out;
  }

  function translateBox(boxContent, isEn) {
    if (!isEn || !boxContent) return boxContent || '';
    let out = String(boxContent);
    for (const [k, v] of Object.entries(PLANET_EN_ABBR)) {
      out = out.split(`>${k}<`).join(`>${v}<`).split(`>${k}<br>`).join(`>${v}<br>`)
        .split(`<br>${k}<`).join(`<br>${v}<`).split(`<br>${k}<br>`).join(`<br>${v}<br>`)
        .split(`>${k}(வ)<`).join(`>${v}(R)<`).split(`<br>${k}(வ)<`).join(`<br>${v}(R)<`)
        .split(`${k}(வ)`).join(`${v}(R)`).split(k).join(v);
    }
    return out;
  }

  function buildRasiGrid(boxes, centerLabel, isEn) {
    const b = (boxes || []).map(cell => translateBox(cell, isEn));
    return `
      <div style="width:235px; height:235px; border:2px solid #000; display:grid; grid-template-columns:repeat(4,1fr); grid-template-rows:repeat(4,1fr); box-sizing:border-box;">
        <div style="border:1px solid #000; display:flex; align-items:center; justify-content:center; font-size:11px; line-height:1.15; text-align:center; font-weight:bold; padding:2px; grid-column:1; grid-row:1;">${b[0] || ''}</div>
        <div style="border:1px solid #000; display:flex; align-items:center; justify-content:center; font-size:11px; line-height:1.15; text-align:center; font-weight:bold; padding:2px; grid-column:2; grid-row:1;">${b[1] || ''}</div>
        <div style="border:1px solid #000; display:flex; align-items:center; justify-content:center; font-size:11px; line-height:1.15; text-align:center; font-weight:bold; padding:2px; grid-column:3; grid-row:1;">${b[2] || ''}</div>
        <div style="border:1px solid #000; display:flex; align-items:center; justify-content:center; font-size:11px; line-height:1.15; text-align:center; font-weight:bold; padding:2px; grid-column:4; grid-row:1;">${b[3] || ''}</div>
        <div style="border:1px solid #000; display:flex; align-items:center; justify-content:center; font-size:11px; line-height:1.15; text-align:center; font-weight:bold; padding:2px; grid-column:1; grid-row:2;">${b[4] || ''}</div>
        <div style="border:1px solid #000; display:flex; align-items:center; justify-content:center; font-size:11px; line-height:1.15; text-align:center; font-weight:bold; padding:2px; grid-column:4; grid-row:2;">${b[5] || ''}</div>
        <div style="border:1px solid #000; display:flex; align-items:center; justify-content:center; font-size:11px; line-height:1.15; text-align:center; font-weight:bold; padding:2px; grid-column:1; grid-row:3;">${b[6] || ''}</div>
        <div style="border:1px solid #000; display:flex; align-items:center; justify-content:center; font-size:11px; line-height:1.15; text-align:center; font-weight:bold; padding:2px; grid-column:4; grid-row:3;">${b[7] || ''}</div>
        <div style="border:1px solid #000; display:flex; align-items:center; justify-content:center; font-size:11px; line-height:1.15; text-align:center; font-weight:bold; padding:2px; grid-column:1; grid-row:4;">${b[8] || ''}</div>
        <div style="border:1px solid #000; display:flex; align-items:center; justify-content:center; font-size:11px; line-height:1.15; text-align:center; font-weight:bold; padding:2px; grid-column:2; grid-row:4;">${b[9] || ''}</div>
        <div style="border:1px solid #000; display:flex; align-items:center; justify-content:center; font-size:11px; line-height:1.15; text-align:center; font-weight:bold; padding:2px; grid-column:3; grid-row:4;">${b[10] || ''}</div>
        <div style="border:1px solid #000; display:flex; align-items:center; justify-content:center; font-size:11px; line-height:1.15; text-align:center; font-weight:bold; padding:2px; grid-column:4; grid-row:4;">${b[11] || ''}</div>
        <div style="grid-column:2/4; grid-row:2/4; border:1px solid #000; display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:bold; background-color:#fafafa;">${centerLabel}</div>
      </div>
    `;
  }

  function buildPrintableHtml(data, girlChart, boyChart, lang, brideName, groomName) {
    const isEn = lang === 'en';
    const safeG = brideName || (isEn ? 'Bride' : 'செல்வி');
    const safeB = groomName || (isEn ? 'Groom' : 'செல்வன்');
    
    // Extract base64 deity images from rawHtml or fallback
    const doc = new DOMParser().parseFromString(girlChart.rawHtml || '', 'text/html');
    const imgs = doc.querySelectorAll('img');
    const ganeshSrc = (imgs[0] && imgs[0].src) || '/assets/ganesha.png';
    const muruganSrc = (imgs[1] && imgs[1].src) || imgs[0]?.src || '/assets/murugan.png';

    const rows = (data.porutham_list || []).map((p, i) => {
      let statusHtml = '';
      if (p.status === 'good') {
        statusHtml = `<span style="font-weight:bold; color:#006600;">✔ ${p.result}</span>`;
      } else if (p.status === 'mid') {
        statusHtml = `<span style="font-weight:bold; color:#b86200;">▲ ${p.result}</span>`;
      } else {
        statusHtml = `<span style="font-weight:bold; color:#cc0000;">✖ ${p.result}</span>`;
      }

      return `
        <tr>
          <td style="text-align:center; border-bottom:0.5px solid #ddd; padding:3px 5px; font-weight:bold;">${i + 1}</td>
          <td style="border-bottom:0.5px solid #ddd; padding:3px 5px; font-weight:bold;">${p.name}</td>
          <td style="text-align:center; border-bottom:0.5px solid #ddd; padding:3px 5px;">${statusHtml}</td>
          <td style="border-bottom:0.5px solid #ddd; padding:3px 5px; font-size:11px; line-height:1.2;">${translateText(p.notes, isEn) || '-'}</td>
        </tr>
      `;
    }).join('');

    return `
      <div class="jathagam-root" style="background:#fff !important; color:#000 !important; font-family:'Noto Sans Tamil', Arial, sans-serif !important; width:790px !important; height:1115px !important; max-height:1115px !important; margin:0 auto !important; padding:18px 15px 12px 15px !important; box-sizing:border-box !important; display:flex !important; flex-direction:column !important; justify-content:space-between !important; overflow:hidden !important;">
        
        <!-- Header: Clean 3-Column Table Alignment without Address/Phone -->
        <table style="width:100% !important; border-collapse:collapse !important; margin-bottom:6px !important;">
          <tr>
            <td style="width:65px !important; vertical-align:middle !important; text-align:left !important; padding:0 !important;">
              <img src="${ganeshSrc}" alt="Lord Ganesha" style="width:60px !important; height:60px !important; object-fit:contain !important; display:block !important;">
            </td>
            <td style="vertical-align:middle !important; text-align:center !important; padding:0 10px !important;">
              <h1 style="font-size:24px !important; margin:0 0 2px 0 !important; color:#8b0000 !important; font-weight:bold !important; letter-spacing:normal !important; word-spacing:normal !important;">${isEn ? 'KUBERA ASTRO MATCHMAKING' : 'குபேரா திருமணப் பொருத்தம்'}</h1>
              <div style="font-size:14px !important; font-weight:bold !important; color:#000 !important; margin:1px 0 !important;">Kubera Astro • ${isEn ? 'Authentic Sidereal Vedic Compatibility' : 'திருமணப் பொருத்தம் கணிப்பு சேவை'}</div>
              <div style="font-size:11px !important; font-weight:bold !important; color:#b45309 !important; margin-top:1px !important;">Custom Web Applications, Software & Billing POS at Affordable Price • Kubera Tech (kuberanet.com)</div>
            </td>
            <td style="width:65px !important; vertical-align:middle !important; text-align:right !important; padding:0 !important;">
              <img src="${muruganSrc}" alt="Lord Murugan" style="width:60px !important; height:60px !important; object-fit:contain !important; display:block !important; margin-left:auto !important; transform:scale(1.1) !important;">
            </td>
          </tr>
        </table>

        <!-- Main Box with 3.5px double border -->
        <div style="border:3.5px double #000 !important; padding:8px 12px !important; margin-bottom:4px !important; width:100% !important; flex-grow:1 !important; display:flex !important; flex-direction:column !important; justify-content:space-between !important; box-sizing:border-box !important;">
          
          <!-- Top Section: Title & Sloka -->
          <div style="display:flex !important; justify-content:space-between !important; align-items:flex-end !important; margin-bottom:6px !important; border-bottom:1px solid #999 !important; padding-bottom:3px !important;">
            <div style="font-size:16px !important; font-weight:bold !important; color:#8b0000 !important;">
              ${isEn ? 'Couple Horoscope Compatibility Report' : 'மணமக்கள் பொருத்தம் அறிக்கை (Horoscope Compatibility)'}
            </div>
            <div style="text-align:right !important; font-size:9.5px !important; line-height:1.25 !important; color:#444 !important;">
              ${isEn ? 'Mangalyam Thanthunanena Mama Jeevana Hethuna<br>Kanthe Badhnami Subhage Thwam Jeeva Saradasatham' : 'மாங்கல்யம் தந்துனானேன மம ஜீவன ஹேதுனா<br>கண்டே பத்னாமி சுபகே த்வம் ஜீவ சரதஸ்ஸதம்'}
            </div>
          </div>

          <!-- Couple Details: Two Columns with Label : Value Grid -->
          <div style="display:flex !important; justify-content:space-between !important; gap:10px !important; margin-bottom:6px !important;">
            <!-- Bride Column -->
            <div style="flex:1 !important; border:1px solid #000 !important; padding:5px 8px !important; box-sizing:border-box !important;">
              <div style="font-size:12px !important; font-weight:bold !important; color:#8b0000 !important; border-bottom:1px solid #999 !important; padding-bottom:2px !important; margin-bottom:4px !important; text-align:center !important;">
                👰 ${isEn ? 'Bride Details' : 'பெண் விபரங்கள் (Bride)'}
              </div>
              <div style="display:flex; font-size:11px; margin-bottom:2px; line-height:1.3;"><div style="width:110px; font-weight:500; white-space:nowrap;">${isEn ? 'Name' : 'பெயர்'}</div><div style="width:12px; font-weight:bold; text-align:center;">:</div><div style="flex-grow:1; font-weight:bold;">${safeG}</div></div>
              <div style="display:flex; font-size:11px; margin-bottom:2px; line-height:1.3;"><div style="width:110px; font-weight:500; white-space:nowrap;">${isEn ? 'DOB & Time' : 'பிறந்த தேதி & நேரம்'}</div><div style="width:12px; font-weight:bold; text-align:center;">:</div><div style="flex-grow:1; font-weight:bold;">${girlChart.dob} (${girlChart.tob})</div></div>
              <div style="display:flex; font-size:11px; margin-bottom:2px; line-height:1.3;"><div style="width:110px; font-weight:500; white-space:nowrap;">${isEn ? 'Birth Place' : 'பிறந்த இடம்'}</div><div style="width:12px; font-weight:bold; text-align:center;">:</div><div style="flex-grow:1; font-weight:bold;">${girlChart.place}</div></div>
              <div style="display:flex; font-size:11px; margin-bottom:2px; line-height:1.3;"><div style="width:110px; font-weight:500; white-space:nowrap;">${isEn ? 'Lat / Long' : 'அட்ச/தீர்க்க ரேகை'}</div><div style="width:12px; font-weight:bold; text-align:center;">:</div><div style="flex-grow:1; font-weight:bold;">${girlChart.latLong || '-'}</div></div>
              <div style="display:flex; font-size:11px; margin-bottom:2px; line-height:1.3;"><div style="width:110px; font-weight:500; white-space:nowrap;">${isEn ? 'Lagna / Rasi' : 'லக்னம் / ராசி'}</div><div style="width:12px; font-weight:bold; text-align:center;">:</div><div style="flex-grow:1; font-weight:bold;">${translateText(girlChart.lagna, isEn)} / ${translateText(girlChart.rasi, isEn)}</div></div>
              <div style="display:flex; font-size:11px; margin-bottom:2px; line-height:1.3;"><div style="width:110px; font-weight:500; white-space:nowrap;">${isEn ? 'Nakshatra' : 'நட்சத்திரம்'}</div><div style="width:12px; font-weight:bold; text-align:center;">:</div><div style="flex-grow:1; font-weight:bold;">${translateText(girlChart.star, isEn)}</div></div>
            </div>

            <!-- Groom Column -->
            <div style="flex:1 !important; border:1px solid #000 !important; padding:5px 8px !important; box-sizing:border-box !important;">
              <div style="font-size:12px !important; font-weight:bold !important; color:#8b0000 !important; border-bottom:1px solid #999 !important; padding-bottom:2px !important; margin-bottom:4px !important; text-align:center !important;">
                🤵 ${isEn ? 'Groom Details' : 'ஆண் விபரங்கள் (Groom)'}
              </div>
              <div style="display:flex; font-size:11px; margin-bottom:2px; line-height:1.3;"><div style="width:110px; font-weight:500; white-space:nowrap;">${isEn ? 'Name' : 'பெயர்'}</div><div style="width:12px; font-weight:bold; text-align:center;">:</div><div style="flex-grow:1; font-weight:bold;">${safeB}</div></div>
              <div style="display:flex; font-size:11px; margin-bottom:2px; line-height:1.3;"><div style="width:110px; font-weight:500; white-space:nowrap;">${isEn ? 'DOB & Time' : 'பிறந்த தேதி & நேரம்'}</div><div style="width:12px; font-weight:bold; text-align:center;">:</div><div style="flex-grow:1; font-weight:bold;">${boyChart.dob} (${boyChart.tob})</div></div>
              <div style="display:flex; font-size:11px; margin-bottom:2px; line-height:1.3;"><div style="width:110px; font-weight:500; white-space:nowrap;">${isEn ? 'Birth Place' : 'பிறந்த இடம்'}</div><div style="width:12px; font-weight:bold; text-align:center;">:</div><div style="flex-grow:1; font-weight:bold;">${boyChart.place}</div></div>
              <div style="display:flex; font-size:11px; margin-bottom:2px; line-height:1.3;"><div style="width:110px; font-weight:500; white-space:nowrap;">${isEn ? 'Lat / Long' : 'அட்ச/தீர்க்க ரேகை'}</div><div style="width:12px; font-weight:bold; text-align:center;">:</div><div style="flex-grow:1; font-weight:bold;">${boyChart.latLong || '-'}</div></div>
              <div style="display:flex; font-size:11px; margin-bottom:2px; line-height:1.3;"><div style="width:110px; font-weight:500; white-space:nowrap;">${isEn ? 'Lagna / Rasi' : 'லக்னம் / ராசி'}</div><div style="width:12px; font-weight:bold; text-align:center;">:</div><div style="flex-grow:1; font-weight:bold;">${translateText(boyChart.lagna, isEn)} / ${translateText(boyChart.rasi, isEn)}</div></div>
              <div style="display:flex; font-size:11px; margin-bottom:2px; line-height:1.3;"><div style="width:110px; font-weight:500; white-space:nowrap;">${isEn ? 'Nakshatra' : 'நட்சத்திரம்'}</div><div style="width:12px; font-weight:bold; text-align:center;">:</div><div style="flex-grow:1; font-weight:bold;">${translateText(boyChart.star, isEn)}</div></div>
            </div>
          </div>

          <!-- Verdict & Scores Box -->
          <div style="border:1.5px solid #8b0000 !important; background:#fffdf5 !important; padding:5px 8px !important; text-align:center !important; margin-bottom:6px !important;">
            <div style="font-size:13px !important; font-weight:900 !important; color:#8b0000 !important; margin-bottom:2px !important;">${data.verdict_title}</div>
            <div style="font-size:11px !important; font-weight:bold !important; color:#0b3b95 !important;">
              ${isEn ? '10 Porutham' : '10 பொருத்தம்'}: <b>${data.score_10} / 10</b> &nbsp;|&nbsp; 
              ${isEn ? '12 Porutham' : '12 பொருத்தம்'}: <b>${data.score_12} / 12</b> &nbsp;|&nbsp;
              ${isEn ? 'Rajju' : 'ரஜ்ஜு'}: <b>${data.rajju_ok ? (isEn ? 'Compatible (Safe)' : 'உண்டு') : (isEn ? 'Incompatible (Rajju Dosham)' : 'இல்லை (ரஜ்ஜு தோஷம்)')}</b>
            </div>
          </div>

          <!-- Porutham Table -->
          <table style="width:100% !important; border-collapse:collapse !important; font-size:11px !important; margin-bottom:6px !important; border-top:1.5px solid #000 !important; border-bottom:1.5px solid #000 !important;">
            <thead>
              <tr style="border-bottom:1.5px solid #000 !important; background:#fafafa !important;">
                <th style="width:7% !important; padding:3px 5px !important; text-align:center !important; font-weight:bold !important;">${isEn ? 'S.No' : 'வ.எண்'}</th>
                <th style="width:25% !important; padding:3px 5px !important; text-align:left !important; font-weight:bold !important;">${isEn ? 'Porutham Name' : 'பொருத்தம் பெயர்'}</th>
                <th style="width:22% !important; padding:3px 5px !important; text-align:center !important; font-weight:bold !important;">${isEn ? 'Status' : 'முடிவு (Status)'}</th>
                <th style="padding:3px 5px !important; text-align:left !important; font-weight:bold !important;">${isEn ? 'Vedic Analysis & Explanation' : 'விளக்கம் & பலன் (Vedic Analysis)'}</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>

          <!-- Dosha Analysis Box -->
          <div style="border:1px solid #000 !important; padding:5px 8px !important; margin-bottom:6px !important; font-size:11px !important; line-height:1.3 !important;">
            <div style="font-weight:bold !important; color:#8b0000 !important; margin-bottom:3px !important; font-size:11.5px !important;">
              🪐 ${isEn ? 'Comprehensive Mars Dosha, Papa Samyam & Dasa Sandhi Analysis' : 'செவ்வாய் தோஷம், பாப சாம்யம் & தசா சந்தி முழு ஆய்வு (Comprehensive Vedic Synthesis)'}
            </div>
            <div style="margin-bottom:2px;"><b>👰 ${isEn ? 'Bride' : 'பெண்'}:</b> ${data.chevvai_girl_text} | ${isEn ? 'Malefic Points' : 'பாப புள்ளி'}: <b>${data.papa_girl_score}</b></div>
            <div style="margin-bottom:2px;"><b>🤵 ${isEn ? 'Groom' : 'ஆண்'}:</b> ${data.chevvai_boy_text} | ${isEn ? 'Malefic Points' : 'பாப புள்ளி'}: <b>${data.papa_boy_score}</b></div>
            <div><b>⚖️ ${isEn ? 'Papa Balance' : 'பாப சாம்யம்'}:</b> ${data.papa_verdict} &nbsp;|&nbsp; <b>⏳ ${isEn ? 'Dasa Transition' : 'தசா சந்தி'}:</b> ${data.dasa_sandhi_text}</div>
          </div>

          <!-- Dual Side-by-Side Rasi Charts -->
          <div style="display:flex !important; justify-content:space-around !important; margin-bottom:4px !important;">
            <div style="text-align:center !important;">
              <div style="font-size:11.5px !important; font-weight:bold !important; color:#8b0000 !important; margin-bottom:3px !important;">${isEn ? 'Bride Rasi Chart' : 'பெண் ராசி சக்கரம்'}</div>
              ${buildRasiGrid(girlChart.rasiBoxes, isEn ? 'Rasi (Bride)' : 'ராசி (பெண்)', isEn)}
            </div>
            <div style="text-align:center !important;">
              <div style="font-size:11.5px !important; font-weight:bold !important; color:#8b0000 !important; margin-bottom:3px !important;">${isEn ? 'Groom Rasi Chart' : 'ஆண் ராசி சக்கரம்'}</div>
              ${buildRasiGrid(boyChart.rasiBoxes, isEn ? 'Rasi (Groom)' : 'ராசி (ஆண்)', isEn)}
            </div>
          </div>

        </div> <!-- End of main-box -->

        <!-- Dual Domain Left-Right Footer -->
        <div style="display:flex !important; justify-content:space-between !important; align-items:center !important; width:100% !important; font-weight:bold !important; font-size:12px !important; margin-top:4px !important;">
          <span style="text-align:left !important;">kuberaastro.web.app</span>
          <span style="text-align:right !important;">kuberanet.com</span>
        </div>

      </div>
    `;
  }

  return { buildPrintableHtml };
});
