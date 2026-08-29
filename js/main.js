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

  // 3. Interactive Gallery Story Showcase (Auto-Swap with Descriptions)
  initGalleryStoryShowcase();

  // 4. Activity Card Mini Sliders Auto-Swap
  initCardSliders();

  // 5. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.onclick = () => {
      mobileMenu.classList.toggle('hidden');
    };
  }

  // 6. Sticky Glass Navbar on Scroll
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

  // 7. Scroll Reveal Animation (Intersection Observer)
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

  // 8. Currency Switcher System
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

  // 9. WhatsApp Booking Modal System
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

  // 9. WhatsApp Booking Modal System
  window.openBookingModal = function(activityTitle = 'Beginner Surf Lesson') {
    const modal = document.getElementById('booking-modal');
    if (!modal) {
      // Fallback directly to WhatsApp if modal element missing
      const cleanPhone = (window.siteSettings?.whatsappNumber || '+94771234567').replace(/[^0-9]/g, '');
      window.open(`https://wa.me/${cleanPhone}?text=Hi%20Hikka%20Surf%20School!%20I%20would%20like%20to%20book%20${encodeURIComponent(activityTitle)}`, '_blank');
      return;
    }
    const selectEl = document.getElementById('modal-activity-select');
    if (selectEl) {
      for (let i = 0; i < selectEl.options.length; i++) {
        if (selectEl.options[i].value.toLowerCase().includes(activityTitle.toLowerCase()) || 
            activityTitle.toLowerCase().includes(selectEl.options[i].value.toLowerCase())) {
          selectEl.selectedIndex = i;
          break;
        }
      }
    }
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  };

  window.closeBookingModal = function() {
    const modal = document.getElementById('booking-modal');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  };

  const bookingModal = document.getElementById('booking-modal');
  const bookingForm = document.getElementById('booking-form');
  const modalActivitySelect = document.getElementById('modal-activity-select');
  const modalDateInput = document.getElementById('modal-date-input');
  const modalGuestsSelect = document.getElementById('modal-guests-select');
  const modalTimeSelect = document.getElementById('modal-time-select');
  const modalNameInput = document.getElementById('modal-name-input');

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

  // 10. Direct WhatsApp Trigger
  window.openDirectWhatsApp = function(customMessage = null) {
    const defaultMsg = `Hi Hikka Surf School! I would like to inquire about surf lessons and ocean activities in Hikkaduwa.`;
    const msg = customMessage || defaultMsg;
    window.open(`https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // 11. Multi-Language Switcher
  initLanguageSwitcher();
}

// Multi-Language Translation Switcher
function initLanguageSwitcher() {
  window.toggleLangMenu = function() {
    const menus = document.querySelectorAll('.lang-menu-dropdown');
    menus.forEach(menu => menu.classList.toggle('hidden'));
  };

  window.switchLanguage = function(langCode, flagUrl, langName) {
    const flagEls = document.querySelectorAll('.current-lang-flag');
    const textEls = document.querySelectorAll('.current-lang-text');
    flagEls.forEach(el => {
      if (el.tagName === 'IMG') {
        el.src = flagUrl;
      } else {
        el.textContent = flagUrl;
      }
    });
    textEls.forEach(el => el.textContent = langName);

    const menus = document.querySelectorAll('.lang-menu-dropdown');
    menus.forEach(m => m.classList.add('hidden'));

    if (langCode === 'en') {
      // Clear translation cookie / reset
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + location.hostname;
      location.reload();
      return;
    }

    // Set Google Translate cookie and initialize
    document.cookie = `googtrans=/en/${langCode}; path=/;`;
    document.cookie = `googtrans=/en/${langCode}; path=/; domain=${location.hostname};`;

    if (!window.googleTranslateLoaded) {
      window.googleTranslateLoaded = true;
      const script = document.createElement('script');
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateInit';
      document.body.appendChild(script);

      window.googleTranslateInit = function() {
        new google.translate.TranslateElement({
          pageLanguage: 'en',
          autoDisplay: false
        }, 'google_translate_element');
        setTimeout(() => {
          location.reload();
        }, 300);
      };
    } else {
      location.reload();
    }
  };

  // Close dropdown on outside click
  document.addEventListener('click', (e) => {
    const wrapper = document.querySelector('.lang-dropdown-wrapper');
    const menus = document.querySelectorAll('.lang-menu-dropdown');
    if (wrapper && !wrapper.contains(e.target)) {
      menus.forEach(m => m.classList.add('hidden'));
    }
  });
}

  // 11. FAQ Accordion Toggle
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
      url: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1920&q=80",
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

// Interactive Gallery Story Showcase Handler (Auto-Swapping with Rich Descriptions)
const GALLERY_STORIES = [
  {
    category: "🏄 SURF LESSONS",
    title: "Catching Your First Wave on Narigama Sandbank",
    description: "Feel the pure rush of standing up on unbroken green waves with patient 1-on-1 coaching from native ISA instructors. Soft-top boards, personalized wave selection, and 100% stand-up guarantee.",
    tags: ["📍 Narigama Beach", "🏄 Beginner to Pro", "🕒 1.5 - 2 Hours"],
    image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1200&q=80",
    activityName: "Beginner Surf Lesson"
  },
  {
    category: "🐢 WILD TURTLES",
    title: "Swimming with Giant Green Turtles in Shallow Waters",
    description: "Wade directly into the warm crystalline waters of Turtle Beach and swim face-to-face with friendly green sea turtles in their protected natural habitat. Completely ethical and safe for kids.",
    tags: ["📍 Turtle Beach Reef", "🤿 All Ages & Families", "🌿 100% Ethical Wildlife"],
    image: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&w=1200&q=80",
    activityName: "Turtle Snorkeling"
  },
  {
    category: "🤿 CORAL REEF",
    title: "Exploring Hikkaduwa’s National Coral Reef Sanctuary",
    description: "Immerse yourself in a vibrant underwater paradise teeming with schools of yellow snapper, parrotfish, and vivid corals. Sanitized masks, snorkels, fins, and life jackets included.",
    tags: ["📍 Marine Coral Sanctuary", "🐠 60+ Marine Species", "🦺 Gear Included"],
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
    activityName: "Snorkeling Tour"
  },
  {
    category: "🎣 FISHING TOURS",
    title: "Deep-Sea Big Game & Traditional Lagoon Fishing",
    description: "Head past the reef at sunrise for thrilling big game trolling (Tuna, Wahoo, Barracuda) or enjoy tranquil evening handline lagoon angling with generational local fishermen.",
    tags: ["📍 Deep Sea & Lagoon", "🐟 Traditional & Modern", "🛥️ Private Boat Option"],
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=1200&q=80",
    activityName: "Fishing Tour"
  },
  {
    category: "🚤 RIVER SAFARI",
    title: "Madu River Mangrove Safaris & Secret Island Temples",
    description: "Glide through breathtaking mangrove tunnels on the scenic Madu Ganga. Visit historic Cinnamon Island, receive natural fish therapy, and explore ancient island Buddhist shrines.",
    tags: ["📍 Madu River Mangroves", "🏝️ Cinnamon Island", "🦜 Tropical Wildlife"],
    image: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1200&q=80",
    activityName: "Boat Tour"
  }
];

let currentStoryIdx = 0;
let storyTimer = null;

function initGalleryStoryShowcase() {
  const container = document.getElementById('gallery-story-showcase');
  if (!container) return;

  renderStorySlide(0);

  // Start Auto-Swap Timer (every 4 seconds)
  if (storyTimer) clearInterval(storyTimer);
  storyTimer = setInterval(() => {
    currentStoryIdx = (currentStoryIdx + 1) % GALLERY_STORIES.length;
    renderStorySlide(currentStoryIdx);
  }, 4200);

  // Pause on hover
  container.onmouseenter = () => { if (storyTimer) clearInterval(storyTimer); };
  container.onmouseleave = () => {
    if (storyTimer) clearInterval(storyTimer);
    storyTimer = setInterval(() => {
      currentStoryIdx = (currentStoryIdx + 1) % GALLERY_STORIES.length;
      renderStorySlide(currentStoryIdx);
    }, 4200);
  };
}

window.selectStorySlide = function(idx) {
  currentStoryIdx = idx;
  renderStorySlide(idx);
  if (storyTimer) clearInterval(storyTimer);
};

function renderStorySlide(idx) {
  const story = GALLERY_STORIES[idx];
  const imgEl = document.getElementById('story-img');
  const catEl = document.getElementById('story-category');
  const titleEl = document.getElementById('story-title');
  const descEl = document.getElementById('story-desc');
  const tagsEl = document.getElementById('story-tags');
  const counterEl = document.getElementById('story-counter');
  const bookBtn = document.getElementById('story-book-btn');

  if (imgEl) {
    imgEl.style.opacity = '0.3';
    setTimeout(() => {
      imgEl.src = story.image;
      imgEl.style.opacity = '1';
    }, 150);
  }
  if (catEl) catEl.textContent = story.category;
  if (titleEl) titleEl.textContent = story.title;
  if (descEl) descEl.textContent = story.description;
  if (counterEl) counterEl.textContent = `0${idx + 1} / 0${GALLERY_STORIES.length}`;
  if (tagsEl) {
    tagsEl.innerHTML = story.tags.map(t => `<span class="px-2.5 py-1 bg-white/10 rounded-full text-[11px] font-semibold">${t}</span>`).join('');
  }
  if (bookBtn) {
    bookBtn.onclick = () => openBookingModal(story.activityName);
  }

  // Update Thumbnail Active states
  document.querySelectorAll('.story-thumb-btn').forEach((btn, bIdx) => {
    if (bIdx === idx) {
      btn.className = "story-thumb-btn relative rounded-2xl overflow-hidden border-2 border-surf-500 ring-2 ring-surf-400 scale-105 transition-all";
    } else {
      btn.className = "story-thumb-btn relative rounded-2xl overflow-hidden border border-white/20 opacity-60 hover:opacity-100 transition-all";
    }
  });
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
