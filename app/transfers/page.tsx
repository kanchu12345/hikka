import React from 'react';
import { Metadata } from 'next';
import { getTransfers, getSiteSettings } from '@/lib/db';
import { Car, Clock, ShieldCheck, CheckCircle2, MessageSquare, Phone, Plane, MapPin } from 'lucide-react';
import ActivityBookingClient from '@/app/activities/[slug]/ActivityBookingClient';
import JsonLd from '@/components/JsonLd';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const settings = getSiteSettings();
  return {
    title: `Airport Transfers (CMB) & Private Driver Hire | ${settings.businessName}`,
    description: 'Book 24/7 Colombo Bandaranaike Airport (CMB) pickup and drop-off to Hikkaduwa. Safe, air-conditioned cars and vans with surfboard racks.',
    keywords: ['Hikkaduwa airport transfer', 'Colombo airport to Hikkaduwa taxi', 'CMB airport pickup', 'Private driver Sri Lanka'],
  };
}

export default function TransfersPage() {
  const transfers = getTransfers();
  const settings = getSiteSettings();

  return (
    <>
      <JsonLd
        settings={settings}
        pageType="home"
        canonicalUrl="https://hikkasurfschool.com/transfers"
      />

      <section className="relative py-20 bg-ocean-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1920&q=80"
            alt="Airport Transfers and Transport"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-950 via-ocean-950/70 to-black/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sand-400/20 border border-sand-300/30 text-sand-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Car className="w-3.5 h-3.5" />
            <span>24/7 Transport Services</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight mb-4">
            🚕 Airport Transfers & Private Drivers
          </h1>

          <p className="text-cyan-100 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Reliable, safe, fully air-conditioned highway transfers between Colombo Airport (CMB) and Hikkaduwa, plus private chauffeur hire across Sri Lanka.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {transfers.map((trans) => (
              <div
                key={trans.id}
                className="bg-slate-50 rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-surf-700 uppercase tracking-wider mb-2">
                    <Plane className="w-4 h-4" />
                    <span>{trans.vehicleType}</span>
                  </div>

                  <h3 className="text-2xl font-bold font-heading text-gray-900 mb-2">
                    {trans.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                    {trans.description}
                  </p>

                  <div className="bg-white p-4 rounded-2xl border border-gray-200 mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold font-heading text-surf-700">
                        ${trans.priceUSD}
                      </span>
                      <span className="text-xs text-gray-500 font-medium">USD / Vehicle</span>
                    </div>
                    <div className="text-xs text-gray-500 font-medium mt-0.5">
                      approx. Rs. {trans.priceLKR.toLocaleString()} LKR
                    </div>
                    <div className="text-xs text-surf-600 font-bold mt-1">
                      ⏱️ {trans.duration}
                    </div>
                  </div>

                  <div className="space-y-2 mb-8">
                    <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Included In Transfer
                    </p>
                    <ul className="space-y-2">
                      {trans.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <ActivityBookingClient
                  activityTitle={trans.title}
                  settings={settings}
                  buttonText="Book Transfer on WhatsApp"
                  isPrimary={true}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
