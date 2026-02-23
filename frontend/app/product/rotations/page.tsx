// src/app/products/rotations/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { AlertTriangle } from 'lucide-react'; 
import Link from 'next/link';
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
    if (!existing || 
        (item.id !== undefined && existing.id !== undefined && Number(item.id) > Number(existing.id))) {
      map.set(item.sector, item);
    }
  }

  return Array.from(map.values()).sort((a, b) => a.rank - b.rank);
};

export default function RotationsPage() {
  const [data, setData] = useState<SectorData[]>([]);
  const [previousData, setPreviousData] = useState<SectorData[]>([]);
  const [dates, setDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<React.ReactNode | string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  const risk = searchParams.get('risk') as Risk | null;
  const horizon = searchParams.get('horizon') as Horizon | null;

  // --- Usage & Access State ---
  const [usage, setUsage] = useState<any>(null);
  const [usageLoading, setUsageLoading] = useState(true);

  // Fetch usage status on mount
  useEffect(() => {
    api
      .get('/api/v1/usage/status')
      .then((res) => setUsage(res.data))
      .catch(console.error)
      .finally(() => setUsageLoading(false));
  }, []);

  const isLimitReached = usage?.tier === 'FREE' && usage?.remaining <= 0;

  // Validación de parámetros y Acceso
  useEffect(() => {
    // 1. Validate basic params
    if (!risk || !VALID_RISKS.includes(risk) || !horizon || !VALID_HORIZONS.includes(horizon)) {
      if (searchParams.toString()) {
        router.replace('/dashboard');
      }
      return;
    }

    // 2. NEW: Redirect if limit reached and trying to access restricted URL
    if (!usageLoading && isLimitReached) {
      if (risk !== 'medium' || horizon !== 'month') {
        router.replace('/dashboard');
      }
    }
  }, [risk, horizon, router, searchParams, usageLoading, isLimitReached]);

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

        const cleanedCurrent = deduplicateByNewestId(currentRes.data);
        const cleanedPrevious = deduplicateByNewestId(prevRes.data);

        setData(cleanedCurrent);
        setPreviousData(cleanedPrevious);
      } catch (err: any) {
        console.error("Failed to fetch data:", err);
        
        // Handle monthly click limit (429)
        if (err.response?.status === 429) {
          const detail = err.response.data.detail;
          setError(
            <div className="text-center py-12">
              <div className="text-6xl mb-6">⏳</div>
              <p className="text-xl font-semibold text-slate-800 mb-2">
                {detail.message}
              </p>
              <p className="text-slate-600 mb-6">
                Resets on <span className="font-mono font-medium">{detail.reset_date}</span>
              </p>
              <Link
                href="/upgrade"
                className="inline-block bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-3 rounded-2xl font-semibold hover:scale-105 transition"
              >
                Upgrade to PRO – Unlimited clicks
              </Link>
            </div>
          );
          setLoading(false);
          return;
        }

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

  // Prevent render while redirecting or checking usage
  if (
    !risk ||
    !VALID_RISKS.includes(risk) ||
    !horizon ||
    !VALID_HORIZONS.includes(horizon) ||
    usageLoading
  ) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-10">
        <StatusMessage>Verifying access...</StatusMessage>
      </div>
    );
  }

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
        isLimitReached={isLimitReached} // <-- Pass the limit state
      />

      {loading ? (
        <StatusMessage>Loading analysis...</StatusMessage>
      ) : error ? (
        typeof error === 'string' ? (
          <StatusMessage><AlertTriangle className="w-8 h-8 text-red-500" /> {error}</StatusMessage>
        ) : (
          error
        )
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