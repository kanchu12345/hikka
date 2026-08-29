// Advanced Interactive Engine for Hikka Surf School

// Exchange rates relative to USD
const CURRENCY_RATES = {
  USD: { symbol: '$', rate: 1.0, label: 'USD ($)' },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR (€)' },
  GBP: { symbol: '£', rate: 0.79, label: 'GBP (£)' },
  LKR: { symbol: 'Rs. ', rate: 320.0, label: 'LKR (Rs.)' }
};

let currentCurrency = 'USD';

document.addEventListener('DOMContentLoaded', () => {
  const siteData = getActiveSiteData();
  const settings = siteData.settings;
  const cleanWhatsApp = (settings.whatsappNumber || '+94771234567').replace(/[^0-9]/g, '');

  // 1. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // 2. Sticky Glass Navbar on Scroll
  const mainNavbar = document.getElementById('main-navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      mainNavbar?.classList.add('bg-ocean-950/95', 'shadow-2xl', 'backdrop-blur-md', 'py-3');
      mainNavbar?.classList.remove('bg-transparent', 'py-4');
    } else {
      mainNavbar?.classList.remove('bg-ocean-950/95', 'shadow-2xl', 'backdrop-blur-md', 'py-3');
      mainNavbar?.classList.add('bg-transparent', 'py-4');
    }
  });

  // 3. Scroll Reveal Animation (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  // 4. Currency Switcher System
  window.setCurrency = function(code) {
    if (!CURRENCY_RATES[code]) return;
    currentCurrency = code;
    const curr = CURRENCY_RATES[code];

    // Update active dropdown label
    document.querySelectorAll('.current-currency-label').forEach(el => {
      el.textContent = curr.label;
    });

    // Update all price tags with data-usd attribute
    document.querySelectorAll('[data-usd]').forEach(el => {
      const usdVal = parseFloat(el.getAttribute('data-usd'));
      if (!isNaN(usdVal)) {
        const converted = Math.round(usdVal * curr.rate);
        if (code === 'LKR') {
          el.textContent = `${curr.symbol}${converted.toLocaleString()}`;
        } else {
          el.textContent = `${curr.symbol}${converted}`;
        }
      }
    });

    // Update calculator if active
    updateQuoteCalculator();
  };

  // 5. WhatsApp Booking Modal System
  const bookingModal = document.getElementById('booking-modal');
  const modalActivitySelect = document.getElementById('modal-activity-select');
  const modalDateInput = document.getElementById('modal-date-input');
  const modalGuestsSelect = document.getElementById('modal-guests-select');
  const modalTimeSelect = document.getElementById('modal-time-select');
  const modalNameInput = document.getElementById('modal-name-input');
  const bookingForm = document.getElementById('booking-form');

  if (modalDateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    modalDateInput.value = tomorrow.toISOString().split('T')[0];
    modalDateInput.min = new Date().toISOString().split('T')[0];
  }

  window.openBookingModal = function(activityTitle = 'Beginner Surf Lesson') {
    if (!bookingModal) return;
    if (modalActivitySelect) {
      for (let i = 0; i < modalActivitySelect.options.length; i++) {
        if (modalActivitySelect.options[i].value.includes(activityTitle) || activityTitle.includes(modalActivitySelect.options[i].value)) {
          modalActivitySelect.selectedIndex = i;
          break;
        }
      }
    }
    bookingModal.classList.remove('hidden');
    bookingModal.classList.add('flex');
  };

  window.closeBookingModal = function() {
    if (!bookingModal) return;
    bookingModal.classList.add('hidden');
    bookingModal.classList.remove('flex');
  };

  bookingModal?.addEventListener('click', (e) => {
    if (e.target === bookingModal) {
      closeBookingModal();
    }
  });

  // Handle Form Submit -> WhatsApp deep link
  bookingForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const activity = modalActivitySelect?.value || 'Beginner Surf Lesson';
    const date = modalDateInput?.value || 'Tomorrow';
    const guests = modalGuestsSelect?.value || '2';
    const time = modalTimeSelect?.value || '08:30 AM';
    const name = modalNameInput?.value ? `\n👤 Name: ${modalNameInput.value.trim()}` : '';

    const text = `🌊 *Surf & Tour Booking Request* 🏄%0A%0A` +
      `❤️ *Hikka Surf School Hikkaduwa*%0A` +
      `---------------------------------%0A` +
      `🏄 *Lesson / Activity:* ${encodeURIComponent(activity)}%0A` +
      `📅 *Date:* ${encodeURIComponent(date)}%0A` +
      `👥 *Surfers / Guests:* ${encodeURIComponent(guests)}%0A` +
      `⏱️ *Time Slot:* ${encodeURIComponent(time)}` +
      `${encodeURIComponent(name)}%0A` +
      `---------------------------------%0A` +
      `💬 *Hi! Please confirm availability for us.*`;

    window.open(`https://wa.me/${cleanWhatsApp}?text=${text}`, '_blank');
    closeBookingModal();
  });

  // 6. Direct WhatsApp Trigger
  window.openDirectWhatsApp = function(customMessage = null) {
    const defaultMsg = `Hi Hikka Surf School! I would like to inquire about surf lessons and activities in Hikkaduwa.`;
    const msg = customMessage || defaultMsg;
    window.open(`https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // 7. Interactive Instant Quote Calculator
  const calcActivity = document.getElementById('calc-activity');
  const calcPeople = document.getElementById('calc-people');
  const calcDays = document.getElementById('calc-days');
  const calcAddonVideo = document.getElementById('calc-addon-video');
  const calcAddonTransfer = document.getElementById('calc-addon-transfer');
  const calcTotalDisplay = document.getElementById('calc-total-display');

  function updateQuoteCalculator() {
    if (!calcActivity || !calcPeople || !calcTotalDisplay) return;
    const baseUsd = parseFloat(calcActivity.value) || 25;
    const people = parseInt(calcPeople.value) || 1;
    const days = parseInt(calcDays?.value) || 1;
    let totalUsd = baseUsd * people * days;

    if (calcAddonVideo && calcAddonVideo.checked) {
      totalUsd += 15 * days;
    }
    if (calcAddonTransfer && calcAddonTransfer.checked) {
      totalUsd += 45;
    }

    const curr = CURRENCY_RATES[currentCurrency] || CURRENCY_RATES.USD;
    const converted = Math.round(totalUsd * curr.rate);
    if (currentCurrency === 'LKR') {
      calcTotalDisplay.textContent = `${curr.symbol}${converted.toLocaleString()}`;
    } else {
      calcTotalDisplay.textContent = `${curr.symbol}${converted}`;
    }
  }

  calcActivity?.addEventListener('change', updateQuoteCalculator);
  calcPeople?.addEventListener('change', updateQuoteCalculator);
  calcDays?.addEventListener('change', updateQuoteCalculator);
  calcAddonVideo?.addEventListener('change', updateQuoteCalculator);
  calcAddonTransfer?.addEventListener('change', updateQuoteCalculator);
  updateQuoteCalculator();

  window.sendCalculatedQuoteToWhatsApp = function() {
    const activityName = calcActivity?.options[calcActivity.selectedIndex]?.text.split('(')[0].trim() || 'Surf Lesson';
    const people = calcPeople?.value || '1';
    const days = calcDays?.value || '1';
    const total = calcTotalDisplay?.textContent || '$25';

    const text = `🌊 *Custom Surf Package Inquiry* 🏄%0A%0A` +
      `❤️ *Hikka Surf School Hikkaduwa*%0A` +
      `---------------------------------%0A` +
      `🏄 *Package:* ${encodeURIComponent(activityName)}%0A` +
      `👥 *People:* ${encodeURIComponent(people)}%0A` +
      `📅 *Days:* ${encodeURIComponent(days)} Day(s)%0A` +
      `💰 *Estimated Total:* ${encodeURIComponent(total)}%0A` +
      `---------------------------------%0A` +
      `💬 *Hi! I would like to book this customized package.*`;

    window.open(`https://wa.me/${cleanWhatsApp}?text=${text}`, '_blank');
  };

  // 8. FAQ Accordion System
  document.querySelectorAll('.faq-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      const icon = btn.querySelector('.faq-icon');
      const isHidden = content.classList.contains('hidden');

      // Close other accordions
      document.querySelectorAll('.faq-content').forEach(c => c.classList.add('hidden'));
      document.querySelectorAll('.faq-icon').forEach(i => i.style.transform = 'rotate(0deg)');

      if (isHidden) {
        content.classList.remove('hidden');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });

  // 9. Lightbox System
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxCaption = document.getElementById('lightbox-caption');

  window.openLightbox = function(src, title, caption) {
    if (!lightboxModal || !lightboxImg) return;
    lightboxImg.src = src;
    if (lightboxTitle) lightboxTitle.textContent = title || '';
    if (lightboxCaption) lightboxCaption.textContent = caption || '';
    lightboxModal.classList.remove('hidden');
    lightboxModal.classList.add('flex');
  };

  window.closeLightbox = function() {
    if (!lightboxModal) return;
    lightboxModal.classList.add('hidden');
    lightboxModal.classList.remove('flex');
  };

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      closeBookingModal();
    }
  });

  // 10. Interactive Package Card Tabs (The Surfer Weligama 01, 02, 03 style)
  window.switchCampTab = function(tabId) {
    document.querySelectorAll('.camp-tab-pane').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.camp-tab-btn').forEach(el => {
      el.classList.remove('bg-surf-600', 'text-white', 'shadow-lg');
      el.classList.add('bg-white/10', 'text-white/80');
    });

    const targetPane = document.getElementById(`camp-pane-${tabId}`);
    const targetBtn = document.getElementById(`camp-btn-${tabId}`);
    if (targetPane) targetPane.classList.remove('hidden');
    if (targetBtn) {
      targetBtn.classList.add('bg-surf-600', 'text-white', 'shadow-lg');
      targetBtn.classList.remove('bg-white/10', 'text-white/80');
    }
  };
});
