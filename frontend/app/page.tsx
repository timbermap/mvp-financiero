'use client';

import { useEffect, useState } from 'react';
import api from '@/services/api';
import SectorTable from '@/components/sector/SectorTable';
import { SectorData } from '@/components/sector/types';
import {
  ChevronRight,
  TrendingUp,
  BarChart3,
  PieChart,
  Users,
  Shield,
  Zap,
  Activity,
  Anchor
} from 'lucide-react';

/* ---------------------------------------------------
   HERO – MINI SECTOR CARD (2x2 MATRIX)
--------------------------------------------------- */

const getRegime = (signal: string, momentum?: number) => {
  if (signal === 'Neutral') return 'Leading';
  if (signal === 'Bullish') return 'Improving';
  if (signal === 'Bearish') return 'Weakening';
  return 'Lagging';
};

const regimeStyles = {
  Leading: {
    border: 'border-emerald-500',
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400'
  },
  Improving: {
    border: 'border-sky-500',
    bg: 'bg-sky-500/10',
    text: 'text-sky-400'
  },
  Weakening: {
    border: 'border-amber-500',
    bg: 'bg-amber-500/10',
    text: 'text-amber-400'
  },
  Lagging: {
    border: 'border-rose-500',
    bg: 'bg-rose-500/10',
    text: 'text-rose-400'
  }
};

const HeroSectorCard = ({ sector, signal, momentum, rank }) => {
  const regime = getRegime(signal, momentum);
  const styles = regimeStyles[regime];

  return (
    <div
      className={`
        relative group rounded-xl p-5 border
        ${styles.border} ${styles.bg}
        bg-slate-900/70
        transition-all
      `}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-white">{sector}</h4>
        <span className="text-xs text-slate-400">#{rank}</span>
      </div>

      {/* REGIME */}
      <p className={`text-sm font-medium ${styles.text}`}>
        {regime}
      </p>

      {/* TOOLTIP */}
      <div className="
        absolute bottom-full left-1/2 -translate-x-1/2 mb-3
        w-44 rounded-lg bg-slate-800 text-xs text-slate-200
        px-3 py-2 opacity-0 scale-95
        group-hover:opacity-100 group-hover:scale-100
        transition-all pointer-events-none
        shadow-xl border border-slate-700
      ">
        <div className="font-semibold mb-1">{sector}</div>
        <div>Signal: <span className="text-white">{signal}</span></div>
        <div>
          Momentum:{' '}
          <span className="text-white">
            {momentum !== undefined ? momentum.toFixed(2) : 'N/A'}
          </span>
        </div>
      </div>
    </div>
  );
};


/* ---------------------------------------------------
   DEEP DIVE – SECTOR CARD
--------------------------------------------------- */
const SectorCard = ({
  icon,
  color,
  sector,
  signal,
  tickers,
  volatility,
  outlook
}) => (
  <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-200">
    <div className="flex items-center mb-4">
      <div className={`w-12 h-12 bg-${color}-500 rounded-lg flex items-center justify-center mr-4`}>
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-slate-900 text-lg">{sector}</h3>
        <p className={`text-sm font-medium text-${color}-600`}>{signal}</p>
      </div>
    </div>
    <ul className="text-sm text-slate-600 space-y-2">
      <li><span className="font-medium text-slate-800">Top Tickers:</span> {tickers}</li>
      <li><span className="font-medium text-slate-800">Volatility:</span> {volatility}</li>
      <li><span className="font-medium text-slate-800">Outlook:</span> {outlook}</li>
    </ul>
    <a
      href="/signup"
      className={`block mt-5 text-sm font-semibold text-${color}-600 hover:text-${color}-700 transition-colors`}
    >
      View Full Analysis →
    </a>
  </div>
);

/* ---------------------------------------------------
   PAGE
--------------------------------------------------- */
export default function LandingPage() {
  const [data, setData] = useState<SectorData[]>([]);
  const [previousData, setPreviousData] = useState<SectorData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPublicData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get('/api/v1/dashboard/latest');
        setData(response.data.currentData || []);
        setPreviousData(response.data.previousData || []);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch sector data.');
      } finally {
        setLoading(false);
      }
    };
    fetchPublicData();
  }, []);

  // Create a shuffled copy of the data array
  const shuffled = data.slice().sort(() => Math.random() - 0.5);
  const heroSectors = shuffled.slice(0, 4);

  const topSectors = data.slice(0, 3);

  const sectorVisuals = {
    Technology: { icon: <Zap className="w-6 h-6 text-white" />, color: 'sky' },
    Healthcare: { icon: <Activity className="w-6 h-6 text-white" />, color: 'teal' },
    Financials: { icon: <BarChart3 className="w-6 h-6 text-white" />, color: 'indigo' },
    Energy: { icon: <TrendingUp className="w-6 h-6 text-white" />, color: 'amber' },
    Industrials: { icon: <Anchor className="w-6 h-6 text-white" />, color: 'rose' },
    Default: { icon: <PieChart className="w-6 h-6 text-white" />, color: 'slate' }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">

      {/* ---------------------------------------------------
          HERO
      --------------------------------------------------- */}
      <section className="relative bg-slate-900 text-white min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-800 [mask-image:linear-gradient(to_bottom,white,transparent)]" />
        <div className="absolute inset-0 pointer-events-none [background:radial-gradient(ellipse_at_center,transparent_20%,#020617)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Unlock Market-Leading Sector Insights
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Data-driven weekly signals to overweight or underweight sectors.
              Build smarter portfolios with proprietary momentum analysis.
            </p>
            <a
              href="/signup"
              className="inline-flex items-center px-8 py-4 bg-teal-500 text-white font-semibold rounded-lg shadow-lg hover:bg-teal-600 transition-all duration-300"
            >
              Get Started for Free
              <ChevronRight className="ml-2 w-5 h-5" />
            </a>
          </div>

          {/* 2x2 SECTOR MATRIX */}
          <div className="hidden md:grid grid-cols-2 gap-4">
            {loading
              ? [...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-28 bg-slate-800/50 border border-slate-700 rounded-xl animate-pulse"
                  />
                ))
              : heroSectors.map((sector, index) => (
                  <HeroSectorCard
                    key={sector.sector}
                    sector={sector.sector}
                    signal={sector.signal}
                    momentum={sector.momentum_score}
                    rank={sector.rank}
                  />
                ))
                }
          </div>
        </div>
      </section>

 
      {/* ---------------------------------------------------
          LIVE TABLE
      --------------------------------------------------- */}
      <section className="py-24 bg-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="text-center py-12">Loading data...</div>
          ) : error ? (
            <div className="text-center text-red-500 py-12">{error}</div>
          ) : (
            <SectorTable data={data} previousData={previousData} />
          )}
        </div>
      </section>

      {/* ---------------------------------------------------
          CTA
      --------------------------------------------------- */}
      <section className="py-24 bg-white text-center">
        <h2 className="text-4xl font-bold mb-4">Built for Every Investor</h2>
        <p className="text-xl text-slate-600 mb-8">
          From free previews to premium portfolio tools.
        </p>
        <a
          href="/signup"
          className="inline-flex items-center px-10 py-4 bg-teal-500 text-white font-bold rounded-lg shadow-lg hover:bg-teal-600 transition-all"
        >
          Join Thousands of Investors
          <Users className="ml-3 w-6 h-6" />
        </a>
      </section>
    </div>
  );
}
