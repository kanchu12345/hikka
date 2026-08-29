'use client';

import React, { useState, useEffect } from 'react';
import { X, Calendar, Users, Clock, Compass, ShieldCheck, CheckCircle2, MessageSquare } from 'lucide-react';
import { Activity, Tour, SiteSettings } from '@/lib/types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: SiteSettings;
  activities: Activity[];
  tours: Tour[];
  initialActivityTitle?: string;
  initialPackageTitle?: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  settings,
  activities,
  tours,
  initialActivityTitle,
  initialPackageTitle,
}: BookingModalProps) {
  const [selectedActivity, setSelectedActivity] = useState(
    initialActivityTitle || 'Beginner Surf Lesson'
  );
  const [guestCount, setGuestCount] = useState(2);
  const [selectedDate, setSelectedDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('08:30 AM (Best Morning Waves)');
  const [customerName, setCustomerName] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialActivityTitle) {
      if (initialPackageTitle) {
        setSelectedActivity(`${initialActivityTitle} - ${initialPackageTitle}`);
      } else {
        setSelectedActivity(initialActivityTitle);
      }
    }
  }, [initialActivityTitle, initialPackageTitle]);

  if (!isOpen) return null;

  // Flatten activity packages for the selector
  const activityOptions = [
    { group: '🏄 Surf Lessons & Guiding', items: [
      'Beginner Surf Lesson (1.5 Hours)',
      'Private 1-on-1 Lesson (1.5 Hours)',
      'Semi-Private Couple Lesson (1.5 Hours)',
      'Kids & Family Surfing (1.5 Hours)',
      'Intermediate Coaching & Guiding (2 Hours)',
      'Surfboard Rental (Daily / Hourly)',
    ]},
    { group: '🤿 Ocean & Wildlife Activities', items: [
      'Guided Coral Reef Snorkeling',
      'Private Family Snorkeling',
      'Turtle Watching & Snorkeling',
      'Traditional Coastal & Sunset Fishing',
      'Deep-Sea Big Game Fishing',
      'Glass-Bottom Coral Boat Tour',
      'Madu Ganga Mangrove River Safari',
      'Mirissa Whale Watching Package',
    ]},
    { group: '🌴 Sri Lanka Day Trips', items: [
      'Galle Fort & Southern Heritage Tour',
      'Bentota River Safari & Turtle Conservation',
      'Yala National Park Wildlife Safari',
      'Ella, Tea Plantations & Scenic Highlands',
    ]},
    { group: '🚕 Transfers & Transport', items: [
      'Colombo Airport (CMB) ↔ Hikkaduwa Transfer',
      'Private Driver & Vehicle Hire across Sri Lanka',
    ]},
  ];

  const timeSlots = [
    '07:00 AM (Early Glassy Conditions)',
    '08:30 AM (Best Morning Waves)',
    '10:30 AM (Late Morning)',
    '02:00 PM (Afternoon Session)',
    '04:00 PM (Sunset Golden Hour)',
    'Flexible / Driver Pickup Time',
  ];

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Log inquiry in database
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: customerName || 'Traveler',
          activity: selectedActivity,
          date: selectedDate,
          guestsCount: guestCount,
          preferredTime: timeSlot,
          notes: notes,
          channel: 'WhatsApp',
        }),
      });
    } catch (err) {
      console.error('Failed to log inquiry', err);
    }

    // 2. Format exact WhatsApp message
    const formattedMessage = `Hi Hikka Surf School! I'd like to book:
Activity: ${selectedActivity}
Date: ${selectedDate}
Number of people: ${guestCount}
Preferred time: ${timeSlot}${customerName ? `\nName: ${customerName}` : ''}${notes ? `\nNotes: ${notes}` : ''}`;

    const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(formattedMessage)}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-ocean-100 max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-ocean-800 via-surf-800 to-ocean-950 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-sand-300 text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" /> Instant WhatsApp Booking
          </div>
          <h3 className="text-2xl font-bold font-heading">
            Book Your Experience
          </h3>
          <p className="text-ocean-100 text-sm mt-1">
            Fast, simple & personal. Connect directly with our local team.
          </p>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleBookingSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          {/* Select Activity */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-surf-600" /> Select Activity or Tour
            </label>
            <select
              value={selectedActivity}
              onChange={(e) => setSelectedActivity(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium focus:ring-2 focus:ring-surf-500 focus:outline-none transition-all text-sm"
              required
            >
              {activityOptions.map((group) => (
                <optgroup key={group.group} label={group.group}>
                  {group.items.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          {/* Date & Guests Row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-surf-600" /> Preferred Date
              </label>
              <input
                type="date"
                value={selectedDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:ring-2 focus:ring-surf-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-surf-600" /> Number of People
              </label>
              <select
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:ring-2 focus:ring-surf-500 focus:outline-none"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, '10+ Group'].map((num, i) => (
                  <option key={i} value={typeof num === 'number' ? num : 12}>
                    {typeof num === 'number' ? `${num} ${num === 1 ? 'Person' : 'People'}` : num}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Time Slot */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-surf-600" /> Preferred Time
            </label>
            <select
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:ring-2 focus:ring-surf-500 focus:outline-none"
            >
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>

          {/* Your Name (Optional) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
              Your Name (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Sarah / Oliver"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:ring-2 focus:ring-surf-500 focus:outline-none"
            />
          </div>

          {/* Special Requests */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
              Special Requests / Questions (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g., Beginners, kids age 7, need hotel pickup..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:ring-2 focus:ring-surf-500 focus:outline-none"
            />
          </div>

          {/* Trust Guarantees */}
          <div className="bg-ocean-50/60 rounded-2xl p-3.5 border border-ocean-100 flex items-start gap-3 text-xs text-ocean-900">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-ocean-950">No advance payment required.</span> Pay on the beach in USD or LKR cash. Free rescheduling if sea or weather conditions change.
            </div>
          </div>

          {/* WhatsApp CTA button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold rounded-2xl shadow-lg shadow-green-500/25 flex items-center justify-center gap-3 text-base transition-all transform active:scale-[0.98]"
            >
              <MessageSquare className="w-5 h-5 fill-white" />
              <span>Send Booking Request on WhatsApp</span>
            </button>
            <p className="text-center text-[11px] text-gray-500 mt-2">
              Opens WhatsApp with your pre-filled inquiry. Instant reply within minutes!
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
