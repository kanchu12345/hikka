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

  // Coaches & Instructors Grid
  if (data.coaches && data.coaches.length) {
    const coachGrid = document.getElementById('about-coaches-cards-grid');
    if (coachGrid) {
      coachGrid.innerHTML = data.coaches.map(c => `
        <div class="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-200 transition-all text-center flex flex-col justify-between">
          <div>
            <div class="h-64 overflow-hidden relative">
              <img src="${c.imageUrl || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80'}" alt="${c.name || 'Surf Coach'}" class="w-full h-full object-cover" loading="lazy" decoding="async" />
              <span class="absolute top-3 right-3 px-3 py-1 bg-[#0A2540] text-white rounded-full text-[10px] font-black uppercase">${c.badge || 'Coach'}</span>
            </div>
            <div class="p-6 space-y-2">
              <h3 class="font-serif-heading font-black text-xl text-gray-900">${c.name || ''}</h3>
              <p class="text-xs text-surf-600 font-bold uppercase tracking-wider">${c.role || ''}</p>
              <p class="text-xs text-gray-600 leading-relaxed pt-1">
                ${c.bio || ''}
              </p>
            </div>
          </div>
          <div class="p-6 pt-0 border-t border-gray-100 mt-4 flex items-center justify-around text-[11px] font-semibold text-gray-500 flex-wrap gap-2">
            ${(c.tags || []).map((t, idx) => `
              <span>${t}</span>${idx < (c.tags || []).length - 1 ? '<span>•</span>' : ''}
            `).join('')}
          </div>
        </div>
      `).join('');
    }
  }
}

