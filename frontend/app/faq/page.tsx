import PageLayout, { ContentSection } from '@/components/PageLayout';

const FAQItem = ({ q, a }: { q: string, a: string }) => (
  <details className="border-b border-slate-200 py-4">
    <summary className="font-semibold text-slate-800 cursor-pointer hover:text-teal-600">{q}</summary>
    <p className="pt-2 text-slate-600">{a}</p>
  </details>
);

export default function FAQPage() {
  return (
    <PageLayout
      title="Frequently Asked Questions"
      subtitle="Find answers to common questions about our platform, data, and subscriptions."
    >
      <div className="space-y-2">
        <FAQItem 
          q="Who is this service for?"
          a="Our service is designed for retail investors, financial advisors, and traders who use sector analysis to inform their investment decisions, from short-term tactical trades to long-term strategic allocations."
        />
        <FAQItem 
          q="How often is the data updated?"
          a="All our models are updated once per week, after the market closes on Friday. The new data is available to all subscribers before the market opens on Monday morning."
        />
        <FAQItem 
          q="What is the difference between 'Signal' and 'Rank'?"
          a="'Rank' is the sector's ordinal position based on its quantitative score (1 is the strongest). 'Signal' (Bullish, Neutral, Bearish) is a qualitative interpretation that provides context on whether the sector's trend is strengthening, stable, or weakening."
        />
        <FAQItem 
          q="Can I cancel my subscription at any time?"
          a="Yes, absolutely. You can cancel your subscription at any time from your account dashboard. Your access will continue until the end of your current billing period."
        />
      </div>
    </PageLayout>
  );
}