import React from 'react';
import { Metadata } from 'next';
import { getSiteSettings } from '@/lib/db';
import { ShieldCheck, Waves, Users, Heart, CheckCircle2, MessageSquare, Star, Award, Compass } from 'lucide-react';
import JsonLd from '@/components/JsonLd';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const settings = getSiteSettings();
  return {
    title: `About Us | Authentic Local Surf & Ocean Guides in Hikkaduwa`,
    description: 'Learn about the local instructors behind Hikkaduwa Hikka Surf School. Passionate ocean lovers sharing authentic Sri Lankan surf and beach culture.',
    keywords: ['About Hikka Surf School', 'Hikkaduwa surf instructors', 'Local surf guides Sri Lanka'],
  };
}

export default function AboutPage() {
  const settings = getSiteSettings();
  const story = settings.aboutStory;
  const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <>
      <JsonLd
        settings={settings}
        pageType="home"
        canonicalUrl="https://hikkasurfschool.com/about"
      />

      {/* Header */}
      <section className="relative py-20 bg-ocean-950 text-white overflow-hidden text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sand-400/20 text-sand-300 text-xs font-bold uppercase tracking-wider mb-4 border border-sand-300/30">
            <Heart className="w-3.5 h-3.5 text-sand-300" />
            <span>Our Local Heritage</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight mb-4">
            ❤️ About Hikka Surf School
          </h1>

          <p className="text-cyan-100 text-base sm:text-xl max-w-xl mx-auto">
            {story.subtitle || 'Born on the sands of Hikkaduwa Beach with a lifelong love for the Indian Ocean.'}
          </p>
        </div>
      </section>

      {/* Story & Philosophy Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            {/* Image Column */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200 h-[420px] sm:h-[480px]">
                <img
                  src={story.imageUrl || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"}
                  alt="Hikka Surf School Local Instructors"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-xs font-bold text-sand-300 uppercase tracking-wider">
                    Authentic Sri Lankan Hospitality
                  </span>
                  <h3 className="text-2xl font-bold font-heading mt-1">
                    Sharing the True Spirit of Hikkaduwa
                  </h3>
                </div>
              </div>
            </div>

            {/* Story Text Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-surf-100 text-surf-800 text-xs font-bold rounded-full uppercase">
                <Compass className="w-3.5 h-3.5" />
                <span>Our Genuine Story</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-gray-900 leading-tight">
                {story.title || 'Born on Hikkaduwa Beach'}
              </h2>

              <div className="space-y-4 text-gray-600 text-sm sm:text-base leading-relaxed">
                {story.content.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="p-5 bg-surf-50/80 rounded-2xl border-l-4 border-surf-600 text-surf-950 font-medium italic text-sm sm:text-base">
                "{story.highlightQuote}"
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/${cleanPhone}?text=Hi%20Hikka%20Surf%20School!%20I'd%20like%20to%20know%20more%20about%20your%20lessons.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl inline-flex items-center gap-2 shadow-lg shadow-green-600/20 text-sm transition-all transform active:scale-95"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Chat with Our Instructors on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 bg-slate-900 text-white p-8 sm:p-10 rounded-3xl shadow-xl">
            {story.stats.map((st, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl sm:text-4xl font-extrabold font-heading text-sand-400 mb-1">
                  {st.value}
                </div>
                <div className="text-xs sm:text-sm text-gray-300 font-medium">
                  {st.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
