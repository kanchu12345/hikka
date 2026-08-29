import React from 'react';
import { Metadata } from 'next';
import { getSiteSettings } from '@/lib/db';
import { MapPin, Phone, Mail, MessageSquare, Clock, Navigation, CheckCircle2 } from 'lucide-react';
import JsonLd from '@/components/JsonLd';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const settings = getSiteSettings();
  return {
    title: `Contact & Location | Hikkaduwa Hikka Surf School, Sri Lanka`,
    description: 'Find us on Narigama Beach, Hikkaduwa. Google Maps directions, WhatsApp booking number, phone, email, and meeting point details.',
    keywords: ['Hikkaduwa surf school location', 'Hikka surf school contact', 'Hikkaduwa beach map'],
  };
}

export default function ContactPage() {
  const settings = getSiteSettings();
  const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <>
      <JsonLd
        settings={settings}
        pageType="contact"
        canonicalUrl="https://hikkasurfschool.com/contact"
      />

      <section className="relative py-20 bg-ocean-950 text-white overflow-hidden text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sand-400/20 text-sand-300 text-xs font-bold uppercase tracking-wider mb-4 border border-sand-300/30">
            <MapPin className="w-3.5 h-3.5 text-sand-300" />
            <span>Beach Meeting Point & Contact</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight mb-4">
            📍 Visit Us in Hikkaduwa
          </h1>

          <p className="text-cyan-100 text-base sm:text-xl max-w-xl mx-auto">
            Located right on Narigama Beach with prime wave breaks right in front of our school hut.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Contact Details Cards */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-slate-50 p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
                <div>
                  <span className="text-xs font-bold text-surf-700 uppercase tracking-wider">
                    Direct Contact
                  </span>
                  <h2 className="text-2xl font-bold font-heading text-gray-900 mt-1">
                    Get in Touch
                  </h2>
                </div>

                <div className="space-y-4">
                  {/* WhatsApp */}
                  <a
                    href={`https://wa.me/${cleanPhone}?text=Hi%20Hikka%20Surf%20School!%20I'm%20contacting%20you%20from%20your%20website.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 p-4 bg-emerald-50 hover:bg-emerald-100 rounded-2xl border border-emerald-200 transition-all text-emerald-950 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white flex-shrink-0">
                      <MessageSquare className="w-5 h-5 fill-white" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-emerald-900 group-hover:underline">
                        WhatsApp (Instant Reply)
                      </div>
                      <div className="text-xs font-medium text-emerald-800 mt-0.5">
                        {settings.whatsappNumber}
                      </div>
                      <div className="text-[11px] text-emerald-700 mt-1">
                        Fastest way to book & ask questions
                      </div>
                    </div>
                  </a>

                  {/* Phone */}
                  <a
                    href={`tel:${settings.phoneNumber.replace(/[^0-9+]/g, '')}`}
                    className="flex items-start gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-2xl border border-gray-200 transition-all text-gray-900 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-surf-600 flex items-center justify-center text-white flex-shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-sm group-hover:underline">Phone Call</div>
                      <div className="text-xs font-medium text-gray-600 mt-0.5">
                        {settings.phoneNumber}
                      </div>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href={`mailto:${settings.email}`}
                    className="flex items-start gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-2xl border border-gray-200 transition-all text-gray-900 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center text-white flex-shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-sm group-hover:underline">Email Address</div>
                      <div className="text-xs font-medium text-gray-600 mt-0.5">
                        {settings.email}
                      </div>
                    </div>
                  </a>

                  {/* Address */}
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-200 text-gray-900">
                    <div className="w-10 h-10 rounded-xl bg-ocean-600 flex items-center justify-center text-white flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-sm">Beach Location</div>
                      <div className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                        {settings.address}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Operating hours */}
                <div className="p-4 bg-surf-50 rounded-2xl border border-surf-100 text-xs text-surf-900 flex items-center gap-3">
                  <Clock className="w-5 h-5 text-surf-600 flex-shrink-0" />
                  <div>
                    <span className="font-bold">Opening Hours:</span> 6:30 AM – 6:30 PM (7 Days a week)
                  </div>
                </div>
              </div>
            </div>

            {/* Map Frame & Directions */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white p-3 rounded-3xl shadow-md border border-gray-200 h-[400px]">
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

              <div className="bg-slate-50 p-6 rounded-3xl border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-gray-900 text-base">Navigating to Us?</h3>
                  <p className="text-xs text-gray-600 mt-0.5">
                    Click to open precise navigation inside Google Maps or Apple Maps.
                  </p>
                </div>
                <a
                  href={settings.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-gray-900 hover:bg-surf-700 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 transition-colors whitespace-nowrap"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
