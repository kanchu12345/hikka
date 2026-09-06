// Real-time Firestore Hydrator for contact.html
import { getPageData, getSettings, subscribeToPage, subscribeToSettings } from "./firebase-init.js";

document.addEventListener('DOMContentLoaded', () => {
  initContactHydration();
});

async function initContactHydration() {
  try {
    const [contactData, settings] = await Promise.all([
      getPageData('contact'),
      getSettings()
    ]);

    if (settings) hydrateSettings(settings);
    if (contactData) hydrateContact(contactData);

    subscribeToSettings((newSettings) => {
      hydrateSettings(newSettings);
    });

    subscribeToPage('contact', (newContactData) => {
      hydrateContact(newContactData);
    });
  } catch (err) {
    console.warn("Firestore contact hydration notice (using HTML defaults):", err);
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
        link.href = `https://wa.me/${cleanPhone}`;
      }
    });
  }
}

function hydrateContact(data) {
  if (!data) return;

  if (data.whatsapp) {
    const waEl = document.getElementById('contact-whatsapp-display');
    if (waEl) waEl.textContent = data.whatsapp;
  }

  if (data.phone) {
    const phoneEl = document.getElementById('contact-phone-display');
    if (phoneEl) phoneEl.textContent = data.phone;
  }

  if (data.email) {
    const emailEl = document.getElementById('contact-email-display');
    if (emailEl) emailEl.textContent = data.email;
  }

  if (data.address) {
    const addrEl = document.getElementById('contact-address-display');
    if (addrEl) addrEl.textContent = data.address;
  }

  if (data.openingHours) {
    const hoursEl = document.getElementById('contact-hours-display');
    if (hoursEl) hoursEl.textContent = data.openingHours;
  }

  if (data.mapIframeUrl) {
    const mapEl = document.getElementById('contact-map-iframe');
    if (mapEl && data.mapIframeUrl.startsWith('https://')) {
      mapEl.src = data.mapIframeUrl;
    }
  }
}
