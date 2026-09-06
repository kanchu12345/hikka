// Real-time Firestore Hydrator for gallery.html
import { getPageData, getSettings, subscribeToPage, subscribeToSettings } from "./firebase-init.js";

document.addEventListener('DOMContentLoaded', () => {
  initGalleryHydration();
});

async function initGalleryHydration() {
  try {
    const [galleryData, settings] = await Promise.all([
      getPageData('gallery'),
      getSettings()
    ]);

    if (settings) hydrateSettings(settings);
    if (galleryData) hydrateGallery(galleryData);

    subscribeToSettings((newSettings) => {
      hydrateSettings(newSettings);
    });

    subscribeToPage('gallery', (newGalleryData) => {
      hydrateGallery(newGalleryData);
    });
  } catch (err) {
    console.warn("Firestore gallery hydration notice (using HTML defaults):", err);
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
      try {
        const url = new URL(link.href);
        const text = url.searchParams.get('text') || '';
        link.href = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
      } catch (e) {
        // Ignore malformed href
      }
    });
  }
}

function hydrateGallery(data) {
  if (!data || !data.items || !data.items.length) return;

  const container = document.getElementById('gallery-photo-grid');
  if (!container) return;

  container.innerHTML = data.items.map(item => {
    const safeTitle = (item.title || '').replace(/'/g, "\\'");
    const safeCaption = (item.caption || '').replace(/'/g, "\\'");
    const safeCat = item.category || 'Gallery';
    return `
      <div class="h-64 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all relative group" onclick="openLightbox('${item.imageUrl}', '${safeTitle}', '${safeCaption}')">
        <img src="${item.imageUrl}" alt="${item.title || 'Gallery Photo'}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" decoding="async" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
          <span class="text-[10px] font-bold text-amber-300 uppercase tracking-wider">${safeCat}</span>
          <h4 class="text-white text-xs font-bold leading-snug drop-shadow-sm">${item.title || ''}</h4>
          ${item.caption ? `<p class="text-gray-200 text-[10px] line-clamp-1 mt-0.5">${item.caption}</p>` : ''}
        </div>
      </div>
    `;
  }).join('');
}
