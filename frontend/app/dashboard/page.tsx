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
   STRATEGY CARD – Premium Clean Version
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
      color: 'bg-emerald-500',
      icon: <Shield className="w-6 h-6 text-emerald-600" />,
    },
    Medium: {
      color: 'bg-amber-500',
      icon: <ShieldCheck className="w-6 h-6 text-amber-600" />,
    },
    High: {
      color: 'bg-rose-500',
      icon: <ShieldAlert className="w-6 h-6 text-rose-600" />,
    },
  };

  const config = riskConfig[riskLevel];

  return (
    <div
      className={`relative flex flex-col h-full rounded-2xl p-6 bg-white border border-slate-200 transition-all duration-300
      ${
        isLocked
          ? 'opacity-75'
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
        <h3 className="text-base font-semibold text-slate-900">
          {riskLevel} Risk
        </h3>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-600 leading-relaxed flex-grow">
        {description}
      </p>

      {/* Actions */}
      <div className="mt-6 flex gap-3">
        {links.map((link, index) => {
          const linkHref = isLocked ? '/upgrade' : link.href;

          return (
            <Link
              key={index}
              href={linkHref}
              className={`flex-1 flex items-center justify-center gap-2 text-xs font-medium px-4 py-2.5 rounded-lg transition
                ${
                  isLocked
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'bg-slate-900 text-white hover:bg-emerald-600'
                }`}
            >
              {link.icon}
              {link.name}
            </Link>
          );
        })}
      </div>

      {/* Locked Overlay */}
      {isLocked && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] rounded-2xl flex items-center justify-center">
          <div className="text-xs font-semibold text-slate-700 flex items-center gap-1">
            <Crown className="w-4 h-4 text-amber-500" />
            PRO Only
          </div>
        </div>
      )}
    </div>
  );
};

/* ---------------------------------------------------
   DASHBOARD – 3x3 Layout (Horizon ↓ • Risk →)
--------------------------------------------------- */

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const [subscriptionTier, setSubscriptionTier] = useState<string | null>(null);
  const [tierLoading, setTierLoading] = useState(true);

  useEffect(() => {
    if (!loading && user) {
      api
        .get('/api/v1/users/me')
        .then((res) => setSubscriptionTier(res.data.subscription_tier))
        .catch(console.error)
        .finally(() => setTierLoading(false));
    } else if (!loading && !user) {
      setTierLoading(false);
    }
  }, [loading, user]);

  if (loading || tierLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900">
            Access Restricted
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Please{' '}
            <Link
              href="/login"
              className="text-emerald-600 hover:underline"
            >
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
      icon: <Clock className="w-6 h-6 text-emerald-600" />,
      scenario: 'week',
      strategies: [
        { riskLevel: 'Low' as const, description: 'Defensive US stocks for capital preservation.' },
        { riskLevel: 'Medium' as const, description: 'Tactical momentum trades on bullish signals.' },
        { riskLevel: 'High' as const, description: 'Aggressive short-term plays in volatile sectors.' },
      ],
    },
    {
      name: 'Month',
      icon: <Calendar className="w-6 h-6 text-emerald-600" />,
      scenario: 'month',
      strategies: [
        { riskLevel: 'Low' as const, description: 'Defensive sector rotation to minimize volatility.' },
        { riskLevel: 'Medium' as const, description: 'Core strategy focused on upward trends.' },
        { riskLevel: 'High' as const, description: 'Emerging sectors with high short-term potential.' },
      ],
    },
    {
      name: 'Year',
      icon: <TrendingUp className="w-6 h-6 text-emerald-600" />,
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
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Investment Strategies
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Select a time horizon and risk profile
          </p>
        </div>

        <div className="space-y-12">
          {horizons.map((horizon) => (
            <section key={horizon.name}>
              <div className="flex items-center gap-3 mb-6">
                {horizon.icon}
                <h2 className="text-2xl font-semibold text-slate-900">
                  {horizon.name} Horizon
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {horizon.strategies.map((strat) => {
                  const isFreeAccess =
                    horizon.name === 'Month' &&
                    strat.riskLevel === 'Medium';

                  const isLocked = isFreeUser && !isFreeAccess;

                  return (
                    <StrategyCard
                      key={strat.riskLevel}
                      riskLevel={strat.riskLevel}
                      description={strat.description}
                      isLocked={isLocked}
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
          <div className="mt-12 text-center text-sm text-slate-600">
            Unlock all strategies with PRO{' '}
            <Link
              href="/upgrade"
              className="font-semibold text-emerald-600 hover:underline"
            >
              → Upgrade now
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}