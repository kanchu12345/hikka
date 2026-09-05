// Advanced Interactive & Auto-Swapping Engine for Hikkaduwa Hikka Surf School

// Exchange rates relative to USD
const CURRENCY_RATES = {
  USD: { symbol: '$', rate: 1.0, label: 'USD ($)' },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR (€)' },
  GBP: { symbol: '£', rate: 0.79, label: 'GBP (£)' },
  LKR: { symbol: 'Rs. ', rate: 320.0, label: 'LKR (Rs.)' }
};

const LANG_MAP = {
  en: { name: 'English', label: 'EN', flag: 'https://flagcdn.com/w40/gb.png' },
  de: { name: 'Deutsch', label: 'DE', flag: 'https://flagcdn.com/w40/de.png' },
  ru: { name: 'Русский', label: 'RU', flag: 'https://flagcdn.com/w40/ru.png' },
  fr: { name: 'Français', label: 'FR', flag: 'https://flagcdn.com/w40/fr.png' },
  it: { name: 'Italiano', label: 'IT', flag: 'https://flagcdn.com/w40/it.png' },
  si: { name: 'සිංහල', label: 'LK', flag: 'https://flagcdn.com/w40/lk.png' }
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
  document.documentElement.classList.add('js-ready');
  const siteData = typeof getActiveSiteData === 'function' ? getActiveSiteData() : (window.DEFAULT_SITE_DATA || {});
  const settings = siteData.settings || {};
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
    mobileMenuBtn.onclick = (e) => {
      e.stopPropagation();
      mobileMenu.classList.toggle('hidden');
    };
  }

  // 6. Sticky Glass Navbar on Scroll (Persistent High-Contrast Coastal Navy)
  const mainNavbar = document.getElementById('main-navbar');
  if (mainNavbar) {
    const updateNavbarOnScroll = () => {
      if (window.scrollY > 30) {
        mainNavbar.classList.add('shadow-2xl', 'py-2.5');
        mainNavbar.classList.remove('py-3.5');
      } else {
        mainNavbar.classList.remove('shadow-2xl', 'py-2.5');
        mainNavbar.classList.add('py-3.5');
      }
    };
    window.addEventListener('scroll', updateNavbarOnScroll, { passive: true });
    updateNavbarOnScroll();
  }

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
    try {
      localStorage.setItem('hikka_selected_currency', code);
    } catch(e) {}
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

    // Highlight active currency button
    document.querySelectorAll('button[onclick*="setCurrency"]').forEach(btn => {
      if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(`'${code}'`)) {
        btn.classList.add('text-sand-300', 'font-black', 'underline');
        btn.classList.remove('text-white/70');
      } else {
        btn.classList.remove('text-sand-300', 'font-black', 'underline');
        btn.classList.add('text-white/70');
      }
    });
  };

  // Restore saved currency on load
  try {
    const savedCurrency = localStorage.getItem('hikka_selected_currency') || 'USD';
    window.setCurrency(savedCurrency);
  } catch(e) {}

  // 9. WhatsApp Booking Modal System
  initBookingModal(cleanWhatsApp);

  // 10. Direct WhatsApp Trigger
  window.openDirectWhatsApp = function(customMessage = null) {
    const defaultMsg = `Hi Hikka Surf School! I would like to inquire about surf lessons and ocean activities in Hikkaduwa.`;
    const msg = customMessage || defaultMsg;
    window.open(`https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // 11. Multi-Language Switcher
  initLanguageSwitcher();

  // 12. FAQ Accordion Toggle
  initFaqAccordion();

  // 13. Surfing Introduction Animated Showcase
  initSurfIntroShowcase();
}

function initBookingModal(cleanWhatsApp) {
  const bookingModal = document.getElementById('booking-modal');
  const modalActivitySelect = document.getElementById('modal-activity-select');
  const modalDateInput = document.getElementById('modal-date-input');
  const modalGuestsSelect = document.getElementById('modal-guests-select');
  const modalTimeSelect = document.getElementById('modal-time-select');
  const modalNameInput = document.getElementById('modal-name-input');
  const modalPhoneInput = document.getElementById('modal-phone-input');
  const modalNotesInput = document.getElementById('modal-notes-input');
  const bookingForm = document.getElementById('booking-form');

  if (modalDateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    modalDateInput.value = tomorrow.toISOString().split('T')[0];
    modalDateInput.min = new Date().toISOString().split('T')[0];
  }

  window.openBookingModal = function(activityTitle = 'Beginner Surf Lesson') {
    const modal = document.getElementById('booking-modal');
    if (!modal) {
      const cleanPhone = cleanWhatsApp || '94771234567';
      window.open(`https://wa.me/${cleanPhone}?text=Hi%20Hikka%20Surf%20School!%20I%20would%20like%20to%20book%20${encodeURIComponent(activityTitle)}`, '_blank');
      return;
    }
    const selectEl = document.getElementById('modal-activity-select');
    if (selectEl && activityTitle) {
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

  window.inquireTour = function(tourName = 'Southern Province Tour') {
    const cleanPhone = cleanWhatsApp || '94771234567';
    const text = `Hi Hikka Surf School,
I would like to book the ${tourName}.
Preferred date:
Number of people:
Pickup location:`;
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (bookingModal) {
    bookingModal.onclick = (e) => {
      if (e.target === bookingModal) {
        closeBookingModal();
      }
    };
  }

  if (bookingForm) {
    bookingForm.onsubmit = (e) => {
      e.preventDefault();
      const activity = modalActivitySelect?.value || 'Beginner Surf Lesson';
      const date = modalDateInput?.value || 'Tomorrow';
      const guests = modalGuestsSelect?.value || '2 People';
      const time = modalTimeSelect?.value || '08:30 AM';
      const name = modalNameInput?.value ? modalNameInput.value.trim() : 'Guest';
      const phone = modalPhoneInput?.value ? modalPhoneInput.value.trim() : 'Not provided';
      const notes = modalNotesInput?.value ? modalNotesInput.value.trim() : 'None';

      const inquiryObj = {
        activity,
        date,
        guests,
        time,
        name,
        phone,
        notes,
        timestamp: new Date().toISOString()
      };

      try {
        const stored = JSON.parse(localStorage.getItem('hikka_recent_inquiries') || '[]');
        stored.unshift(inquiryObj);
        if (stored.length > 50) stored.pop();
        localStorage.setItem('hikka_recent_inquiries', JSON.stringify(stored));
      } catch(err) {}

      const msgLines = [
        "Hi Hikka Surf School, I would like to book a session:",
        `• Activity: ${activity}`,
        `• Preferred Date: ${date}`,
        `• Number of People: ${guests}`,
        `• Preferred Time: ${time}`,
        `• Name: ${name}`,
        `• Contact: ${phone}`,
        `• Notes/Pickup: ${notes}`,
        "",
        "Please let me know availability!"
      ];

      const cleanPhone = cleanWhatsApp || '94771234567';
      window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msgLines.join('\n'))}`, '_blank');
      closeBookingModal();
    };
  }
}

// Multi-Language Translation Switcher
function initLanguageSwitcher() {
  ensureGoogleTranslateElement();

  // Read saved language from cookie or localStorage
  let savedLang = localStorage.getItem('hikka_selected_lang');
  const cookieMatch = getCookie('googtrans');
  if (cookieMatch) {
    const parts = cookieMatch.split('/');
    if (parts.length >= 3 && parts[2]) {
      savedLang = parts[2];
    }
  }

  if (savedLang && LANG_MAP[savedLang]) {
    updateLangUI(savedLang);
    if (savedLang !== 'en') {
      loadGoogleTranslateScript(false);
    }
  }

  window.toggleLangMenu = function(e) {
    if (e) {
      if (typeof e.preventDefault === 'function') e.preventDefault();
      if (typeof e.stopPropagation === 'function') e.stopPropagation();
    }
    const menus = document.querySelectorAll('.lang-menu-dropdown');
    menus.forEach(menu => menu.classList.toggle('hidden'));
  };

  window.switchLanguage = function(langCode, flagUrl, langName) {
    if (!LANG_MAP[langCode]) langCode = 'en';
    const langInfo = LANG_MAP[langCode];

    localStorage.setItem('hikka_selected_lang', langCode);
    updateLangUI(langCode);

    const menus = document.querySelectorAll('.lang-menu-dropdown');
    menus.forEach(m => m.classList.add('hidden'));

    if (langCode === 'en') {
      // Clear translation cookies / reset
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + location.hostname;
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=." + location.hostname;
      location.reload();
      return;
    }

    // Set Google Translate cookie and initialize
    document.cookie = `googtrans=/en/${langCode}; path=/;`;
    document.cookie = `googtrans=/en/${langCode}; path=/; domain=${location.hostname};`;
    document.cookie = `googtrans=/en/${langCode}; path=/; domain=.${location.hostname};`;

    loadGoogleTranslateScript(true);
  };

  // Close dropdown on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.lang-dropdown-wrapper')) {
      const menus = document.querySelectorAll('.lang-menu-dropdown');
      menus.forEach(m => m.classList.add('hidden'));
    }
  });
}

function updateLangUI(langCode) {
  const lang = LANG_MAP[langCode];
  if (!lang) return;
  document.querySelectorAll('.current-lang-flag').forEach(el => {
    if (el.tagName === 'IMG') {
      el.src = lang.flag;
      el.alt = lang.name;
    } else {
      el.textContent = lang.flag;
    }
  });
  document.querySelectorAll('.current-lang-text').forEach(el => {
    el.textContent = lang.label || lang.name;
  });
}

function ensureGoogleTranslateElement() {
  if (!document.getElementById('google_translate_element')) {
    const div = document.createElement('div');
    div.id = 'google_translate_element';
    div.style.display = 'none';
    document.body.appendChild(div);
  }
}

function getCookie(name) {
  const v = `; ${document.cookie}`;
  const parts = v.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return '';
}

function loadGoogleTranslateScript(triggerReloadOnReady = false) {
  ensureGoogleTranslateElement();
  if (window.google && window.google.translate) {
    if (triggerReloadOnReady) {
      location.reload();
    }
    return;
  }
  if (!window.googleTranslateScriptAppended) {
    window.googleTranslateScriptAppended = true;
    window.googleTranslateElementInit = function() {
      try {
        new google.translate.TranslateElement({
          pageLanguage: 'en',
          autoDisplay: false
        }, 'google_translate_element');
      } catch (err) {
        console.warn("Google Translate init:", err);
      }
      if (triggerReloadOnReady) {
        setTimeout(() => { location.reload(); }, 300);
      }
    };
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.body.appendChild(script);
  } else if (triggerReloadOnReady) {
    location.reload();
  }
}

function initFaqAccordion() {
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
    { url: "https://images.unsplash.com/photo-1516815231560-8f41ec531527?auto=format&fit=crop&w=1920&q=80" },
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
      url: "https://images.unsplash.com/photo-1516815231560-8f41ec531527?auto=format&fit=crop&w=1920&q=80",
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
    description: "Feel the pure rush of standing up on unbroken green waves with patient 1-on-1 coaching from native local instructors. Soft-top boards, personalized wave selection, and 100% stand-up guarantee.",
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

// Surfing Intro Showcase (Auto-swapping with dots and captions)
function initSurfIntroShowcase() {
  const container = document.getElementById('surf-intro-slideshow');
  const dotsContainer = document.getElementById('surf-intro-dots');
  const titleEl = document.getElementById('surf-intro-slide-title');
  const badgeEl = document.getElementById('surf-intro-slide-badge');
  if (!container) return;

  const slidesData = [
    {
      title: "Clean Peeling Sandbank Waves",
      badge: "🏄 Narigama Main Break",
      tag: "Ideal for All Levels"
    },
    {
      title: "Warm 28°C Tropical Waters",
      badge: "🌊 No Wetsuit Needed",
      tag: "100% Stand-Up Guarantee"
    },
    {
      title: "Experienced Local Instructors",
      badge: "🏆 100% Native Surf Guides",
      tag: "Step-by-step Patient Guidance"
    },
    {
      title: "All Equipment & Rashguards Included",
      badge: "🛡️ Safety Briefing & Soft-Tops",
      tag: "Zero Coral Hazards"
    }
  ];

  const slides = container.querySelectorAll('.surf-intro-slide');

  let currentIdx = 0;
  let introTimer = null;

  window.setSurfIntroSlide = function(idx) {
    const dots = dotsContainer ? dotsContainer.querySelectorAll('.surf-intro-dot') : [];
    if (!slides.length) return;

    slides.forEach((sl, sIdx) => {
      if (sIdx === idx) {
        sl.classList.add('opacity-100', 'active', 'z-10');
        sl.classList.remove('opacity-0', 'z-0');
      } else {
        sl.classList.remove('opacity-100', 'active', 'z-10');
        sl.classList.add('opacity-0', 'z-0');
      }
    });

    dots.forEach((dot, dIdx) => {
      if (dIdx === idx) {
        dot.className = "surf-intro-dot h-2.5 rounded-full transition-all duration-300 cursor-pointer w-8 bg-amber-400";
      } else {
        dot.className = "surf-intro-dot h-2.5 rounded-full transition-all duration-300 cursor-pointer w-2.5 bg-white/40 hover:bg-white/70";
      }
    });

    if (titleEl && slidesData[idx]) {
      titleEl.textContent = slidesData[idx].title;
    }
    if (badgeEl && slidesData[idx]) {
      badgeEl.textContent = slidesData[idx].badge;
    }

    currentIdx = idx;
  };

  function startAutoPlay() {
    if (introTimer) clearInterval(introTimer);
    introTimer = setInterval(() => {
      const nextIdx = (currentIdx + 1) % slidesData.length;
      window.setSurfIntroSlide(nextIdx);
    }, 3800);
  }

  startAutoPlay();

  container.addEventListener('mouseenter', () => {
    if (introTimer) clearInterval(introTimer);
  });
  container.addEventListener('mouseleave', () => {
    startAutoPlay();
  });
}
