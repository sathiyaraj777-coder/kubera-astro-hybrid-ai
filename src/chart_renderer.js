/**
 * KUBERA ASTRO - CHART RENDERER & TRANSLATION ENGINE
 * Complete Tamil to English Vedic Astrological Translation Dictionary
 * Strictly under 300 lines compliant (Rule 6).
 */
(function () {
  'use strict';

  let currentGeneratedHtml = null;

  const RASI_MAP = {
    'மேஷம்': 'Aries', 'ரிஷபம்': 'Taurus', 'மிதுனம்': 'Gemini', 'கடகம்': 'Cancer',
    'சிம்மம்': 'Leo', 'கன்னி': 'Virgo', 'துலாம்': 'Libra', 'விருச்சிகம்': 'Scorpio',
    'தனுசு': 'Sagittarius', 'மகரம்': 'Capricorn', 'கும்பம்': 'Aquarius', 'மீனம்': 'Pisces'
  };

  const PLANET_MAP = {
    'லக்னம்': 'Ascendant (Lagna)', 'சூரியன்': 'Sun', 'சந்திரன்': 'Moon', 'செவ்வாய்': 'Mars',
    'புதன்': 'Mercury', 'குரு': 'Jupiter', 'சுக்கிரன்': 'Venus', 'சனி': 'Saturn',
    'ராகு': 'Rahu', 'கேது': 'Ketu', 'மாந்தி': 'Mandi', '(வ)': '(R)'
  };

  const NAKSHATRA_MAP = {
    'அஸ்வினி': 'Ashwini', 'பரணி': 'Bharani', 'கிருத்திகை': 'Krittika', 'ரோகிணி': 'Rohini',
    'மிருகசீரிஷம்': 'Mrigashira', 'திருவாதிரை': 'Ardra', 'புனர்பூசம்': 'Punarvasu', 'பூசம்': 'Pushya',
    'ஆயில்யம்': 'Ashlesha', 'மகம்': 'Magha', 'பூரம்': 'Purva Phalguni', 'உத்திரம்': 'Uttara Phalguni',
    'அஸ்தம்': 'Hasta', 'சித்திரை': 'Chitra', 'சுவாதி': 'Swati', 'விசாகம்': 'Vishakha',
    'அனுஷம்': 'Anuradha', 'கேட்டை': 'Jyeshtha', 'மூலம்': 'Mula', 'பூராடம்': 'Purva Ashadha',
    'உத்திராடம்': 'Uttara Ashadha', 'திருவோணம்': 'Shravana', 'அவிட்டம்': 'Dhanishta', 'சதையம்': 'Shatabhisha',
    'பூரட்டாதி': 'Purva Bhadrapada', 'உத்திரட்டாதி': 'Uttara Bhadrapada', 'ரேவதி': 'Revati'
  };

  const TAMIL_MONTHS_MAP = {
    'சித்திரை': 'Chithirai', 'வைகாசி': 'Vaikasi', 'ஆனி': 'Aani', 'ஆடி': 'Aadi',
    'ஆவணி': 'Aavani', 'புரட்டாசி': 'Purattasi', 'ஐப்பசி': 'Aippasi', 'கார்த்திகை': 'Karthigai',
    'மார்கழி': 'Margazhi', 'தை': 'Thai', 'மாசி': 'Maasi', 'பங்குனி': 'Panguni'
  };

  const TAMIL_YEARS_MAP = {
    'பிரபவ': 'Prabhava', 'விபவ': 'Vibhava', 'சுக்ல': 'Shukla', 'பிரமோதூத': 'Pramodoota',
    'பிரஜோத்பத்தி': 'Prajothpatti', 'ஆங்கீரச': 'Aangirasa', 'ஸ்ரீமுக': 'Sreemukha', 'பவ': 'Bhava',
    'யுவ': 'Yuva', 'தாது': 'Dhaatu', 'ஈஸ்வர': 'Eeshwara', 'பகுதானிய': 'Bahudhanya',
    'பிரமாதி': 'Pramathi', 'விக்கிரம': 'Vikrama', 'விஷு': 'Vishu', 'சித்திரபானு': 'Chithrabhanu',
    'சுபானு': 'Subhanu', 'தாரண': 'Dharana', 'பார்த்திப': 'Paarthiba', 'விய': 'Viya',
    'சர்வசித்து': 'Sarvajith', 'சர்வதாரி': 'Sarvadhari', 'விரோதி': 'Virodhi', 'விக்ருதி': 'Vikruthi',
    'கர': 'Kara', 'நந்தன': 'Nandhana', 'விஜய': 'Vijaya', 'ஜய': 'Jaya', 'மன்மத': 'Manmatha',
    'துன்முகி': 'Dhunmuki', 'ஹேவிளம்பி': 'Hevilambi', 'விளம்பி': 'Vilambi', 'விகாரி': 'Vikaari',
    'சார்வரி': 'Sharvari', 'பிலவ': 'Plava', 'சுபகிருது': 'Subhakrithu', 'சோபகிருது': 'Sobhakrithu',
    'குரோதி': 'Krodhi', 'விசுவாசு': 'Viswaavasu', 'பராபவ': 'Parabhava', 'பிலவங்க': 'Plavanga',
    'கீலக': 'Keelaka', 'சௌமிய': 'Saumya', 'சாதாரண': 'Sadharana', 'விரோதகிருது': 'Virodhikrithu',
    'பரிதாபி': 'Paridhaapi', 'பிரமாதீச': 'Pramaadheesa', 'ஆனந்த': 'Aanandha', 'ராட்சச': 'Raakshasa',
    'நள': 'Nala', 'பிங்கள': 'Pingala', 'காளயுக்தி': 'Kaalayukthi', 'சித்தார்த்தி': 'Siddharthi',
    'ரௌத்திரி': 'Raudhri', 'துன்மதி': 'Dhunmathi', 'துந்துபி': 'Dhundhubhi', 'ருத்ரோத்காரி': 'Rudhrothkaari',
    'ரக்தாட்சி': 'Raktakshi', 'குரோதன': 'Krodhana', 'அட்சய': 'Akshaya'
  };

  const NITYA_YOGA_MAP = {
    'சித்தயோகம்': 'Siddha Yoga', 'அமிர்தயோகம்': 'Amrita Yoga', 'மரணயோகம்': 'Marana Yoga',
    'பாலவம்': 'Balava', 'பவம்': 'Bava', 'கௌலவம்': 'Kaulava', 'தைதுலை': 'Taitula',
    'கரசை': 'Garaja', 'வணிசை': 'Vanija', 'பத்திரை': 'Vishti', 'சகுனி': 'Shakuni',
    'விஷ்கம்பம்': 'Vishkambha', 'ப்ரீதி': 'Priti', 'ஆயுஷ்மான்': 'Ayushman', 'சௌபாக்யம்': 'Saubhagya',
    'சோபனம்': 'Sobhana', 'அதிகண்டம்': 'Atiganda', 'சுகர்மம்': 'Sukarma', 'திருதி': 'Dhriti',
    'சூலம்': 'Shula', 'கண்டம்': 'Ganda', 'விருத்தி': 'Vriddhi', 'துருவம்': 'Dhruva',
    'வியாகாதம்': 'Vyaghata', 'ஹர்ஷணம்': 'Harshana', 'வஜ்ரம்': 'Vajra', 'சித்தி': 'Siddhi',
    'வியதிபாதம்': 'Vyatipata', 'வரியான்': 'Variyan', 'பரிகம்': 'Parigha', 'சிவம்': 'Shiva',
    'சித்தம்': 'Siddha', 'சாத்தியம்': 'Sadhya', 'சுபம்': 'Shubha', 'சுப்ரம்': 'Shukla',
    'பிராம்மம்': 'Brahma', 'ஐந்திரம்': 'Indra', 'வைதிருதி': 'Vaidhriti'
  };

  const TITHI_MAP = {
    'பிரதமை': 'Prathama (Tithi 1)', 'துவிதியை': 'Dvitiya (Tithi 2)', 'திருதியை': 'Tritiya (Tithi 3)',
    'சதுர்த்தி': 'Chaturthi (Tithi 4)', 'பஞ்சமி': 'Panchami (Tithi 5)', 'சஷ்டி': 'Shasthi (Tithi 6)',
    'சப்தமி': 'Saptami (Tithi 7)', 'அஷ்டமி': 'Ashtami (Tithi 8)', 'நவமி': 'Navami (Tithi 9)',
    'தசமி': 'Dashami (Tithi 10)', 'ஏகாதசி': 'Ekadashi (Tithi 11)', 'துவாதசி': 'Dvadashi (Tithi 12)',
    'திரயோதசி': 'Trayodashi (Tithi 13)', 'சதுர்த்தசி': 'Chaturdashi (Tithi 14)',
    'பௌர்ணமி': 'Purnima (Full Moon)', 'அமாவாசை': 'Amavasya (New Moon)'
  };

  const PHRASES_MAP = {
    'ஜென்னீ ஜென்ம சௌக்கியானாம் வர்த்தனி குலசம்பதாம்': 'Janani Janma Saukhyanam Vardhani Kula Sampadam',
    'பதவிபூர்வ புண்யானாம் லிக்யதே ஜென்ம பத்திரிகாஸ்ரீஸ்ரீ': 'Padavi Poorva Punyanam Likhyate Janma Patrika',
    'துல்லியமான நிராயன கிரக நிலைகள் ( திருக்கணித பஞ்சாங்கம் )': 'Authentic Sidereal Nirayana Planetary Coordinates (Thirukanitha Panchangam - Lahiri Ayanamsa)',
    'துல்லியமான நிராயன கிரக Dignityகள் ( திருக்கணித பஞ்சாங்கம் )': 'Authentic Sidereal Nirayana Planetary Coordinates (Thirukanitha Panchangam - Lahiri Ayanamsa)',
    'அட்ச/தீர்க்க-ரேகை': 'Latitude / Longitude', 'அட்ச/தீர்க்க ரேகை': 'Latitude / Longitude',
    'பொதுநேரம்-திருத்தம்': 'Standard Time Zone', 'பக்ஷம்-திதி': 'Paksha - Tithi',
    'யோகம்-கரணம்': 'Yoga - Karana', 'தமிழ் தேதி': 'Tamil Solar Date',
    'திதி சூன்யம்': 'Tithi Soonyam', 'நக்ஷத்திர எழுத்து': 'Name Letters (Akshara)',
    'உதயாதி நாழிகை': 'Udayathi Nazhigai', 'சூரிய உதயம்': 'Sunrise', 'சூரிய அஸ்தமனம்': 'Sunset',
    'தசை இருப்பு': 'Dasa Balance at Birth:', 'தசை': 'Dasa', 'புத்தி': 'Bhukti', 'அந்தரம்': 'Antharam',
    'வருடம்': 'Years,', 'மாதம்': 'Months,', 'நாள்': 'Days', 'நடப்பு': 'Current:',
    'பாவக சமநிலை': 'Bhava Balance: Normal', 'சூன்யம் இல்லை': 'None',
    'தேய்பிறை (கிருஷ்ண)': 'Krishna Paksha (Waning)', 'வளர்பிறை (சுக்ல)': 'Shukla Paksha (Waxing)',
    'செவ்வாய் கிழமை': 'Tuesday', 'செவ்வாய்க்கிழமை': 'Tuesday',
    'புதன் கிழமை': 'Wednesday', 'புதன்கிழமை': 'Wednesday', 'சனிக்கிழமை': 'Saturday',
    'அவயோக நட்சத்திரம்': 'Avayoga Star', 'யோக நட்சத்திரம்': 'Yoga Star',
    'அவயோகி': 'Avayogi', 'யோகி': 'Yogi', 'நித்ய யோகம்': 'Nitya Yoga',
    'பாகை-கலை': 'Longitude', 'நட்-அதிபதி': 'Star Lord', 'பாதம்': 'Pada',
    'உச்சம்': 'Exalted', 'நீச்சம்': 'Debilitated', 'ஆட்சி': 'Own House',
    'நட்பு': 'Friendly', 'பகை': 'Enemy House', 'சமம்': 'Neutral',
    'கிரகம்': 'Planet', 'நட்சத்திரம்': 'Nakshatra', 'ராசி': 'Sign (Rasi)', 'நிலை': 'Dignity',
    'தந்தை': 'Father', 'தாய்': 'Mother', 'தேதி': 'Date of Birth', 'நேரம்': 'Time of Birth',
    'இடம்': 'Place of Birth', 'பாலினம்': 'Gender', 'ஆண்': 'Male', 'பெண்': 'Female',
    'கிழமை': 'Vedic Day', 'ஜாதகர்': 'Native', 'குபேரா ஜாதகம்': 'KUBERA ASTRO HOROSCOPE'
  };

  const DAYS_MAP = {
    'ஞாயிறு': 'Sunday', 'திங்கள்': 'Monday', 'செவ்வாய்': 'Tuesday',
    'புதன்': 'Wednesday', 'வியாழன்': 'Thursday', 'வெள்ளி': 'Friday', 'சனி': 'Saturday'
  };

  function translateHtmlToEnglish(html) {
    let out = html.replace('<div class="chart-center">ராசி</div>', '<div class="chart-center">RASI</div>')
      .replace('<div class="chart-center">நவாம்சம்</div>', '<div class="chart-center">NAVAMSA</div>')
      .replace('<h1>குபேரா ஜாதகம்</h1>', '<h1>KUBERA ASTRO HOROSCOPE</h1>');

    const CHART_BOX_MAP = {
      'சுக்': 'Ve', 'கேது': 'Ke', 'சூரி': 'Su', 'புத': 'Me', 'சனி': 'Sa',
      'லக்': 'Lg', 'செவ்': 'Ma', 'மா': 'Md', 'சந்': 'Mo', 'குரு': 'Ju', 'ராகு': 'Ra'
    };
    for (const [k, v] of Object.entries(CHART_BOX_MAP)) {
      out = out.split(`>${k}<`).join(`>${v}<`).split(`>${k}<br>`).join(`>${v}<br>`)
        .split(`<br>${k}<`).join(`<br>${v}<`).split(`<br>${k}<br>`).join(`<br>${v}<br>`)
        .split(`>${k}(வ)<`).join(`>${v}(R)<`).split(`<br>${k}(வ)<`).join(`<br>${v}(R)<`)
        .split(`${k}-`).join(`${v}-`);
    }

    const replaceDict = (dict) => {
      for (const [k, v] of Object.entries(dict)) { out = out.split(k).join(v); }
    };

    [PHRASES_MAP, TITHI_MAP, PLANET_MAP, DAYS_MAP, RASI_MAP, NAKSHATRA_MAP, NITYA_YOGA_MAP, TAMIL_MONTHS_MAP, TAMIL_YEARS_MAP].forEach(replaceDict);
    out = out.replace(/[\u0B80-\u0BFF]+\s*\(([A-Za-z]+)\)/g, '$1')
      .replace(/\(?\s*[\u0B80-\u0BFF]+\s*(\d+):\s*([A-Za-z]+)\s*\)?/g, '(Pada $1: $2)')
      .replace(/Years,\s*-\s*/g, 'Year - ').replace(/Days/g, 'Day');
    return out;
  }

  function cleanAddressAndContacts(html) {
    if (!html) return html;
    let out = html.replace(/<div class="sub-head">[\s\S]*?<\/div>/gi, '')
      .replace(/<div class="tagline">[\s\S]*?<\/div>/gi, '')
      .replace(/நெ\.3\/11[^<]*/gi, '').replace(/No\.3\/11[^<]*/gi, '')
      .replace(/செல்:\s*8610353788/gi, '').replace(/Phone:\s*\+91\s*8610353788/gi, '')
      .replace(/body\s*,\s*html\s*\{[^}]*\}/gi, '')
      .replace(/<div class=["']website["']>[\s\S]*?<\/div>/gi, '<div class="website" style="display:flex;justify-content:space-between;align-items:center;font-weight:bold;margin-top:5px;font-size:13px;padding:0 4px;"><span class="site-addr" style="text-align:left;color:#1a1a1a;">kuberaastro.web.app</span><span class="site-parent" style="text-align:right;color:#1a1a1a;">kuberanet.com</span></div>');

    if (out.includes('class="header"') && !out.includes('header-table')) {
      const gMatch = out.match(/class=["']god-img left["'][^>]*><img\s+src=["']([^"']+)["']/i);
      const mMatch = out.match(/class=["']god-img right["'][^>]*><img\s+src=["']([^"']+)["']/i);
      const tMatch = out.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
      const gSrc = gMatch ? gMatch[1] : '';
      const mSrc = mMatch ? mMatch[1] : '';
      const title = tMatch ? tMatch[1].trim() : 'குபேரா ஜாதகம்';
      
      const newHeader = `
        <table class="header-table" style="width: 100%; border-collapse: collapse; margin-bottom: 4px;">
            <tr>
                <td style="width: 65px; vertical-align: middle; text-align: left; padding: 0;">
                    <img src="${gSrc}" alt="Lord Ganesha" style="width: 60px; height: 60px; object-fit: contain; display: block;">
                </td>
                <td style="vertical-align: middle; text-align: center; padding: 0 10px;">
                    <h1 style="font-size: 24px; margin: 0 0 2px 0; color: #8b0000; letter-spacing: 0.5px;">${title}</h1>
                    <div class="company" style="font-size: 15px; font-weight: bold; color: #000; margin: 2px 0;">Kubera Astro • Free Vedic Astrology Service</div>
                    <div class="ad-banner-line" style="font-size: 11px; font-weight: 700; color: #b45309; margin-top: 1px; letter-spacing: 0.2px;">Custom Web Applications, Software & Billing POS at Affordable Price • Kubera Tech (kuberanet.com)</div>
                </td>
                <td style="width: 65px; vertical-align: middle; text-align: right; padding: 0;">
                    <img src="${mSrc}" alt="Lord Murugan" style="width: 60px; height: 60px; object-fit: contain; display: block; margin-left: auto;">
                </td>
            </tr>
        </table>
      `;
      out = out.replace(/<div class=["']header["']>[\s\S]*?<\/div>\s*(?=<div class=["']main-box["']>)/i, newHeader);
    }

    const headerFix = `
      <style>
        .header-table { width: 100% !important; border-collapse: collapse !important; margin-bottom: 4px !important; }
        .header-table td { padding: 0 !important; vertical-align: middle !important; border: none !important; }
        .header-table img { max-height: 60px !important; max-width: 60px !important; object-fit: contain !important; display: block !important; }
        .main-box { margin-top: 4px !important; }
        .planet-table th { padding: 1.5px 2px !important; font-size: 11px !important; }
        .planet-table td { padding: 1px 2px !important; font-size: 11px !important; line-height: 1.15 !important; }
        .planet-table-section { margin-bottom: 4px !important; }
      </style>
    `;
    return out.replace('</head>', headerFix + '</head>');
  }

  function sanitizeWeekdayAccuracy(html, formData, isEn) {
    if (!html || !formData) return html;
    try {
      const dob = formData.get('dob') || '';
      const tob = formData.get('tob') || '12:00';
      const dayCalcMode = formData.get('day_calc_mode') || 'vedic';
      if (!dob) return html;

      const srMatch = html.match(/சூரிய உதயம்.*?<div class=["']value["']>([^<]+)<\/div>/i) ||
                      html.match(/Sunrise.*?<div class=["']value["']>([^<]+)<\/div>/i);
      const srStr = srMatch ? srMatch[1].trim() : '06:00:00 AM';

      function parseMins(tStr) {
        const clean = tStr.trim().toUpperCase();
        const isPm = clean.includes('PM');
        const isAm = clean.includes('AM');
        const numPart = clean.replace(/AM|PM/g, '').trim();
        const [h, m] = numPart.split(':').slice(0, 2).map(Number);
        let hrs = h || 0;
        if (isPm && hrs < 12) hrs += 12;
        if (isAm && hrs === 12) hrs = 0;
        return hrs * 60 + (m || 0);
      }

      const parts = dob.replace(/\//g, '-').split('-').map(Number);
      const y = parts[0] > 1000 ? parts[0] : parts[2];
      const m = parts[1] - 1;
      const d = parts[0] > 1000 ? parts[2] : parts[0];

      const targetDate = new Date(y, m, d);
      if (dayCalcMode === 'vedic' && parseMins(tob) < parseMins(srStr)) {
        targetDate.setDate(targetDate.getDate() - 1);
      }

      const taDays = ['ஞாயிறு', 'திங்கள்', 'செவ்வாய்', 'புதன்', 'வியாழன்', 'வெள்ளி', 'சனி'];
      const enDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const correctDay = isEn ? enDays[targetDate.getDay()] : taDays[targetDate.getDay()];
      const pattern = /(<div class=["']label["']>\s*(?:கிழமை|Vedic Day)\s*<\/div>\s*<div class=["']colon["']>:<\/div>\s*<div class=["']value["']>)([^<]*)(<\/div>)/i;
      return html.replace(pattern, `$1${correctDay}$3`);
    } catch (e) { return html; }
  }

  function renderFromBackendHtml(htmlText, formData) {
    const isEn = window.AstroClient?.getCurrentLanguage?.() === 'en';
    const cleanedHtml = cleanAddressAndContacts(htmlText);
    const isAlreadyEnglish = cleanedHtml.includes('KUBERA ASTRO HOROSCOPE');
    let finalHtml = (isEn && !isAlreadyEnglish) ? translateHtmlToEnglish(cleanedHtml) : cleanedHtml;
    finalHtml = sanitizeWeekdayAccuracy(finalHtml, formData, isEn);
    currentGeneratedHtml = finalHtml;

    const previewContainer = document.getElementById('horoscope-preview-area');
    const emptyState = document.getElementById('horoscope-empty-state');
    const resultCard = document.getElementById('horoscope-result-card');
    const toolbar = document.getElementById('horoscope-toolbar');

    if (emptyState) emptyState.style.display = 'none';
    if (resultCard) resultCard.style.display = 'block';
    if (toolbar) toolbar.style.display = 'flex';

    if (previewContainer) {
      previewContainer.innerHTML = finalHtml;
    }

    if (window.AIConsultantClient?.init) {
      window.AIConsultantClient.init();
    }

    resultCard?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  async function downloadFullPdf() {
    if (!currentGeneratedHtml) {
      alert("No horoscope generated yet.");
      return;
    }

    const btn = document.getElementById('btn-download-pdf');
    if (btn) { btn.disabled = true; btn.innerHTML = '⏳ PDF தயாராகிறது... (Compiling)'; }

    try {
      const opt = {
        margin: 0,
        filename: 'Kubera_Astro_Jathagam.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false, scrollY: 0 },
        jsPDF: { unit: 'px', format: [790, 1115], orientation: 'portrait', hotfixes: ['px_scaling'] }
      };

      if (window.html2pdf) {
        await window.html2pdf().set(opt).from(currentGeneratedHtml).save();
      } else {
        window.print();
      }

    } catch (err) {
      alert("Failed to compile PDF: " + err.message);
    } finally {
      if (btn) {
        const isEn = window.AstroClient?.getCurrentLanguage?.() === 'en';
        btn.disabled = false;
        btn.innerHTML = isEn ? '📥 Download Full Horoscope PDF' : '📥 முழு ஜாதகம் PDF பதிவிறக்குக (Download PDF)';
      }
    }
  }

  window.ChartRenderer = {
    renderFromBackendHtml,
    downloadFullPdf,
    translateHtmlToEnglish
  };
})();
