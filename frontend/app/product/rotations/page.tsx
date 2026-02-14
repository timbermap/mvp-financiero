'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import api from '@/services/api';
import { LogOut, TrendingUp } from 'lucide-react';
import { auth } from '@/lib/firebase';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Union type FREE / PRO
type SectorData =
  | {
      analysis_date: string;
      rank: number;
      sector: string;
      score: number;
      signal: string;
    }
  | {
      analysis_date: string;
      rank: number;
      sector: string;
      score: number;
      signal: string;
      market_context: string;
      phase_and_health: string;
      rationale_and_elliott_wave: string;
      risk_and_volume_profile: string;
      execution_protocol: string;
      top_3_tickers: string;
      sector_portfolio_percentage: number;
      week_targets: string;
    };

export default function RotationsPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [data, setData] = useState<SectorData[]>([]);
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 🔐 Proteger ruta
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  // 📅 Cargar fechas disponibles
  useEffect(() => {
    const fetchDates = async () => {
      if (!user) return;

      try {
        const response = await api.get('/api/v1/analysis-dates');
        const parsedDates = response.data.map((d: string) => new Date(d));

        setAvailableDates(parsedDates);

        // Seleccionar automáticamente la última fecha
        if (parsedDates.length > 0) {
          setSelectedDate(parsedDates[0]);
        }
      } catch (err) {
        console.error('Error cargando fechas:', err);
        setError('No se pudieron cargar las fechas disponibles.');
      }
    };

    fetchDates();
  }, [user]);

  // 📊 Cargar datos cuando cambia fecha
  useEffect(() => {
    const fetchData = async () => {
      if (!user || !selectedDate) return;

      setLoading(true);
      setError('');
      setData([]);

      try {
        const formattedDate = selectedDate.toISOString().split('T')[0];

        const response = await api.get('/api/v1/dashboard', {
          params: { date: formattedDate },
        });

        setData(response.data);
      } catch (err: any) {
        console.error('Error cargando datos:', err);

        if (err.response?.status === 404) {
          setError('No hay datos para la fecha seleccionada.');
        } else {
          setError('No se pudieron cargar los datos.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, selectedDate]);

  if (!user) return null;

  const isFreeUser =
    data.length > 0 && !('market_context' in data[0]);

  const getSignal = (item: SectorData) => item.signal;

  const analysisDate =
    data.length > 0 ? data[0].analysis_date : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <TrendingUp className="text-blue-600" />
          <h1 className="font-bold text-xl text-gray-800">
            MVP Financiero
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 hidden md:block">
            {user.email}
          </span>

          <span
            className={`px-2 py-1 rounded text-xs font-bold ${
              isFreeUser
                ? 'bg-gray-200 text-gray-700'
                : 'bg-yellow-100 text-yellow-700'
            }`}
          >
            {isFreeUser ? 'PLAN FREE' : 'PLAN PRO'}
          </span>

          <button
            onClick={() => auth.signOut()}
            className="text-gray-500 hover:text-red-600 transition"
          >
            <LogOut size={20} />
          </button>
        </div>
      </nav>

      {/* Contenido */}
      <main className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Rotación de Sectores Semanal
          </h2>
          <p className="text-gray-600">
            Análisis basado en IA de los principales sectores del S&P 500.
          </p>

          {/* DatePicker */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Seleccionar fecha de análisis:
            </label>

            <DatePicker
              selected={selectedDate}
              onChange={(date: Date) => setSelectedDate(date)}
              dateFormat="dd/MM/yyyy"
              includeDates={availableDates}
              maxDate={new Date()}
              disabled={availableDates.length === 0}
              className="w-full md:w-auto p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>

        {/* Fecha del análisis */}
        {analysisDate && (
          <p className="text-sm text-gray-500 mb-4">
            Fecha de análisis:{' '}
            {new Date(analysisDate).toLocaleDateString()}
          </p>
        )}

        {loading ? (
          <div className="text-center py-20">
            Cargando análisis de mercado...
          </div>
        ) : error ? (
          <div className="text-red-500 text-center py-10 bg-red-50 rounded-lg">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden flex flex-col"
              >
                {/* Header */}
                <div className="p-5 border-b bg-gray-50 flex justify-between items-center">
                  <h3 className="font-bold text-lg text-gray-800">
                    {item.sector} (Rank {item.rank})
                  </h3>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border ${
                      getSignal(item) === 'Overweight'
                        ? 'bg-green-50 text-green-700 border-green-200'
                        : getSignal(item) === 'Underweight'
                        ? 'bg-red-50 text-red-700 border-red-200'
                        : 'bg-gray-50 text-gray-600 border-gray-200'
                    }`}
                  >
                    {getSignal(item)}
                  </span>
                </div>

                {/* Body */}
                <div className="p-5 flex-grow text-sm text-gray-700 space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="text-4xl font-bold text-blue-600">
                      {item.score.toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-400 uppercase">
                      AI Score (0-1)
                    </div>
                  </div>

                  {!isFreeUser && 'market_context' in item && (
                    <>
                      <div>
                        <h4 className="font-semibold">
                          Market Context:
                        </h4>
                        <p>{item.market_context}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold">
                          Phase and Health:
                        </h4>
                        <p>{item.phase_and_health}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold">
                          Rationale and Elliott Wave:
                        </h4>
                        <p>{item.rationale_and_elliott_wave}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold">
                          Risk and Volume Profile:
                        </h4>
                        <p>{item.risk_and_volume_profile}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold">
                          Execution Protocol:
                        </h4>
                        <p>{item.execution_protocol}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold">
                          Top 3 Tickers:
                        </h4>
                        <p>{item.top_3_tickers}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold">
                          Sector Portfolio %:
                        </h4>
                        <p>
                          {item.sector_portfolio_percentage}%
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold">
                          Week Targets:
                        </h4>
                        <p>{item.week_targets}</p>
                      </div>
                    </>
                  )}

                  {isFreeUser && (
                    <div className="mt-6 text-center">
                      <p className="text-xs text-gray-500">
                        Actualiza a PRO para más detalles avanzados.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
