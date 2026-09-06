// Real-time Firestore Hydrator for about.html
import { getPageData, getSettings, subscribeToPage, subscribeToSettings } from "./firebase-init.js";

document.addEventListener('DOMContentLoaded', () => {
  initAboutHydration();
});

async function initAboutHydration() {
  try {
    const [aboutData, settings] = await Promise.all([
      getPageData('about'),
      getSettings()
    ]);

    if (settings) hydrateSettings(settings);
    if (aboutData) hydrateAbout(aboutData);

    subscribeToSettings((newSettings) => {
      hydrateSettings(newSettings);
    });

    subscribeToPage('about', (newAboutData) => {
      hydrateAbout(newAboutData);
    });
  } catch (err) {
    console.warn("Firestore about hydration notice (using HTML defaults):", err);
  }
}

function hydrateSettings(settings) {
  if (!settings) return;

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

  if (settings.whatsappNumber) {
    const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
      const url = new URL(link.href);
      const text = url.searchParams.get('text') || '';
      link.href = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
    });
  }
}

function hydrateAbout(data) {
  if (!data) return;

  if (data.tagline) {
    const tagEl = document.getElementById('about-tagline-text');
    if (tagEl) tagEl.textContent = data.tagline;
  }

  if (data.story) {
    const storyEl = document.getElementById('about-story-content');
    if (storyEl) {
      storyEl.innerHTML = data.story.split('\n\n').map(p => `
        <p class="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">${p}</p>
      `).join('');
    }
  }
}
