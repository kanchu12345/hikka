'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, MessageSquare, Waves, Compass, Shield, MapPin, Phone, Sparkles } from 'lucide-react';
import { SiteSettings } from '@/lib/types';
import BookingModal from './BookingModal';

interface NavbarProps {
  settings: SiteSettings;
}

export default function Navbar({ settings }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isActivitiesOpen, setIsActivitiesOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');

  const activities = [
    { name: '🏄 Surf Lessons', desc: 'Beginner, Private & Kids Coaching', href: '/activities/surf-lessons' },
    { name: '🤿 Snorkeling Sanctuary', desc: 'Coral Gardens & Tropical Fish', href: '/activities/snorkeling' },
    { name: '🐢 Turtle Experiences', desc: 'Swim with Wild Sea Turtles', href: '/activities/turtle-experiences' },
    { name: '🎣 Fishing Tours', desc: 'Traditional & Deep-Sea Trips', href: '/activities/fishing-tours' },
    { name: '🚤 Boat Tours & River Safari', desc: 'Glass Bottom & Mangrove Lagoons', href: '/activities/boat-tours' },
    { name: '🐋 Whale Watching', desc: 'Mirissa Blue Whale Day Tours', href: '/activities/whale-watching' },
  ];

  return (
    <>
      {/* Top Announcement Banner */}
      {settings.announcementBanner?.enabled && (
        <div className="bg-gradient-to-r from-ocean-950 via-surf-900 to-ocean-900 text-white text-xs py-2 px-4 text-center font-medium border-b border-ocean-800/60 relative z-40">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 flex-wrap">
            <span className="flex items-center gap-1.5 text-sand-300">
              <Sparkles className="w-3.5 h-3.5" />
              {settings.announcementBanner.text}
            </span>
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="underline font-bold text-white hover:text-sand-300 transition-colors ml-1"
            >
              {settings.announcementBanner.linkText || 'Book on WhatsApp →'}
            </button>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3 text-gray-900 border-b border-gray-100'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-4 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-surf-500 to-ocean-600 flex items-center justify-center text-white shadow-md shadow-surf-500/20 group-hover:scale-105 transition-transform">
              <span className="text-xl leading-none">❤️</span>
            </div>
            <div>
              <div className="font-heading font-extrabold text-lg sm:text-xl tracking-tight leading-tight flex items-center gap-1">
                <span>Hikka Surf School</span>
              </div>
              <p className={`text-[10px] sm:text-[11px] font-medium tracking-wide uppercase ${isScrolled ? 'text-surf-600' : 'text-cyan-200'}`}>
                Hikkaduwa • Sri Lanka
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-semibold">
            <Link
              href="/"
              className={`px-3 py-2 rounded-lg transition-colors ${
                pathname === '/'
                  ? isScrolled ? 'text-surf-600 bg-surf-50' : 'text-sand-300 bg-white/10'
                  : isScrolled ? 'text-gray-700 hover:text-surf-600 hover:bg-gray-50' : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              Home
            </Link>

            <Link
              href="/activities/surf-lessons"
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1 font-bold ${
                pathname === '/activities/surf-lessons'
                  ? isScrolled ? 'text-surf-600 bg-surf-50' : 'text-sand-300 bg-white/10'
                  : isScrolled ? 'text-surf-700 hover:text-surf-600 hover:bg-surf-50' : 'text-yellow-300 hover:text-yellow-200 hover:bg-white/10'
              }`}
            >
              🏄 Surf Lessons
            </Link>

            {/* Activities Dropdown */}
            <div className="relative group">
              <button
                onClick={() => setIsActivitiesOpen(!isActivitiesOpen)}
                className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1 ${
                  pathname.startsWith('/activities') && pathname !== '/activities/surf-lessons'
                    ? isScrolled ? 'text-surf-600 bg-surf-50' : 'text-sand-300 bg-white/10'
                    : isScrolled ? 'text-gray-700 hover:text-surf-600 hover:bg-gray-50' : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>Activities</span>
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </button>

              <div className="absolute top-full left-0 w-72 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-2 text-gray-800 space-y-1">
                  {activities.map((act) => (
                    <Link
                      key={act.href}
                      href={act.href}
                      className="block p-2.5 rounded-xl hover:bg-ocean-50 transition-colors"
                    >
                      <div className="font-bold text-sm text-gray-900">{act.name}</div>
                      <div className="text-xs text-gray-500">{act.desc}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/tours"
              className={`px-3 py-2 rounded-lg transition-colors ${
                pathname.startsWith('/tours')
                  ? isScrolled ? 'text-surf-600 bg-surf-50' : 'text-sand-300 bg-white/10'
                  : isScrolled ? 'text-gray-700 hover:text-surf-600 hover:bg-gray-50' : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              Sri Lanka Tours
            </Link>

            <Link
              href="/transfers"
              className={`px-3 py-2 rounded-lg transition-colors ${
                pathname === '/transfers'
                  ? isScrolled ? 'text-surf-600 bg-surf-50' : 'text-sand-300 bg-white/10'
                  : isScrolled ? 'text-gray-700 hover:text-surf-600 hover:bg-gray-50' : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              Transfers
            </Link>

            <Link
              href="/gallery"
              className={`px-3 py-2 rounded-lg transition-colors ${
                pathname === '/gallery'
                  ? isScrolled ? 'text-surf-600 bg-surf-50' : 'text-sand-300 bg-white/10'
                  : isScrolled ? 'text-gray-700 hover:text-surf-600 hover:bg-gray-50' : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              Gallery
            </Link>

            <Link
              href="/reviews"
              className={`px-3 py-2 rounded-lg transition-colors ${
                pathname === '/reviews'
                  ? isScrolled ? 'text-surf-600 bg-surf-50' : 'text-sand-300 bg-white/10'
                  : isScrolled ? 'text-gray-700 hover:text-surf-600 hover:bg-gray-50' : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              Reviews
            </Link>

            <Link
              href="/about"
              className={`px-3 py-2 rounded-lg transition-colors ${
                pathname === '/about'
                  ? isScrolled ? 'text-surf-600 bg-surf-50' : 'text-sand-300 bg-white/10'
                  : isScrolled ? 'text-gray-700 hover:text-surf-600 hover:bg-gray-50' : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              About
            </Link>

            <Link
              href="/contact"
              className={`px-3 py-2 rounded-lg transition-colors ${
                pathname === '/contact'
                  ? isScrolled ? 'text-surf-600 bg-surf-50' : 'text-sand-300 bg-white/10'
                  : isScrolled ? 'text-gray-700 hover:text-surf-600 hover:bg-gray-50' : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold text-sm shadow-md shadow-green-600/20 hover:shadow-lg transition-all flex items-center gap-2 transform active:scale-95"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>BOOK NOW</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="px-3 py-1.5 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center gap-1 shadow-sm"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-white" />
              <span>Book</span>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-xl transition-colors ${
                isScrolled ? 'text-gray-900 hover:bg-gray-100' : 'text-white hover:bg-white/10'
              }`}
              aria-label="Open mobile navigation"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-Out Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white text-gray-900 border-b border-gray-200 shadow-2xl px-5 py-6 space-y-4 animate-in slide-in-from-top duration-200 max-h-[85vh] overflow-y-auto">
            <div className="space-y-1">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-xl font-semibold text-gray-900 hover:bg-ocean-50"
              >
                Home
              </Link>

              <Link
                href="/activities/surf-lessons"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-xl font-bold text-surf-700 bg-surf-50 border border-surf-100"
              >
                🏄 Surf Lessons (Core Service)
              </Link>

              <div className="pt-2 pb-1">
                <div className="px-3 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Activities & Tours
                </div>
                <div className="mt-1 space-y-1 pl-2">
                  {activities.map((act) => (
                    <Link
                      key={act.href}
                      href={act.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-3 py-2 rounded-xl text-sm font-medium text-gray-700 hover:bg-ocean-50"
                    >
                      {act.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/tours"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-xl font-semibold text-gray-900 hover:bg-ocean-50"
              >
                🌴 Sri Lanka Day Trips
              </Link>

              <Link
                href="/transfers"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-xl font-semibold text-gray-900 hover:bg-ocean-50"
              >
                🚕 Airport Transfers & Taxi
              </Link>

              <Link
                href="/gallery"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-xl font-semibold text-gray-900 hover:bg-ocean-50"
              >
                📷 Photo & Video Gallery
              </Link>

              <Link
                href="/reviews"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-xl font-semibold text-gray-900 hover:bg-ocean-50"
              >
                ⭐ Google Reviews
              </Link>

              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-xl font-semibold text-gray-900 hover:bg-ocean-50"
              >
                ℹ️ About Our Local Story
              </Link>

              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-xl font-semibold text-gray-900 hover:bg-ocean-50"
              >
                📍 Location & Contact
              </Link>
            </div>

            {/* Mobile Contact & Book Buttons */}
            <div className="pt-3 border-t border-gray-100 space-y-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsBookingModalOpen(true);
                }}
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-md"
              >
                <MessageSquare className="w-5 h-5 fill-white" />
                <span>BOOK NOW ON WHATSAPP</span>
              </button>

              <a
                href={`tel:${settings.phoneNumber.replace(/[^0-9+]/g, '')}`}
                className="w-full py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-xl flex items-center justify-center gap-2 text-sm"
              >
                <Phone className="w-4 h-4" />
                <span>Call Us: {settings.phoneNumber}</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Booking Modal instance */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        settings={settings}
        activities={[]}
        tours={[]}
      />
    </>
  );
}
