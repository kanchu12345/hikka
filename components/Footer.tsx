import React from 'react';
import Link from 'next/link';
import { MessageSquare, MapPin, Phone, Mail, Instagram, Facebook, Compass, Star, Lock, Heart, ShieldCheck } from 'lucide-react';
import { SiteSettings } from '@/lib/types';

interface FooterProps {
  settings: SiteSettings;
}

export default function Footer({ settings }: FooterProps) {
  const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <footer className="bg-ocean-950 text-white pt-16 pb-24 lg:pb-12 border-t border-ocean-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-surf-500 to-ocean-600 flex items-center justify-center text-white shadow-md">
                <span className="text-xl">❤️</span>
              </div>
              <div>
                <span className="font-heading font-extrabold text-xl tracking-tight block">
                  Hikka Surf School
                </span>
                <span className="text-[11px] text-cyan-300 font-medium tracking-wide uppercase">
                  Hikkaduwa • Sri Lanka
                </span>
              </div>
            </Link>

            <p className="text-sm text-cyan-100 font-medium">
              {settings.tagline || 'Surf • Snorkel • Explore Hikkaduwa & Sri Lanka'}
            </p>

            <p className="text-xs text-gray-300 leading-relaxed max-w-sm">
              Your trusted local gateway to beginner & intermediate surf coaching, coral reef snorkeling, wild sea turtles, and authentic Sri Lankan travel adventures.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://wa.me/${cleanPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-emerald-600 hover:bg-emerald-700 flex items-center justify-center text-white shadow-sm transition-all"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
              </a>
              <a
                href={settings.instagramUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-pink-600 hover:bg-pink-700 flex items-center justify-center text-white shadow-sm transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={settings.facebookUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white shadow-sm transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={settings.googleBusinessUrl || settings.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-red-600 hover:bg-red-700 flex items-center justify-center text-white shadow-sm transition-all"
                aria-label="Google Business"
              >
                <span className="font-bold text-xs">G</span>
              </a>
              <a
                href={settings.tripadvisorUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-teal-600 hover:bg-teal-700 flex items-center justify-center text-white shadow-sm transition-all"
                aria-label="TripAdvisor"
              >
                <span className="font-bold text-[11px]">TA</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-sand-300 mb-4">
              Explore Services
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/activities/surf-lessons" className="hover:text-white font-semibold text-cyan-200">
                  🏄 Surf Lessons
                </Link>
              </li>
              <li>
                <Link href="/activities/snorkeling" className="hover:text-white">
                  🤿 Snorkeling Tours
                </Link>
              </li>
              <li>
                <Link href="/activities/turtle-experiences" className="hover:text-white">
                  🐢 Turtle Experiences
                </Link>
              </li>
              <li>
                <Link href="/activities/fishing-tours" className="hover:text-white">
                  🎣 Fishing Trips
                </Link>
              </li>
              <li>
                <Link href="/activities/boat-tours" className="hover:text-white">
                  🚤 Boat Tours
                </Link>
              </li>
              <li>
                <Link href="/activities/whale-watching" className="hover:text-white">
                  🐋 Whale Watching
                </Link>
              </li>
            </ul>
          </div>

          {/* Tours & More */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-sand-300 mb-4">
              Tours & Info
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/tours" className="hover:text-white">
                  🌴 Sri Lanka Day Trips
                </Link>
              </li>
              <li>
                <Link href="/transfers" className="hover:text-white">
                  🚕 Airport Transfers
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white">
                  📷 Photo Gallery
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-white">
                  ⭐ Google Reviews
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white">
                  ℹ️ About Our Story
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  📍 Location & Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-sand-300 mb-4">
              Get in Touch
            </h4>
            <ul className="space-y-3 text-xs text-gray-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-surf-400 flex-shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a
                  href={`https://wa.me/${cleanPhone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline font-bold text-white"
                >
                  WhatsApp: {settings.whatsappNumber}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-surf-400 flex-shrink-0" />
                <a href={`tel:${settings.phoneNumber.replace(/[^0-9+]/g, '')}`} className="hover:underline">
                  {settings.phoneNumber}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-surf-400 flex-shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:underline">
                  {settings.email}
                </a>
              </li>
            </ul>

            <div className="pt-4">
              <a
                href={`https://wa.me/${cleanPhone}?text=Hi%20Hikka%20Surf%20School!%20I'd%20like%20to%20book%20an%20activity.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>BOOK NOW ON WHATSAPP</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright & admin portal link */}
        <div className="pt-8 border-t border-ocean-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} ❤️ Hikkaduwa Hikka Surf School. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Made with ❤️ in Hikkaduwa Beach, Sri Lanka</span>
            <Link
              href="/admin/login"
              className="flex items-center gap-1 text-gray-500 hover:text-gray-300 transition-colors"
              title="Admin Portal Login"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
