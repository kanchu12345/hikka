import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  getActivityBySlug,
  getActivities,
  getSiteSettings,
  getReviews,
} from '@/lib/db';
import JsonLd from '@/components/JsonLd';
import {
  Clock,
  DollarSign,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  Users,
  AlertCircle,
  MessageSquare,
  HelpCircle,
  Star,
  ChevronRight,
  ArrowRight,
  Info,
} from 'lucide-react';
import ActivityBookingClient from './ActivityBookingClient';

interface Props {
  params: {
    slug: string;
  };
}

export const revalidate = 0;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const activity = getActivityBySlug(params.slug);
  const settings = getSiteSettings();

  if (!activity) {
    return {
      title: 'Activity Not Found | Hikkaduwa Hikka Surf School',
    };
  }

  return {
    title: `${activity.title} | ${settings.businessName}`,
    description: activity.seo?.metaDescription || activity.shortDescription,
    keywords: activity.seo?.keywords || [activity.title, 'Hikkaduwa', 'Sri Lanka'],
    openGraph: {
      title: `${activity.title} | ${settings.businessName}`,
      description: activity.shortDescription,
      images: [activity.heroImage],
      url: `https://hikkasurfschool.com/activities/${activity.slug}`,
    },
  };
}

export default function ActivityDetailPage({ params }: Props) {
  const activity = getActivityBySlug(params.slug);
  const settings = getSiteSettings();
  const allReviews = getReviews();

  if (!activity) {
    notFound();
  }

  const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <>
      <JsonLd
        settings={settings}
        pageType="activity"
        activity={activity}
        canonicalUrl={`https://hikkasurfschool.com/activities/${activity.slug}`}
      />

      {/* Hero Header */}
      <section className="relative min-h-[50vh] sm:min-h-[55vh] flex items-end text-white overflow-hidden bg-ocean-950">
        <div className="absolute inset-0 z-0">
          <img
            src={activity.heroImage}
            alt={activity.title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-950 via-ocean-950/60 to-black/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-sand-300 mb-4">
            <Link href="/" className="hover:underline">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/#activities" className="hover:underline">Activities</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">{activity.title}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="text-2xl">{activity.icon}</span>
            {activity.isPartnerActivity ? (
              <span className="bg-amber-500/90 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Partner Activity
              </span>
            ) : (
              <span className="bg-surf-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Direct Hikka Surf School Experience
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight mb-3">
            {activity.title}
          </h1>

          <p className="text-base sm:text-xl text-cyan-200 max-w-3xl leading-relaxed">
            {activity.tagline}
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Main Details Column */}
            <div className="lg:col-span-8 space-y-12">
              {/* Partner Disclaimer Notice if applicable */}
              {activity.isPartnerActivity && (
                <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 text-amber-900 flex items-start gap-3">
                  <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm">
                    <p className="font-bold">Partner Service Notice:</p>
                    <p>{activity.partnerDisclaimer || 'Available on request — arranged with trusted local partners.'}</p>
                  </div>
                </div>
              )}

              {/* Introduction & Overview */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold font-heading text-gray-900 mb-4">
                  Overview & Experience
                </h2>
                <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-4">
                  {activity.shortDescription}
                </p>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {activity.fullDescription}
                </p>
              </div>

              {/* Photo Gallery Grid */}
              {activity.galleryImages && activity.galleryImages.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold font-heading text-gray-900 mb-4">
                    Activity Photos
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {activity.galleryImages.map((img, i) => (
                      <div key={i} className="h-52 rounded-2xl overflow-hidden shadow-sm bg-gray-100">
                        <img
                          src={img}
                          alt={`${activity.title} photo ${i + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Lesson Types & Pricing Packages */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold font-heading text-gray-900">
                      Options & Pricing Packages
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                      Transparent prices. Includes all equipment and safety briefing.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {activity.packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className={`p-6 rounded-3xl border flex flex-col justify-between transition-all ${
                        pkg.popular
                          ? 'border-surf-500 ring-2 ring-surf-500/20 bg-surf-50/30 shadow-md'
                          : 'border-gray-200 bg-white hover:border-gray-300 shadow-sm'
                      }`}
                    >
                      <div>
                        {pkg.badge && (
                          <span className="inline-block px-3 py-1 bg-surf-600 text-white rounded-full text-[11px] font-extrabold uppercase mb-2">
                            {pkg.badge}
                          </span>
                        )}
                        <h4 className="font-heading font-bold text-xl text-gray-900 mb-1">
                          {pkg.title}
                        </h4>
                        {pkg.subtitle && (
                          <p className="text-xs text-gray-500 mb-3">{pkg.subtitle}</p>
                        )}
                        <p className="text-xs sm:text-sm text-gray-600 mb-4">{pkg.description}</p>

                        <div className="bg-white p-3 rounded-2xl border border-gray-100 mb-4">
                          <div className="text-2xl font-extrabold text-surf-700 font-heading">
                            ${pkg.priceUSD}{' '}
                            <span className="text-xs text-gray-500 font-medium">USD</span>
                          </div>
                          <div className="text-xs text-gray-500 font-medium">
                            approx. Rs. {pkg.priceLKR.toLocaleString()} LKR
                          </div>
                          <div className="text-xs text-surf-600 font-bold mt-1">
                            ⏱️ {pkg.duration}
                          </div>
                        </div>

                        <ul className="space-y-2 mb-6">
                          {pkg.features.map((feat, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <ActivityBookingClient
                        activityTitle={activity.title}
                        packageTitle={pkg.title}
                        settings={settings}
                        buttonText={`Book ${pkg.title}`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* What's Included & What to Bring */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                <div className="bg-slate-50 p-6 rounded-2xl border border-gray-200">
                  <h3 className="font-heading font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>What's Included</span>
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                    {activity.included.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-gray-200">
                  <h3 className="font-heading font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5 text-surf-600" />
                    <span>What to Bring</span>
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                    {activity.whatToBring.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-surf-600 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Who It's Suitable For & Safety Information */}
              <div className="space-y-6 pt-4 border-t border-gray-100">
                <div>
                  <h3 className="font-heading font-bold text-xl text-gray-900 mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5 text-surf-600" />
                    <span>Who It's Suitable For</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {activity.suitableFor.map((suit, i) => (
                      <span
                        key={i}
                        className="px-3.5 py-1.5 bg-surf-50 text-surf-800 rounded-xl text-xs sm:text-sm font-semibold border border-surf-200"
                      >
                        {suit}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50/70 p-6 rounded-2xl border border-blue-100">
                  <h3 className="font-heading font-bold text-lg text-blue-950 mb-2 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-blue-600" />
                    <span>Safety & Ocean Guidelines</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-blue-900 leading-relaxed">
                    {activity.safetyInfo}
                  </p>
                </div>

                <div>
                  <h3 className="font-heading font-bold text-xl text-gray-900 mb-2 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-surf-600" />
                    <span>Meeting Point</span>
                  </h3>
                  <p className="text-sm text-gray-700">
                    {activity.meetingPoint}
                  </p>
                </div>
              </div>

              {/* Activity FAQs */}
              {activity.faqs && activity.faqs.length > 0 && (
                <div className="pt-6 border-t border-gray-100">
                  <h3 className="font-heading font-bold text-2xl text-gray-900 mb-4 flex items-center gap-2">
                    <HelpCircle className="w-6 h-6 text-surf-600" />
                    <span>Activity FAQ</span>
                  </h3>
                  <div className="space-y-3">
                    {activity.faqs.map((faq, i) => (
                      <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <h4 className="font-bold text-sm text-gray-900 mb-1">{faq.question}</h4>
                        <p className="text-xs sm:text-sm text-gray-600">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sticky Booking Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-lg space-y-6">
                <div className="text-center pb-4 border-b border-gray-200">
                  <span className="text-xs font-bold text-sand-700 bg-sand-100 px-3 py-1 rounded-full uppercase tracking-wider">
                    Instant WhatsApp Reservation
                  </span>
                  <h3 className="text-2xl font-extrabold font-heading text-gray-900 mt-2">
                    Book {activity.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Connect directly with local guides on WhatsApp
                  </p>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-gray-700">
                  <div className="flex items-center justify-between py-2 border-b border-gray-200/60">
                    <span className="text-gray-500">Starting price:</span>
                    <span className="font-bold text-gray-900 font-heading text-lg">
                      ${activity.packages[0]?.priceUSD || 25} USD
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-200/60">
                    <span className="text-gray-500">Duration:</span>
                    <span className="font-semibold text-gray-900">
                      {activity.packages[0]?.duration || '1.5 Hours'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-200/60">
                    <span className="text-gray-500">Equipment:</span>
                    <span className="font-semibold text-emerald-600">100% Provided</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-200/60">
                    <span className="text-gray-500">Payment:</span>
                    <span className="font-semibold text-gray-900">Pay on Beach (Cash)</span>
                  </div>
                </div>

                <ActivityBookingClient
                  activityTitle={activity.title}
                  settings={settings}
                  buttonText="BOOK THIS ACTIVITY → WhatsApp"
                  isPrimary={true}
                />

                <div className="bg-white p-4 rounded-2xl border border-gray-200 text-center space-y-2">
                  <div className="flex items-center justify-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs font-bold text-gray-800">5.0 Star Rated on Google</p>
                  <p className="text-[11px] text-gray-500">
                    Free cancellations up to 2 hours before session if weather or sea conditions change.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
