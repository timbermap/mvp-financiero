'use client';

import { useEffect, useState, Fragment } from 'react';
import api from '@/services/api';

import SectorTable from '@/components/sector/SectorTable';
import PortfolioTable from '@/components/portfolio/PortfolioTable';
import type { PortfolioRecommendationData } from '@/components/portfolio/types';

import Link from 'next/link';
import { 
  ChevronRight, 
  Users, 
  Calendar, 
  BarChart3,
  Zap, 
  TrendingUp, 
  ShieldCheck,
} from 'lucide-react';

// --- TIPOS DE DATOS ---
export interface SectorData {
  analysis_date: string;
  rank: number;
  sector: string;
  score: number;
  signal: string;
}

// --- FORMAT DATE ---
const formatDate = (isoDate: string | null): string => {
  if (!isoDate) return 'N/A';
  const date = new Date(isoDate + 'T00:00:00Z');
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  });
};

/* ---------------------------------------------------
   HERO SECTOR CARD
--------------------------------------------------- */
const getRegime = (signal: string) => {
  if (signal === 'Neutral') return 'Leading';
  if (signal === 'Bullish') return 'Improving';
  if (signal === 'Bearish') return 'Weakening';
  return 'Lagging';
};

const regimeStyles = {
  Leading:    { border: 'border-emerald-500', bg: 'bg-emerald-500/10', text: 'text-emerald-400' },
  Improving:  { border: 'border-emerald-400', bg: 'bg-emerald-400/10', text: 'text-emerald-300' },
  Weakening:  { border: 'border-amber-500',  bg: 'bg-amber-500/10',  text: 'text-amber-400' },
  Lagging:    { border: 'border-rose-500',   bg: 'bg-rose-500/10',   text: 'text-rose-400' }
};

type HeroSectorCardProps = {
  sector: string;
  signal: string;
  momentum: number;
  rank: number;
};

const HeroSectorCard = ({ sector, signal, momentum, rank }: HeroSectorCardProps) => {
  const regime = getRegime(signal);
  const styles = regimeStyles[regime as keyof typeof regimeStyles];

  return (
    <div className={`relative group rounded-2xl p-6 border ${styles.border} ${styles.bg} bg-slate-900/80 backdrop-blur-sm transition-all hover:scale-[1.02]`}>
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-white text-lg">{sector}</h4>
        <span className="text-xs font-mono text-slate-400">#{rank}</span>
      </div>
      <p className={`text-sm font-medium ${styles.text}`}>{regime}</p>
      
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-52 rounded-2xl bg-slate-800 text-xs text-slate-200 px-4 py-3 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all pointer-events-none shadow-2xl border border-slate-700">
        <div className="font-semibold mb-1.5 border-b border-slate-700 pb-2">{sector}</div>
        <div className="flex justify-between"><span className="text-slate-400">Signal</span><span className="text-white">{signal}</span></div>
        <div className="flex justify-between"><span className="text-slate-400">Score</span><span className="text-white">{momentum.toFixed(2)}</span></div>
      </div>
    </div>
  );
};

/* ---------------------------------------------------
   3x3 STRATEGY MATRIX (CORREGIDO)
--------------------------------------------------- */
const strategies = {
  low: {
    week:  "Capital preservation for short-term stability.",
    month: "Defensive sectors to minimize volatility.",
    year:  "Long-term positions in historically stable sectors.",
  },
  medium: {
    week:  "Tactical trades based on immediate bullish signals.",
    month: "Core strategy focused on upward momentum.",
    year:  "Investment in sectors poised for cyclical growth.",
  },
  high: {
    week:  "Speculative and aggressive trades in volatile sectors.",
    month: "Targeting emerging sectors with high potential.",
    year:  "Thematic investments in disruptive industries.",
  }
};

const riskConfig = {
  low:    { label: 'Low Risk',    icon: <ShieldCheck className="w-6 h-6 text-emerald-600" /> },
  medium: { label: 'Medium Risk', icon: <TrendingUp className="w-6 h-6 text-amber-600" /> },
  high:   { label: 'High Risk',   icon: <Zap className="w-6 h-6 text-rose-600" /> },
};

const horizons = [
  { key: 'week',  label: 'Week' },
  { key: 'month', label: 'Month' },
  { key: 'year',  label: 'Year' },
];

const StrategyMatrix = () => (
  <div className="max-w-6xl mx-auto">
    <div className="grid grid-cols-4 gap-px bg-slate-200 rounded-3xl overflow-hidden shadow-sm">
      {/* Header row */}
      <div className="bg-white p-8"></div>
      {horizons.map((h) => (
        <div key={h.key} className="bg-white p-8 text-center">
          <div className="font-semibold text-xl text-slate-900">{h.label}</div>
          <div className="text-xs text-slate-500 mt-1">Investment Horizon</div>
        </div>
      ))}

      {/* Risk rows */}
      {(['low', 'medium', 'high'] as const).map((riskKey) => {
        const config = riskConfig[riskKey];
        return (
          <Fragment key={riskKey}>
            {/* Risk label column */}
            <div className="bg-white p-8 border-r border-slate-200 flex items-center gap-5">
              <div className="flex-shrink-0">{config.icon}</div>
              <div>
                <div className="font-semibold text-2xl text-slate-900">{config.label}</div>
                <div className="text-xs text-slate-500 mt-1">Risk Level</div>
              </div>
            </div>

            {/* Strategy cells */}
            {horizons.map((h) => (
              <div 
                key={h.key} 
                className="bg-white p-8 hover:bg-emerald-50/50 transition-colors border-l border-slate-100 flex items-center"
              >
                <p className="text-slate-600 leading-relaxed text-[15px]">
                  {strategies[riskKey][h.key as keyof typeof strategies.low]}
                </p>
              </div>
            ))}
          </Fragment>
        );
      })}
    </div>
  </div>
);

/* ---------------------------------------------------
   LANDING PAGE – COMPLETA Y CORREGIDA
--------------------------------------------------- */
export default function LandingPage() {
const [data, setData] = useState<SectorData[]>([]);
  const [previousData, setPreviousData] = useState<SectorData[]>([]);
  const [latestAnalysisDate, setLatestAnalysisDate] = useState<string | null>(null);
  const [portfolioData, setPortfolioData] = useState<PortfolioRecommendationData[]>([]);
  const [portfolioLatestDate, setPortfolioLatestDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

// === UPDATE the useEffect fetch (replace the whole try block) ===
  useEffect(() => {
    const fetchPublicData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [dashboardResponse, dateResponse, portfolioResponse] = await Promise.all([
          api.get('/api/v1/dashboard/latest'),
          api.get('/api/v1/latest-analysis-date'),
          api.get('/api/v1/portfolio/latest')   // ← NEW
        ]);
        
        setData(dashboardResponse.data.currentData || []);
        setPreviousData(dashboardResponse.data.previousData || []);
        setLatestAnalysisDate(dateResponse.data.latest_date);

        // ← NEW: Portfolio data
        const portData = portfolioResponse.data.latestData || [];
        setPortfolioData(portData);
        if (portData.length > 0) {
          setPortfolioLatestDate(portData[0].analysis_date);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchPublicData();
  }, []);

  const heroSectors = [...data].sort(() => Math.random() - 0.5).slice(0, 4);
  const formattedDate = formatDate(latestAnalysisDate);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">

      {/* HERO */}
      <section className="relative bg-slate-900 text-white min-h-[100dvh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#334155_0.8px,transparent_1px)] [background-size:4px_4px]" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-16 grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-xs font-medium tracking-widest uppercase">Live Market Intelligence</span>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold tracking-tighter leading-none">
              Sector Momentum.<br />
              <span className="bg-gradient-to-r from-emerald-400 to-white bg-clip-text text-transparent">Revealed Weekly.</span>
            </h1>

            <p className="text-xl text-slate-300 max-w-lg">
              Data-driven signals that help you overweight the right sectors at the right time. Built for serious investors.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/login?register=true" className="inline-flex items-center px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-2xl transition-all active:scale-95 shadow-xl shadow-emerald-900/30">
                Get Started Free
                <ChevronRight className="ml-3 w-5 h-5" />
              </Link>
              <Link href="#weekly-analysis" className="inline-flex items-center px-8 py-4 border border-white/30 hover:bg-white/10 text-white font-semibold rounded-2xl transition-all">
                See Latest Analysis
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              {loading ? (
                [...Array(4)].map((_, i) => (
                  <div key={i} className="h-40 bg-slate-800/50 rounded-2xl animate-pulse" />
                ))
              ) : (
                heroSectors.map((sector) => (
                  <HeroSectorCard
                    key={sector.sector}
                    sector={sector.sector}
                    signal={sector.signal}
                    momentum={sector.score}
                    rank={sector.rank}
                  />
                ))
              )}
            </div>

            {!loading && latestAnalysisDate && (
              <div className="text-right px-2">
                <p className="text-xs text-slate-500 flex items-center justify-end">
                  <Calendar className="w-3.5 h-3.5 mr-1.5" />
                  Analysis Date: {formattedDate}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CHOOSE YOUR EDGE – 3x3 MATRIX */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold tracking-tight text-slate-900">Choose Your Edge</h2>
            <p className="mt-5 text-lg text-slate-600 max-w-2xl mx-auto">
              Match your investment horizon and risk tolerance with proven sector strategies.
            </p>
          </div>

          <StrategyMatrix />
        </div>
      </section>

      {/* WEEKLY ANALYSIS TABLE */}
      <section id="weekly-analysis" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <BarChart3 className="w-9 h-9 text-emerald-600" />
              <h2 className="text-4xl font-bold tracking-tight text-slate-900">Sample Monthly Sector Rotation</h2>
            </div>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Live sample of our flagship <span className="font-semibold text-emerald-700">'Medium Risk'</span> analysis — updated every week.
            </p>
            {!loading && latestAnalysisDate && (
              <p className="mt-3 text-sm text-slate-500 flex items-center justify-center">
                <Calendar className="w-4 h-4 mr-1.5" />
                Latest update: {formattedDate}
              </p>
            )}
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
            {loading ? (
              <div className="py-20 text-center text-slate-500">Loading latest sector rankings...</div>
            ) : error ? (
              <div className="py-20 text-center text-red-600">{error}</div>
            ) : (
              <SectorTable data={data} previousData={previousData} />
            )}
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-slate-500 max-w-2xl mx-auto">
              For educational purposes only. Not investment advice. Past performance does not guarantee future results.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== NEW: PORTFOLIO PREVIEW SECTION ==================== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <TrendingUp className="w-9 h-9 text-emerald-600" />
              <h2 className="text-4xl font-bold tracking-tight text-slate-900">Sample Portfolio Recommendations</h2>
            </div>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Real 5-stock examples from our <span className="font-semibold text-emerald-700">Medium Risk • Monthly Horizon</span> strategy
            </p>
            {portfolioLatestDate && (
              <p className="mt-3 text-sm text-slate-500 flex items-center justify-center">
                <Calendar className="w-4 h-4 mr-1.5" />
                Updated: {formatDate(portfolioLatestDate)}
              </p>
            )}
          </div>

          {loading ? (
            <div className="py-20 text-center text-slate-500">Loading portfolio examples...</div>
          ) : portfolioData.length > 0 ? (
            <div className="max-w-6xl mx-auto">
              <PortfolioTable 
                title="5-Stock Balanced Portfolio" 
                data={portfolioData.filter(item => item.portfolio_size === 5)} 
              />
            </div>
          ) : (
            <div className="py-20 text-center text-slate-500 bg-slate-50 rounded-3xl">
              Portfolio recommendations coming soon...
            </div>
          )}

          <div className="text-center mt-12">
            <Link 
              href="/login?register=true"
              className="inline-flex items-center px-10 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-2xl transition-all text-lg shadow-xl shadow-emerald-900/30"
            >
              Explore More Portfolio Sizes (3 / 5 / 8 stocks): Free Signup
              <ChevronRight className="ml-3 w-5 h-5" />
            </Link>
            <p className="mt-4 text-xs text-slate-500">Full historical data &amp; Pro access available after login</p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-28 bg-slate-900 text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-5xl font-bold tracking-tight">Ready to invest smarter?</h2>
          <p className="mt-6 text-xl text-slate-400">Join thousands of investors getting weekly sector signals.</p>
          
          <Link href="/login?register=true" className="mt-10 inline-flex items-center px-10 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-2xl transition-all active:scale-95 text-lg">
            Start Free Today
            <Users className="ml-3 w-6 h-6" />
          </Link>
          
          <p className="mt-6 text-xs text-slate-500">No credit card required • Cancel anytime</p>
        </div>
      </section>
    </div>
  );
}