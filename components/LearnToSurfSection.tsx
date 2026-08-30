'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Waves, CheckCircle2, ShieldCheck, Star, Users, ArrowRight, MessageSquare, Award, Flame } from 'lucide-react';
import { SiteSettings, Activity } from '@/lib/types';
import BookingModal from './BookingModal';

interface LearnToSurfSectionProps {
  settings: SiteSettings;
  surfActivity?: Activity;
}

export default function LearnToSurfSection({ settings, surfActivity }: LearnToSurfSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const packages = surfActivity?.packages || [
    {
      id: 'beginner-lesson',
      title: 'Beginner Surf Lesson',
      subtitle: 'Most Popular for First-Timers',
      duration: '1.5 Hours',
      priceUSD: 25,
      priceLKR: 8000,
      badge: 'Popular',
      features: ['Beach theory & popping up', 'Soft-top board & rash guard', 'Guaranteed standing on first wave', 'Instructor in water with you'],
      popular: true,
    },
    {
      id: 'private-surf-lesson',
      title: 'Private 1-on-1 Lesson',
      subtitle: 'Fastest Progress & Personal Coach',
      duration: '1.5 Hours',
      priceUSD: 35,
      priceLKR: 11000,
      badge: 'VIP',
      features: ['100% Dedicated 1-on-1 coach', 'Customized drills for your level', 'Video analysis feedback', 'Choice of premium boards'],
      popular: false,
    },
    {
      id: 'semi-private-couple',
      title: 'Semi-Private (Couples / 2 Friends)',
      subtitle: 'Best Value for Pairs',
      duration: '1.5 Hours',
      priceUSD: 45,
      priceLKR: 14500,
      badge: 'Best Value',
      features: ['2 Surfers with 1 Instructor', 'Fun, supportive atmosphere', 'Action photo opportunity', 'Full equipment included'],
      popular: false,
    },
    {
      id: 'kids-family-surfing',
      title: 'Kids & Family Surfing',
      subtitle: 'Gentle & 100% Safe (Ages 5+)',
      duration: '1.5 Hours',
      priceUSD: 30,
      priceLKR: 9500,
      badge: 'Family',
      features: ['Shallow-water safe coaching', 'Extra buoyant soft foamies', 'Patient certified coaches', 'Kids life vests available'],
      popular: false,
    },
  ];

  const keyFeatures = [
    {
      title: 'Experienced Local Instructors',
      desc: 'Native Hikkaduwa surfers with 10+ years ocean knowledge, expert coaching, and lifesaver training.',
    },
    {
      title: 'Surfboards & Gear Provided',
      desc: 'High-buoyancy soft-tops for beginners, epoxy boards for progression, leashes, and UV rash guards included.',
    },
    {
      title: 'Beginner-Friendly Instruction',
      desc: 'Step-by-step beach simulation, pop-up mechanics, stance balance, and wave timing in calm white-water.',
    },
    {
      title: '100% Safety Guidance',
      desc: 'Complete ocean safety briefing on rip currents, sandbars, wipeouts, and wave etiquette before hitting the surf.',
    },
    {
      title: 'Flexible Scheduling',
      desc: 'Sessions scheduled around best tide and wind windows (early morning glassy sessions & late afternoon sunset).',
    },
    {
      title: 'Instant WhatsApp Booking',
      desc: 'Zero complex checkout forms. Message us on WhatsApp, pick your date, and pay on the beach.',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white via-surf-50/40 to-white relative overflow-hidden border-y border-ocean-100">
      {/* Decorative Wave elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-ocean-100/40 rounded-full blur-3xl -mr-48 -mt-48 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sand-100/50 rounded-full blur-3xl -ml-48 -mb-48 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-extrabold uppercase tracking-wider mb-4 border border-amber-200 shadow-sm">
            <Flame className="w-4 h-4 text-amber-600" />
            <span>Our Primary Core Service</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-gray-900 tracking-tight">
            🏄 Learn to Surf in Hikkaduwa
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold text-surf-700 mt-4 bg-surf-100/70 py-2 px-4 rounded-2xl w-fit mx-auto border border-surf-200">
            <span>Beginners</span>
            <span>•</span>
            <span>Private</span>
            <span>•</span>
            <span>Semi-Private</span>
            <span>•</span>
            <span>Kids</span>
            <span>•</span>
            <span>Families</span>
            <span>•</span>
            <span>Intermediate</span>
            <span>•</span>
            <span>All Levels</span>
          </div>

          <p className="text-gray-600 mt-4 text-base sm:text-lg leading-relaxed">
            Hikkaduwa is the surf capital of Sri Lanka’s southwest coast. Whether catching your very first wave in gentle white-water or carving on green reef waves, our local coaches guarantee progress with big smiles.
          </p>
        </div>

        {/* 6 Key Surfing Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {keyFeatures.map((feat, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200/90 hover:border-surf-300 hover:shadow-md transition-all flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-surf-100 text-surf-700 flex items-center justify-center flex-shrink-0 font-bold">
                <CheckCircle2 className="w-6 h-6 text-surf-600" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-gray-900 text-base mb-1">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Surf Packages Showcase */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-gray-900">
                Popular Surf Lesson Packages
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                Transparent pricing. Includes all equipment, rash guard & safety gear.
              </p>
            </div>
            <Link
              href="/activities/surf-lessons"
              className="text-surf-600 hover:text-surf-800 font-bold text-sm flex items-center gap-1.5 group"
            >
              <span>View full surf details & surfboard rental</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`bg-white rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between relative shadow-sm hover:shadow-xl ${
                  pkg.popular
                    ? 'border-surf-500 ring-2 ring-surf-500/20 bg-gradient-to-b from-surf-50/50 to-white'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {pkg.badge && (
                  <div className="absolute -top-3 left-6">
                    <span
                      className={`px-3 py-0.5 rounded-full text-[11px] font-extrabold tracking-wide uppercase shadow-sm ${
                        pkg.popular
                          ? 'bg-surf-600 text-white'
                          : 'bg-gray-900 text-white'
                      }`}
                    >
                      {pkg.badge}
                    </span>
                  </div>
                )}

                <div>
                  <h4 className="font-heading font-extrabold text-xl text-gray-900 mb-1 mt-2">
                    {pkg.title}
                  </h4>
                  <p className="text-xs text-gray-500 mb-4">{pkg.subtitle}</p>

                  {/* Pricing Box */}
                  <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold font-heading text-surf-700">
                        ${pkg.priceUSD}
                      </span>
                      <span className="text-xs text-gray-500 font-medium">USD</span>
                    </div>
                    <div className="text-xs text-gray-600 font-semibold mt-0.5">
                      approx. Rs. {pkg.priceLKR.toLocaleString()} LKR
                    </div>
                    <div className="text-[11px] text-surf-600 font-bold mt-1">
                      ⏱️ Duration: {pkg.duration}
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-2.5 mb-6">
                    {pkg.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Button */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                    pkg.popular
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-green-600/20'
                      : 'bg-gray-900 hover:bg-surf-600 text-white'
                  }`}
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Book This Lesson</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Big Central CTA Button */}
        <div className="text-center pt-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-10 py-5 bg-gradient-to-r from-emerald-500 via-green-600 to-emerald-600 hover:from-emerald-600 hover:to-green-700 text-white font-extrabold rounded-2xl shadow-xl shadow-green-600/25 text-lg sm:text-xl inline-flex items-center gap-3 transform hover:-translate-y-0.5 active:scale-95 transition-all"
          >
            <MessageSquare className="w-6 h-6 fill-white" />
            <span>BOOK A SURF LESSON → WhatsApp</span>
          </button>
          <p className="text-xs text-gray-500 mt-2">
            No upfront payment needed • Instant confirmation • English, German & Russian friendly
          </p>
        </div>
      </div>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        settings={settings}
        activities={surfActivity ? [surfActivity] : []}
        tours={[]}
        initialActivityTitle="Beginner Surf Lesson"
      />
    </section>
  );
}
