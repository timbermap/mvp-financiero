'use client';

import { useEffect, useState } from 'react';
import api from '@/services/api';
import SectorTable from '@/components/sector/SectorTable';
import { ChevronRight, Users, Calendar, BarChart3 } from 'lucide-react';

// --- TIPOS DE DATOS ---
export interface SectorData {
  analysis_date: string;
  rank: number;
  sector: string;
  score: number;
  signal: string;
}

// --- FUNCIÓN HELPER PARA FORMATEAR FECHA ---
const formatDate = (isoDate: string | null): string => {
  if (!isoDate) return 'N/A';
  // Asegurarse de que la fecha se interpreta como UTC para evitar problemas de zona horaria
  const date = new Date(isoDate + 'T00:00:00Z');
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  });
};


/* ---------------------------------------------------
   HERO – MINI SECTOR CARD (2x2 MATRIX)
--------------------------------------------------- */
const getRegime = (signal: string) => {
  if (signal === 'Neutral') return 'Leading';
  if (signal === 'Bullish') return 'Improving';
  if (signal === 'Bearish') return 'Weakening';
  return 'Lagging';
};

const regimeStyles = {
  Leading: { border: 'border-emerald-500', bg: 'bg-emerald-500/10', text: 'text-emerald-400' },
  Improving: { border: 'border-sky-500', bg: 'bg-sky-500/10', text: 'text-sky-400' },
  Weakening: { border: 'border-amber-500', bg: 'bg-amber-500/10', text: 'text-amber-400' },
  Lagging: { border: 'border-rose-500', bg: 'bg-rose-500/10', text: 'text-rose-400' }
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
    <div className={`relative group rounded-xl p-5 border ${styles.border} ${styles.bg} bg-slate-900/70 transition-all`}>
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-white">{sector}</h4>
        <span className="text-xs text-slate-400">#{rank}</span>
      </div>
      <p className={`text-sm font-medium ${styles.text}`}>{regime}</p>
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-44 rounded-lg bg-slate-800 text-xs text-slate-200 px-3 py-2 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all pointer-events-none shadow-xl border border-slate-700">
        <div className="font-semibold mb-1">{sector}</div>
        <div>Signal: <span className="text-white">{signal}</span></div>
        <div>Score: <span className="text-white">{momentum.toFixed(2)}</span></div>
      </div>
    </div>
  );
};


/* ---------------------------------------------------
   PÁGINA PRINCIPAL
--------------------------------------------------- */
export default function LandingPage() {
  const [data, setData] = useState<SectorData[]>([]);
  const [previousData, setPreviousData] = useState<SectorData[]>([]);
  // --- NUEVO ESTADO PARA LA FECHA ---
  const [latestAnalysisDate, setLatestAnalysisDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPublicData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Hacemos ambas llamadas en paralelo para mejorar la velocidad de carga
        const [dashboardResponse, dateResponse] = await Promise.all([
          api.get('/api/v1/dashboard/latest'),
          api.get('/api/v1/latest-analysis-date')
        ]);
        
        setData(dashboardResponse.data.currentData || []);
        setPreviousData(dashboardResponse.data.previousData || []);
        setLatestAnalysisDate(dateResponse.data.latest_date);

      } catch (err) {
        console.error(err);
        setError('Failed to fetch sector data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchPublicData();
  }, []);

  const heroSectors = [...data]
  .sort(() => Math.random() - 0.5)
  .slice(0, 4);
  
  const formattedDate = formatDate(latestAnalysisDate);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">

      {/* HERO */}
      <section className="relative bg-slate-900 text-white min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-800 [mask-image:linear-gradient(to_bottom,white,transparent)]" />
        <div className="absolute inset-0 pointer-events-none [background:radial-gradient(ellipse_at_center,transparent_20%,#020617)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Unlock Market-Leading Sector Insights
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Data-driven weekly signals to overweight or underweight sectors. Build smarter portfolios with proprietary momentum analysis.
            </p>
            <a href="/signup" className="inline-flex items-center px-8 py-4 bg-teal-500 text-white font-semibold rounded-lg shadow-lg hover:bg-teal-600 transition-all duration-300">
              Get Started for Free
              <ChevronRight className="ml-2 w-5 h-5" />
            </a>
          </div>

          <div className="flex flex-col gap-4">
            {/* 2x2 SECTOR MATRIX */}
            <div className="grid grid-cols-2 gap-4">
              {loading
                ? [...Array(4)].map((_, i) => (
                    <div key={i} className="h-28 bg-slate-800/50 border border-slate-700 rounded-xl animate-pulse" />
                  ))
                : heroSectors.map((sector) => (
                    <HeroSectorCard
                      key={sector.sector}
                      sector={sector.sector}
                      signal={sector.signal}
                      momentum={sector.score}
                      rank={sector.rank}
                    />
                  ))
              }
            </div>
            {/* --- SECCIÓN 1: TEXTO AÑADIDO --- */}
            {!loading && latestAnalysisDate && (
              <div className="text-center md:text-right px-2">
                <p className="text-sm text-slate-400">
                  Strategic Sector Overview for a 2-4 Week Investment Horizon.
                </p>
                <p className="text-xs text-slate-500 flex items-center justify-center md:justify-end mt-1">
                  <Calendar className="w-3 h-3 mr-1.5" />
                  Analysis Date: {formattedDate}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
 
      {/* LIVE TABLE */}
      <section id="weekly-analysis" className="py-24 bg-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* --- SECCIÓN 2: TÍTULO Y DESCRIPCIÓN AÑADIDOS --- */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 flex items-center justify-center gap-3">
              <BarChart3 className="w-8 h-8 text-teal-500" />
              Weekly Sector Rotation Analysis
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
              This ranking provides a tactical guide for a <strong>2-4 week investment horizon</strong>, comparing current momentum against the previous week.
            </p>
            {!loading && latestAnalysisDate && (
                 <p className="text-sm text-slate-500 flex items-center justify-center mt-2">
                    <Calendar className="w-4 h-4 mr-1.5" />
                    Latest Analysis: {formattedDate}
                </p>
            )}
          </div>
          
          {/* Contenedor de la tabla y sus estados */}
          <div className="bg-white rounded-xl shadow-xl p-4 md:p-6 border border-slate-200">
            {loading ? (
              <div className="text-center py-12 text-slate-500">Loading latest data...</div>
            ) : error ? (
              <div className="text-center text-red-600 py-12 bg-red-50 rounded-lg">{error}</div>
            ) : (
              <SectorTable data={data} previousData={previousData} />
            )}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white text-center">
        <h2 className="text-4xl font-bold mb-4">Built for Every Investor</h2>
        <p className="text-xl text-slate-600 mb-8">
          From free previews to premium portfolio tools.
        </p>
        <a href="/signup" className="inline-flex items-center px-10 py-4 bg-teal-500 text-white font-bold rounded-lg shadow-lg hover:bg-teal-600 transition-all">
          Join Thousands of Investors
          <Users className="ml-3 w-6 h-6" />
        </a>
      </section>
    </div>
  );
}