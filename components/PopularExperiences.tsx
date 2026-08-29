'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Activity, Tour, SiteSettings } from '@/lib/types';
import { ArrowRight, CheckCircle2, MessageSquare, Sparkles, Shield, Info } from 'lucide-react';
import BookingModal from './BookingModal';

interface PopularExperiencesProps {
  activities: Activity[];
  tours: Tour[];
  settings: SiteSettings;
}

export default function PopularExperiences({ activities, tours, settings }: PopularExperiencesProps) {
  const [selectedActivityForModal, setSelectedActivityForModal] = useState<string | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleQuickBook = (activityTitle: string) => {
    setSelectedActivityForModal(activityTitle);
    setIsModalOpen(true);
  };

  const experienceCards = [
    {
      id: 'surf-lessons',
      icon: '🏄',
      title: 'Surf Lessons',
      badge: 'Main Core Brand',
      badgeColor: 'bg-amber-500 text-white',
      tagline: 'All Levels • Certified Instructors',
      image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=800&q=80',
      href: '/activities/surf-lessons',
      buttonText: 'View Surf Lessons',
      price: 'From $25 / Person',
      items: [
        'Beginner Surf Lessons',
        'Private Surf Lessons',
        'Semi-Private Surf Lessons',
        'Kids & Family Surfing',
        'Intermediate Surfing',
        'Surfboard Rental',
      ],
      isPartner: false,
    },
    {
      id: 'snorkeling',
      icon: '🤿',
      title: 'Snorkeling',
      badge: 'Top Rated',
      badgeColor: 'bg-cyan-600 text-white',
      tagline: 'Marine Sanctuary • Tropical Fish',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
      href: '/activities/snorkeling',
      buttonText: 'Explore Snorkeling',
      price: 'From $20 / Person',
      items: [
        'Hikkaduwa Coral Reef',
        'Turtle Snorkeling',
        'Private Snorkeling',
        'Family Snorkeling',
      ],
      isPartner: false,
    },
    {
      id: 'turtle-experiences',
      icon: '🐢',
      title: 'Turtle Experiences',
      badge: 'Must Do',
      badgeColor: 'bg-emerald-600 text-white',
      tagline: 'Wild Sea Turtles in Shallow Bay',
      image: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&w=800&q=80',
      href: '/activities/turtle-experiences',
      buttonText: 'Explore Turtle Experiences',
      price: 'From $20 / Person',
      items: [
        'Turtle Watching',
        'Turtle Snorkeling',
        'Responsible Wildlife Experiences',
      ],
      isPartner: false,
    },
    {
      id: 'fishing-tours',
      icon: '🎣',
      title: 'Fishing Tours',
      badge: 'Local Captains',
      badgeColor: 'bg-blue-600 text-white',
      tagline: 'Coastal & Deep-Sea Trips',
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
      href: '/activities/fishing-tours',
      buttonText: 'Explore Fishing',
      price: 'From $50 / Trip',
      items: [
        'Traditional Fishing',
        'Deep-Sea Fishing',
        'Private Fishing Trips',
        'Sunset Fishing',
      ],
      isPartner: true,
      partnerNote: 'Arranged with trusted local partners',
    },
    {
      id: 'boat-tours',
      icon: '🚤',
      title: 'Boat Tours',
      badge: 'Scenic & Relaxing',
      badgeColor: 'bg-indigo-600 text-white',
      tagline: 'Mangrove River & Coral Glass Boats',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
      href: '/activities/boat-tours',
      buttonText: 'Explore Boat Tours',
      price: 'From $20 / Person',
      items: [
        'Private Boat Trips',
        'Lagoon/River Trips',
        'Sunset Boat Tours',
        'Coastal Trips',
      ],
      isPartner: true,
      partnerNote: 'Arranged with trusted local partners',
    },
    {
      id: 'whale-watching',
      icon: '🐋',
      title: 'Whale Watching',
      badge: 'Seasonal',
      badgeColor: 'bg-sky-700 text-white',
      tagline: 'Hikkaduwa → Mirissa Day Tour',
      image: 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?auto=format&fit=crop&w=800&q=80',
      href: '/activities/whale-watching',
      buttonText: 'View Whale Watching',
      price: 'From $65 / Person',
      items: [
        'Hikkaduwa → Mirissa',
        'Private Options',
        'Seasonal Whale Watching',
      ],
      isPartner: true,
      partnerNote: 'Available on request — arranged with trusted local partners',
    },
    {
      id: 'sri-lanka-tours',
      icon: '🌴',
      title: 'Sri Lanka Day Trips',
      badge: 'Private Driver',
      badgeColor: 'bg-amber-600 text-white',
      tagline: 'Custom Day Trips from Hikkaduwa',
      image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80',
      href: '/tours',
      buttonText: 'Explore Sri Lanka Tours',
      price: 'From $35 / Tour',
      items: [
        'Galle Fort (UNESCO)',
        'Bentota River Safari',
        'Colombo City Tour',
        'Kandy & Tea Estates',
        'Ella Scenic Highlands',
        'Yala Leopard Safari',
        'Other Sri Lanka Tours',
      ],
      isPartner: false,
    },
    {
      id: 'transfers',
      icon: '🚕',
      title: 'Transfers & Transport',
      badge: '24/7 Service',
      badgeColor: 'bg-slate-700 text-white',
      tagline: 'Clean AC Vehicles & Surf Racks',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80',
      href: '/transfers',
      buttonText: 'Arrange Transport',
      price: 'From $45 (Airport)',
      items: [
        'Airport Pickup (CMB)',
        'Hikkaduwa Transfers',
        'Private Driver Hire',
        'Day-Trip Transportation',
      ],
      isPartner: false,
    },
  ];

  return (
    <section id="activities" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surf-100 text-surf-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Popular Experiences</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-gray-900 tracking-tight">
            Discover Hikkaduwa & Sri Lanka
          </h2>
          <p className="text-gray-600 mt-4 text-base sm:text-lg">
            From premier surf coaching to sea turtle encounters, fishing, river safaris, and island tours — explore with genuine local hospitality.
          </p>
        </div>

        {/* 8-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {experienceCards.map((card) => (
            <div
              key={card.id}
              className={`bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border flex flex-col group ${
                card.id === 'surf-lessons' ? 'border-amber-400 ring-2 ring-amber-400/20' : 'border-gray-200/80'
              }`}
            >
              {/* Image Header */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide shadow-sm ${card.badgeColor}`}>
                    {card.badge}
                  </span>
                </div>

                {/* Price pill */}
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-[11px] font-semibold border border-white/20">
                  {card.price}
                </div>

                {/* Bottom title on image */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="flex items-center gap-1.5 font-heading text-xl font-bold">
                    <span>{card.icon}</span>
                    <span>{card.title}</span>
                  </div>
                  <p className="text-xs text-gray-200 mt-0.5">{card.tagline}</p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <ul className="space-y-2 mb-4">
                    {card.items.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Partner activity disclaimer note */}
                  {card.isPartner && (
                    <div className="mb-4 bg-amber-50/80 rounded-xl p-2.5 border border-amber-200 text-[11px] text-amber-900 flex items-start gap-1.5">
                      <Info className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span>{card.partnerNote}</span>
                    </div>
                  )}
                </div>

                {/* Card Action Buttons */}
                <div className="space-y-2 pt-2 border-t border-gray-100">
                  <Link
                    href={card.href}
                    className="w-full py-2.5 px-4 bg-gray-900 hover:bg-surf-600 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors group-hover:bg-surf-600"
                  >
                    <span>{card.buttonText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => handleQuickBook(card.title)}
                    className="w-full py-2 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 border border-emerald-200 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                    <span>Quick WhatsApp Book</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        settings={settings}
        activities={activities}
        tours={tours}
        initialActivityTitle={selectedActivityForModal}
      />
    </section>
  );
}
