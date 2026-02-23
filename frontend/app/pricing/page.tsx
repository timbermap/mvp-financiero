'use client';

import Link from 'next/link';
import { 
  CheckCircle2, 
  Minus, 
  ArrowRight, 
  HelpCircle,
  Zap,
  Shield
} from 'lucide-react';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24">
      
      {/* HEADER */}
      <section className="pt-24 pb-16 px-6 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
          Institutional-Grade Analytics.<br />
          <span className="text-slate-500">Transparent Pricing.</span>
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Evaluate our quantitative framework risk-free, or upgrade to Pro for unrestricted access to all sector models and portfolio configurations.
        </p>
      </section>

      {/* PRICING CARDS */}
      <section className="max-w-5xl mx-auto px-6 mb-24">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          
          {/* FREE TIER */}
          <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Basic Account</h2>
              <p className="text-slate-500 text-sm h-10">
                Perfect for evaluating our methodology and viewing high-level market trends.
              </p>
            </div>
            
            <div className="mb-8">
              <span className="text-5xl font-bold text-slate-900">$0</span>
              <span className="text-slate-500 font-medium"> / month</span>
            </div>

            <Link 
              href="/login?register=true"
              className="w-full flex items-center justify-center py-4 px-6 rounded-xl border-2 border-slate-200 text-slate-700 font-semibold hover:border-slate-300 hover:bg-slate-50 transition-all mb-8"
            >
              Create Free Account
            </Link>

            <div className="space-y-4">
              <p className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-4">Included in Basic</p>
              
              <FeatureItem text="10 Analysis Views per month" active={true} highlight={true} />
              <FeatureItem text="Access to Sector Rotation Tables" active={true} />
              <FeatureItem text="Access to Portfolio Models" active={true} />
              <FeatureItem text="Unlimited Analysis Views" active={false} />
              <FeatureItem text="Full Historical Backtesting Data" active={false} />
              <FeatureItem text="Priority Email Support" active={false} />
            </div>
          </div>

          {/* PRO TIER */}
          <div className="bg-slate-900 rounded-3xl p-10 border border-slate-800 shadow-2xl relative overflow-hidden transform md:-translate-y-4">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
            
            <div className="mb-8 relative z-10">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-white">Pro Access</h2>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold tracking-wide uppercase rounded-full border border-emerald-500/20">
                  Recommended
                </span>
              </div>
              <p className="text-slate-400 text-sm h-10">
                Unrestricted access for serious investors executing systematic strategies.
              </p>
            </div>
            
            <div className="mb-8 relative z-10">
              <span className="text-5xl font-bold text-white">$70</span>
              <span className="text-slate-400 font-medium"> / month</span>
            </div>

            <Link 
              href="/checkout"
              className="w-full flex items-center justify-center py-4 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-all mb-8 shadow-lg shadow-emerald-900/50"
            >
              Upgrade to Pro
              <Zap className="w-4 h-4 ml-2" />
            </Link>

            <div className="space-y-4 relative z-10">
              <p className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-4">Everything in Basic, plus</p>
              
              <FeatureItem text="Unlimited Analysis Views" active={true} dark={true} highlight={true} />
              <FeatureItem text="Unrestricted clicks on all products/tables" active={true} dark={true} />
              <FeatureItem text="All 9 Strategic Mandates (Risk/Horizon)" active={true} dark={true} />
              <FeatureItem text="Full 3, 5, and 8-Stock Portfolios" active={true} dark={true} />
              <FeatureItem text="Historical Backtesting & Performance Data" active={true} dark={true} />
              <FeatureItem text="Priority Email Support" active={true} dark={true} />
            </div>
          </div>

        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <FaqItem 
            question="What counts as an 'Analysis View'?"
            answer="On the Free tier, every time you click to view a specific Sector Rotation table or a generated Portfolio model, it counts as 1 view. You get 10 of these views per calendar month."
          />
          <FaqItem 
            question="What happens when I hit my 10-view limit?"
            answer="Your access to detailed tables and models will be temporarily locked until the next calendar month. You can upgrade to Pro at any time to instantly unlock unlimited views."
          />
          <FaqItem 
            question="Is there a long-term contract?"
            answer="No. The Pro subscription is billed month-to-month. You can cancel your subscription at any time directly from your account dashboard with no hidden fees."
          />
          <FaqItem 
            question="How often is the data updated?"
            answer="Our quantitative models process closing data at the end of each trading week. New sector rankings and portfolio configurations are published every weekend."
          />
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="max-w-4xl mx-auto px-6 mt-24 text-center">
        <div className="bg-slate-200/50 rounded-3xl p-10 flex flex-col items-center border border-slate-200">
          <Shield className="w-10 h-10 text-slate-400 mb-4" />
          <h3 className="text-2xl font-bold text-slate-900 mb-3">Secure & Transparent</h3>
          <p className="text-slate-600 mb-6 max-w-lg">
            Payments are processed securely via Stripe. We do not store your credit card information. Cancel your Pro subscription anytime with two clicks.
          </p>
          <Link href="/login?register=true" className="text-slate-900 font-semibold hover:text-slate-600 flex items-center transition-colors">
            Start with a Free Account <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </section>

    </div>
  );
}

/* --- HELPER COMPONENTS --- */

function FeatureItem({ 
  text, 
  active, 
  dark = false,
  highlight = false 
}: { 
  text: string; 
  active: boolean; 
  dark?: boolean;
  highlight?: boolean;
}) {
  return (
    <div className={`flex items-start ${active ? (dark ? 'text-slate-200' : 'text-slate-700') : (dark ? 'text-slate-600' : 'text-slate-400')}`}>
      {active ? (
        <CheckCircle2 className={`w-5 h-5 mr-3 flex-shrink-0 mt-0.5 ${highlight ? 'text-emerald-500' : (dark ? 'text-slate-400' : 'text-slate-400')}`} />
      ) : (
        <Minus className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5 opacity-50" />
      )}
      <span className={`text-sm ${highlight ? 'font-semibold' : 'font-medium'}`}>{text}</span>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex items-start gap-3 mb-3">
        <HelpCircle className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
        <h4 className="font-bold text-slate-900">{question}</h4>
      </div>
      <p className="text-sm text-slate-600 leading-relaxed pl-8">
        {answer}
      </p>
    </div>
  );
}