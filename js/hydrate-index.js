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

      let currentSlide = 0;
      const slides = container.querySelectorAll('.hero-slide');
      const intervalTime = data.autoSwapInterval || 4500;

      if (slides.length > 1) {
        if (window.heroTimer) clearInterval(window.heroTimer);
        window.heroTimer = setInterval(() => {
          slides[currentSlide].classList.remove('active');
          currentSlide = (currentSlide + 1) % slides.length;
          slides[currentSlide].classList.add('active');
        }, intervalTime);
      }
    }
  }
}
