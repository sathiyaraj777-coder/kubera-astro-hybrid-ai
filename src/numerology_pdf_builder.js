/**
 * KUBERA ASTRO - NUMEROLOGY PDF BUILDER
 * Generates pure Tamil or pure English 1-page PDF printable HTML.
 * Strictly under 300 lines compliant (Rule 6).
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.NumerologyPdfBuilder = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  function buildHtml(data, lang) {
    var isTa = (lang !== 'en');
    var imgs = document.querySelectorAll('.header-brand img, .site-header img');
    var ganeshSrc = (imgs[0] && imgs[0].src) || '/assets/ganesha.png';
    var muruganSrc = (imgs[1] && imgs[1].src) || imgs[0]?.src || '/assets/murugan.png';

    var headerTitle = isTa ? 'குபேரா எண் கணிதம்' : 'KUBERA NUMEROLOGY';
    var headerSub = isTa
      ? 'குபேரா ஆஸ்ட்ரோ • வேத &amp; சால்டியன் எண் கணித அறிக்கை'
      : 'Kubera Astro • Authentic Chaldean &amp; Pythagorean Numerology Report';
    var headerAgency = isTa
      ? 'வலைத்தளங்கள், மென்பொருள் மற்றும் பில்லிங் ஆப் தயாரிப்பு • குபேரா டெக் (kuberanet.com)'
      : 'Custom Web Applications, Software &amp; Billing POS at Affordable Price • Kubera Tech (kuberanet.com)';

    var topHeading = isTa ? 'வேத எண் கணித ஆய்வு அறிக்கை' : 'Vedic Numerology Analysis Report';
    var nameLabel = isTa ? 'பெயர்:' : 'Name:';
    var dobLabel = isTa ? 'பிறந்த தேதி:' : 'Date of Birth:';
    var mantra = isTa
      ? 'ஓம் நமோ பகவதே வாசுதேவாய<br>சர்வ மங்கள மாங்கல்யே சிவே சர்வார்த்த சாதிகே'
      : 'Om Namo Bhagavate Vasudevaya<br>Sarva Mangala Mangalye Shive Sarvartha Sadhike';

    var bTitle = isTa ? 'பிறவி எண் (மூல எண்)' : 'Birth Number';
    var dTitle = isTa ? 'விதி எண் (பாக்கிய எண்)' : 'Destiny Number';
    var nTitle = isTa ? 'பெயர் எண் (நாம எண்)' : 'Name Number';
    var compoundLabel = isTa ? 'கூட்டு: ' : 'Compound: ';

    var harmonyHead = isTa
      ? ('பெயர் & பிறவி எண் பொருத்தம்: ' + data.harmony_status)
      : ('Name & Birth Number Harmony: ' + data.harmony_status);
    var harmonySub = isTa
      ? ('பொருத்தக் குறியீடு: ' + data.harmony_score + '% | சால்டியன் முறை & பித்தாகரஸ் எண்: ' + data.pythagorean_number + ' (கூட்டு: ' + data.pythagorean_compound + ')')
      : ('Compatibility Index: ' + data.harmony_score + '% | Chaldean System & Pythagorean Number: ' + data.pythagorean_number + ' (Compound: ' + data.pythagorean_compound + ')');

    var thAspect = isTa ? 'அம்சம்' : 'Aspect';
    var thNumber = isTa ? 'எண்' : 'Number';
    var thPlanet = isTa ? 'அதிபதி கிரகம்' : 'Ruling Planet';
    var thTraits = isTa ? 'தத்துவக் குணங்கள் & பலன்கள்' : 'Vedic Energy, Significance & Traits';

    var bAspectSub = isTa ? 'பிறந்த தேதியின் ஆற்றல்' : 'Energy of Day of Birth';
    var dAspectSub = isTa ? 'முழு தேதியின் விதிப் பலன்' : 'Full Life Path Destiny';
    var nAspectSub = isTa ? ('சால்டியன் கூட்டு எண்: ' + data.chaldean_compound) : ('Chaldean Compound: ' + data.chaldean_compound);

    var favHead = isTa ? '🍀 அதிர்ஷ்டக் காரணிகள்' : '🍀 Favorable Attributes';
    var cLbl = isTa ? 'அதிர்ஷ்ட வண்ணங்கள்:' : 'Lucky Colors:';
    var gLbl = isTa ? 'அதிர்ஷ்ட ரத்தினம்:' : 'Auspicious Gemstone:';
    var dLbl = isTa ? 'அதிர்ஷ்ட கிழமைகள்:' : 'Favorable Days:';

    var compHead = isTa ? '🔢 எண் இணக்கத்தன்மை' : '🔢 Numeric Compatibility';
    var fLbl = isTa ? 'நட்பு எண்கள்:' : 'Friendly Numbers:';
    var eLbl = isTa ? 'தவிர்க்க வேண்டிய எண்கள்:' : 'Numbers to Avoid:';
    var succLbl = isTa ? 'வெற்றி தரும் தேதிகள்:' : 'Favorable Dates:';
    var noneText = isTa ? 'எதுவுமில்லை' : 'None';

    var bNum = data.birth_number;
    var succDates = [bNum, bNum + 9, (bNum + 18 <= 31 ? bNum + 18 : null)].filter(Boolean).join(', ');

    var guidanceTitle = isTa ? '💡 வேத எண் கணித வழிகாட்டல்:' : '💡 Vedic Numerology Guidance:';
    var guidanceText = isTa
      ? 'பெயர் எண் மற்றும் பிறவி எண் ஆகியவை ஒன்றுக்கொன்று நட்பு அதிர்வில் அமைவது வாழ்க்கையில் தொடர் வெற்றி, ஆரோக்கியம் மற்றும் தொழில் முன்னேற்றத்தை வழங்கும். அதிர்ஷ்ட தேதிகள் மற்றும் கிழமைகளில் முக்கிய ஒப்பந்தங்கள் மற்றும் புதிய முயற்சிகளைத் தொடங்குவது சுப பலன்களைப் பெருக்கும்.'
      : 'When your Name Number vibrates in harmony with your Birth Number, it accelerates success, career prosperity, good health, and recognition. Scheduling key business launches and agreements on favorable dates and days multiplies positive outcomes.';

    return [
      '<div class="jathagam-root" style="margin:0 !important; padding:0 !important; width:790px !important; height:1115px !important; max-height:1115px !important; overflow:hidden !important; box-sizing:border-box !important; background:#fff !important; display:block !important; font-family:\'Mukta Malar\', Arial, sans-serif !important; color:#000 !important;">',
      '  <div class="container" style="padding:24px 18px 20px 18px !important; width:100% !important; height:1115px !important; max-height:1115px !important; margin:0 auto !important; box-sizing:border-box !important; display:flex !important; flex-direction:column !important; justify-content:flex-start !important;">',
      '    <table style="width:100% !important; border-collapse:collapse !important; margin-bottom:12px !important;">',
      '      <tr>',
      '        <td style="width:65px; vertical-align:middle; text-align:left; padding:0;">',
      '          <img src="' + ganeshSrc + '" alt="Lord Ganesha" style="width:60px; height:60px; object-fit:contain; display:block;">',
      '        </td>',
      '        <td style="vertical-align:middle; text-align:center; padding:0 10px;">',
      '          <h1 style="font-size:24px; margin:0 0 2px 0; color:#8b0000; font-weight:bold; letter-spacing:normal;">' + headerTitle + '</h1>',
      '          <div style="font-size:14px; font-weight:bold; color:#000; margin:1px 0;">' + headerSub + '</div>',
      '          <div style="font-size:11px; font-weight:bold; color:#b45309; margin-top:1px;">' + headerAgency + '</div>',
      '        </td>',
      '        <td style="width:65px; vertical-align:middle; text-align:right; padding:0;">',
      '          <img src="' + muruganSrc + '" alt="Lord Murugan" style="width:60px; height:60px; object-fit:contain; display:block; margin-left:auto; transform:scale(1.1);">',
      '        </td>',
      '      </tr>',
      '    </table>',
      '    <div style="border:3.5px double #000 !important; padding:14px 16px !important; margin-bottom:10px !important; width:100% !important; display:block !important; box-sizing:border-box !important; flex-grow:0 !important;">',
      '      <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:11px; border-bottom:1.5px solid #8b0000; padding-bottom:6px;">',
      '        <div>',
      '          <div style="font-size:15.5px; font-weight:800; color:#8b0000;">' + topHeading + '</div>',
      '          <div style="font-size:13px; font-weight:800; color:#000; margin-top:3px;">',
      '            ' + nameLabel + ' <span style="font-size:14.5px; font-weight:900; color:#8b0000; text-transform:uppercase;">' + data.name + '</span> &nbsp;|&nbsp; ' + dobLabel + ' <span style="font-weight:bold; color:#111;">' + data.dob + '</span>',
      '          </div>',
      '        </div>',
      '        <div style="text-align:right; font-size:10px; line-height:1.5; color:#444;">' + mantra + '</div>',
      '      </div>',
      '      <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:12px; margin-bottom:11px;">',
      '        <div style="border:1px solid #000; border-radius:5px; padding:9px 6px; text-align:center; background:#fafafa;">',
      '          <div style="font-size:12px; font-weight:bold; color:#8b0000; border-bottom:1px solid #ccc; padding-bottom:4px; margin-bottom:5px;">' + bTitle + '</div>',
      '          <div style="font-size:32px; font-weight:900; color:#0b3b95; line-height:1.15;">' + data.birth_number + '</div>',
      '          <div style="font-size:11.5px; font-weight:bold; color:#333; margin-top:4px;">' + data.birth_planet + '</div>',
      '        </div>',
      '        <div style="border:1px solid #000; border-radius:5px; padding:9px 6px; text-align:center; background:#fafafa;">',
      '          <div style="font-size:12px; font-weight:bold; color:#8b0000; border-bottom:1px solid #ccc; padding-bottom:4px; margin-bottom:5px;">' + dTitle + '</div>',
      '          <div style="font-size:32px; font-weight:900; color:#0b3b95; line-height:1.15;">' + data.destiny_number + '</div>',
      '          <div style="font-size:11.5px; font-weight:bold; color:#333; margin-top:4px;">' + data.destiny_planet + '</div>',
      '        </div>',
      '        <div style="border:1px solid #000; border-radius:5px; padding:9px 6px; text-align:center; background:#fafafa;">',
      '          <div style="font-size:12px; font-weight:bold; color:#8b0000; border-bottom:1px solid #ccc; padding-bottom:4px; margin-bottom:5px;">' + nTitle + '</div>',
      '          <div style="font-size:32px; font-weight:900; color:#0b3b95; line-height:1.15;">' + data.name_number + '</div>',
      '          <div style="font-size:11.5px; font-weight:bold; color:#333; margin-top:4px;">' + data.name_planet + ' (' + compoundLabel + data.chaldean_compound + ')</div>',
      '        </div>',
      '      </div>',
      '      <div style="border:1.5px solid #8b0000; background:#fffdf5; padding:8px 12px; text-align:center; margin-bottom:11px;">',
      '        <div style="font-size:14.5px; font-weight:900; color:#8b0000; line-height:1.45;">' + harmonyHead + '</div>',
      '        <div style="font-size:12px; color:#0b3b95; font-weight:bold; margin-top:4px; line-height:1.45;">' + harmonySub + '</div>',
      '      </div>',
      '      <table style="width:100%; border-collapse:collapse; font-size:12px !important; margin-bottom:11px; border-top:1.5px solid #000; border-bottom:1.5px solid #000;">',
      '        <thead>',
      '          <tr style="background:#f5f5f5;">',
      '            <th style="width:25%; padding:7px 10px; border-bottom:1px solid #000; text-align:left;">' + thAspect + '</th>',
      '            <th style="width:14%; padding:7px 10px; border-bottom:1px solid #000; text-align:center;">' + thNumber + '</th>',
      '            <th style="width:25%; padding:7px 10px; border-bottom:1px solid #000; text-align:left;">' + thPlanet + '</th>',
      '            <th style="padding:7px 10px; border-bottom:1px solid #000; text-align:left;">' + thTraits + '</th>',
      '          </tr>',
      '        </thead>',
      '        <tbody>',
      '          <tr>',
      '            <td style="padding:7px 10px; border-bottom:0.5px solid #ddd; line-height:1.6;"><b>' + bTitle + '</b><br><small style="line-height:1.45;">' + bAspectSub + '</small></td>',
      '            <td style="padding:7px 10px; border-bottom:0.5px solid #ddd; text-align:center; font-size:15px; font-weight:bold; color:#0b3b95;">' + data.birth_number + '</td>',
      '            <td style="padding:7px 10px; border-bottom:0.5px solid #ddd;"><b>' + data.birth_planet + '</b></td>',
      '            <td style="padding:7px 10px; border-bottom:0.5px solid #ddd; line-height:1.6;">' + data.birth_traits + '</td>',
      '          </tr>',
      '          <tr>',
      '            <td style="padding:7px 10px; border-bottom:0.5px solid #ddd; line-height:1.6;"><b>' + dTitle + '</b><br><small style="line-height:1.45;">' + dAspectSub + '</small></td>',
      '            <td style="padding:7px 10px; border-bottom:0.5px solid #ddd; text-align:center; font-size:15px; font-weight:bold; color:#0b3b95;">' + data.destiny_number + '</td>',
      '            <td style="padding:7px 10px; border-bottom:0.5px solid #ddd;"><b>' + data.destiny_planet + '</b></td>',
      '            <td style="padding:7px 10px; border-bottom:0.5px solid #ddd; line-height:1.6;">' + data.destiny_traits + '</td>',
      '          </tr>',
      '          <tr>',
      '            <td style="padding:7px 10px; border-bottom:0.5px solid #ddd; line-height:1.6;"><b>' + nTitle + '</b><br><small style="line-height:1.45;">' + nAspectSub + '</small></td>',
      '            <td style="padding:7px 10px; border-bottom:0.5px solid #ddd; text-align:center; font-size:15px; font-weight:bold; color:#0b3b95;">' + data.name_number + '</td>',
      '            <td style="padding:7px 10px; border-bottom:0.5px solid #ddd;"><b>' + data.name_planet + '</b></td>',
      '            <td style="padding:7px 10px; border-bottom:0.5px solid #ddd; line-height:1.6;">' + data.name_traits + '</td>',
      '          </tr>',
      '        </tbody>',
      '      </table>',
      '      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:11px;">',
      '        <div style="border:1px solid #000; padding:10px 12px; font-size:12px; line-height:1.65 !important;">',
      '          <div style="font-weight:bold; color:#8b0000; border-bottom:1px solid #999; padding-bottom:4px; margin-bottom:6px; font-size:12.5px;">' + favHead + '</div>',
      '          <div><b>' + cLbl + '</b> ' + data.lucky_colors.join(', ') + '</div>',
      '          <div><b>' + gLbl + '</b> ' + data.lucky_gems.join(', ') + '</div>',
      '          <div><b>' + dLbl + '</b> ' + data.lucky_days.join(', ') + '</div>',
      '        </div>',
      '        <div style="border:1px solid #000; padding:10px 12px; font-size:12px; line-height:1.65 !important;">',
      '          <div style="font-weight:bold; color:#8b0000; border-bottom:1px solid #999; padding-bottom:4px; margin-bottom:6px; font-size:12.5px;">' + compHead + '</div>',
      '          <div><b>' + fLbl + '</b> ' + data.friendly_numbers.join(', ') + '</div>',
      '          <div><b>' + eLbl + '</b> ' + (data.enemy_numbers.length ? data.enemy_numbers.join(', ') : noneText) + '</div>',
      '          <div><b>' + succLbl + '</b> ' + succDates + '</div>',
      '        </div>',
      '      </div>',
      '      <div style="border:1px solid #000; padding:10px 14px; font-size:11.5px; line-height:1.65; background:#fafafa; border-radius:4px;">',
      '        <b style="color:#8b0000; font-size:12px;">' + guidanceTitle + '</b><br>',
      '        ' + guidanceText,
      '      </div>',
      '    </div>',
      '    <div style="display:flex !important; justify-content:space-between !important; align-items:center !important; width:100% !important; font-weight:bold !important; margin-top:8px !important; font-size:12.5px !important;">',
      '      <span style="text-align:left !important;">kuberaastro.web.app</span>',
      '      <span style="text-align:right !important;">kuberanet.com</span>',
      '    </div>',
      '  </div>',
      '</div>'
    ].join('\n');
  }

  return { buildHtml: buildHtml };
});
