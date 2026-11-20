/**
 * KUBERA ASTRO - COMPLIANCE & LEGAL MODAL ENGINE
 * Google AdSense Compliance: Privacy Policy, Terms, Disclaimer, About Us & Contact Us.
 * Strictly under 300 lines compliant (Rule 6).
 */
(function () {
  'use strict';

  const LEGAL_CONTENT = {
    privacy: {
      title: 'Privacy Policy (தனியுரிமைக் கொள்கை)',
      content: `
        <div class="legal-highlight-box">
          <strong>Zero Cloud Storage Guarantee:</strong> Kubera Astro operates with 100% client-driven computation. We do NOT save, log, store, sell, or profile your personal birth data, date of birth, time, or location on our servers or in any database.
        </div>
        <h3>1. Information Processing</h3>
        <p>When you use the Kubera Astro Vedic Astrology calculator, the birth details you provide (Name, Date of Birth, Time of Birth, and Place of Birth) are processed transiently strictly for the purpose of generating the authentic Vedic horoscope and planetary coordinates. None of this data is written to permanent cloud storage.</p>
        
        <h3>2. Google AdSense & DoubleClick Cookies</h3>
        <p>Google, as a third-party vendor, uses cookies to serve ads on this website. Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visits to our site and/or other sites on the Internet.</p>
        <ul>
          <li>Users may opt out of personalized advertising by visiting <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" style="color:var(--accent-gold-bright);">AboutAds.info</a> or via <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" style="color:var(--accent-gold-bright);">Google Ad Settings</a>.</li>
          <li>Third-party ad networks may also use cookies, JavaScript, or Web Beacons to measure the effectiveness of their advertisements. Kubera Astro has no access to or control over these cookies.</li>
        </ul>

        <h3>3. Log Files & Analytics</h3>
        <p>Like standard web services, standard server access logs (IP address, browser user agent, date/time stamp) may be temporarily captured by our hosting infrastructure (Firebase Hosting & CDN) solely for DDoS mitigation, security filtering, and rate limiting.</p>

        <h3>4. Contact for Privacy Inquiries</h3>
        <p>For any questions or privacy inquiries, contact the developer at <a href="mailto:admin@kuberanet.com" style="color:var(--accent-gold-bright);">admin@kuberanet.com</a> or visit <a href="https://kuberanet.com" target="_blank" rel="noopener noreferrer" style="color:var(--accent-gold-bright);">Kubera Tech</a>.</p>
      `
    },
    terms: {
      title: 'Terms of Service (பயன்பாட்டு விதிமுறைகள்)',
      content: `
        <div class="legal-highlight-box">
          <strong>100% Free Service:</strong> Kubera Astro is provided completely free of charge forever for informational, cultural, and spiritual guidance.
        </div>
        <h3>1. Acceptance of Terms</h3>
        <p>By accessing and using Kubera Astro (https://kuberaastro.web.app), you acknowledge that you have read, understood, and agree to be bound by these terms.</p>

        <h3>2. Permitted Use</h3>
        <p>You may generate horoscopes, view Vedic astrological charts, and download high-resolution PDF reports for personal, family, or academic astrological study. Automated bulk scraping, reverse engineering, or unauthorized reselling of backend compute is strictly prohibited.</p>

        <h3>3. Voluntary Patronage</h3>
        <p>Any contributions made via our "Pay me if you find worth" patronage feature are completely voluntary expressions of appreciation. Payments are non-refundable and do not constitute an exchange for commercial warranty or financial consultation.</p>

        <h3>4. Intellectual Property</h3>
        <p>The proprietary calculation algorithms, platform architecture, design system, and custom SVG/HTML chart generation engine are the intellectual property of Kubera Tech.</p>
      `
    },
    disclaimer: {
      title: 'Astrological Disclaimer (பொறுப்புத் துறப்பு)',
      content: `
        <div class="legal-highlight-box">
          <strong>Scientific & Cultural Perspective:</strong> Vedic Astrology is an ancient traditional knowledge system and philosophical discipline. Astrological charts and Dasa-Bhukti calculations are intended solely for educational, cultural, and self-reflection purposes.
        </div>
        <h3>1. Not Professional or Medical Advice</h3>
        <p>The planetary calculations, Dasa periods, and planetary states provided by Kubera Astro must never be used as a substitute for professional medical, legal, psychiatric, financial, or investment advice. Always consult certified professionals for life-critical decisions.</p>

        <h3>2. Accuracy & Calculations</h3>
        <p>Our calculation engine utilizes sidereal Thirukanitha Panchangam algorithms (Chitra Paksha / Lahiri Ayanamsa) and high-precision astronomical ephemeris models. However, no absolute guarantee of predictive certainty is expressed or implied.</p>

        <h3>3. Limitation of Liability</h3>
        <p>Kubera Astro, Kubera Tech, its developers, and contributors shall not be held liable for any decisions, actions, or outcomes undertaken based upon the astrological reports generated by this application.</p>
      `
    },
    about: {
      title: 'About Kubera Astro (எங்களைப் பற்றி)',
      content: `
        <h3>Preserving Authentic Vedic Astrology with Modern Technology</h3>
        <p><strong>Kubera Astro</strong> is a state-of-the-art Vedic astrology platform engineered by <strong>Kubera Tech</strong>. Our mission is to make traditional, highly accurate Indian astrology accessible to everyone globally — 100% free forever, without predatory paywalls or invasive data logging.</p>

        <h3>Core Principles</h3>
        <ul>
          <li><strong>Authentic Thirukanitha Panchangam:</strong> Accurate planetary longitudes, retrograde indications, Navamsa coordinates, and Vimshottari Dasa-Bhukti periods.</li>
          <li><strong>Pure Privacy by Design:</strong> Zero database storage for birth charts. Complete respect for user privacy.</li>
          <li><strong>Bilingual Excellence:</strong> Authentic Tamil and high-precision English transliteration.</li>
          <li><strong>Direct Voluntary Patronage:</strong> Value-first model where users only contribute if they genuinely find value in our work.</li>
        </ul>
      `
    },
    contact: {
      title: 'Contact Us (தொடர்பு கொள்ள)',
      content: `
        <h3>Direct Developer & Support Contact</h3>
        <p>We welcome your valuable feedback, algorithmic inquiries, and astrological calculation suggestions.</p>

        <div style="background: rgba(255,255,255,0.04); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem; margin-top: 1rem;">
          <p><strong>Technology Agency:</strong> Kubera Tech</p>
          <p><strong>Official Email:</strong> <a href="mailto:admin@kuberanet.com" style="color:var(--accent-gold-bright);">admin@kuberanet.com</a></p>
          <p><strong>Official Web Portal:</strong> <a href="https://kuberanet.com" target="_blank" rel="noopener noreferrer" style="color:var(--accent-gold-bright);">https://kuberanet.com</a></p>
          <p><strong>Direct Developer:</strong> Sathiyaraj Arumugam</p>
          <p><strong>UPI ID:</strong> <code>sathiyaraj777-1@okicici</code></p>
          <p><strong>Location:</strong> Tamil Nadu, India</p>
        </div>
      `
    }
  };

  function openLegalModal(type) {
    const data = LEGAL_CONTENT[type];
    if (!data) return;

    const modal = document.getElementById('legal-modal');
    const titleEl = document.getElementById('legal-modal-title');
    const bodyEl = document.getElementById('legal-modal-body');

    if (titleEl) titleEl.textContent = data.title;
    if (bodyEl) bodyEl.innerHTML = data.content;
    if (modal) {
      modal.classList.add('is-active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeLegalModal() {
    const modal = document.getElementById('legal-modal');
    if (modal) {
      modal.classList.remove('is-active');
      document.body.style.overflow = '';
    }
  }

  window.LegalModal = {
    open: openLegalModal,
    close: closeLegalModal
  };

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLegalModal();
  });
})();

