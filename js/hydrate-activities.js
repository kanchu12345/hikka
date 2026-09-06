// Real-time Firestore Hydrator for activities.html
import { getPageData, getSettings, subscribeToPage, subscribeToSettings } from "./firebase-init.js";

document.addEventListener('DOMContentLoaded', () => {
  initActivitiesHydration();
});

async function initActivitiesHydration() {
  try {
    const [actData, settings] = await Promise.all([
      getPageData('activities'),
      getSettings()
    ]);

    if (settings) hydrateSettings(settings);
    if (actData) hydrateActivities(actData);

    subscribeToSettings((newSettings) => {
      hydrateSettings(newSettings);
    });

    subscribeToPage('activities', (newActData) => {
      hydrateActivities(newActData);
    });
  } catch (err) {
    console.warn("Firestore activities hydration notice (using HTML defaults):", err);
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

function hydrateActivities(data) {
  if (!data || !data.activities || !data.activities.length) return;

  const container = document.getElementById('activities-cards-container');
  if (!container) return;

  container.innerHTML = data.activities.map(act => `
    <div class="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center surfer-card">
      <div class="lg:col-span-6 space-y-4">
        <span class="px-3.5 py-1 bg-cyan-100 text-cyan-800 rounded-full text-xs font-bold uppercase">${act.tagline || 'Experience'}</span>
        <h3 class="text-3xl font-black font-serif-heading text-gray-900">${act.title}</h3>
        <p class="text-gray-600 text-xs sm:text-sm leading-relaxed">${act.description || ''}</p>
        <div class="text-2xl font-black text-cyan-800">From <span data-usd="${act.price_from}">$${act.price_from}</span> <span class="text-xs font-sans text-gray-500 font-normal">USD / Person</span></div>
        <div class="text-xs text-gray-500">⏱️ Duration: ${act.duration || '1.5 - 2 Hours'} • Equipment Included</div>
        <div class="flex flex-wrap gap-3 pt-2">
          <button onclick="openBookingModal('${act.title.replace(/'/g, "\\'")}')" class="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs shadow-md">
            Book on WhatsApp
          </button>
        </div>
      </div>
      <div class="lg:col-span-6 rounded-2xl overflow-hidden h-72 sm:h-80 shadow-lg">
        <img src="${act.imageUrl}" alt="${act.title}" class="w-full h-full object-cover" loading="lazy" decoding="async" />
      </div>
    </div>
  `).join('');

  if (window.setCurrency) {
    const savedCurrency = localStorage.getItem('hikka_selected_currency') || 'USD';
    window.setCurrency(savedCurrency);
  }
}
