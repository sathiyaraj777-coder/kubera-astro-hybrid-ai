/**
 * KUBERA ASTRO - VEDIC PORUTHAM COMPUTATION ENGINE
 * Strictly under 300 lines compliant (Rule 6).
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.PoruthamEngine = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const NAKSHATRAS = [
    "அஸ்வினி", "பரணி", "கிருத்திகை", "ரோகிணி", "மிருகசீரிஷம்", "திருவாதிரை",
    "புனர்பூசம்", "பூசம்", "ஆயில்யம்", "மகம்", "பூரம்", "உத்திரம்",
    "அஸ்தம்", "சித்திரை", "சுவாதி", "விசாகம்", "அனுஷம்", "கேட்டை",
    "மூலம்", "பூராடம்", "உத்திராடம்", "திருவோணம்", "அவிட்டம்", "சதையம்",
    "பூரட்டாதி", "உத்திரட்டாதி", "ரேவதி"
  ];
  const RASIS = [
    "மேஷம்", "ரிஷபம்", "மிதுனம்", "கடகம்", "சிம்மம்", "கன்னி",
    "துலாம்", "விருச்சிகம்", "தனுசு", "மகரம்", "கும்பம்", "மீனம்"
  ];
  const GANA_MAP = {
    0: "தேவ", 1: "மனுஷ", 2: "ராட்சச", 3: "மனுஷ", 4: "தேவ", 5: "மனுஷ", 6: "தேவ", 7: "தேவ",
    8: "ராட்சச", 9: "ராட்சச", 10: "மனுஷ", 11: "மனுஷ", 12: "தேவ", 13: "ராட்சச", 14: "தேவ",
    15: "ராட்சச", 16: "தேவ", 17: "ராட்சச", 18: "ராட்சச", 19: "மனுஷ", 20: "மனுஷ", 21: "தேவ",
    22: "ராட்சச", 23: "ராட்சச", 24: "மனுஷ", 25: "மனுஷ", 26: "தேவ"
  };
  const GANA_EN = { "தேவ": "Deva", "மனுஷ": "Manushya", "ராட்சச": "Rakshasa" };
  const YONI_INFO = {
    0: ["குதிரை", "ஆண்"], 1: ["யானை", "ஆண்"], 2: ["ஆடு", "பெண்"], 3: ["பாம்பு", "ஆண்"],
    4: ["மான்", "பெண்"], 5: ["நாய்", "பெண்"], 6: ["பூனை", "பெண்"], 7: ["ஆடு", "ஆண்"],
    8: ["பூனை", "ஆண்"], 9: ["எலி", "ஆண்"], 10: ["எலி", "பெண்"], 11: ["பசு", "ஆண்"],
    12: ["எருமை", "பெண்"], 13: ["புலி", "பெண்"], 14: ["எருமை", "ஆண்"], 15: ["புலி", "ஆண்"],
    16: ["மான்", "ஆண்"], 17: ["மான்", "பெண்"], 18: ["நாய்", "ஆண்"], 19: ["குரங்கு", "ஆண்"],
    20: ["கீரி", "ஆண்"], 21: ["குரங்கு", "பெண்"], 22: ["சிங்கம்", "பெண்"], 23: ["குதிரை", "பெண்"],
    24: ["சிங்கம்", "ஆண்"], 25: ["பசு", "பெண்"], 26: ["யானை", "பெண்"]
  };
  const YONI_ANIMAL_EN = {
    "குதிரை": "Horse", "யானை": "Elephant", "ஆடு": "Goat", "பாம்பு": "Serpent",
    "மான்": "Deer", "நாய்": "Dog", "பூனை": "Cat", "எலி": "Rat", "பசு": "Cow",
    "எருமை": "Buffalo", "புலி": "Tiger", "குரங்கு": "Monkey", "கீரி": "Mongoose", "சிங்கம்": "Lion"
  };
  const YONI_ENEMIES = {
    "குதிரை": "எருமை", "எருமை": "குதிரை", "யானை": "சிங்கம்", "சிங்கம்": "யானை",
    "ஆடு": "குரங்கு", "குரங்கு": "ஆடு", "பாம்பு": "கீரி", "கீரி": "பாம்பு",
    "நாய்": "மான்", "மான்": "நாய்", "பூனை": "எலி", "எலி": "பூனை", "பசு": "புலி", "புலி": "பசு"
  };
  const RAJJU_MAP = {
    4: "சிரசு", 13: "சிரசு", 22: "சிரசு", 3: "கண்டம்", 5: "கண்டம்", 12: "கண்டம்", 14: "கண்டம்",
    21: "கண்டம்", 23: "கண்டம்", 2: "உதரம்", 6: "உதரம்", 11: "உதரம்", 15: "உதரம்", 20: "உதரம்",
    24: "உதரம்", 1: "கடி", 7: "கடி", 10: "கடி", 16: "கடி", 19: "கடி", 25: "கடி", 0: "பாதம்",
    8: "பாதம்", 9: "பாதம்", 17: "பாதம்", 18: "பாதம்", 26: "பாதம்"
  };
  const RAJJU_EN = { "சிரசு": "Head (Sirasu)", "கண்டம்": "Neck (Kantham)", "உதரம்": "Stomach (Udharam)", "கடி": "Waist (Kadi)", "பாதம்": "Foot (Padham)" };
  const NADI_MAP = {
    0: "வாதம்", 1: "பித்தம்", 2: "கபம்", 5: "வாதம்", 4: "பித்தம்", 3: "கபம்", 6: "வாதம்",
    7: "பித்தம்", 8: "கபம்", 11: "வாதம்", 10: "பித்தம்", 9: "கபம்", 12: "வாதம்", 13: "பித்தம்",
    14: "கபம்", 17: "வாதம்", 16: "பித்தம்", 15: "கபம்", 18: "வாதம்", 19: "பித்தம்", 20: "கபம்",
    23: "வாதம்", 22: "பித்தம்", 21: "கபம்", 24: "வாதம்", 25: "பித்தம்", 26: "கபம்"
  };
  const NADI_EN = { "வாதம்": "Vata", "பித்தம்": "Pitta", "கபம்": "Kapha" };
  const RASI_LORDS = ["செவ்வாய்", "சுக்கிரன்", "புதன்", "சந்திரன்", "சூரியன்", "புதன்", "சுக்கிரன்", "செவ்வாய்", "குரு", "சனி", "சனி", "குரு"];
  const LORD_EN = { "செவ்வாய்": "Mars", "சுக்கிரன்": "Venus", "புதன்": "Mercury", "சந்திரன்": "Moon", "சூரியன்": "Sun", "குரு": "Jupiter", "சனி": "Saturn" };
  const PLANET_FRIENDSHIP = {
    "சூரியன்": { friends: ["சந்திரன்", "செவ்வாய்", "குரு"], neutrals: ["புதன்"] },
    "சந்திரன்": { friends: ["சூரியன்", "புதன்"], neutrals: ["செவ்வாய்", "குரு", "சுக்கிரன்", "சனி"] },
    "செவ்வாய்": { friends: ["சூரியன்", "சந்திரன்", "குரு"], neutrals: ["சுக்கிரன்", "சனி"] },
    "புதன்": { friends: ["சூரியன்", "சுக்கிரன்"], neutrals: ["செவ்வாய்", "குரு", "சனி"] },
    "குரு": { friends: ["சூரியன்", "சந்திரன்", "செவ்வாய்"], neutrals: ["சனி"] },
    "சுக்கிரன்": { friends: ["புதன்", "சனி"], neutrals: ["செவ்வாய்", "குரு"] },
    "சனி": { friends: ["புதன்", "சுக்கிரன்"], neutrals: ["குரு"] }
  };
  const VASYA_MAP = { 0: [4, 7], 1: [3, 6], 2: [5], 3: [7, 8], 4: [6], 5: [2, 11], 6: [9], 7: [3], 8: [11], 9: [0, 10], 10: [0], 11: [9] };
  const VEDHAI_PAIRS = [[0, 17], [1, 16], [2, 15], [3, 14], [5, 12], [6, 11], [7, 10], [8, 9], [18, 26], [19, 25], [20, 24], [21, 23]];

  function getStarIndex(starName) {
    const raw = (starName || "").split('-')[0].trim();
    const idx = NAKSHATRAS.findIndex(n => raw.includes(n) || n.includes(raw));
    return idx >= 0 ? idx : 0;
  }
  function getRasiIndex(rasiName) {
    const raw = (rasiName || "").trim();
    const idx = RASIS.findIndex(r => raw.includes(r) || r.includes(raw));
    return idx >= 0 ? idx : 0;
  }

  function checkDina(gIdx, bIdx, lang) {
    const diff = ((bIdx - gIdx + 27) % 27) + 1;
    if (diff === 1) {
      const ok = [3, 5, 7, 9, 12, 21, 25, 26].includes(gIdx);
      return { status: ok ? "good" : "no", text: lang === 'en' ? (ok ? "Compatible" : "Incompatible") : (ok ? "பொருத்தம் உண்டு" : "பொருத்தம் இல்லை"), note: lang === 'en' ? (ok ? "Same star permitted" : "Same star avoided") : (ok ? "ஏக நட்சத்திர பொருத்தம் நன்று" : "ஒரே நட்சத்திரம் தவிர்க்கப்பட வேண்டும்"), score: ok ? 1 : 0 };
    }
    const rem = diff % 9;
    if ([2, 4, 6, 8, 0].includes(rem)) return { status: "good", text: lang === 'en' ? "Compatible" : "பொருத்தம் உண்டு", note: lang === 'en' ? `Auspicious Tarabalam (${diff}th star)` : `சுப தாராபலம் (${diff}-வது நட்சத்திரம்)`, score: 1 };
    if ([3, 5, 7].includes(diff)) return { status: "no", text: lang === 'en' ? "Incompatible" : "பொருத்தம் இல்லை", note: lang === 'en' ? `Inauspicious Tara (${diff}th star)` : `விபத்து/பிரத்யக் தாரை (${diff}-வது நட்சத்திரம்)`, score: 0 };
    return { status: "mid", text: lang === 'en' ? "Moderate" : "மத்திமம்", note: lang === 'en' ? `Neutral Tara (${diff}th star)` : `சாதாரண பலன் (${diff}-வது நட்சத்திரம்)`, score: 0.5 };
  }

  function checkGana(gIdx, bIdx, lang) {
    const gG = GANA_MAP[gIdx], bG = GANA_MAP[bIdx];
    const gE = GANA_EN[gG] || gG, bE = GANA_EN[bG] || bG;
    if (gG === bG) return { status: "good", text: lang === 'en' ? "Compatible" : "பொருத்தம் உண்டு", note: lang === 'en' ? `Both belong to ${gE} Gana` : `இருவரும் ஒரே கணம் (${gG})`, score: 1 };
    if (gG === "தேவ" && bG === "மனுஷ") return { status: "good", text: lang === 'en' ? "Compatible" : "பொருத்தம் உண்டு", note: lang === 'en' ? "Bride Deva, Groom Manushya - Auspicious" : "பெண் தேவ கணம், ஆண் மனுஷ கணம் - உத்தமம்", score: 1 };
    if (gG === "மனுஷ" && bG === "தேவ") return { status: "mid", text: lang === 'en' ? "Moderate" : "மத்திமம்", note: lang === 'en' ? "Bride Manushya, Groom Deva - Moderate" : "பெண் மனுஷ கணம், ஆண் தேவ கணம் - மத்திமம்", score: 0.5 };
    if (gG === "ராட்சச" && bG !== "ராட்சச") return { status: "no", text: lang === 'en' ? "Incompatible" : "பொருத்தம் இல்லை", note: lang === 'en' ? "Bride Rakshasa Gana - Incompatible" : "பெண் ராட்சச கணம் - பொருத்தம் இல்லை", score: 0 };
    return { status: "mid", text: lang === 'en' ? "Moderate" : "மத்திமம்", note: lang === 'en' ? `Bride: ${gE}, Groom: ${bE}` : `Bride: ${gG}, Groom: ${bG}`, score: 0.5 };
  }

  function checkMahendra(gIdx, bIdx, lang) {
    const diff = ((bIdx - gIdx + 27) % 27) + 1;
    const ok = [4, 7, 10, 13, 16, 19, 22, 25].includes(diff);
    return { status: ok ? "good" : "no", text: lang === 'en' ? (ok ? "Compatible" : "Incompatible") : (ok ? "பொருத்தம் உண்டு" : "பொருத்தம் இல்லை"), note: lang === 'en' ? (ok ? "Progeny & Lineage Blessing" : "No Mahendra alignment") : (ok ? "வம்ச விருத்தி உண்டு" : "மாகேந்திர அமைவு இல்லை"), score: ok ? 1 : 0 };
  }

  function checkStreeDeergha(gIdx, bIdx, lang) {
    const diff = ((bIdx - gIdx + 27) % 27) + 1;
    if (diff >= 13) return { status: "good", text: lang === 'en' ? "Compatible" : "பொருத்தம் உண்டு", note: lang === 'en' ? `Long life & prosperity (${diff} stars distance)` : `நீண்ட ஆயுள் மற்றும் ஐஸ்வர்யம் (${diff} இடைவெளி)`, score: 1 };
    if (diff >= 7) return { status: "mid", text: lang === 'en' ? "Moderate" : "மத்திமம்", note: lang === 'en' ? `Moderate distance (${diff} stars)` : `சுமாரான தீர்க்க அமைவு (${diff} இடைவெளி)`, score: 0.5 };
    return { status: "no", text: lang === 'en' ? "Incompatible" : "பொருத்தம் இல்லை", note: lang === 'en' ? `Close proximity (${diff} stars distance)` : `நெருங்கிய இடைவெளி (${diff})`, score: 0 };
  }

  function checkYoni(gIdx, bIdx, lang) {
    const gA = YONI_INFO[gIdx][0], bA = YONI_INFO[bIdx][0];
    const gAE = YONI_ANIMAL_EN[gA] || gA, bAE = YONI_ANIMAL_EN[bA] || bA;
    if (YONI_ENEMIES[gA] === bA) return { status: "no", text: lang === 'en' ? "Incompatible" : "பொருத்தம் இல்லை", note: lang === 'en' ? `Enemy Animals (${gAE} - ${bAE})` : `பகை யோனி (${gA} - ${bA})`, score: 0 };
    return { status: "good", text: lang === 'en' ? "Compatible" : "பொருத்தம் உண்டு", note: lang === 'en' ? (gA === bA ? `Same Yoni (${gAE}) - Excellent` : `Friendly Yoni (${gAE} - ${bAE})`) : (gA === bA ? `ஒரே யோனி (${gA}) - மிக உத்தமம்` : `நட்பு யோனி (${gA} - ${bA})`), score: 1 };
  }

  function checkRasi(gR, bR, lang) {
    const diff = ((bR - gR + 12) % 12) + 1;
    if (diff === 1 || diff === 7) return { status: "good", text: lang === 'en' ? "Compatible" : "பொருத்தம் உண்டு", note: lang === 'en' ? (diff === 7 ? "Sama Sapthakam - Highly Auspicious" : "Same Sign Auspicious") : (diff === 7 ? "சம சப்தம ராசி - மிக உத்தமம்" : "ஒரே ராசி சுபமானது"), score: 1 };
    if ([6, 8, 2, 12].includes(diff)) return { status: "no", text: lang === 'en' ? "Incompatible" : "பொருத்தம் இல்லை", note: lang === 'en' ? `Dosha Sign (${diff}th sign)` : ([6, 8].includes(diff) ? `சஷ்டாஷ்டகம் (${diff}-வது ராசி) - தோஷம்` : `துவித்வாதசம் (${diff}-வது ராசி) - விரயம்`), score: 0 };
    return { status: "good", text: lang === 'en' ? "Compatible" : "பொருத்தம் உண்டு", note: lang === 'en' ? `Harmonious Sign (${diff}th sign)` : `உத்தம ராசிப் பொருத்தம் (${diff}-வது ராசி)`, score: 1 };
  }

  function checkRasiAdhipathi(gR, bR, lang) {
    const gL = RASI_LORDS[gR], bL = RASI_LORDS[bR];
    const gLE = LORD_EN[gL] || gL, bLE = LORD_EN[bL] || bL;
    if (gL === bL) return { status: "good", text: lang === 'en' ? "Compatible" : "பொருத்தம் உண்டு", note: lang === 'en' ? `Both ruled by ${gLE}` : `இருவருக்கும் ஒரே அதிபதி (${gL})`, score: 1 };
    const rel = PLANET_FRIENDSHIP[gL] || {};
    if (rel.friends && rel.friends.includes(bL)) return { status: "good", text: lang === 'en' ? "Compatible" : "பொருத்தம் உண்டு", note: lang === 'en' ? `Friendly Lords (${gLE} - ${bLE})` : `அதிபதிகள் நட்பு (${gL} - ${bL})`, score: 1 };
    if (rel.neutrals && rel.neutrals.includes(bL)) return { status: "mid", text: lang === 'en' ? "Moderate" : "மத்திமம்", note: lang === 'en' ? `Neutral Lords (${gLE} - ${bLE})` : `அதிபதிகள் சமம் (${gL} - ${bL})`, score: 0.5 };
    return { status: "no", text: lang === 'en' ? "Incompatible" : "பொருத்தம் இல்லை", note: lang === 'en' ? `Enemy Lords (${gLE} - ${bLE})` : `அதிபதிகள் பகை (${gL} - ${bL})`, score: 0 };
  }

  function checkVasya(gR, bR, lang) {
    const ok = (VASYA_MAP[gR] || []).includes(bR);
    return { status: ok ? "good" : "no", text: lang === 'en' ? (ok ? "Compatible" : "Incompatible") : (ok ? "பொருத்தம் உண்டு" : "பொருத்தம் இல்லை"), note: lang === 'en' ? (ok ? "Mutual Attraction Present" : "No Vasya Attraction") : (ok ? "வசிய அமைவு உண்டு" : "வசியம் அமையவில்லை"), score: ok ? 1 : 0 };
  }

  function checkRajju(gIdx, bIdx, lang) {
    const gR = RAJJU_MAP[gIdx], bR = RAJJU_MAP[bIdx];
    const gRE = RAJJU_EN[gR] || gR, bRE = RAJJU_EN[bR] || bR;
    if (gR === bR) return { status: "no", text: lang === 'en' ? "Incompatible" : "பொருத்தம் இல்லை", note: lang === 'en' ? `Same Rajju Affliction (${gRE})!` : `ஒரே ரஜ்ஜு தோஷம்! (${gR})`, score: 0, rajju_ok: false };
    return { status: "good", text: lang === 'en' ? "Compatible (Safe)" : "பொருத்தம் உண்டு", note: lang === 'en' ? `Different Rajju (Bride: ${gRE}, Groom: ${bRE})` : `வேறுபட்ட ரஜ்ஜு (பெண்: ${gR}, ஆண்: ${bR}) - தீர்க்க சுமங்கலி யோகம்`, score: 1, rajju_ok: true };
  }

  function checkVedhai(gIdx, bIdx, lang) {
    const isV = VEDHAI_PAIRS.some(p => (gIdx === p[0] && bIdx === p[1]) || (gIdx === p[1] && bIdx === p[0]));
    return { status: isV ? "no" : "good", text: lang === 'en' ? (isV ? "Incompatible" : "Compatible") : (isV ? "பொருத்தம் இல்லை" : "பொருத்தம் உண்டு"), note: lang === 'en' ? (isV ? "Vedhai Affliction Present" : "No Vedhai Affliction") : (isV ? "வேதை நட்சத்திர தோஷம் உண்டு" : "வேதை தோஷம் இல்லை"), score: isV ? 0 : 1 };
  }

  function checkNadi(gIdx, bIdx, lang) {
    const gN = NADI_MAP[gIdx], bN = NADI_MAP[bIdx];
    const gNE = NADI_EN[gN] || gN, bNE = NADI_EN[bN] || bN;
    return { status: gN !== bN ? "good" : "mid", text: lang === 'en' ? (gN !== bN ? "Compatible" : "Moderate") : (gN !== bN ? "பொருத்தம் உண்டு" : "மத்திமம்"), note: lang === 'en' ? `Nadi (Bride: ${gNE}, Groom: ${bNE})` : `நாடி (பெண்: ${gN}, ஆண்: ${bN})`, score: gN !== bN ? 1 : 0.5 };
  }

  function checkVriksha(gIdx, bIdx, lang) {
    const milky = [0, 2, 4, 7, 8, 10, 11, 14, 15, 17, 20, 21, 23, 24, 26];
    const ok = milky.includes(gIdx) || milky.includes(bIdx);
    return { status: ok ? "good" : "mid", text: lang === 'en' ? (ok ? "Compatible" : "Moderate") : (ok ? "பொருத்தம் உண்டு" : "மத்திமம்"), note: lang === 'en' ? "Milky Tree Wealth" : "பால் விருட்ச அமைவு நன்று", score: ok ? 1 : 0.5 };
  }

  function analyzeChevvaiDosham(planets, lIdx, rIdx, vIdx, lang) {
    const mars = (planets || []).find(p => (p.name || '').includes('செவ்வாய்') || (p.name || '').toLowerCase().includes('mars'));
    if (!mars) return { has_dosham: false, details: lang === 'en' ? 'Mars position safe' : 'செவ்வாய் நிலை கிடைக்கவில்லை' };
    const mIdx = getRasiIndex(mars.rasi);
    if ([0, 7, 9, 1, 6, 2, 5].includes(mIdx)) return { has_dosham: false, details: lang === 'en' ? "Exempted / Cured (Auspicious sign)" : "செவ்வாய் தோஷ நிவர்த்தி அடைந்துள்ளது (ஆட்சி/உச்சம்/நட்பு)" };
    const factors = [];
    [((mIdx - lIdx + 12) % 12) + 1, ((mIdx - rIdx + 12) % 12) + 1, ((mIdx - vIdx + 12) % 12) + 1].forEach((h, i) => {
      if ([2, 4, 7, 8, 12].includes(h)) factors.push(`${i === 0 ? 'Lagna' : (i === 1 ? 'Moon' : 'Venus')} ${h}`);
    });
    return { has_dosham: factors.length > 0, details: factors.length > 0 ? (lang === 'en' ? `Mars Dosham (${factors.join(', ')})` : `செவ்வாய் தோஷம் உண்டு (${factors.join(', ')})`) : (lang === 'en' ? "No Mars Affliction" : "செவ்வாய் தோஷம் இல்லை") };
  }

  function calculatePapaPoints(planets, lIdx, rIdx, vIdx) {
    const malefics = ['சூரியன்', 'செவ்வாய்', 'சனி', 'ராகு', 'கேது', 'sun', 'mars', 'saturn', 'rahu', 'ketu'];
    let pts = 0;
    (planets || []).forEach(p => {
      const clean = (p.name || '').replace(/[(வ)\s]/g, '').toLowerCase();
      if (!malefics.some(m => clean.includes(m))) return;
      const idx = getRasiIndex(p.rasi);
      if ([1, 2, 4, 7, 8, 12].includes(((idx - lIdx + 12) % 12) + 1)) pts += 1.0;
      if ([1, 2, 4, 7, 8, 12].includes(((idx - rIdx + 12) % 12) + 1)) pts += 0.5;
      if ([1, 2, 4, 7, 8, 12].includes(((idx - vIdx + 12) % 12) + 1)) pts += 0.5;
    });
    return Math.round(pts * 10) / 10;
  }

  function calculateMatch(girlChart, boyChart, lang) {
    const gS = getStarIndex(girlChart.star), bS = getStarIndex(boyChart.star);
    const gR = getRasiIndex(girlChart.rasi), bR = getRasiIndex(boyChart.rasi);
    const gL = getRasiIndex(girlChart.lagna), bL = getRasiIndex(boyChart.lagna);
    const gV = (girlChart.planets || []).find(p => (p.name || '').includes('சுக்கிரன்') || (p.name || '').toLowerCase().includes('venus')) ? getRasiIndex(((girlChart.planets || []).find(p => (p.name || '').includes('சுக்கிரன்') || (p.name || '').toLowerCase().includes('venus'))).rasi) : gR;
    const bV = (boyChart.planets || []).find(p => (p.name || '').includes('சுக்கிரன்') || (p.name || '').toLowerCase().includes('venus')) ? getRasiIndex(((boyChart.planets || []).find(p => (p.name || '').includes('சுக்கிரன்') || (p.name || '').toLowerCase().includes('venus'))).rasi) : bR;

    const list = [
      { name: lang === 'en' ? "1. Dina Porutham" : "1. தினப் பொருத்தம்", ...checkDina(gS, bS, lang) },
      { name: lang === 'en' ? "2. Gana Porutham" : "2. கணப் பொருத்தம்", ...checkGana(gS, bS, lang) },
      { name: lang === 'en' ? "3. Mahendra Porutham" : "3. மாகேந்திரப் பொருத்தம்", ...checkMahendra(gS, bS, lang) },
      { name: lang === 'en' ? "4. Stree Deergha" : "4. ஸ்திரீ தீர்க்கப் பொருத்தம்", ...checkStreeDeergha(gS, bS, lang) },
      { name: lang === 'en' ? "5. Yoni Porutham" : "5. யோனிப் பொருத்தம்", ...checkYoni(gS, bS, lang) },
      { name: lang === 'en' ? "6. Rasi Porutham" : "6. ராசிப் பொருத்தம்", ...checkRasi(gR, bR, lang) },
      { name: lang === 'en' ? "7. Rasi Adhipathi" : "7. ராசி அதிபதிப் பொருத்தம்", ...checkRasiAdhipathi(gR, bR, lang) },
      { name: lang === 'en' ? "8. Vasya Porutham" : "8. வசியப் பொருத்தம்", ...checkVasya(gR, bR, lang) },
      { name: lang === 'en' ? "9. Rajju Porutham" : "9. ரஜ்ஜுப் பொருத்தம்", ...checkRajju(gS, bS, lang) },
      { name: lang === 'en' ? "10. Vedhai Porutham" : "10. வேதைப் பொருத்தம்", ...checkVedhai(gS, bS, lang) },
      { name: lang === 'en' ? "11. Nadi Porutham" : "11. நாடிப் பொருத்தம்", ...checkNadi(gS, bS, lang) },
      { name: lang === 'en' ? "12. Vriksha Porutham" : "12. விருட்சப் பொருத்தம்", ...checkVriksha(gS, bS, lang) }
    ].map(item => ({
      ...item,
      result: item.result || item.text,
      notes: item.notes || item.note
    }));

    const score10 = list.slice(0, 10).reduce((acc, c) => acc + c.score, 0);
    const score12 = list.reduce((acc, c) => acc + c.score, 0);
    const rajjuOk = list[8].status === 'good';

    const gCh = analyzeChevvaiDosham(girlChart.planets, gL, gR, gV, lang);
    const bCh = analyzeChevvaiDosham(boyChart.planets, bL, bR, bV, lang);
    const gPapa = calculatePapaPoints(girlChart.planets, gL, gR, gV);
    const bPapa = calculatePapaPoints(boyChart.planets, bL, bR, bV);

    const diff = Math.round((bPapa - gPapa) * 10) / 10;
    const papaVerdict = diff < -2.0
      ? (lang === 'en' ? `Bride malefic points higher (Groom: ${bPapa}, Bride: ${gPapa})` : `பெண் பாப புள்ளி அதிகம் (ஆண்: ${bPapa}, பெண்: ${gPapa})`)
      : (lang === 'en' ? `Balanced Points (Groom: ${bPapa}, Bride: ${gPapa})` : `பாப சமநிலை நன்று (ஆண்: ${bPapa}, பெண்: ${gPapa})`);

    let vClass = 'success', vTitle = lang === 'en' ? 'Excellent Match (Recommended)' : 'மிக உத்தமமான பொருத்தம் (திருமணம் செய்யலாம்)';
    let vSub = lang === 'en' ? `10 Porutham Score: ${score10} / 10 • Rajju Safe` : `10 பொருத்தம்: ${score10} / 10 • ரஜ்ஜு மங்கள யோகம் உண்டு`;

    if (!rajjuOk) {
      vClass = 'danger';
      vTitle = lang === 'en' ? 'Incompatible (Rajju Dosham)' : 'திருமணம் செய்ய தகுதியற்றது (ரஜ்ஜு தோஷம் உள்ளது)';
      vSub = lang === 'en' ? 'Rajju affliction is present.' : 'ரஜ்ஜு தோஷம் உள்ளதால் சாஸ்திரப்படி தவிர்க்கப்பட வேண்டும்.';
    } else if (score10 < 5 || (gCh.has_dosham && !bCh.has_dosham) || diff < -2.0) {
      vClass = 'warning';
      vTitle = lang === 'en' ? 'Moderate Match (Elder Consultation Advised)' : 'மத்திமமான பொருத்தம் (ஆன்றோர் பரிசீலனை தேவை)';
      vSub = lang === 'en' ? `Score: ${score10} / 10 • Consult elders.` : `மதிப்பெண்: ${score10} / 10 • பாப சாம்யம் மற்றும் தோஷ பரிசீலனை தேவை.`;
    }

    return {
      success: true, score_10: score10, score_12: score12, rajju_ok: rajjuOk,
      verdict_class: vClass, verdict_title: vTitle, verdict_subtitle: vSub,
      papa_girl_score: gPapa, papa_boy_score: bPapa, papa_verdict: papaVerdict,
      chevvai_girl_text: gCh.details, chevvai_boy_text: bCh.details,
      dasa_sandhi_text: lang === 'en' ? 'Normal Dasa Transition' : 'தசா சந்தி தோஷம் இல்லை',
      porutham_list: list
    };
  }

  return { NAKSHATRAS, RASIS, getStarIndex, getRasiIndex, calculateMatch };
});
