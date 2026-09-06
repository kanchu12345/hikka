// Real-time Firestore Hydrator for destinations.html
import { getPageData, getSettings, subscribeToPage, subscribeToSettings } from "./firebase-init.js";

document.addEventListener('DOMContentLoaded', () => {
  initDestinationsHydration();
});

async function initDestinationsHydration() {
  try {
    const [destData, settings] = await Promise.all([
      getPageData('destinations'),
      getSettings()
    ]);

    if (settings) hydrateSettings(settings);
    if (destData) hydrateDestinations(destData);

    subscribeToSettings((newSettings) => {
      hydrateSettings(newSettings);
    });

    subscribeToPage('destinations', (newDestData) => {
      hydrateDestinations(newDestData);
    });
  } catch (err) {
    console.warn("Firestore destinations hydration notice (using HTML defaults):", err);
  }
}

function hydrateSettings(settings) {
  if (!settings) return;

  const rep = settings.liveSurfReport;
  if (rep) {
    const tickerEl = document.getElementById('live-surf-dest-ticker');
    if (tickerEl) {
      tickerEl.innerHTML = `🌊 <strong>Today's Surf & Tour Update:</strong> ${rep.waves} • ${rep.waterTemp} • ${rep.condition}`;
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

function hydrateDestinations(data) {
  if (!data || !data.destinations || !data.destinations.length) return;

  const grid = document.getElementById('destinations-cards-grid');
  if (!grid) return;

  grid.innerHTML = data.destinations.map(d => `
    <div id="${d.id || 'dest'}" class="surfer-card bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between border border-gray-200 group scroll-mt-28">
      <div>
        <div class="relative h-60 overflow-hidden">
          <img src="${d.imageUrl}" alt="${d.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div class="absolute bottom-3 left-4 text-white">
            <span class="px-2.5 py-1 bg-amber-400 text-gray-950 font-black rounded-lg text-[10px] uppercase shadow-sm">${d.duration || 'Day Tour'}</span>
            <h3 class="font-bold text-xl font-serif-heading text-white mt-1">${d.name}</h3>
          </div>
        </div>

        <div class="p-6 space-y-3">
          <div class="text-xs font-bold text-surf-600">${d.highlight || 'Scenic Sightseeing'}</div>
          <p class="text-xs text-gray-600 leading-relaxed">${d.description || ''}</p>
        </div>
      </div>

      <div class="p-6 pt-0">
        <button onclick="openBookingModal('${d.name.replace(/'/g, "\\'")}')" class="w-full py-3 bg-[#0A2540] hover:bg-surf-600 text-white font-bold rounded-2xl text-xs active:scale-95 transition-all shadow-sm flex items-center justify-center gap-1.5">
          <span>🌴 Book This Tour on WhatsApp</span>
        </button>
      </div>
    </div>
  `).join('');
}
