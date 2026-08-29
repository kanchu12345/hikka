'use client';

import React, { useState } from 'react';
import { FAQItem } from '@/lib/types';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';

interface FAQAccordionProps {
  faqs: FAQItem[];
  whatsappNumber: string;
}

export default function FAQAccordion({ faqs, whatsappNumber }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Surfing', 'Snorkeling & Wildlife', 'Booking & Payments', 'Day Trips & Transport'];

  const filteredFaqs = faqs.filter((faq) => {
    if (activeCategory === 'All') return true;
    return faq.category === activeCategory;
  });

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const cleanPhone = whatsappNumber.replace(/[^0-9]/g, '');

  const handleAskQuestion = () => {
    const msg = `Hi Hikka Surf School! I have a question about your activities.`;
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="faq" className="py-20 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surf-100 text-surf-800 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-surf-600" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-gray-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 mt-3 text-base">
            Everything you need to know about surf lessons, sea conditions, bookings, and day tours.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenIndex(0);
              }}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 ${
                activeCategory === cat
                  ? 'bg-surf-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5 mb-12">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.id || idx}
                className="border border-gray-200/90 rounded-2xl overflow-hidden transition-all bg-white shadow-sm"
              >
                <button
                  onClick={() => toggleItem(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-heading font-bold text-gray-900 hover:text-surf-600 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg">{faq.question}</span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 bg-surf-100 text-surf-600' : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-slate-50/50 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions CTA */}
        <div className="bg-gradient-to-r from-ocean-900 to-surf-900 rounded-3xl p-8 text-center text-white shadow-xl">
          <h3 className="text-2xl font-bold font-heading mb-2">
            Still Have Questions?
          </h3>
          <p className="text-ocean-100 text-sm max-w-lg mx-auto mb-6">
            We are always happy to help! Send us a quick WhatsApp text for advice on sea conditions, family packages, or custom tours.
          </p>
          <button
            onClick={handleAskQuestion}
            className="px-8 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl inline-flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all transform active:scale-95 text-sm"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>Ask Us Anything on WhatsApp</span>
          </button>
        </div>
      </div>
    </section>
  );
}
