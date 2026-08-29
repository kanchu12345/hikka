'use client';

import React from 'react';
import { MapPin, Navigation, Phone, MessageSquare, Compass, Clock, CheckCircle } from 'lucide-react';
import { SiteSettings } from '@/lib/types';

interface LocationSectionProps {
  settings: SiteSettings;
}

export default function LocationSection({ settings }: LocationSectionProps) {
  const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');

  const handleWhatsAppDirections = () => {
    const message = `Hi Hikka Surf School! I'm in Hikkaduwa and looking for directions to your beach surf hut.`;
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="location" className="py-20 bg-slate-50 relative border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ocean-100 text-ocean-800 text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5 text-ocean-700" />
            <span>Find Us on the Beach</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-gray-900 tracking-tight">
            📍 Hikkaduwa, Sri Lanka
          </h2>
          <p className="text-gray-600 mt-4 text-base sm:text-lg">
            Located right on the golden sands of Narigama Beach with prime wave breaks right out front.
          </p>
        </div>

        {/* Map and Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Map Frame */}
          <div className="lg:col-span-7 bg-white p-3 rounded-3xl shadow-md border border-gray-200 overflow-hidden h-[420px] lg:h-[480px]">
            <iframe
              src={settings.googleMapsEmbedIframe || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15871.277864387532!2d80.098485!3d6.136423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae177e776ffc1ab%3A0x28974a9ee1f3910c!2sHikkaduwa%20Beach!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk"}
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '1.25rem' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Hikkaduwa Hikka Surf School Map"
            />
          </div>

          {/* Location Info Box */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-md border border-gray-200 space-y-6">
              <div>
                <h3 className="font-heading font-extrabold text-2xl text-gray-900 mb-2">
                  Beach Meeting Point
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {settings.address}
                </p>
              </div>

              {/* Landmarks */}
              <div className="space-y-3 pt-3 border-t border-gray-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Nearby Landmarks & Directions
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-surf-600 flex-shrink-0 mt-0.5" />
                    <span>Directly on Narigama Beach (Main surf break)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-surf-600 flex-shrink-0 mt-0.5" />
                    <span>Opposite Hotel Citrus & beachfront promenade</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-surf-600 flex-shrink-0 mt-0.5" />
                    <span>5 minutes by Tuk-Tuk from Hikkaduwa Railway Station</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-surf-600 flex-shrink-0 mt-0.5" />
                    <span>Look for our signature ❤️ Hikka Surf School beach flags</span>
                  </li>
                </ul>
              </div>

              {/* Hours */}
              <div className="flex items-center gap-3 p-3 bg-surf-50/80 rounded-2xl border border-surf-100 text-xs sm:text-sm text-surf-900">
                <Clock className="w-5 h-5 text-surf-600 flex-shrink-0" />
                <div>
                  <span className="font-bold">Opening Hours:</span> 6:30 AM – 6:30 PM (Daily, all year)
                </div>
              </div>

              {/* Action Links */}
              <div className="space-y-2.5 pt-2">
                <a
                  href={settings.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-gray-900 hover:bg-surf-700 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Open in Google Maps App</span>
                </a>

                <button
                  onClick={handleWhatsAppDirections}
                  className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Ask Directions on WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
