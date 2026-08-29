import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { getTourBySlug, getSiteSettings } from '@/lib/db';
import JsonLd from '@/components/JsonLd';
import {
  Clock,
  DollarSign,
  MapPin,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Info,
  Calendar,
  MessageSquare,
} from 'lucide-react';
import ActivityBookingClient from '@/app/activities/[slug]/ActivityBookingClient';

interface Props {
  params: {
    slug: string;
  };
}

export const revalidate = 0;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tour = getTourBySlug(params.slug);
  const settings = getSiteSettings();

  if (!tour) {
    return { title: 'Tour Not Found | Hikkaduwa Hikka Surf School' };
  }

  return {
    title: `${tour.title} | ${settings.businessName}`,
    description: tour.seo?.metaDescription || tour.shortDescription,
    keywords: tour.seo?.keywords || [tour.title, 'Hikkaduwa Day Tour', 'Sri Lanka Excursion'],
  };
}

export default function TourDetailPage({ params }: Props) {
  const tour = getTourBySlug(params.slug);
  const settings = getSiteSettings();

  if (!tour) {
    notFound();
  }

  return (
    <>
      <JsonLd
        settings={settings}
        pageType="tour"
        tour={tour}
        canonicalUrl={`https://hikkasurfschool.com/tours/${tour.slug}`}
      />

      {/* Hero Header */}
      <section className="relative min-h-[50vh] flex items-end text-white overflow-hidden bg-ocean-950">
        <div className="absolute inset-0 z-0">
          <img
            src={tour.heroImage}
            alt={tour.title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-950 via-ocean-950/60 to-black/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full">
          <div className="flex items-center gap-2 text-xs font-semibold text-sand-300 mb-4">
            <Link href="/" className="hover:underline">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/tours" className="hover:underline">Sri Lanka Tours</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">{tour.title}</span>
          </div>

          <div className="flex items-center gap-2 text-cyan-200 text-sm font-medium mb-2">
            <MapPin className="w-4 h-4" />
            <span>{tour.destination}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight mb-3">
            {tour.title}
          </h1>

          <p className="text-base sm:text-lg text-gray-200 max-w-3xl leading-relaxed">
            {tour.shortDescription}
          </p>
        </div>
      </section>

      {/* Main Tour Content */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Itinerary Column */}
            <div className="lg:col-span-8 space-y-10">
              {tour.isPartnerActivity && (
                <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 text-amber-900 flex items-start gap-3">
                  <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm">
                    <p className="font-bold">Partner Tour Notice:</p>
                    <p>{tour.partnerDisclaimer || 'Available on request — arranged with trusted local licensed driver partners.'}</p>
                  </div>
                </div>
              )}

              {/* Itinerary Timeline */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold font-heading text-gray-900 mb-6">
                  Detailed Tour Itinerary
                </h2>
                <div className="space-y-6 relative before:absolute before:inset-0 before:left-4 before:w-0.5 before:bg-surf-200 pl-2">
                  {tour.itinerary.map((step, idx) => (
                    <div key={idx} className="relative flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-surf-600 text-white font-extrabold text-xs flex items-center justify-center flex-shrink-0 shadow-md ring-4 ring-white relative z-10">
                        {idx + 1}
                      </div>
                      <div className="bg-slate-50 p-5 rounded-2xl border border-gray-200 flex-1">
                        <h4 className="font-heading font-bold text-gray-900 text-base mb-1">
                          {step.stop}
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inclusions & Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-gray-100">
                <div className="bg-slate-50 p-6 rounded-2xl border border-gray-200">
                  <h3 className="font-heading font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Included in This Tour</span>
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                    {tour.included.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-gray-200">
                  <h3 className="font-heading font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-surf-600" />
                    <span>Tour Highlights</span>
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                    {tour.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-surf-600 font-bold">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Booking Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-lg space-y-6">
                <div className="text-center pb-4 border-b border-gray-200">
                  <span className="text-xs font-bold text-sand-700 bg-sand-100 px-3 py-1 rounded-full uppercase tracking-wider">
                    Instant WhatsApp Reservation
                  </span>
                  <h3 className="text-2xl font-extrabold font-heading text-gray-900 mt-2">
                    Book {tour.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Private AC car/van with English-speaking driver
                  </p>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-gray-700">
                  <div className="flex items-center justify-between py-2 border-b border-gray-200/60">
                    <span className="text-gray-500">Price From:</span>
                    <span className="font-bold text-gray-900 font-heading text-lg">
                      ${tour.priceFromUSD} USD
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-200/60">
                    <span className="text-gray-500">Duration:</span>
                    <span className="font-semibold text-gray-900">{tour.duration}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-200/60">
                    <span className="text-gray-500">Vehicle:</span>
                    <span className="font-semibold text-emerald-600">Modern AC Car/Van</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-200/60">
                    <span className="text-gray-500">Pickup:</span>
                    <span className="font-semibold text-gray-900">Your Hikkaduwa Hotel</span>
                  </div>
                </div>

                <ActivityBookingClient
                  activityTitle={tour.title}
                  settings={settings}
                  buttonText="BOOK THIS TOUR → WhatsApp"
                  isPrimary={true}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
