'use client';

import { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Shield, 
  ShieldCheck, 
  ShieldAlert, 
  Lock, 
  Crown,
  BarChartHorizontalBig,
  PieChart,
  Loader2
} from 'lucide-react';

import { useAuth } from '@/context/AuthContext'; 
import api from '@/services/api';

/* ---------------------------------------------------
   STRATEGY CARD COMPONENT (Clean, Modern, English)
--------------------------------------------------- */
type StrategyCardProps = {
  horizon: string;
  description: string;
  isLocked: boolean;
  links: {
    name: string;
    href: string;
    icon: ReactNode;
  }[];
};

const StrategyCard = ({ horizon, description, isLocked, links }: StrategyCardProps) => {
  const baseClasses = "relative flex flex-col justify-between rounded-2xl p-6 bg-white border border-slate-200 shadow-sm transition-all duration-300 h-full overflow-hidden";
  const unlockedClasses = "hover:shadow-xl hover:border-emerald-500"; // No movement
  const lockedClasses = "bg-slate-50/70 filter saturate-[0.85]";

  return (
    <div className={`${baseClasses} ${isLocked ? lockedClasses : unlockedClasses}`}>
      {/* PRO Badge */}
      {isLocked && (
        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full">
          <Crown className="w-3.5 h-3.5" />
          PRO
        </div>
      )}

      {/* Card Content */}
      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          Investment Horizon: {horizon}
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
      </div>

      {/* Footer with links only (no arrow) */}
      <div className="mt-6 pt-5 border-t border-slate-200 flex items-center gap-3">
        {links.map((link, index) => {
          const linkHref = isLocked ? '/upgrade' : link.href;
          return (
            <Link 
              href={linkHref} 
              key={index} 
              className={`group flex-1 flex items-center justify-center gap-2 text-sm font-medium px-4 py-2.5 rounded-xl border transition-all ${
                isLocked 
                  ? 'border-slate-200 text-slate-400 cursor-not-allowed' 
                  : 'border-slate-300 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50'
              }`}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          );
        })}
        
        {isLocked && (
          <div className="ml-2">
            <Lock className="w-5 h-5 text-amber-500" />
          </div>
        )}
      </div>
    </div>
  );
};

/* ---------------------------------------------------
   DASHBOARD PAGE (Fully English + New Green)
--------------------------------------------------- */
export default function DashboardPage() {
  const { user, loading } = useAuth();
  const [subscriptionTier, setSubscriptionTier] = useState<string | null>(null);
  const [tierLoading, setTierLoading] = useState(true);

  useEffect(() => {
    if (!loading && user) {
      api.get('/api/v1/users/me')
        .then((res) => setSubscriptionTier(res.data.subscription_tier))
        .catch((error) => console.error('Error fetching user profile:', error))
        .finally(() => setTierLoading(false));
    } else if (!loading && !user) {
      setTierLoading(false);
    }
  }, [loading, user]);

  if (loading || tierLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-slate-800">
        <Loader2 className="w-12 h-12 animate-spin text-emerald-600" />
        <p className="mt-4 text-lg text-slate-500">Loading your dashboard...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-slate-800">
        <h2 className="text-3xl font-bold">Access Denied</h2>
        <p className="mt-3 text-slate-600">
          Please <Link href="/login" className="font-medium text-emerald-600 hover:underline">log in</Link> to view your dashboard.
        </p>
      </div>
    );
  }

  const primaryIconColor = "text-emerald-600";   // ← Your new green color!

  const groupedStrategies = [
    {
      riskLevel: 'Low',
      riskTitle: 'Low Risk Strategies',
      icon: <Shield className={`w-9 h-9 ${primaryIconColor}`} />,
      strategies: [
        { horizon: 'Week', scenario: 'week', description: "Capital preservation for short-term stability." },
        { horizon: 'Month', scenario: 'month', description: "Defensive sectors to minimize volatility." },
        { horizon: 'Year', scenario: 'year', description: "Long-term positions in historically stable sectors." },
      ]
    },
    {
      riskLevel: 'Medium',
      riskTitle: 'Medium Risk Strategies',
      icon: <ShieldCheck className={`w-9 h-9 ${primaryIconColor}`} />,
      strategies: [
        { horizon: 'Week', scenario: 'week', description: "Tactical trades based on immediate bullish signals." },
        { horizon: 'Month', scenario: 'month', description: "Core strategy focused on upward momentum." },
        { horizon: 'Year', scenario: 'year', description: "Investment in sectors poised for cyclical growth." },
      ]
    },
    {
      riskLevel: 'High',
      riskTitle: 'High Risk Strategies',
      icon: <ShieldAlert className={`w-9 h-9 ${primaryIconColor}`} />,
      strategies: [
        { horizon: 'Week', scenario: 'week', description: "Speculative and aggressive trades in volatile sectors." },
        { horizon: 'Month', scenario: 'month', description: "Targeting emerging sectors with high potential." },
        { horizon: 'Year', scenario: 'year', description: "Thematic investments in disruptive industries." },
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">Investment Strategies Dashboard</h1>
          <p className="mt-3 text-lg text-slate-600">Choose a strategy based on your risk tolerance and preferred investment horizon.</p>
        </header>

        <div className="space-y-16">
          {groupedStrategies.map((group) => {
            const riskValue = group.riskLevel.toLowerCase();

            return (
              <section key={group.riskLevel}>
                <div className="flex items-center gap-4 mb-8">
                  {group.icon}
                  <h2 className="text-2xl font-bold text-slate-800">{group.riskTitle}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {group.strategies.map((strategy) => {
                    const isFreeAccess = group.riskLevel === 'Medium' && strategy.horizon === 'Month';
                    const isLocked = subscriptionTier === 'FREE' && !isFreeAccess;

                    return (
                      <StrategyCard
                        key={strategy.horizon}
                        horizon={strategy.horizon}
                        description={strategy.description}
                        isLocked={isLocked}
                        links={[
                          { 
                            name: 'Sector Rotation', 
                            href: `/product/rotations?risk=${riskValue}&horizon=${strategy.scenario}`, 
                            icon: <BarChartHorizontalBig className="w-4 h-4" /> 
                          },
                          { 
                            name: 'Portfolio', 
                            href: `/product/portfolio?risk=${riskValue}&horizon=${strategy.scenario}`, 
                            icon: <PieChart className="w-4 h-4" /> 
                          },
                        ]}
                      />
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}