'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
// --- NUEVO: Importa los íconos que usaremos ---
import { BarChart3, Calendar } from 'lucide-react'; 
import api from '@/services/api';
import DatePicker from '@/components/DatePickerField';
import SectorTable from '@/components/sector/SectorTable';
import { SectorData } from '@/components/sector/types';

const VALID_RISKS = ["low", "medium", "high"] as const;
const VALID_HORIZONS = ["week", "month", "year"] as const;

type Risk = typeof VALID_RISKS[number];
type Horizon = typeof VALID_HORIZONS[number];

const contentConfig: Record<Horizon, { title: string; description: string }> = {
  week: {
    title: "Weekly Sector Rotation Analysis",
    description: "This ranking provides a tactical guide for a 2-4 week investment horizon, comparing current momentum against the previous week.",
  },
  month: {
    title: "Monthly Sector Rotation Analysis",
    description: "This ranking provides a strategic guide for a 1-3 month investment horizon, comparing current momentum against the previous month.",
  },
  year: {
    title: "Yearly Sector Rotation Analysis",
    description: "This ranking offers a long-term perspective for a 12+ month investment horizon, comparing current momentum against the previous year.",
  }
};

export default function PortfolioPage() {
  const [data, setData] = useState<SectorData[]>([]);
  const [previousData, setPreviousData] = useState<SectorData[]>([]);
  const [dates, setDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const router = useRouter();

  const risk = searchParams.get('risk') as Risk | null;
  const horizon = searchParams.get('horizon') as Horizon | null;

  useEffect(() => {
    if (searchParams.toString() && (!risk || !VALID_RISKS.includes(risk) || !horizon || !VALID_HORIZONS.includes(horizon))) {
      router.push('/dashboard');
    }
  }, [risk, horizon, router, searchParams]);

  useEffect(() => {
    api.get('/api/v1/analysis-dates').then((res) => {
      const parsed = res.data.map((d: string) => new Date(d));
      setDates(parsed);
      setSelectedDate(parsed[0]);
    });
  }, []);

  useEffect(() => {
    if (!selectedDate || !risk || !horizon || !VALID_RISKS.includes(risk) || !VALID_HORIZONS.includes(horizon)) {
      return;
    }
    const fetchData = async () => {
      setLoading(true);
      const currentDate = selectedDate.toISOString().split('T')[0];
      const prevIndex = dates.findIndex((d) => d.getTime() === selectedDate.getTime());
      const prevDate = prevIndex + 1 < dates.length ? dates[prevIndex + 1].toISOString().split('T')[0] : null;

      try {
        const currentPromise = api.get('/api/v1/dashboard', { params: { date: currentDate, risk, horizon } });
        const prevPromise = prevDate ? api.get('/api/v1/dashboard', { params: { date: prevDate, risk, horizon } }) : Promise.resolve({ data: [] });
        const [current, prev] = await Promise.all([currentPromise, prevPromise]);
        setData(current.data);
        setPreviousData(prev.data);
      } catch (error) {
        console.error("Failed to fetch analysis data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedDate, dates, risk, horizon]);

  const analysisTitle = horizon ? contentConfig[horizon].title || 'Sector Rotation Analysis' : '';
  const analysisDescription = horizon ? contentConfig[horizon].description || '' : '';
  const formattedDate = selectedDate ? selectedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* El encabezado "Sector Portfolio" y el DatePicker se mantienen igual */}
      <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
        <h1 className="text-2xl font-bold text-slate-900">
          Sector Portfolio
        </h1>
        {selectedDate && (
          <DatePicker selected={selectedDate} onChange={setSelectedDate} includeDates={dates} />
        )}
      </div>

      {/* --- NUEVO: Bloque de descripción visualmente mejorado --- */}
      {!loading && analysisTitle && (
        <div className="text-center mb-8 py-8 px-4 bg-slate-100 rounded-xl">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BarChart3 className="w-8 h-8 text-teal-500" />
            <h2 className="text-3xl font-bold text-slate-800">
              {analysisTitle}
            </h2>
          </div>
          <p className="max-w-3xl mx-auto text-slate-600 mb-5">
            {analysisDescription}
          </p>
          {formattedDate && (
            <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
              <Calendar className="w-4 h-4" />
              <span>Latest Analysis: {formattedDate}</span>
            </div>
          )}
        </div>
      )}

      {loading ? (
        <div className="text-center py-16 text-slate-500">
          Loading analysis…
        </div>
      ) : (
        <SectorTable data={data} previousData={previousData} />
      )}
    </div>
  );
}