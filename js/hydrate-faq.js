// Real-time Firestore Hydrator for faq.html
import { getPageData, getSettings, subscribeToPage, subscribeToSettings } from "./firebase-init.js";

document.addEventListener('DOMContentLoaded', () => {
  initFaqHydration();
});

async function initFaqHydration() {
  try {
    const [faqData, settings] = await Promise.all([
      getPageData('faq'),
      getSettings()
    ]);

    if (settings) hydrateSettings(settings);
    if (faqData) hydrateFaq(faqData);

    subscribeToSettings((newSettings) => {
      hydrateSettings(newSettings);
    });

    subscribeToPage('faq', (newFaqData) => {
      hydrateFaq(newFaqData);
    });
  } catch (err) {
    console.warn("Firestore FAQ hydration notice (using HTML defaults):", err);
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

function hydrateFaq(data) {
  if (!data || !data.faqs || !data.faqs.length) return;

  const container = document.getElementById('faq-accordion-container');
  if (!container) return;

  container.innerHTML = data.faqs.map((f, idx) => `
    <div class="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm transition-all hover:border-surf-300">
      <button class="faq-btn w-full p-6 text-left flex items-center justify-between font-serif-heading font-bold text-gray-900 text-base sm:text-lg cursor-pointer">
        <span class="${idx === 0 ? 'text-surf-700 font-black' : 'text-gray-900 font-black'}">${f.question}</span>
        <span class="faq-icon transition-transform font-normal text-xl ${idx === 0 ? 'text-surf-600 rotate-180' : 'text-gray-500'}">▼</span>
      </button>
      <div class="faq-content p-6 pt-0 text-xs sm:text-sm text-gray-600 border-t border-gray-100 leading-relaxed ${idx === 0 ? '' : 'hidden'}">
        <p>${f.answer}</p>
      </div>
    </div>
  `).join('');

  // Wire up accordion toggle handlers
  container.querySelectorAll('.faq-btn').forEach(btn => {
    btn.onclick = () => {
      const content = btn.nextElementSibling;
      const icon = btn.querySelector('.faq-icon');
      if (content) {
        content.classList.toggle('hidden');
        if (icon) icon.classList.toggle('rotate-180');
      }
    };
  });
}
