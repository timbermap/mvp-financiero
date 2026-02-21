// app/faq/page.tsx
'use client';

import PageLayout, { ContentSection } from '@/components/PageLayout';
import { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';

const FAQItem = ({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) => (
  <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white mb-3 last:mb-0 transition-all duration-200 hover:border-teal-200">
    <button
      onClick={onToggle}
      className="w-full px-8 py-6 flex items-center justify-between text-left focus:outline-none group"
    >
      <span className="font-semibold text-lg text-slate-800 group-hover:text-teal-700 transition-colors">
        {question}
      </span>
      <ChevronDown
        className={`w-6 h-6 text-slate-400 transition-transform duration-300 flex-shrink-0 ${
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

  const faqs = [
    {
      category: 'General',
      question: 'Who is this service for?',
      answer:
        'Our platform is designed for retail investors, financial advisors, portfolio managers, and active traders who use data-driven sector rotation and thematic analysis to make higher-conviction investment decisions across short-term tactical trades and long-term strategic allocations.',
    },
    {
      category: 'Data & Methodology',
      question: 'How often is the data updated?',
      answer:
        'All models and sector metrics are refreshed once per week after market close on Friday. Fresh data, scores, and portfolio recommendations are available to subscribers before the market opens on Monday morning.',
    },
    {
      category: 'Data & Methodology',
      question: "What is the difference between 'Signal' and 'Rank'?",
      answer:
        "'Rank' is the sector’s ordinal position (1 = strongest) based on its quantitative composite score. 'Signal' (Bullish / Neutral / Bearish) is our qualitative interpretation that adds context on whether the underlying trend is strengthening, stable, or weakening.",
    },
    {
      category: 'Data & Methodology',
      question: 'How are sector scores and portfolios generated?',
      answer:
        'Our AI system evaluates 20+ technical and fundamental metrics (percentage above key moving averages, relative strength, volume confirmation, forward P/E, dividend yield, beta, etc.) using specialized models calibrated for each risk profile and time horizon. Top tickers are selected algorithmically and portfolios are built with optimal allocation weights (3, 5 or 8 positions).',
    },
    {
      category: 'Features',
      question: 'What investment horizons and risk profiles are available?',
      answer:
        'We offer three time horizons — Tactical (1-2 weeks), Intermediate (1-3 months), and Strategic (1 year) — and three risk profiles: Low (conservative quality focus), Medium (balanced GARP), and High (aggressive growth & momentum). Each combination generates its own ranked sector rotation and ready-to-use portfolios.',
    },
    {
      category: 'Features',
      question: 'Which sectors and themes do you cover?',
      answer:
        'Our expanded watchlist includes: Argentina, Big Tech, Biotech, Clean Energy, Consumer, Crypto, Data Center, Defense & Aerospace, Defensive ETF, Energy, Financials, Gold & Bonds, Healthcare, Materials, Mining, Sector ETF, Semiconductors, Space, and Utilities.',
    },
    {
      category: 'Subscriptions & Billing',
      question: 'Can I cancel my subscription at any time?',
      answer:
        'Yes. You can cancel instantly from your account dashboard. Your access and data will remain active until the end of your current billing period. No questions asked.',
    },
    {
      category: 'Subscriptions & Billing',
      question: 'Do you offer a free trial or money-back guarantee?',
      answer:
        'We offer a 14-day full-access trial for new subscribers. If you’re not completely satisfied within the first 14 days, we provide a 100% refund — no hassle.',
    },
  ];

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageLayout
      title="Frequently Asked Questions"
      subtitle="Everything you need to know about our sector intelligence platform, data, models, and subscriptions."
    >
      <ContentSection>
        {/* Search Bar */}
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

        {/* FAQs */}
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
              No results found. Try a different keyword.
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-slate-600 mb-4">
            Still have questions? Our team is here to help.
          </p>
          <a
            href="mailto:support@yourdomain.com"
            className="inline-flex items-center gap-3 bg-teal-600 hover:bg-teal-700 text-white font-medium px-8 py-4 rounded-2xl transition-all active:scale-[0.985]"
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