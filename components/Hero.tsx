'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MessageSquare, Compass, Waves, Star, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { SiteSettings } from '@/lib/types';
import BookingModal from './BookingModal';

interface HeroProps {
  settings: SiteSettings;
}

export default function Hero({ settings }: HeroProps) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');

  const handleWhatsAppClick = () => {
    const message = `Hi Hikka Surf School! I'd like to book an experience in Hikkaduwa.`;
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center text-white overflow-hidden bg-ocean-950">
      {/* Background Media (Image or Video) */}
      <div className="absolute inset-0 z-0">
        {settings.heroMedia?.type === 'video' && settings.heroMedia.url ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={settings.heroMedia.posterUrl}
            className="w-full h-full object-cover opacity-50 scale-105 transform animate-pulse duration-1000"
          >
            <source src={settings.heroMedia.url} type="video/mp4" />
          </video>
        ) : (
          <div
            className="w-full h-full bg-cover bg-center opacity-65 scale-105 transition-transform duration-1000"
            style={{
              backgroundImage: `url('${settings.heroMedia?.url || 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1920&q=80'}')`,
            }}
          />
        )}
        {/* Modern Tropical Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-950 via-ocean-950/60 to-black/50" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center flex flex-col items-center">
        {/* Trust Pill / Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold text-sand-300 mb-6 shadow-lg animate-in fade-in slide-in-from-bottom duration-500">
          <span className="text-base">🏄</span>
          <span>#1 Local Surf & Ocean Experience in Hikkaduwa</span>
          <div className="flex items-center text-amber-400 gap-0.5 ml-1">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span className="text-white font-bold">5.0</span>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-heading tracking-tight text-white mb-4 leading-[1.1] max-w-4xl drop-shadow-md">
          {settings.heroHeadline || '❤️ Hikkaduwa Hikka Surf School'}
        </h1>

        {/* Main Tagline */}
        <p className="text-lg sm:text-2xl md:text-3xl font-medium text-cyan-200 mb-6 tracking-wide drop-shadow">
          {settings.heroSubheadline || 'Surf • Snorkel • Explore Hikkaduwa & Sri Lanka'}
        </p>

        {/* Short Description */}
        <p className="text-sm sm:text-lg text-gray-200 max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow">
          {settings.heroDescription ||
            'Discover Hikkaduwa with local instructors and guides. Enjoy surf lessons, snorkeling, turtle experiences, fishing, boat tours, day trips and more.'}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md sm:max-w-none">
          {/* Main Button */}
          <button
            onClick={() => setIsBookingOpen(true)}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-extrabold rounded-2xl shadow-xl shadow-green-600/30 hover:shadow-2xl hover:shadow-green-600/40 transform hover:-translate-y-0.5 active:scale-95 transition-all text-base sm:text-lg flex items-center justify-center gap-3 border border-emerald-400/30"
          >
            <MessageSquare className="w-5 h-5 fill-white" />
            <span>BOOK YOUR EXPERIENCE → WhatsApp</span>
          </button>

          {/* Secondary Button */}
          <a
            href="#activities"
            className="w-full sm:w-auto px-8 py-4 bg-white/15 hover:bg-white/25 backdrop-blur-md text-white font-bold rounded-2xl border border-white/30 transform hover:-translate-y-0.5 active:scale-95 transition-all text-base sm:text-lg flex items-center justify-center gap-2"
          >
            <Compass className="w-5 h-5 text-cyan-300" />
            <span>EXPLORE ACTIVITIES</span>
          </a>
        </div>

        {/* Value Highlights Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mt-14 pt-8 border-t border-white/15 w-full max-w-4xl text-left">
          <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10">
            <CheckCircle2 className="w-5 h-5 text-sand-400 flex-shrink-0" />
            <div className="text-xs">
              <p className="font-bold text-white">100% Local Guides</p>
              <p className="text-gray-300 text-[11px]">Native knowledge</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10">
            <CheckCircle2 className="w-5 h-5 text-sand-400 flex-shrink-0" />
            <div className="text-xs">
              <p className="font-bold text-white">Boards Provided</p>
              <p className="text-gray-300 text-[11px]">All sizes & rash vests</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10">
            <CheckCircle2 className="w-5 h-5 text-sand-400 flex-shrink-0" />
            <div className="text-xs">
              <p className="font-bold text-white">5.0 ★ Rated</p>
              <p className="text-gray-300 text-[11px]">Google Reviews</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10">
            <CheckCircle2 className="w-5 h-5 text-sand-400 flex-shrink-0" />
            <div className="text-xs">
              <p className="font-bold text-white">Fast WhatsApp</p>
              <p className="text-gray-300 text-[11px]">Instant reply & no prepay</p>
            </div>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        settings={settings}
        activities={[]}
        tours={[]}
      />
    </section>
  );
}
