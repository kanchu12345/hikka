import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getTours, getSiteSettings } from '@/lib/db';
import { Compass, Clock, DollarSign, CheckCircle2, ArrowRight, Sparkles, MapPin, MessageSquare, Info } from 'lucide-react';
import JsonLd from '@/components/JsonLd';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const settings = getSiteSettings();
  return {
    title: `Sri Lanka Day Trips & Excursions | ${settings.businessName}`,
    description: 'Explore Galle Fort, Bentota, Yala Leopard Safari, Ella, and Kandy with reliable private AC vehicles and English-speaking local drivers from Hikkaduwa.',
    keywords: ['Sri Lanka tours from Hikkaduwa', 'Galle fort day trip', 'Yala safari from Hikkaduwa', 'Hikkaduwa day tours'],
  };
}

export default function ToursPage() {
  const tours = getTours();
  const settings = getSiteSettings();

  return (
    <>
      <JsonLd
        settings={settings}
        pageType="tour"
        canonicalUrl="https://hikkasurfschool.com/tours"
      />

      {/* Header */}
      <section className="relative py-20 bg-ocean-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1920&q=80"
            alt="Sri Lanka Day Trips"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-950 via-ocean-950/70 to-black/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sand-400/20 border border-sand-300/30 text-sand-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>Islandwide Excursions</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight mb-4">
            🌴 Sri Lanka Day Trips & Tours
          </h1>

          <p className="text-cyan-100 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Discover UNESCO world heritage forts, wildlife safari parks, misty tea plantations, and scenic train bridges with our trusted private drivers.
          </p>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tours.map((tour) => (
              <div
                key={tour.id}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={tour.heroImage}
                      alt={tour.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {tour.badge && (
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-sand-500 text-gray-900 font-extrabold text-xs rounded-full uppercase shadow-sm">
                          {tour.badge}
                        </span>
                      </div>
                    )}

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="flex items-center gap-1.5 text-xs text-cyan-200 font-medium mb-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{tour.destination}</span>
                      </div>
                      <h3 className="text-2xl font-bold font-heading">{tour.title}</h3>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between py-2 mb-4 border-b border-gray-100 text-xs sm:text-sm">
                      <div className="flex items-center gap-1.5 text-gray-600 font-medium">
                        <Clock className="w-4 h-4 text-surf-600" />
                        <span>{tour.duration}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-gray-500">From</span>{' '}
                        <span className="text-xl font-extrabold font-heading text-surf-700">
                          ${tour.priceFromUSD}
                        </span>{' '}
                        <span className="text-xs text-gray-500 font-medium">USD</span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {tour.shortDescription}
                    </p>

                    <div className="space-y-2 mb-4">
                      <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Highlights
                      </p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {tour.highlights.map((high, i) => (
                          <li key={i} className="flex items-center gap-1.5 text-xs text-gray-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                            <span className="truncate">{high}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {tour.isPartnerActivity && (
                      <div className="bg-amber-50 rounded-xl p-2.5 border border-amber-200 text-[11px] text-amber-900 flex items-start gap-1.5 mb-4">
                        <Info className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <span>{tour.partnerDisclaimer || 'Available on request — arranged with trusted local partners.'}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={`/tours/${tour.slug}`}
                    className="w-full py-3.5 px-4 bg-gray-900 hover:bg-surf-600 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>View Itinerary & Book on WhatsApp</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
