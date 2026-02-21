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
  Loader2,
  Clock,
  Calendar,
  TrendingUp
} from 'lucide-react';

import { useAuth } from '@/context/AuthContext'; 
import api from '@/services/api';

/* ---------------------------------------------------
   STRATEGY CARD – Compacta y limpia (para 3x3 perfecto)
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

const StrategyCard = ({ riskLevel, description, isLocked, links }: StrategyCardProps) => {
  const riskConfig = {
    Low:    { icon: <Shield className="w-7 h-7 text-emerald-600" />, badge: 'bg-emerald-100 text-emerald-700' },
    Medium: { icon: <ShieldCheck className="w-7 h-7 text-amber-600" />, badge: 'bg-amber-100 text-amber-700' },
    High:   { icon: <ShieldAlert className="w-7 h-7 text-rose-600" />, badge: 'bg-rose-100 text-rose-700' },
  };

  const config = riskConfig[riskLevel];

  return (
    <div className={`relative flex flex-col h-full rounded-2xl p-5 bg-white border border-slate-200 shadow-sm transition-all duration-300
      ${isLocked ? 'bg-slate-50/90 saturate-[0.85]' : 'hover:shadow-md hover:border-emerald-300'}`}>

      {/* Badges */}
      <div className={`absolute top-4 right-4 px-3 py-0.5 text-xs font-semibold rounded-full ${config.badge}`}>
        {riskLevel} Risk
      </div>
      {isLocked && (
        <div className="absolute top-4 left-4 flex items-center gap-1 bg-amber-100 text-amber-700 text-xs font-bold px-3 py-0.5 rounded-full">
          <Crown className="w-3.5 h-3.5" /> PRO
        </div>
      )}

      <div className="flex items-center gap-3 mb-4">
        {config.icon}
      </div>

      <p className="text-sm text-slate-600 leading-snug flex-grow line-clamp-3">{description}</p>

      {/* Buttons */}
      <div className="mt-6 pt-5 border-t border-slate-200 grid grid-cols-2 gap-3">
        {links.map((link, index) => {
          const linkHref = isLocked ? '/upgrade' : link.href;
          return (
            <Link
              href={linkHref}
              key={index}
              className={`flex items-center justify-center gap-2 text-xs font-medium px-4 py-2.5 rounded-xl border transition-all
                ${isLocked 
                  ? 'border-slate-200 text-slate-400 cursor-not-allowed' 
                  : 'border-slate-300 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50'}`}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          );
        })}
      </div>

      {isLocked && <Lock className="absolute bottom-4 right-4 w-4 h-4 text-amber-500" />}
    </div>
  );
};

/* ---------------------------------------------------
   DASHBOARD – Modelo 3x3 que pediste (Horizon ↓ • Risk →)
--------------------------------------------------- */
export default function DashboardPage() {
  const { user, loading } = useAuth();
  const [subscriptionTier, setSubscriptionTier] = useState<string | null>(null);
  const [tierLoading, setTierLoading] = useState(true);

  useEffect(() => {
    if (!loading && user) {
      api.get('/api/v1/users/me')
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
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-emerald-600 mx-auto" />
          <p className="mt-3 text-sm text-slate-500">Cargando estrategias...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Acceso Denegado</h2>
          <p className="mt-2 text-sm text-slate-600">
            Por favor <Link href="/login" className="text-emerald-600 hover:underline">inicia sesión</Link>
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
        { riskLevel: 'Low' as const, description: "Defensive US stocks for capital preservation." },
        { riskLevel: 'Medium' as const, description: "Tactical momentum trades on bullish signals." },
        { riskLevel: 'High' as const, description: "Aggressive short-term plays in volatile sectors." },
      ],
    },
    {
      name: 'Month',
      icon: <Calendar className="w-6 h-6 text-emerald-600" />,
      scenario: 'month',
      strategies: [
        { riskLevel: 'Low' as const, description: "Defensive sector rotation to minimize volatility." },
        { riskLevel: 'Medium' as const, description: "Core strategy focused on upward trends." },
        { riskLevel: 'High' as const, description: "Emerging sectors with high short-term potential." },
      ],
    },
    {
      name: 'Year',
      icon: <TrendingUp className="w-6 h-6 text-emerald-600" />,
      scenario: 'year',
      strategies: [
        { riskLevel: 'Low' as const, description: "Stable blue-chip companies for long-term holding." },
        { riskLevel: 'Medium' as const, description: "Cyclical sectors poised for growth." },
        { riskLevel: 'High' as const, description: "Thematic investments in disruptive industries." },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 py-8 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        {/* Header compacto */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Investment Strategies</h1>
          <p className="mt-1 text-sm text-slate-600">Elige horizonte (↓) y nivel de riesgo (→)</p>
        </div>

        <div className="space-y-10">
          {horizons.map((horizon) => (
            <section key={horizon.name}>
              <div className="flex items-center gap-4 mb-5">
                {horizon.icon}
                <h2 className="text-2xl font-semibold text-slate-900">{horizon.name} Horizon</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {horizon.strategies.map((strat) => {
                  const isFreeAccess = horizon.name === 'Month' && strat.riskLevel === 'Medium';
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
                          icon: <BarChartHorizontalBig className="w-4 h-4" /> 
                        },
                        { 
                          name: 'Portfolio', 
                          href: `/product/portfolio?risk=${strat.riskLevel.toLowerCase()}&horizon=${horizon.scenario}`, 
                          icon: <PieChart className="w-4 h-4" /> 
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
          <div className="mt-10 text-center text-sm">
            <p className="text-slate-600">
              Desbloquea las 9 estrategias con PRO{' '}
              <Link href="/upgrade" className="font-semibold text-emerald-600 hover:underline">→ Upgrade ahora</Link>
            </p>
          </div>
        )}
      </div>
    </main>
  );
}