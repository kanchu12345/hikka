'use client';

import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { SiteSettings } from '@/lib/types';
import BookingModal from '@/components/BookingModal';

interface ActivityBookingClientProps {
  activityTitle: string;
  packageTitle?: string;
  settings: SiteSettings;
  buttonText?: string;
  isPrimary?: boolean;
}

export default function ActivityBookingClient({
  activityTitle,
  packageTitle,
  settings,
  buttonText = 'Book on WhatsApp',
  isPrimary = false,
}: ActivityBookingClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={`w-full py-3.5 px-5 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all transform active:scale-95 shadow-md ${
          isPrimary
            ? 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-green-600/30'
            : 'bg-emerald-600 hover:bg-emerald-700 text-white'
        }`}
      >
        <MessageSquare className="w-4 h-4 fill-white" />
        <span>{buttonText}</span>
      </button>

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
