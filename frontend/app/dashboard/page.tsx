'use client';

import { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Shield, 
  ShieldCheck, 
  ShieldAlert, 
  ArrowRight, 
  Lock, 
  Crown,
  BarChartHorizontalBig,
  PieChart,
  Loader2
} from 'lucide-react';

import { useAuth } from '@/context/AuthContext'; 
import api from '@/services/api';

/* ---------------------------------------------------
   COMPONENTE DE TARJETA DE ESTRATEGIA (Compacto)
   Este es el nuevo componente para cada horizonte de tiempo.
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
  const baseClasses = "relative flex flex-col justify-between rounded-lg p-4 bg-slate-900 border border-slate-800 transition-colors duration-200 h-full";
  const unlockedClasses = "hover:border-slate-700";
  const lockedClasses = "opacity-60 filter grayscale-[50%]";

  return (
    <div className={`${baseClasses} ${isLocked ? lockedClasses : unlockedClasses}`}>
      {isLocked && (
        <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-amber-500/10 text-amber-400 text-xs font-bold px-2 py-1 rounded-full">
          <Crown className="w-3.5 h-3.5" />
          PRO
        </div>
      )}

      <div>
        <h3 className="text-md font-bold text-white mb-1.5">{horizon}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-800 flex flex-col space-y-2">
        {links.map((link, index) => {
          const linkHref = isLocked ? '/upgrade' : link.href;
          return (
            <Link href={linkHref} key={index} className={`flex items-center justify-between w-full text-sm font-medium p-2 rounded-md transition-colors ${isLocked ? 'cursor-not-allowed text-slate-500' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}>
              <span className="flex items-center gap-2">
                {link.icon}
                {link.name}
              </span>
              {isLocked ? <Lock className="w-4 h-4 text-amber-400" /> : <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white" />}
            </Link>
          );
        })}
      </div>
    </div>
  );
};


/* ---------------------------------------------------
   PÁGINA PRINCIPAL DEL DASHBOARD (Con nuevo formato)
--------------------------------------------------- */
export default function DashboardPage() {
  const { user, loading } = useAuth();
  const [subscriptionTier, setSubscriptionTier] = useState<string | null>(null);
  const [tierLoading, setTierLoading] = useState(true);

  useEffect(() => {
    if (!loading && user) {
      api.get('/api/v1/users/me')
        .then((res) => {
          setSubscriptionTier(res.data.subscription_tier);
        })
        .catch((error) => console.error('Error fetching user profile:', error))
        .finally(() => setTierLoading(false));
    } else if (!loading && !user) {
      setTierLoading(false);
    }
  }, [loading, user]);

  if (loading || tierLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <Loader2 className="w-12 h-12 animate-spin text-teal-500" />
        <p className="mt-4 text-lg text-slate-400">Loading dashboard...</p>
      </div>
    );
  }

  if (!user) {
     return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
            <h2 className="text-2xl font-bold">Access Denied</h2>
            <p className="mt-2 text-slate-400">Please <Link href="/login" className="text-teal-400 hover:underline">log in</Link> to view your dashboard.</p>
        </div>
     )
  }

  // --- NUEVA ESTRUCTURA DE DATOS AGRUPADA ---
  const groupedStrategies = [
    {
      riskLevel: 'Low',
      riskTitle: 'Low Risk Strategies',
      icon: <Shield className="w-7 h-7 text-teal-400" />,
      strategies: [
        { horizon: '1 Week', scenario: 'week', description: "Capital preservation for short-term market stability." },
        { horizon: '2-4 Weeks', scenario: 'month', description: "Defensive sector plays to minimize volatility." },
        { horizon: '1 Year', scenario: 'year', description: "Long-term holdings in historically stable sectors." },
      ]
    },
    {
      riskLevel: 'Medium',
      riskTitle: 'Medium Risk Strategies',
      icon: <ShieldCheck className="w-7 h-7 text-teal-400" />,
      strategies: [
        { horizon: '1 Week', scenario: 'week', description: "Tactical trades based on immediate bullish signals." },
        { horizon: '2-4 Weeks', scenario: 'month', description: "Core strategy focusing on confirmed upward momentum." },
        { horizon: '1 Year', scenario: 'year', description: "Investing in sectors poised for cyclical growth." },
      ]
    },
    {
      riskLevel: 'High',
      riskTitle: 'High Risk Strategies',
      icon: <ShieldAlert className="w-7 h-7 text-teal-400" />,
      strategies: [
        { horizon: '1 Week', scenario: 'week', description: "Aggressive, speculative plays on volatile sectors." },
        { horizon: '2-4 Weeks', scenario: 'month', description: "Targeting breakout sectors with high growth potential." },
        { horizon: '1 Year', scenario: 'year', description: "Thematic investments in disruptive industries." },
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Investment Strategy Dashboard</h1>
          <p className="mt-2 text-lg text-slate-400">Select a strategy based on your preferred risk and time horizon.</p>
        </header>

        <div className="space-y-12">
          {groupedStrategies.map((group) => {
            const riskValue = group.riskLevel.toLowerCase();

            return (
              <section key={group.riskLevel}>
                {/* --- Cabecera de cada grupo de riesgo --- */}
                <div className="flex items-center gap-4 mb-5">
                  {group.icon}
                  <h2 className="text-2xl font-bold text-white">{group.riskTitle}</h2>
                </div>

                {/* --- Cuadrícula de tarjetas compactas --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {group.strategies.map((strategy) => {
                    const isFreeAccess = group.riskLevel === 'Medium' && strategy.horizon === '2-4 Weeks';
                    const isLocked = subscriptionTier === 'FREE' && !isFreeAccess;

                    return (
                      <StrategyCard
                        key={strategy.horizon}
                        horizon={`${strategy.horizon} Horizon`}
                        description={strategy.description}
                        isLocked={isLocked}
                        links={[
                          { name: 'Sector Rotation', href: `/product/rotations?risk=${riskValue}&horizon=${strategy.scenario}`, icon: <BarChartHorizontalBig className="w-4 h-4"/> },
                          { name: 'Portfolio', href: `/dashboard/portfolio?risk=${riskValue}&horizon=${strategy.scenario}`, icon: <PieChart className="w-4 h-4" /> },
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