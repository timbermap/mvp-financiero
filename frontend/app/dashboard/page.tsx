// src/app/dashboard/page.tsx
'use client';

import { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  Crown,
  BarChartHorizontalBig,
  PieChart,
  Loader2,
  Clock,
  Calendar,
  TrendingUp,
} from 'lucide-react';

import { useAuth } from '@/context/AuthContext';
import api from '@/services/api';

/* ---------------------------------------------------
   STRATEGY CARD
--------------------------------------------------- */

type StrategyCardProps = {
  riskLevel: 'Low' | 'Medium' | 'High';
  description: string;
  isLocked: boolean;
  links: {
    name: string;
    href: string;
    icon: ReactNode;
  }[];
};

const StrategyCard = ({
  riskLevel,
  description,
  isLocked,
  links,
}: StrategyCardProps) => {
  const riskConfig = {
    Low: {
      color: 'bg-emerald-400',
      icon: <Shield className="w-6 h-6 text-emerald-500" />,
    },
    Medium: {
      color: 'bg-amber-400',
      icon: <ShieldCheck className="w-6 h-6 text-amber-500" />,
    },
    High: {
      color: 'bg-rose-400',
      icon: <ShieldAlert className="w-6 h-6 text-rose-500" />,
    },
  };

  const config = riskConfig[riskLevel];

  return (
    <div
      className={`relative flex flex-col h-full rounded-2xl p-6 bg-white border border-slate-200 transition-all duration-300
      ${
        isLocked
          ? 'opacity-80'
          : 'hover:shadow-lg hover:-translate-y-1 hover:border-slate-300'
      }`}
    >
      {/* Top accent bar */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl ${config.color}`}
      />

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        {config.icon}
        <h3 className="text-base font-semibold text-slate-800">
          {riskLevel} Risk
        </h3>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-500 leading-relaxed flex-grow">
        {description}
      </p>

      {/* Actions */}
      <div className="mt-6 flex gap-3">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="flex-1 flex items-center justify-center gap-2 text-xs font-medium px-4 py-2.5 rounded-lg transition bg-slate-700 text-white hover:bg-emerald-500"
          >
            {link.icon}
            {link.name}
          </Link>
        ))}
      </div>

      {/* Locked Overlay - Blocks clicks and redirects to upgrade */}
      {isLocked && (
        <Link 
          href="/upgrade" 
          className="absolute inset-0 bg-white/60 backdrop-blur-[2px] rounded-2xl flex flex-col items-center justify-center z-10 hover:bg-white/70 transition cursor-pointer"
        >
          <Crown className="w-8 h-8 text-amber-500 mb-2" />
          <span className="text-sm font-bold text-slate-800">Limit Reached</span>
          <span className="text-xs font-medium text-slate-600 mt-1 bg-white px-3 py-1 rounded-full shadow-sm border border-slate-200">
            Upgrade to Unlock
          </span>
        </Link>
      )}
    </div>
  );
};

/* ---------------------------------------------------
   DASHBOARD
--------------------------------------------------- */

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const [subscriptionTier, setSubscriptionTier] = useState<string | null>(null);
  const [tierLoading, setTierLoading] = useState(true);
  
  const [usage, setUsage] = useState<any>(null);
  const [usageLoading, setUsageLoading] = useState(true); // <-- NEW: Wait for usage to load

  useEffect(() => {
    if (!loading && user) {
      api
        .get('/api/v1/users/me')
        .then((res) => setSubscriptionTier(res.data.subscription_tier))
        .catch(console.error)
        .finally(() => setTierLoading(false));
    } else if (!loading && !user) {
      setTierLoading(false);
      setUsageLoading(false);
    }
  }, [loading, user]);

  useEffect(() => {
    if (subscriptionTier === 'FREE') {
      api
        .get('/api/v1/usage/status')
        .then((res) => setUsage(res.data))
        .catch(console.error)
        .finally(() => setUsageLoading(false));
    } else if (subscriptionTier === 'PRO') {
      setUsageLoading(false);
    }
  }, [subscriptionTier]);

  // Wait until ALL data is loaded before rendering to prevent accidental clicks
  if (loading || tierLoading || usageLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-emerald-500" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800">
            Access Restricted
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Please{' '}
            <Link href="/login" className="text-emerald-500 hover:underline">
              sign in
            </Link>
          </p>
        </div>
      </div>
    );
  }

  const isFreeUser = subscriptionTier === 'FREE';

  const horizons = [
    {
      name: 'Week',
      icon: <Clock className="w-6 h-6 text-emerald-500" />,
      scenario: 'week',
      strategies: [
        { riskLevel: 'Low' as const, description: 'Defensive US stocks for capital preservation.' },
        { riskLevel: 'Medium' as const, description: 'Tactical momentum trades on bullish signals.' },
        { riskLevel: 'High' as const, description: 'Aggressive short-term plays in volatile sectors.' },
      ],
    },
    {
      name: 'Month',
      icon: <Calendar className="w-6 h-6 text-emerald-500" />,
      scenario: 'month',
      strategies: [
        { riskLevel: 'Low' as const, description: 'Defensive sector rotation to minimize volatility.' },
        { riskLevel: 'Medium' as const, description: 'Core strategy focused on upward trends.' },
        { riskLevel: 'High' as const, description: 'Emerging sectors with high short-term potential.' },
      ],
    },
    {
      name: 'Year',
      icon: <TrendingUp className="w-6 h-6 text-emerald-500" />,
      scenario: 'year',
      strategies: [
        { riskLevel: 'Low' as const, description: 'Stable blue-chip companies for long-term holding.' },
        { riskLevel: 'Medium' as const, description: 'Cyclical sectors poised for growth.' },
        { riskLevel: 'High' as const, description: 'Thematic investments in disruptive industries.' },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">
            Investment Strategies
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Select a time horizon and risk profile
          </p>
        </div>

        {/* FREE USAGE BANNER */}
        {isFreeUser && usage && (
          <div className="mb-8 bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Clock className="w-6 h-6 text-emerald-600" />
              <div>
                <p className="font-semibold text-emerald-800">Free clicks remaining this month</p>
                <p className="text-emerald-700 text-sm">
                  {usage.clicks_used} of {usage.limit} used • {usage.remaining} left
                </p>
              </div>
            </div>
            <Link
              href="/upgrade"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition"
            >
              Upgrade to PRO → Unlimited
            </Link>
          </div>
        )}

        <div className="space-y-12">
          {horizons.map((horizon) => (
            <section key={horizon.name}>
              <div className="flex items-center gap-3 mb-6">
                {horizon.icon}
                <h2 className="text-2xl font-semibold text-slate-800">
                  {horizon.name} Horizon
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {horizon.strategies.map((strat) => {
                  
                  // 1. Check if this specific strategy is the "Always Free" one
                  const isAlwaysFree = strat.riskLevel === 'Medium' && horizon.scenario === 'month';
                  
                  // 2. Lock the card if they are out of clicks AND it's not the free strategy
                  const isLocked = isFreeUser && usage && usage.remaining <= 0 && !isAlwaysFree;

                  return (
                    <StrategyCard
                      key={strat.riskLevel}
                      riskLevel={strat.riskLevel}
                      description={strat.description}
                      isLocked={isLocked} // <-- Pass the dynamic lock state
                      links={[
                        {
                          name: 'Rotation',
                          href: `/product/rotations?risk=${strat.riskLevel.toLowerCase()}&horizon=${horizon.scenario}`,
                          icon: <BarChartHorizontalBig className="w-4 h-4" />,
                        },
                        {
                          name: 'Portfolio',
                          href: `/product/portfolio?risk=${strat.riskLevel.toLowerCase()}&horizon=${horizon.scenario}`,
                          icon: <PieChart className="w-4 h-4" />,
                        },
                      ]}
                    />
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {isFreeUser && (
          <div className="mt-12 text-center text-sm text-slate-500">
            Unlock unlimited strategies with PRO{' '}
            <Link
              href="/upgrade"
              className="font-semibold text-emerald-500 hover:underline"
            >
              → Upgrade now
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}