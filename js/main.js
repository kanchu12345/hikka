// Advanced Interactive & Auto-Swapping Engine for Hikkaduwa Hikka Surf School

// Exchange rates relative to USD
const CURRENCY_RATES = {
  USD: { symbol: '$', rate: 1.0, label: 'USD ($)' },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR (€)' },
  GBP: { symbol: '£', rate: 0.79, label: 'GBP (£)' },
  LKR: { symbol: 'Rs. ', rate: 320.0, label: 'LKR (Rs.)' }
};

let currentCurrency = 'USD';

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

// Re-init on live CMS updates
window.addEventListener('hikkaDataUpdated', () => {
  console.log("⚡ Live data updated, re-rendering UI...");
  initApp();
});

function initApp() {
  const siteData = getActiveSiteData();
  const settings = siteData.settings;
  const cleanWhatsApp = (settings.whatsappNumber || '+94771234567').replace(/[^0-9]/g, '');

  // 1. Hero Auto-Swapping Slideshow
  initHeroSlideshow(settings);

  // 2. Middle Cinematic Slideshow ("Our Home Base - Sri Lanka")
  initMiddleSlideshow();

  // 3. Activity Card Mini Sliders Auto-Swap
  initCardSliders();

  // 4. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.onclick = () => {
      mobileMenu.classList.toggle('hidden');
    };
  }

  // 5. Sticky Glass Navbar on Scroll
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

  // 6. Scroll Reveal Animation (Intersection Observer)
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

  // 7. Currency Switcher System
  window.setCurrency = function(code) {
    if (!CURRENCY_RATES[code]) return;
    currentCurrency = code;
    const curr = CURRENCY_RATES[code];

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
  };

  // 8. WhatsApp Booking Modal System
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
        if (modalActivitySelect.options[i].value.toLowerCase().includes(activityTitle.toLowerCase()) || 
            activityTitle.toLowerCase().includes(modalActivitySelect.options[i].value.toLowerCase())) {
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

  bookingForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const activity = modalActivitySelect?.value || 'Beginner Surf Lesson';
    const date = modalDateInput?.value || 'Tomorrow';
    const guests = modalGuestsSelect?.value || '2 People';
    const time = modalTimeSelect?.value || '08:30 AM';
    const name = modalNameInput?.value ? `\n• Name: ${modalNameInput.value.trim()}` : '';

    const text = `Hi Hikka Surf School! I would like to book:%0A` +
      `• Activity: ${encodeURIComponent(activity)}%0A` +
      `• Date: ${encodeURIComponent(date)}%0A` +
      `• Guests: ${encodeURIComponent(guests)}%0A` +
      `• Preferred Time: ${encodeURIComponent(time)}` +
      `${encodeURIComponent(name)}%0A%0A` +
      `Please let me know availability!`;

    window.open(`https://wa.me/${cleanWhatsApp}?text=${text}`, '_blank');
    closeBookingModal();
  });

  // 9. Direct WhatsApp Trigger
  window.openDirectWhatsApp = function(customMessage = null) {
    const defaultMsg = `Hi Hikka Surf School! I would like to inquire about surf lessons and ocean activities in Hikkaduwa.`;
    const msg = customMessage || defaultMsg;
    window.open(`https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // 10. FAQ Accordion Toggle
  document.querySelectorAll('.faq-btn').forEach(btn => {
    btn.onclick = () => {
      const content = btn.nextElementSibling;
      const icon = btn.querySelector('.faq-icon');
      if (content) {
        const isHidden = content.classList.contains('hidden');
        content.classList.toggle('hidden');
        if (icon) {
          icon.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
        }
      }
    };
  });
}

// Auto-Swapping Hero Slideshow Handler
function initHeroSlideshow(settings) {
  const container = document.getElementById('hero-slideshow-container');
  if (!container) return;

  const images = settings.hero_images || [
    { url: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1920&q=80" },
    { url: "https://images.unsplash.com/photo-1507525428033-b723cf961d3e?auto=format&fit=crop&w=1920&q=80" },
    { url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1920&q=80" },
    { url: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&w=1920&q=80" }
  ];

  container.innerHTML = images.map((img, idx) => `
    <div class="hero-slide ${idx === 0 ? 'active' : ''}" style="background-image: url('${img.url}'); background-size: cover; background-position: center;"></div>
  `).join('');

  let currentSlide = 0;
  const slides = container.querySelectorAll('.hero-slide');
  const intervalTime = settings.autoSwapInterval || 4500;

  if (slides.length > 1) {
    if (window.heroTimer) clearInterval(window.heroTimer);
    window.heroTimer = setInterval(() => {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    }, intervalTime);
  }
}

// Middle Cinematic Slideshow Handler ("Our Home Base - Sri Lanka")
function initMiddleSlideshow() {
  const container = document.getElementById('middle-slideshow-container');
  const titleEl = document.getElementById('middle-slide-title');
  if (!container) return;

  const middleSlides = [
    {
      url: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1920&q=80",
      title: "Sri Lanka"
    },
    {
      url: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1920&q=80",
      title: "Hikkaduwa"
    },
    {
      url: "https://images.unsplash.com/photo-1507525428033-b723cf961d3e?auto=format&fit=crop&w=1920&q=80",
      title: "Narigama Beach"
    },
    {
      url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1920&q=80",
      title: "Coral Sanctuary"
    }
  ];

  container.innerHTML = middleSlides.map((slide, idx) => `
    <div class="middle-slide ${idx === 0 ? 'active' : ''}" style="background-image: url('${slide.url}'); background-size: cover; background-position: center;"></div>
  `).join('');

  let currentIdx = 0;
  const slides = container.querySelectorAll('.middle-slide');

  if (slides.length > 1) {
    if (window.middleTimer) clearInterval(window.middleTimer);
    window.middleTimer = setInterval(() => {
      slides[currentIdx].classList.remove('active');
      currentIdx = (currentIdx + 1) % slides.length;
      slides[currentIdx].classList.add('active');
      if (titleEl) {
        titleEl.textContent = middleSlides[currentIdx].title;
      }
    }, 4000);
  }
}

// Auto-Swapping Activity Card Slider Handler
function initCardSliders() {
  const sliderContainers = document.querySelectorAll('.card-slider-box');
  sliderContainers.forEach(box => {
    const images = box.querySelectorAll('.card-slide-img');
    if (images.length <= 1) return;

    let activeIdx = 0;
    const interval = parseInt(box.getAttribute('data-interval') || '3500');

    setInterval(() => {
      images[activeIdx].classList.remove('active');
      activeIdx = (activeIdx + 1) % images.length;
      images[activeIdx].classList.add('active');
    }, interval);
  });
}

// Lightbox Modal Handlers
window.openLightbox = function(url, title, caption) {
  const modal = document.getElementById('lightbox-modal');
  const img = document.getElementById('lightbox-img');
  const titleEl = document.getElementById('lightbox-title');
  const capEl = document.getElementById('lightbox-caption');

  if (modal && img) {
    img.src = url;
    if (titleEl) titleEl.textContent = title || '';
    if (capEl) capEl.textContent = caption || '';
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
};

window.closeLightbox = function() {
  const modal = document.getElementById('lightbox-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
};
