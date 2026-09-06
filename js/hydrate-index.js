// Real-time Firestore Hydrator for index.html (Homepage)
import { getPageData, getSettings, subscribeToPage, subscribeToSettings } from "./firebase-init.js";

document.addEventListener('DOMContentLoaded', () => {
  initIndexHydration();
});

async function initIndexHydration() {
  try {
    const [indexData, settings] = await Promise.all([
      getPageData('index'),
      getSettings()
    ]);

    if (settings) hydrateSettings(settings);
    if (indexData) hydrateIndex(indexData);

    // Real-time subscriptions
    subscribeToSettings((newSettings) => {
      hydrateSettings(newSettings);
    });

    subscribeToPage('index', (newIndexData) => {
      hydrateIndex(newIndexData);
    });
  } catch (err) {
    console.warn("Firestore homepage hydration notice (using HTML defaults):", err);
  }
}

function hydrateSettings(settings) {
  if (!settings) return;

  // Live Surf Report Top Bar
  const rep = settings.liveSurfReport;
  if (rep) {
    const waveEl = document.getElementById('live-surf-waves');
    if (waveEl && rep.waves) {
      waveEl.innerHTML = `🌊 Waves: <strong class="text-white">${rep.waves}</strong>`;
    }
    const waterEl = document.getElementById('live-surf-water');
    if (waterEl && rep.waterTemp) {
      waterEl.innerHTML = `🌡️ Water: <strong class="text-white">${rep.waterTemp}</strong>`;
    }
  }

  // Tagline fallback
  if (settings.tagline) {
    const tagEl = document.getElementById('hero-tagline');
    if (tagEl) tagEl.textContent = `❤️ ${settings.tagline}`;
  }

  // WhatsApp Links
  if (settings.whatsappNumber) {
    const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
      const url = new URL(link.href);
      const text = url.searchParams.get('text') || '';
      link.href = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
    });
  }
}

function hydrateIndex(data) {
  if (!data) return;

  // Headline
  const headlineEl = document.getElementById('hero-headline');
  if (headlineEl && data.heroHeadline) {
    headlineEl.innerHTML = data.heroHeadline.replace(/\n/g, '<br />');
  }

  // Subheadline / Tagline
  if (data.heroSubheadline) {
    const tagEl = document.getElementById('hero-tagline');
    if (tagEl) tagEl.textContent = `❤️ ${data.heroSubheadline}`;
  }

  // Description
  const descEl = document.getElementById('hero-description');
  if (descEl && data.heroDescription) {
    descEl.textContent = data.heroDescription;
  }

  // Hero Slideshow
  if (data.heroImages && data.heroImages.length) {
    const container = document.getElementById('hero-slideshow-container');
    if (container) {
      container.innerHTML = data.heroImages.map((img, idx) => `
        <div class="hero-slide ${idx === 0 ? 'active' : ''}" style="background-image: url('${img.url}'); background-size: cover; background-position: center;"></div>
      `).join('');

      const dotsContainer = document.getElementById('hero-dots-container');
      if (dotsContainer) {
        dotsContainer.innerHTML = data.heroImages.map((_, idx) => `
          <button type="button" class="hero-dot ${idx === 0 ? 'active' : ''}" data-hero-dot="${idx}" aria-label="Go to slide ${idx + 1}"></button>
        `).join('');
      }

      let currentSlide = 0;
      const slides = container.querySelectorAll('.hero-slide');
      const dots = dotsContainer ? dotsContainer.querySelectorAll('.hero-dot') : [];
      const intervalTime = data.autoSwapInterval || 4500;

      function goToSlide(idx) {
        if (!slides.length) return;
        slides[currentSlide].classList.remove('active');
        if (dots[currentSlide]) dots[currentSlide].classList.remove('active');
        currentSlide = (idx + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) dots[currentSlide].classList.add('active');
      }

      function nextSlide() { goToSlide(currentSlide + 1); }
      function prevSlide() { goToSlide(currentSlide - 1); }

      function startTimer() {
        if (slides.length > 1) {
          if (window.heroTimer) clearInterval(window.heroTimer);
          window.heroTimer = setInterval(nextSlide, intervalTime);
        }
      }

      function stopTimer() {
        if (window.heroTimer) {
          clearInterval(window.heroTimer);
          window.heroTimer = null;
        }
      }

      startTimer();

      // Pause on hover
      const heroSection = document.getElementById('hero-section') || container;
      heroSection.addEventListener('mouseenter', stopTimer);
      heroSection.addEventListener('mouseleave', startTimer);

      // Prev / Next Buttons
      const prevBtn = document.getElementById('hero-prev-btn');
      const nextBtn = document.getElementById('hero-next-btn');
      if (prevBtn) prevBtn.onclick = () => { prevSlide(); startTimer(); };
      if (nextBtn) nextBtn.onclick = () => { nextSlide(); startTimer(); };

      // Dots Click
      if (dotsContainer) {
        dotsContainer.querySelectorAll('[data-hero-dot]').forEach(dot => {
          dot.onclick = (e) => {
            const idx = parseInt(e.target.dataset.heroDot);
            goToSlide(idx);
            startTimer();
          };
        });
      }

      // Touch swipe gestures
      let touchStartX = 0;
      let touchEndX = 0;
      heroSection.addEventListener('touchstart', e => {
        if (e.changedTouches && e.changedTouches[0]) {
          touchStartX = e.changedTouches[0].screenX;
        }
      }, { passive: true });
      heroSection.addEventListener('touchend', e => {
        if (e.changedTouches && e.changedTouches[0]) {
          touchEndX = e.changedTouches[0].screenX;
          const diffX = touchStartX - touchEndX;
          if (Math.abs(diffX) > 45) {
            if (diffX > 0) nextSlide();
            else prevSlide();
            startTimer();
          }
        }
      }, { passive: true });
    }
  }
}

