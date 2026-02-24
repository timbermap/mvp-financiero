'use client';

import { useState } from 'react';
import PageLayout, { ContentSection } from '@/components/PageLayout';
import { ChevronDown, Search } from 'lucide-react';

type FAQ = {
  category: string;
  question: string;
  answer: string;
};

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white mb-3 transition-all duration-200 hover:border-emerald-200">
      <button
        onClick={onToggle}
        className="w-full px-8 py-6 flex items-center justify-between text-left group"
      >
        <span className="font-semibold text-lg text-slate-800 group-hover:text-emerald-700 transition-colors">
          {question}
        </span>
        <ChevronDown
          className={`w-6 h-6 text-slate-400 transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-emerald-600' : ''
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-8 pb-7 text-slate-600 leading-relaxed text-[15.2px]">
          {answer}
        </div>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (question: string) => {
    setOpenItems((prev) =>
      prev.includes(question)
        ? prev.filter((q) => q !== question)
        : [...prev, question]
    );
  };

  const faqs: FAQ[] = [
    {
      category: 'General',
      question: 'Who is this service for?',
      answer:
        'CurateVista is designed for self-directed retail investors, market researchers, and data enthusiasts utilizing quantitative screening tools and macroeconomic momentum data.',
    },
    {
      category: 'Data',
      question: 'How often is the data updated?',
      answer:
        'Our quantitative models refresh weekly after Friday’s market close. Updated sector rankings and model watchlists are available before Monday’s open.',
    },
    {
      category: 'Methodology',
      question: "What is the difference between 'Trend' and 'Rank'?",
      answer:
        "'Rank' is a mathematical ordinal strength indicator (1 = strongest momentum). 'Trend' is a qualitative categorization based on our algorithms: Bullish, Neutral, or Bearish.",
    },
    {
      category: 'Features',
      question: 'What research parameters are available?',
      answer:
        'Users can filter data screens across Short-term, Medium-term, and Long-term horizons, combined with Low, Balanced, or High-Beta volatility profiles.',
    },
    {
      category: 'Billing',
      question: 'Can I cancel my subscription anytime?',
      answer:
        'Yes. You can cancel instantly from your dashboard. Your data access will remain active until the end of your current billing cycle.',
    },
    {
      category: 'Billing',
      question: 'Do you offer a free trial?',
      answer:
        'Yes. We provide a 14-day full-access trial allowing you to explore all our historical data and model screens with a 100% refund guarantee.',
    },
  ];

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageLayout
      title="Frequently Asked Questions"
      subtitle="Everything you need to know about our data models, platform, and subscriptions."
    >
      <ContentSection title="Browse FAQs">
        {/* Search */}
        <div className="relative max-w-2xl mx-auto mb-12">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-6 py-4 bg-white border border-slate-200 rounded-2xl text-base placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
          />
        </div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => (
              <FAQItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
                isOpen={openItems.includes(faq.question)}
                onToggle={() => toggleItem(faq.question)}
              />
            ))
          ) : (
            <div className="text-center py-12 text-slate-500">
              No results found.
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-slate-600 mb-4">
            Still have questions? We’re here to help.
          </p>
          <a
            href="mailto:support@curatevista.com"
            className="inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-8 py-4 rounded-2xl transition-all active:scale-[0.98]"
          >
            Contact Support
          </a>
          <p className="text-xs text-slate-400 mt-8">
            Last updated: February 2026
          </p>
        </div>
      </ContentSection>
    </PageLayout>
  );
}