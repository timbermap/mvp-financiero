'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { AlertTriangle } from 'lucide-react'; 
import api from '@/services/api';
import SectorHeader from '@/components/sector/SectorHeader';
import SectorTable from '@/components/sector/SectorTable';
import { SectorData, Risk, Horizon, VALID_RISKS, VALID_HORIZONS } from '@/components/sector/types';

// Helper: mantiene solo la fila con el id más alto por sector
const deduplicateByNewestId = (items: SectorData[]): SectorData[] => {
  if (!items.length) return [];

  const map = new Map<string, SectorData>();

  for (const item of items) {
    const existing = map.get(item.sector);
    // Si no existe o este tiene id mayor → lo guardamos
    if (!existing || 
        (item.id !== undefined && existing.id !== undefined && Number(item.id) > Number(existing.id))) {
      map.set(item.sector, item);
    }
  }

  // Ordenamos de nuevo por rank para que la tabla quede perfecta
  return Array.from(map.values()).sort((a, b) => a.rank - b.rank);
};

export default function PortfolioPage() {
  const [data, setData] = useState<SectorData[]>([]);
  const [previousData, setPreviousData] = useState<SectorData[]>([]);
  const [dates, setDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  const risk = searchParams.get('risk') as Risk | null;
  const horizon = searchParams.get('horizon') as Horizon | null;

  // Validación de parámetros
  useEffect(() => {
    if (searchParams.toString() && (!risk || !VALID_RISKS.includes(risk) || !horizon || !VALID_HORIZONS.includes(horizon))) {
      router.push('/dashboard');
    }
  }, [risk, horizon, router, searchParams]);

  // Fetch fechas disponibles
  useEffect(() => {
    if (risk && horizon && VALID_RISKS.includes(risk) && VALID_HORIZONS.includes(horizon)) {
      setLoading(true);
      setError(null);

      api.get('/api/v1/analysis-dates', { params: { risk, horizon } })
        .then((res) => {
          const parsedDates = res.data.map((d: string) => new Date(d));
          setDates(parsedDates);
          if (parsedDates.length > 0) {
            setSelectedDate(parsedDates[0]);
          } else {
            setSelectedDate(null);
            setData([]);
            setPreviousData([]);
            setLoading(false);
          }
        })
        .catch(err => {
          console.error("Failed to fetch dates:", err);
          setError("Could not load available analysis dates.");
          setLoading(false);
        });
    }
  }, [risk, horizon]);

  // Fetch datos + deduplicación automática
  useEffect(() => {
    if (!selectedDate || !risk || !horizon) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const currentDate = selectedDate.toISOString().split('T')[0];
      
      const prevIndex = dates.findIndex((d) => d.getTime() === selectedDate.getTime());
      const prevDate = prevIndex + 1 < dates.length ? dates[prevIndex + 1].toISOString().split('T')[0] : null;

      try {
        const [currentRes, prevRes] = await Promise.all([
          api.get('/api/v1/dashboard', { params: { date: currentDate, risk, horizon } }),
          prevDate 
            ? api.get('/api/v1/dashboard', { params: { date: prevDate, risk, horizon } }) 
            : Promise.resolve({ data: [] })
        ]);

        // ← AQUÍ SE APLICA LA LIMPIEZA
        const cleanedCurrent = deduplicateByNewestId(currentRes.data);
        const cleanedPrevious = deduplicateByNewestId(prevRes.data);

        setData(cleanedCurrent);
        setPreviousData(cleanedPrevious);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("An error occurred while fetching the analysis data.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [selectedDate, risk, horizon, dates]);

  const StatusMessage = ({ children }: { children: React.ReactNode }) => (
    <div className="text-center py-16 text-slate-500 bg-slate-50 rounded-lg flex flex-col items-center gap-4">
      {children}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Product: Sector Rotations</h1>
      </div>

      <SectorHeader
        horizon={horizon}
        risk={risk}
        selectedDate={selectedDate}
        dates={dates}
        onDateChange={setSelectedDate}
      />

      {loading ? (
        <StatusMessage>Loading analysis...</StatusMessage>
      ) : error ? (
        <StatusMessage><AlertTriangle className="w-8 h-8 text-red-500" /> {error}</StatusMessage>
      ) : dates.length === 0 ? (
        <StatusMessage>
          <AlertTriangle className="w-8 h-8 text-amber-500" />
          No analysis found for the selected risk and horizon criteria.
        </StatusMessage>
      ) : (
        <SectorTable data={data} previousData={previousData} />
      )}
    </div>
  );
}