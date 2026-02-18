import PageLayout from '@/components/PageLayout';
import { Check } from 'lucide-react';

const PricingCard = ({ plan, price, description, features, popular = false }: any) => (
  <div className={`border rounded-lg p-6 flex flex-col ${popular ? 'border-teal-500' : 'border-slate-200'}`}>
    {popular && <div className="text-center mb-4"><span className="bg-teal-500 text-white text-xs font-semibold px-3 py-1 rounded-full">MOST POPULAR</span></div>}
    <h3 className="text-2xl font-bold text-slate-800">{plan}</h3>
    <p className="text-slate-500 mt-2">{description}</p>
    <div className="my-6">
      <span className="text-4xl font-bold text-slate-900">${price}</span>
      <span className="text-slate-500">/ month</span>
    </div>
    <ul className="space-y-3 mb-8">
      {features.map((feature: string, i: number) => (
        <li key={i} className="flex items-center gap-3">
          <Check className="w-5 h-5 text-teal-500 flex-shrink-0" />
          <span className="text-slate-600">{feature}</span>
        </li>
      ))}
    </ul>
    <a href="/signup" className={`mt-auto w-full text-center font-semibold py-3 rounded-lg transition-colors ${popular ? 'bg-teal-500 text-white hover:bg-teal-600' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
      Get Started
    </a>
  </div>
);

export default function PricingPage() {
  return (
    <PageLayout
      title="Simple, Transparent Pricing"
      subtitle="Choose the plan that fits your investment journey. Cancel anytime."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <PricingCard 
          plan="Free"
          price="0"
          description="A sample of our analysis to get you started."
          features={['Weekly Medium Risk - Top 5 Sectors', 'Limited Historical Data', 'Weekly Email Summary']}
        />
        <PricingCard 
          plan="Pro"
          price="29"
          description="For active investors who need the full picture."
          features={['All Risk Models (Low, Medium, High)', 'Full Sector Rankings', 'Complete Historical Data', 'Custom Watchlists', 'Email Alerts']}
          popular={true}
        />
        <PricingCard 
          plan="Premium"
          price="79"
          description="Advanced tools for portfolio construction."
          features={['Everything in Pro', 'Portfolio Backtesting Engine', 'Model Portfolios', 'API Access', 'Priority Support']}
        />
      </div>
    </PageLayout>
  );
}