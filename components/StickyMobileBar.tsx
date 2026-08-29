'use client';

import React, { useState } from 'react';
import { MessageSquare, Calendar, Phone } from 'lucide-react';
import { SiteSettings } from '@/lib/types';
import BookingModal from './BookingModal';

interface StickyMobileBarProps {
  settings: SiteSettings;
  activityTitle?: string;
  packageTitle?: string;
}

export default function StickyMobileBar({
  settings,
  activityTitle,
  packageTitle,
}: StickyMobileBarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');

  const handleDirectWhatsApp = () => {
    const message = activityTitle
      ? `Hi Hikka Surf School! I'd like to book: ${activityTitle}${packageTitle ? ` (${packageTitle})` : ''}`
      : `Hi Hikka Surf School! I'd like to ask about surf lessons and activities in Hikkaduwa.`;
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 py-2.5 px-4 lg:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
        <div className="max-w-md mx-auto flex items-center gap-2.5">
          {/* Quick WhatsApp Chat */}
          <button
            onClick={handleDirectWhatsApp}
            className="flex-1 py-3 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all active:scale-95"
            aria-label="Chat on WhatsApp"
          >
            <MessageSquare className="w-4 h-4 text-emerald-600 fill-emerald-600" />
            <span>Chat on WhatsApp</span>
          </button>

          {/* Instant Book Now */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-[1.2] py-3 px-4 bg-gradient-to-r from-emerald-500 to-green-600 active:from-emerald-600 active:to-green-700 text-white font-extrabold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md shadow-green-600/30 active:scale-95"
            aria-label="Book Surf or Tour"
          >
            <Calendar className="w-4 h-4" />
            <span>BOOK NOW 🏄</span>
          </button>
        </div>
      </div>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        settings={settings}
        activities={[]}
        tours={[]}
        initialActivityTitle={activityTitle}
        initialPackageTitle={packageTitle}
      />
    </>
  );
}
