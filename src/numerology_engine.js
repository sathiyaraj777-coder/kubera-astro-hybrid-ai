/**
 * KUBERA ASTRO - VEDIC NUMEROLOGY ENGINE (CLIENT-SIDE)
 * Chaldean & Pythagorean Numerology Calculation with Dual-Language (Pure Tamil & Pure English) Support.
 * Strictly under 300 lines compliant (Rule 6).
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.NumerologyEngine = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var CHALDEAN_MAP = {
    'A': 1, 'I': 1, 'J': 1, 'Q': 1, 'Y': 1,
    'B': 2, 'K': 2, 'R': 2,
    'C': 3, 'G': 3, 'L': 3, 'S': 3,
    'D': 4, 'M': 4, 'T': 4,
    'E': 5, 'H': 5, 'N': 5, 'X': 5,
    'U': 6, 'V': 6, 'W': 6,
    'O': 7, 'Z': 7,
    'F': 8, 'P': 8
  };

  var PYTHAGOREAN_MAP = {
    'A': 1, 'J': 1, 'S': 1,
    'B': 2, 'K': 2, 'T': 2,
    'C': 3, 'L': 3, 'U': 3,
    'D': 4, 'M': 4, 'V': 4,
    'E': 5, 'N': 5, 'W': 5,
    'F': 6, 'O': 6, 'X': 6,
    'G': 7, 'P': 7, 'Y': 7,
    'H': 8, 'Q': 8, 'Z': 8,
    'I': 9, 'R': 9
  };

  var PLANET_INFO = {
    1: {
      planet_ta: "சூரியன்",
      planet_en: "Sun",
      traits_ta: "தலைமைத்துவம், தன்னம்பிக்கை, சுயாட்சி, ஆற்றல், வெற்றி நோக்கு",
      traits_en: "Leadership, Independence, Ambition, Vitality, Pioneering Spirit",
      lucky_colors_ta: ["தங்கம்", "மஞ்சள்", "ஆரஞ்சு"],
      lucky_colors_en: ["Gold", "Yellow", "Orange"],
      lucky_gems_ta: ["மாணிக்கம்"],
      lucky_gems_en: ["Ruby"],
      lucky_days_ta: ["ஞாயிறு"],
      lucky_days_en: ["Sunday"],
      friendly_nums: [1, 2, 3, 9],
      enemy_nums: [6, 8]
    },
    2: {
      planet_ta: "சந்திரன்",
      planet_en: "Moon",
      traits_ta: "உள்ளுணர்வு, சாந்தம், இரக்கம், ஒத்துழைப்பு, கற்பனைத்திறன்",
      traits_en: "Intuition, Diplomacy, Empathy, Cooperation, Imagination",
      lucky_colors_ta: ["வெள்ளை", "வெள்ளி", "வெளிர் பச்சை"],
      lucky_colors_en: ["White", "Silver", "Light Green"],
      lucky_gems_ta: ["முத்து", "சந்திரகாந்தக்கல்"],
      lucky_gems_en: ["Pearl", "Moonstone"],
      lucky_days_ta: ["திங்கள்"],
      lucky_days_en: ["Monday"],
      friendly_nums: [1, 2, 5],
      enemy_nums: [8, 9]
    },
    3: {
      planet_ta: "குரு",
      planet_en: "Jupiter",
      traits_ta: "ஞானம், கல்வி, ஆன்மீகம், வளர்ச்சி, வழிகாட்டுதல் திறன்",
      traits_en: "Wisdom, Knowledge, Optimism, Expansiveness, Spiritual Growth",
      lucky_colors_ta: ["மஞ்சள்", "தங்க மஞ்சள்"],
      lucky_colors_en: ["Yellow", "Golden Yellow"],
      lucky_gems_ta: ["புஷ்பராகம்"],
      lucky_gems_en: ["Yellow Sapphire"],
      lucky_days_ta: ["வியாழன்"],
      lucky_days_en: ["Thursday"],
      friendly_nums: [1, 2, 3, 9],
      enemy_nums: [6]
    },
    4: {
      planet_ta: "ராகு",
      planet_en: "Rahu",
      traits_ta: "புதுமை சிந்தனை, நடைமுறை அறிவு, ஒழுக்கம், தீவிர உழைப்பு",
      traits_en: "Practicality, Unconventional Thinking, Discipline, Revolutionary Ideas",
      lucky_colors_ta: ["நீலம்", "சாம்பல்"],
      lucky_colors_en: ["Blue", "Grey"],
      lucky_gems_ta: ["கோமேதகம்"],
      lucky_gems_en: ["Hessonite Garnet"],
      lucky_days_ta: ["ஞாயிறு", "சனி"],
      lucky_days_en: ["Sunday", "Saturday"],
      friendly_nums: [1, 5, 6, 7],
      enemy_nums: [2, 4, 8, 9]
    },
    5: {
      planet_ta: "புதன்",
      planet_en: "Mercury",
      traits_ta: "தகவல்தொடர்பு, வணிக அறிவு, கூரிய புத்தி, விரைவுத்தன்மை",
      traits_en: "Communication, Business Acumen, Adaptability, Sharp Intellect",
      lucky_colors_ta: ["பச்சை", "வெளிர் சாம்பல்"],
      lucky_colors_en: ["Emerald Green", "Light Grey"],
      lucky_gems_ta: ["மரகதம்"],
      lucky_gems_en: ["Emerald"],
      lucky_days_ta: ["புதன்", "வெள்ளி"],
      lucky_days_en: ["Wednesday", "Friday"],
      friendly_nums: [1, 3, 5, 6],
      enemy_nums: [2]
    },
    6: {
      planet_ta: "சுக்கிரன்",
      planet_en: "Venus",
      traits_ta: "கலை உணர்வு, வசீகரம், அன்பு, ஆடம்பரம், அமைதி",
      traits_en: "Luxury, Artistic Talent, Harmony, Love, Magnetism, Affluence",
      lucky_colors_ta: ["வெள்ளை", "ரோஸ்", "வெளிர் நீலம்"],
      lucky_colors_en: ["White", "Pink", "Light Blue"],
      lucky_gems_ta: ["வைரம்", "வெள்ளை சபையர்"],
      lucky_gems_en: ["Diamond", "White Sapphire"],
      lucky_days_ta: ["வெள்ளி"],
      lucky_days_en: ["Friday"],
      friendly_nums: [5, 6, 8],
      enemy_nums: [1, 3]
    },
    7: {
      planet_ta: "கேது",
      planet_en: "Ketu",
      traits_ta: "ஆராய்ச்சி சிந்தனை, ஆன்மீக ஈடுபாடு, தத்துவ ஞானம், நுண்ணறிவு",
      traits_en: "Mysticism, Analytical Mind, Spiritual Inclination, Wisdom",
      lucky_colors_ta: ["வெளிர் பச்சை", "வெள்ளை", "சாம்பல்"],
      lucky_colors_en: ["Light Green", "White", "Grey"],
      lucky_gems_ta: ["வைடூரியம்"],
      lucky_gems_en: ["Cat's Eye"],
      lucky_days_ta: ["திங்கள்", "வியாழன்"],
      lucky_days_en: ["Monday", "Thursday"],
      friendly_nums: [1, 4, 5, 7],
      enemy_nums: [2, 9]
    },
    8: {
      planet_ta: "சனி",
      planet_en: "Saturn",
      traits_ta: "விடாமுயற்சி, நேர்மை, நீதி நெறி, ஆழமான பொறுமை, நீண்ட கால சாதனை",
      traits_en: "Perseverance, Discipline, Justice, Authority, Deep Focus",
      lucky_colors_ta: ["கருநீலம்", "கருப்பு"],
      lucky_colors_en: ["Dark Blue", "Black"],
      lucky_gems_ta: ["நீலக்கல்"],
      lucky_gems_en: ["Blue Sapphire"],
      lucky_days_ta: ["சனி"],
      lucky_days_en: ["Saturday"],
      friendly_nums: [3, 5, 6, 7],
      enemy_nums: [1, 2, 4, 9]
    },
    9: {
      planet_ta: "செவ்வாய்",
      planet_en: "Mars",
      traits_ta: "வீரம், தைரியம், வேகம், உறுதி, சவால்களை வெல்லும் ஆற்றல்",
      traits_en: "Courage, Passion, Dynamic Energy, Determination, Valour",
      lucky_colors_ta: ["சிவப்பு", "பவள நிறம்"],
      lucky_colors_en: ["Red", "Coral"],
      lucky_gems_ta: ["பவளம்"],
      lucky_gems_en: ["Red Coral"],
      lucky_days_ta: ["செவ்வாய்"],
      lucky_days_en: ["Tuesday"],
      friendly_nums: [1, 2, 3, 5],
      enemy_nums: [4, 8]
    }
  };

  function sumDigits(n) {
    while (n > 9) {
      var s = 0;
      var str = String(n);
      for (var i = 0; i < str.length; i++) s += parseInt(str[i], 10);
      n = s;
    }
    return n;
  }

  function calculateChaldean(nameStr) {
    var clean = (nameStr || '').toUpperCase().replace(/[^A-Z]/g, '');
    var compound = 0;
    for (var i = 0; i < clean.length; i++) compound += (CHALDEAN_MAP[clean[i]] || 0);
    return { compound: compound, root: compound > 0 ? sumDigits(compound) : 0 };
  }

  function calculatePythagorean(nameStr) {
    var clean = (nameStr || '').toUpperCase().replace(/[^A-Z]/g, '');
    var compound = 0;
    for (var i = 0; i < clean.length; i++) compound += (PYTHAGOREAN_MAP[clean[i]] || 0);
    return { compound: compound, root: compound > 0 ? sumDigits(compound) : 0 };
  }

  function calculateBirth(dobStr) {
    var parts = (dobStr || '').trim().split('-');
    var y = parseInt(parts[0], 10), m = parseInt(parts[1], 10), d = parseInt(parts[2], 10);
    var bNum = sumDigits(d);
    var fullStr = ("0000" + y).slice(-4) + ("00" + m).slice(-2) + ("00" + d).slice(-2);
    var totalSum = 0;
    for (var i = 0; i < fullStr.length; i++) totalSum += parseInt(fullStr[i], 10);
    var dNum = sumDigits(totalSum);
    return {
      birth_number: bNum,
      destiny_number: dNum,
      dob_formatted: ("00" + d).slice(-2) + "-" + ("00" + m).slice(-2) + "-" + y
    };
  }

  function analyze(name, dobStr, lang) {
    var isTa = (lang !== 'en');
    var bData = calculateBirth(dobStr);
    var chData = calculateChaldean(name);
    var pyData = calculatePythagorean(name);

    var bNum = bData.birth_number;
    var dNum = bData.destiny_number;
    var nNum = chData.root;

    var bInfo = PLANET_INFO[bNum] || {};
    var dInfo = PLANET_INFO[dNum] || {};
    var nInfo = PLANET_INFO[nNum] || {};

    var bEnemy = bInfo.enemy_nums || [];
    var dEnemy = dInfo.enemy_nums || [];
    var bFriendly = bInfo.friendly_nums || [];
    var dFriendly = dInfo.friendly_nums || [];

    var harmonyStatus, harmonyClass, harmonyScore;
    if (bEnemy.indexOf(nNum) !== -1 || dEnemy.indexOf(nNum) !== -1) {
      harmonyStatus = isTa ? "எதிர்மறை அதிர்வு (மாற்றம் தேவை)" : "Conflicting Vibrations (Correction Advised)";
      harmonyClass = "danger"; harmonyScore = 45;
    } else if (bFriendly.indexOf(nNum) === -1 && dFriendly.indexOf(nNum) === -1) {
      harmonyStatus = isTa ? "சமநிலை (மத்திமம்)" : "Neutral Vibration (Moderate)";
      harmonyClass = "warning"; harmonyScore = 70;
    } else {
      harmonyStatus = isTa ? "மிக உத்தமம் (அதிர்ஷ்ட யோகம்)" : "Highly Auspicious Harmony";
      harmonyClass = "success"; harmonyScore = 100;
    }

    var pKey = isTa ? "planet_ta" : "planet_en";
    var tKey = isTa ? "traits_ta" : "traits_en";
    var cKey = isTa ? "lucky_colors_ta" : "lucky_colors_en";
    var gKey = isTa ? "lucky_gems_ta" : "lucky_gems_en";
    var dKey = isTa ? "lucky_days_ta" : "lucky_days_en";

    return {
      name: (name || '').trim(),
      dob: bData.dob_formatted,
      lang: isTa ? 'ta' : 'en',
      birth_number: bNum,
      birth_planet: bInfo[pKey] || "",
      birth_traits: bInfo[tKey] || "",
      destiny_number: dNum,
      destiny_planet: dInfo[pKey] || "",
      destiny_traits: dInfo[tKey] || "",
      chaldean_compound: chData.compound,
      name_number: nNum,
      name_planet: nInfo[pKey] || (isTa ? "இல்லை" : "N/A"),
      name_traits: nInfo[tKey] || "",
      pythagorean_number: pyData.root,
      pythagorean_compound: pyData.compound,
      harmony_status: harmonyStatus,
      harmony_class: harmonyClass,
      harmony_score: harmonyScore,
      lucky_colors: bInfo[cKey] || [],
      lucky_gems: bInfo[gKey] || [],
      lucky_days: bInfo[dKey] || [],
      friendly_numbers: bInfo.friendly_nums || [],
      enemy_numbers: bInfo.enemy_nums || []
    };
  }

  return {
    analyze: analyze,
    calculateBirth: calculateBirth,
    calculateChaldean: calculateChaldean,
    calculatePythagorean: calculatePythagorean
  };
}));
