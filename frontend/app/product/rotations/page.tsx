'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { BarChart3, Calendar, AlertTriangle } from 'lucide-react'; 
import api from '@/services/api';
import DatePicker from '@/components/DatePickerField';
import SectorTable from '@/components/sector/SectorTable';
import { SectorData } from '@/components/sector/types';

// Tipos y constantes (sin cambios)
const VALID_RISKS = ["low", "medium", "high"] as const;
const VALID_HORIZONS = ["week", "month", "year"] as const;
type Risk = typeof VALID_RISKS[number];
type Horizon = typeof VALID_HORIZONS[number];
const contentConfig: Record<Horizon, { title: string; description: string }> = {
  week: { title: "Weekly Sector Rotation Analysis", description: "This ranking provides a tactical guide for a 2-4 week investment horizon, comparing current momentum against the previous week." },
  month: { title: "Monthly Sector Rotation Analysis", description: "This ranking provides a strategic guide for a 1-3 month investment horizon, comparing current momentum against the previous month." },
  year: { title: "Yearly Sector Rotation Analysis", description: "This ranking offers a long-term perspective for a 12+ month investment horizon, comparing current momentum against the previous year." }
};

export default function PortfolioPage() {
  const [data, setData] = useState<SectorData[]>([]);
  const [previousData, setPreviousData] = useState<SectorData[]>([]);
  const [dates, setDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores

  const searchParams = useSearchParams();
  const router = useRouter();

  const risk = searchParams.get('risk') as Risk | null;
  const horizon = searchParams.get('horizon') as Horizon | null;

  // Validación de parámetros (sin cambios)
  useEffect(() => {
    if (searchParams.toString() && (!risk || !VALID_RISKS.includes(risk) || !horizon || !VALID_HORIZONS.includes(horizon))) {
      router.push('/dashboard');
    }
  }, [risk, horizon, router, searchParams]);

  // --- MODIFICADO: useEffect para obtener las fechas ---
  // Ahora depende de 'risk' y 'horizon' y los envía en la petición.
  useEffect(() => {
    // Solo se ejecuta si tenemos risk y horizon válidos
    if (risk && horizon && VALID_RISKS.includes(risk) && VALID_HORIZONS.includes(horizon)) {
      setLoading(true); // Iniciar carga al cambiar de filtro
      setError(null);

      api.get('/api/v1/analysis-dates', { params: { risk, horizon } })
        .then((res) => {
          const parsedDates = res.data.map((d: string) => new Date(d));
          setDates(parsedDates);
          
          if (parsedDates.length > 0) {
            setSelectedDate(parsedDates[0]); // Selecciona la fecha más reciente
          } else {
            // Si no hay fechas, reseteamos el estado para mostrar un mensaje
            setSelectedDate(null);
            setData([]);
            setPreviousData([]);
            setLoading(false); // Detenemos la carga porque no hay nada que buscar
          }
        })
        .catch(err => {
          console.error("Failed to fetch available dates:", err);
          setError("Could not load available analysis dates.");
          setLoading(false);
        });
    }
  }, [risk, horizon]); // Se vuelve a ejecutar si risk o horizon cambian

  // --- MODIFICADO: useEffect para obtener los datos del dashboard ---
  // La lógica interna es casi la misma, pero ahora depende de que 'selectedDate' cambie
  useEffect(() => {
    // Si no hay fecha seleccionada (porque no se encontraron fechas), no hacemos nada
    if (!selectedDate || !risk || !horizon) {
      return;
    }

    const fetchData = async () => {
      setLoading(true); // Ya debería estar en true, pero lo aseguramos
      setError(null);
      const currentDate = selectedDate.toISOString().split('T')[0];
      
      // Encontrar la fecha previa dentro de la lista de fechas ya filtrada
      const prevIndex = dates.findIndex((d) => d.getTime() === selectedDate.getTime());
      const prevDate = prevIndex + 1 < dates.length ? dates[prevIndex + 1].toISOString().split('T')[0] : null;

      try {
        const currentPromise = api.get('/api/v1/dashboard', { params: { date: currentDate, risk, horizon } });
        const prevPromise = prevDate 
          ? api.get('/api/v1/dashboard', { params: { date: prevDate, risk, horizon } }) 
          : Promise.resolve({ data: [] });
        
        const [current, prev] = await Promise.all([currentPromise, prevPromise]);
        setData(current.data);
        setPreviousData(prev.data);
      } catch (err) {
        console.error("Failed to fetch analysis data:", err);
        setError("An error occurred while fetching the analysis data.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [selectedDate, risk, horizon, dates]); // Depende de selectedDate para ejecutarse

  const analysisTitle = horizon ? contentConfig[horizon].title : '';
  const analysisDescription = horizon ? contentConfig[horizon].description : '';
  const formattedDate = selectedDate ? selectedDate.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

  // --- NUEVO: Componente para mostrar mensajes de estado ---
  const StatusMessage = ({ children }: { children: React.ReactNode }) => (
    <div className="text-center py-16 text-slate-500 bg-slate-50 rounded-lg flex flex-col items-center gap-4">
      {children}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
        <h1 className="text-2xl font-bold text-slate-900">
          Sector Portfolio
        </h1>
        {/* Solo muestra el DatePicker si hay fechas disponibles */}
        {dates.length > 0 && selectedDate && (
          <DatePicker selected={selectedDate} onChange={setSelectedDate} includeDates={dates} />
        )}
      </div>

      {/* --- MODIFICADO: Lógica de renderizado mejorada --- */}
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
        <>
          <div className="text-center mb-8 py-8 px-4 bg-slate-100 rounded-xl">
            <div className="flex items-center justify-center gap-3 mb-4">
              <BarChart3 className="w-8 h-8 text-teal-500" />
              <h2 className="text-3xl font-bold text-slate-800">{analysisTitle}</h2>
            </div>
            <p className="max-w-3xl mx-auto text-slate-600 mb-5">{analysisDescription}</p>
            {formattedDate && (
              <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                <Calendar className="w-4 h-4" />
                <span>Latest Analysis: {formattedDate}</span>
              </div>
            )}
          </div>
          <SectorTable data={data} previousData={previousData} />
        </>
      )}
    </div>
  );
}