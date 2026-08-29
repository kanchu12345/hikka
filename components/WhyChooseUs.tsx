import React from 'react';
import { Compass, UserCheck, Waves, MessageSquare, Star, ShieldCheck, Award, Heart } from 'lucide-react';
import { SiteSettings } from '@/lib/types';

interface WhyChooseUsProps {
  settings: SiteSettings;
}

export default function WhyChooseUs({ settings }: WhyChooseUsProps) {
  const pillars = [
    {
      icon: Compass,
      color: 'bg-surf-100 text-surf-700',
      title: 'Local Experience',
      desc: 'Local instructors born and raised on Hikkaduwa Beach with in-depth knowledge of local tides, currents, and wave dynamics.',
    },
    {
      icon: UserCheck,
      color: 'bg-emerald-100 text-emerald-700',
      title: 'Personal Attention',
      desc: 'Private 1-on-1 and small-group experiences ensure you get hands-on coaching, instant feedback, and maximum safety.',
    },
    {
      icon: Waves,
      color: 'bg-cyan-100 text-cyan-700',
      title: 'More Than Surfing',
      desc: 'Explore coral reef snorkeling, sea turtles, ocean fishing, river safaris, and authentic Sri Lankan cultural day trips.',
    },
    {
      icon: MessageSquare,
      color: 'bg-green-100 text-green-700',
      title: 'Easy WhatsApp Booking',
      desc: 'No confusing checkout steps or advance deposits. Reserve via WhatsApp in 30 seconds with immediate personal confirmation.',
    },
    {
      icon: Star,
      color: 'bg-amber-100 text-amber-700',
      title: 'Trusted by Travelers',
      desc: '5-star rated on Google. Hundreds of travelers from Europe, UK, Australia, and worldwide recommend our surf coaching.',
    },
    {
      icon: ShieldCheck,
      color: 'bg-indigo-100 text-indigo-700',
      title: 'Local Connections',
      desc: 'Specialized activities (whale watching, deep-sea fishing, Yala safaris) arranged exclusively with trusted, certified local partners.',
    },
  ];

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sand-100 text-sand-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-4 h-4 text-sand-700" />
            <span>Trust & Quality</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-gray-900 tracking-tight">
            ⭐ Why Choose Hikka Surf School?
          </h2>
          <p className="text-gray-600 mt-4 text-base sm:text-lg">
            Genuine hospitality, certified safety, and unmatched local knowledge right on the sands of Hikkaduwa.
          </p>
        </div>

        {/* 6 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50/70 p-8 rounded-3xl border border-gray-200/80 hover:border-surf-300 hover:bg-white hover:shadow-lg transition-all duration-300 group"
              >
                <div className={`w-14 h-14 rounded-2xl ${pillar.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">
                  {pillar.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
