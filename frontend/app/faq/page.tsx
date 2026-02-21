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
    <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white mb-3 transition-all duration-200 hover:border-teal-200">
      <button
        onClick={onToggle}
        className="w-full px-8 py-6 flex items-center justify-between text-left group"
      >
        <span className="font-semibold text-lg text-slate-800 group-hover:text-teal-700 transition-colors">
          {question}
        </span>
        <ChevronDown
          className={`w-6 h-6 text-slate-400 transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-teal-600' : ''
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
        'Designed for retail investors, financial advisors, and portfolio managers using data-driven sector rotation and thematic analysis.',
    },
    {
      category: 'Data',
      question: 'How often is the data updated?',
      answer:
        'All models refresh weekly after Friday market close. Updated rankings are available before Monday open.',
    },
    {
      category: 'Methodology',
      question: "What is the difference between 'Signal' and 'Rank'?",
      answer:
        "'Rank' is ordinal strength (1 = strongest). 'Signal' is qualitative: Bullish, Neutral, or Bearish.",
    },
    {
      category: 'Features',
      question: 'What investment horizons are available?',
      answer:
        'Tactical (1-2 weeks), Intermediate (1-3 months), and Strategic (1 year) across Low, Medium, and High risk profiles.',
    },
    {
      category: 'Billing',
      question: 'Can I cancel anytime?',
      answer:
        'Yes. Cancel instantly from your dashboard. Access remains active until the billing cycle ends.',
    },
    {
      category: 'Billing',
      question: 'Do you offer a free trial?',
      answer:
        'Yes. We provide a 14-day full-access trial with a 100% refund guarantee.',
    },
  ];

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageLayout
      title="Frequently Asked Questions"
      subtitle="Everything you need to know about our platform, data models, and subscriptions."
    >
      <ContentSection>
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
            className="w-full pl-14 pr-6 py-4 bg-white border border-slate-200 rounded-2xl text-base placeholder:text-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
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
            href="mailto:support@yourdomain.com"
            className="inline-flex items-center gap-3 bg-teal-600 hover:bg-teal-700 text-white font-medium px-8 py-4 rounded-2xl transition-all active:scale-[0.98]"
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