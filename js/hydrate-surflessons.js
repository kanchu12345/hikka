// Real-time Firestore Hydrator for surf-lessons.html (#rates, #spots, #quiver, #guidelines)
import { getPageData, getSettings, subscribeToPage, subscribeToSettings } from "./firebase-init.js";

document.addEventListener('DOMContentLoaded', () => {
  initSurfLessonsHydration();
});

async function initSurfLessonsHydration() {
  try {
    // 1. Initial Fetch
    const [pageData, settings] = await Promise.all([
      getPageData('surf-lessons'),
      getSettings()
    ]);

    if (settings) hydrateSettings(settings);
    if (pageData) hydrateSurfLessons(pageData);

    // 2. Real-time Live Subscriptions
    subscribeToSettings((newSettings) => {
      hydrateSettings(newSettings);
    });

    subscribeToPage('surf-lessons', (newPageData) => {
      hydrateSurfLessons(newPageData);
    });
  } catch (err) {
    console.warn("Firestore live hydration notice (using HTML defaults):", err);
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

function hydrateSurfLessons(data) {
  if (!data) return;

  // 1. Section #rates
  if (data.rates && data.rates.length) {
    const ratesGrid = document.getElementById('surf-rates-grid');
    if (ratesGrid) {
      ratesGrid.innerHTML = data.rates.map(pkg => `
        <div class="bg-white rounded-3xl overflow-hidden ${pkg.popular ? 'border-2 border-surf-500 shadow-2xl' : 'border border-surf-200 shadow-md'} flex flex-col justify-between relative transform hover:-translate-y-1 transition-all">
          ${pkg.badge ? `<span class="absolute top-4 right-4 px-3 py-1 ${pkg.popular ? 'bg-amber-400 text-gray-950' : 'bg-surf-600 text-white'} rounded-full text-[10px] font-black uppercase tracking-wider z-10">${pkg.badge}</span>` : ''}
          <div>
            <div class="h-48 overflow-hidden relative">
              <img src="${pkg.imageUrl || 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=600&q=80'}" alt="${pkg.name}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div class="absolute bottom-3 left-4 text-white">
                <span class="text-[10px] font-bold uppercase tracking-wider text-cyan-300">Level 1 • Certified Coaching</span>
                <h3 class="font-serif-heading font-black text-xl leading-tight">${pkg.name}</h3>
              </div>
            </div>

            <div class="p-6 space-y-4">
              <div class="bg-surf-50 p-4 rounded-2xl border border-surf-100 flex items-center justify-between">
                <div>
                  <div class="text-3xl font-black font-serif-heading text-surf-900">
                    <span data-usd="${pkg.priceUsd}">$${pkg.priceUsd}</span> 
                    <span class="text-xs text-gray-500 font-sans font-normal">${pkg.unit || 'USD / Person'}</span>
                  </div>
                  <div class="text-xs text-surf-700 font-bold mt-0.5">⏱️ ${pkg.duration || '1.5 Hours in Water'}</div>
                </div>
                <span class="text-2xl">🏄</span>
              </div>

              <ul class="space-y-2 text-xs text-gray-700">
                ${(pkg.features || []).map(f => `
                  <li class="flex items-center gap-2">
                    <span class="text-emerald-600 font-bold">✓</span>
                    <span>${f}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
          </div>

          <div class="p-6 pt-0">
            <button onclick="openBookingModal('${pkg.name.replace(/'/g, "\\'")}')" class="w-full py-3.5 ${pkg.popular ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-surf-600 hover:bg-surf-700'} text-white font-black rounded-2xl text-xs shadow-md active:scale-95 transition-all">
              Book ${pkg.name} on WhatsApp
            </button>
          </div>
        </div>
      `).join('');

      // Re-apply selected currency if currency switcher was used
      if (window.setCurrency) {
        const savedCurrency = localStorage.getItem('hikka_selected_currency') || 'USD';
        window.setCurrency(savedCurrency);
      }
    }
  }

  // 2. Section #spots
  if (data.spots && data.spots.length) {
    const spotsGrid = document.getElementById('surf-spots-grid');
    if (spotsGrid) {
      spotsGrid.innerHTML = data.spots.map(s => `
        <div class="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm hover:border-surf-500 hover:shadow-xl transition-all flex flex-col justify-between group">
          <div>
            <div class="flex items-center justify-between mb-3">
              <span class="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-black uppercase">${s.badge || 'Beginner'}</span>
              <span class="text-xs font-bold text-gray-500">${s.icon || '🏄 Sand Break'}</span>
            </div>
            <h3 class="text-lg font-bold font-serif-heading text-gray-900 mb-2">${s.name}</h3>
            <p class="text-xs text-gray-600 leading-relaxed mb-4">${s.description}</p>
            <div class="space-y-1.5 text-[11px] text-gray-700 bg-slate-50 p-3 rounded-xl border border-gray-100">
              <div>🌊 <strong>Wave Type:</strong> ${s.waveType || 'Left & Right'}</div>
              <div>🏄 <strong>Ideal For:</strong> ${s.idealFor || 'All Surfers'}</div>
              <div>🛡️ <strong>Seabed:</strong> ${s.seabed || 'Sand'}</div>
            </div>
          </div>
          <button onclick="openBookingModal('Surf Coaching - ${s.name.replace(/'/g, "\\'")}')" class="w-full mt-5 py-2.5 bg-surf-600 hover:bg-surf-700 text-white font-bold rounded-xl text-xs active:scale-95 transition-all shadow-sm">
            Book Lessons Here
          </button>
        </div>
      `).join('');
    }
  }

  // 3. Section #quiver
  if (data.quiver) {
    const q = data.quiver;
    const titleEl = document.getElementById('quiver-section-title');
    if (titleEl && q.introTitle) titleEl.textContent = q.introTitle;

    const descEl = document.getElementById('quiver-section-desc');
    if (descEl && q.introDesc) descEl.textContent = q.introDesc;

    const reserveBtn = document.getElementById('quiver-reserve-btn');
    if (reserveBtn && q.rentalPricePerDay) {
      reserveBtn.textContent = `Reserve This Board ($${q.rentalPricePerDay}/Day)`;
    }
  }

  // 4. Section #guidelines
  if (data.guidelines && data.guidelines.length) {
    const guideGrid = document.getElementById('surf-guidelines-grid');
    if (guideGrid) {
      guideGrid.innerHTML = data.guidelines.map(g => `
        <div class="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-xl transition-all">
          <div>
            <div class="w-12 h-12 rounded-2xl bg-surf-600 text-white flex items-center justify-center text-xl font-bold mb-6 shadow-md">
              ${g.icon || '🛡️'}
            </div>
            <h3 class="text-xl font-bold font-serif-heading text-gray-900 mb-4">${g.title}</h3>
            <ul class="space-y-3 text-xs text-gray-700">
              ${(g.rules || []).map(r => `
                <li class="flex items-start gap-2.5">
                  <span class="text-surf-600 font-bold text-sm">✓</span>
                  <div>${r}</div>
                </li>
              `).join('')}
            </ul>
          </div>
        </div>
      `).join('');
    }
  }
}
