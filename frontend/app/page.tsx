'use client';

import { useEffect, useState } from 'react';
import api from '@/services/api';

import SectorTable from '@/components/sector/SectorTable';
import PortfolioTable from '@/components/portfolio/PortfolioTable';
import type { PortfolioRecommendationData } from '@/components/portfolio/types';

import Link from 'next/link';
import { 
  ChevronRight, 
  Calendar, 
  Zap, 
  TrendingUp, 
  ShieldCheck,
  BarChartHorizontalBig,
  PieChart,
  Layers,
  CheckCircle2,
  Info,
  ArrowRight,
  Lock
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
   LANDING PAGE
--------------------------------------------------- */
export default function LandingPage() {
  const [data, setData] = useState<SectorData[]>([]);
  const [previousData, setPreviousData] = useState<SectorData[]>([]);
  const [latestAnalysisDate, setLatestAnalysisDate] = useState<string | null>(null);
  const [portfolioData, setPortfolioData] = useState<PortfolioRecommendationData[]>([]);
  const [portfolioLatestDate, setPortfolioLatestDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPublicData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [dashboardResponse, dateResponse, portfolioResponse] = await Promise.all([
          api.get('/api/v1/dashboard/latest'),
          api.get('/api/v1/latest-analysis-date'),
          api.get('/api/v1/portfolio/latest')
        ]);
        
        setData(dashboardResponse.data.currentData || []);
        setPreviousData(dashboardResponse.data.previousData || []);
        setLatestAnalysisDate(dateResponse.data.latest_date);

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

      {/* SECTION 1: HERO */}
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
                Get Started
                <ChevronRight className="ml-3 w-5 h-5" />
              </Link>
              <Link href="#products" className="inline-flex items-center px-8 py-4 border border-white/30 hover:bg-white/10 text-white font-semibold rounded-2xl transition-all">
                Explore Platform
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

      {/* ==================== SECTION 2: OUR KEY PRODUCTS (COMPACT & PROFESSIONAL) ==================== */}
      <section id="products" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-sm font-bold tracking-widest text-slate-400 uppercase">Our Key Products</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3 tracking-tight">
              A Complete Quantitative Framework
            </h2>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto text-lg">
              We bridge the gap between macroeconomic trends and individual stock selection through a systematic, two-phase approach.
            </p>
          </div>

          {/* Compact Side-by-Side Layout */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Product 1 */}
            <div className="p-8 rounded-2xl border border-slate-200 bg-slate-50 hover:border-slate-300 transition-colors">
              <div className="flex items-center gap-4 mb-5">
                <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100">
                  <BarChartHorizontalBig className="w-6 h-6 text-slate-800" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Sector Rotation Signals</h3>
              </div>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                Algorithmic momentum analysis across all 11 GICS sectors. Identify market leadership and adjust your asset allocation before trends become mainstream.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-sm text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-slate-400 mr-3 flex-shrink-0" />
                  Weekly closing-data analysis
                </li>
                <li className="flex items-center text-sm text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-slate-400 mr-3 flex-shrink-0" />
                  Definitive Bullish/Bearish regime indicators
                </li>
                <li className="flex items-center text-sm text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-slate-400 mr-3 flex-shrink-0" />
                  Absolute and relative scoring metrics
                </li>
              </ul>
            </div>

            {/* Product 2 */}
            <div className="p-8 rounded-2xl border border-slate-200 bg-slate-50 hover:border-slate-300 transition-colors">
              <div className="flex items-center gap-4 mb-5">
                <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100">
                  <PieChart className="w-6 h-6 text-slate-800" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Optimized Portfolios</h3>
              </div>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                Ready-to-execute equity baskets derived directly from our sector signals. We isolate high-conviction stocks within leading sectors to construct balanced portfolios.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-sm text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-slate-400 mr-3 flex-shrink-0" />
                  Concentrated 3, 5, and 8-stock configurations
                </li>
                <li className="flex items-center text-sm text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-slate-400 mr-3 flex-shrink-0" />
                  Risk-adjusted weighting methodologies
                </li>
                <li className="flex items-center text-sm text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-slate-400 mr-3 flex-shrink-0" />
                  Continuous monitoring and rebalancing alerts
                </li>
              </ul>
            </div>
          </div>

          {/* Compact 9-Strategy Bar */}
          <div className="mt-6 p-5 rounded-2xl border border-slate-200 bg-white flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <Layers className="w-5 h-5 text-slate-400" />
              <span className="text-sm font-semibold text-slate-800">Customizable across 9 distinct mandates:</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-600 font-medium">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-slate-400"/> Low Risk</span>
              <span className="flex items-center gap-1.5"><TrendingUp className="w-4 h-4 text-slate-400"/> Medium Risk</span>
              <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-slate-400"/> High Risk</span>
              <span className="hidden md:inline text-slate-300">|</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-slate-400"/> Weekly / Monthly / Yearly</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SECTION 3: PHASE 1 (SECTOR ALLOCATION) ==================== */}
      <section id="weekly-analysis" className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-200 text-slate-700 text-xs font-bold tracking-widest mb-4 uppercase">
              Phase 1
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
              Macro Sector Allocation
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl">
              Live preview of our <span className="font-semibold text-slate-900">Medium Risk • Monthly Horizon</span> model. We rank all 11 GICS sectors to quantify relative momentum and establish market leadership.
            </p>
            
            {/* Professional Methodology Note */}
            <div className="mt-6 flex items-start md:items-center gap-3 text-sm text-slate-600 bg-white px-5 py-3 rounded-xl border border-slate-200 shadow-sm max-w-3xl text-left md:text-center">
              <Info className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5 md:mt-0" />
              <span>
                <strong className="text-slate-900">Methodology Note:</strong> Quantitative models suggest overweighting sectors ranked 1-3 to capture alpha, while reducing exposure to sectors ranked 9-11 to mitigate drawdown risk.
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            {loading ? (
              <div className="py-20 text-center text-slate-500">Loading sector analytics...</div>
            ) : error ? (
              <div className="py-20 text-center text-red-600">{error}</div>
            ) : (
              <SectorTable data={data} previousData={previousData} />
            )}
          </div>
          
          {!loading && latestAnalysisDate && (
            <p className="mt-4 text-xs text-slate-400 text-center font-medium">
              Data computed for the week of: {formattedDate}
            </p>
          )}
        </div>
      </section>

      {/* ==================== SECTION 4: PHASE 2 (PORTFOLIO CONSTRUCTION) ==================== */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-200 text-slate-700 text-xs font-bold tracking-widest mb-4 uppercase">
              Phase 2
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
              Equity Selection & Portfolio Construction
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl">
              Translating sector momentum into actionable equity positions. Below is a live sample of a <span className="font-semibold text-slate-900">5-stock portfolio</span> generated directly from current market leaders.
            </p>
          </div>

          {loading ? (
            <div className="py-20 text-center text-slate-500">Loading portfolio models...</div>
          ) : portfolioData.length > 0 ? (
            <div className="max-w-6xl mx-auto">
              <PortfolioTable 
                title="5-Stock Balanced Portfolio" 
                data={portfolioData.filter(item => item.portfolio_size === 5)} 
              />
            </div>
          ) : (
            <div className="py-20 text-center text-slate-500 bg-slate-50 rounded-2xl border border-slate-200">
              Portfolio models currently computing...
            </div>
          )}

          {/* Professional CTA Box */}
          <div className="mt-16 bg-slate-900 rounded-3xl p-10 md:p-12 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
            <div className="text-left">
              <h3 className="text-2xl font-bold text-white mb-2">Unlock Full Platform Access</h3>
              <p className="text-slate-400 max-w-lg text-sm md:text-base leading-relaxed">
                Access complete 3, 5, and 8-stock portfolio configurations, historical backtesting data, and all 9 strategic mandates tailored to your specific investment criteria.
              </p>
            </div>
            <Link 
              href="/login?register=true"
              className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-slate-100 text-slate-900 font-semibold rounded-xl transition-all whitespace-nowrap flex-shrink-0"
            >
              <Lock className="w-4 h-4 mr-2 text-slate-500" />
              Access Dashboard
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-slate-50 border-t border-slate-200 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-4xl font-bold tracking-tight text-slate-900">Ready to systemize your strategy?</h2>
          <p className="mt-4 text-lg text-slate-600">Join professionals utilizing our quantitative framework to navigate market cycles.</p>
          
          <Link href="/login?register=true" className="mt-8 inline-flex items-center px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition-all active:scale-95">
            Get Started Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}