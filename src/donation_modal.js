/**
 * KUBERA ASTRO - VOLUNTARY PATRONAGE & UPI APPRECIATION ENGINE
 * "Pay me if you feel I am worth it"
 * Strictly under 300 lines compliant (Rule 6).
 */
(function () {
  'use strict';

  const SATHIYARAJ_UPI_ID = "sathiyaraj777-1@okicici";
  const PAYEE_NAME = "Sathiyaraj Arumugam";
  let selectedAmount = 51;

  function generateUpiUrl(amount) {
    const note = encodeURIComponent("Kubera Astro Free Jathagam Contribution");
    const pn = encodeURIComponent(PAYEE_NAME);
    return `upi://pay?pa=${SATHIYARAJ_UPI_ID}&pn=${pn}&am=${amount}&cu=INR&tn=${note}`;
  }

  function updateQrDisplay(amount) {
    const qrImg = document.getElementById('patron-qr-image');
    const directBtn = document.getElementById('btn-direct-upi-intent');
    const upiUrl = generateUpiUrl(amount);
    const isEn = window.AstroClient?.getCurrentLanguage?.() === 'en';

    if (qrImg) {
      // Prioritize the user's authentic GPay QR uploaded asset
      qrImg.src = '/assets/gpay_qr.jpg';
    }
    if (directBtn) {
      directBtn.href = upiUrl;
      directBtn.innerHTML = isEn ? `⚡ Pay ₹${amount} via GPay / PhonePe / UPI` : `⚡ GPay / PhonePe / Paytm மூலம் ₹${amount} செலுத்தவும்`;
    }
  }

  function applyLanguage(lang) {
    const isEn = lang === 'en';
    const title = document.querySelector('.patron-title');
    if (title) title.textContent = isEn ? 'Pay me if you find worth' : 'விருப்ப நன்கொடை (Patronage)';

    const tag = document.querySelector('.patron-card > div:nth-of-type(1)');
    if (tag && tag.classList.contains('patron-badge')) {
      tag.textContent = isEn ? '⭐ Value First • Direct Patronage' : '⭐ மதிப்பிற்குரிய நேரடி ஆதரவு';
    }

    const note = document.getElementById('patron-modal-tagline');
    if (note) {
      note.textContent = isEn ? 'Contribute only if you find value & merit' : 'தகுதி இருந்தால் மட்டும் பணம் செலுத்தவும்';
    }

    const customLbl = document.getElementById('lbl-custom-amt');
    if (customLbl) {
      customLbl.textContent = isEn ? 'Custom Amount:' : 'உங்கள் விருப்பத் தொகை:';
    }

    const sub = document.querySelector('.patron-subtitle');
    if (sub) {
      sub.textContent = isEn
        ? "This Vedic astrology service is 100% free and private. If you found the calculations accurate, genuinely valuable, and feel our dedication deserves support, you are welcome to make a voluntary contribution."
        : "இந்த ஜாதக கணிப்பு சேவை 100% இலவசமாக உங்களுக்காக உருவாக்கப்பட்டுள்ளது. நீங்கள் பெற்ற இந்த ஜாதக கணிப்பும் துல்லியமும் உண்மையாகவே பயனுள்ளது என்றும், எங்கள் உழைப்பிற்கு மதிப்புண்டு என்றும் நீங்கள் உணர்ந்தால் மட்டுமே உங்கள் விருப்பத்திற்குரிய தொகையை நேரடியாக செலுத்தலாம்.";
    }

    const cancelBtn = document.querySelector('.btn-modal-cancel');
    if (cancelBtn) cancelBtn.textContent = isEn ? 'Close / Cancel' : 'ரத்து (Cancel)';

    updateQrDisplay(selectedAmount);
  }

  function selectAmount(amt, btnElement) {
    selectedAmount = parseInt(amt, 10) || 51;
    document.querySelectorAll('.chip-btn').forEach(b => b.classList.remove('is-selected'));
    if (btnElement) btnElement.classList.add('is-selected');
    const customInput = document.getElementById('input-custom-amount');
    if (customInput) customInput.value = selectedAmount;
    updateQrDisplay(selectedAmount);
  }

  function onCustomAmountInput(val) {
    const num = parseInt(val, 10);
    if (!isNaN(num) && num > 0) {
      selectedAmount = num;
      document.querySelectorAll('.chip-btn').forEach(b => {
        if (parseInt(b.getAttribute('data-amt'), 10) === num) {
          b.classList.add('is-selected');
        } else {
          b.classList.remove('is-selected');
        }
      });
      updateQrDisplay(selectedAmount);
    }
  }

  function openModal() {
    const modal = document.getElementById('patronage-modal');
    if (modal) {
      modal.classList.add('is-active');
      const lang = window.AstroClient?.getCurrentLanguage?.() || 'ta';
      applyLanguage(lang);
      selectAmount(selectedAmount, document.querySelector(`.chip-btn[data-amt="${selectedAmount}"]`));
    }
  }

  function closeModal() {
    const modal = document.getElementById('patronage-modal');
    if (modal) {
      modal.classList.remove('is-active');
    }
  }

  window.PatronageModal = {
    openModal,
    closeModal,
    selectAmount,
    onCustomAmountInput,
    applyLanguage
  };

  document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('patronage-modal');
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    }
  });
})();

