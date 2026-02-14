// frontend/app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import api from '@/services/api'; // Importamos nuestro cliente axios configurado
import { Lock, LogOut, TrendingUp, ShieldCheck, AlertTriangle } from 'lucide-react';
import { auth } from '@/lib/firebase';

// Definimos la forma de los datos (union para FREE y PRO)
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

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [data, setData] = useState<SectorData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 1. Proteger la ruta: Si no hay usuario, mandar al login
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  // 2. Cargar datos del Backend
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          // Llamada al endpoint que creaste en Semana 1/2
          const response = await api.get('/api/v1/dashboard');
          setData(response.data);
        } catch (err) {
          console.error("Error cargando dashboard:", err);
          setError('No se pudieron cargar los datos del servidor.');
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [user]);

  // Evitar renderizar nada si no hay usuario (esperando redirección)
  if (!user) return null;

  // Lógica para saber si es FREE (si no hay 'market_context' en el primer item)
  const isFreeUser = data.length > 0 && !('market_context' in data[0]);

  // Función para obtener la señal (ya viene en los datos)
  const getSignal = (item: SectorData) => item.signal;

  // Obtener la fecha de análisis si existe (asumimos que todos los items tienen la misma)
  const analysisDate = data.length > 0 ? data[0].analysis_date : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}

      {/* Contenido Principal */}
      <main className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Rotación de Sectores Semanal</h2>
          <p className="text-gray-600">Análisis basado en IA de los principales sectores del S&P 500.</p>
          {analysisDate && (
            <p className="text-sm text-gray-500 mt-2">Fecha de análisis: {new Date(analysisDate).toLocaleDateString()}</p>
          )}
        </div>

        {loading ? (
          <div className="text-center py-20">Cargando análisis de mercado...</div>
        ) : error ? (
          <div className="text-red-500 text-center py-10">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden flex flex-col h-full">
                
                {/* Header de la Tarjeta */}
                <div className="p-5 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                  <h3 className="font-bold text-lg text-gray-800">
                    {item.sector} (Rank {item.rank})
                  </h3>
                  {/* Badge de Señal */}
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                    getSignal(item) === 'Overweight' ? 'bg-green-50 text-green-700 border-green-200' :
                    getSignal(item) === 'Underweight' ? 'bg-red-50 text-red-700 border-red-200' :
                    'bg-gray-50 text-gray-600 border-gray-200'
                  }`}>
                    {getSignal(item)}
                  </span>
                </div>

                {/* Cuerpo de la Tarjeta */}
                <div className="p-5 flex-grow relative">
                  <div className="space-y-4 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                      <div className="text-4xl font-bold text-blue-600">{item.score.toFixed(2)}</div>
                      <div className="text-xs text-gray-400 font-medium uppercase tracking-wide">AI Score<br/>(0-1)</div>
                    </div>
                    
                    {!isFreeUser && 'market_context' in item && (
                      <>
                        <div>
                          <h4 className="font-semibold text-gray-800">Market Context:</h4>
                          <p className="text-gray-600">{item.market_context}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-800">Phase and Health:</h4>
                          <p className="text-gray-600">{item.phase_and_health}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-800">Rationale and Elliott Wave:</h4>
                          <p className="text-gray-600">{item.rationale_and_elliott_wave}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-800">Risk and Volume Profile:</h4>
                          <p className="text-gray-600">{item.risk_and_volume_profile}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-800">Execution Protocol:</h4>
                          <p className="text-gray-600">{item.execution_protocol}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-800">Top 3 Tickers:</h4>
                          <p className="text-gray-600">{item.top_3_tickers}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-800">Sector Portfolio Percentage:</h4>
                          <p className="text-gray-600">{item.sector_portfolio_percentage}%</p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-800">Week Targets:</h4>
                          <p className="text-gray-600">{item.week_targets}</p>
                        </div>
                      </>
                    )}
                  </div>

                  {isFreeUser && (
                    // Overlay de upgrade para FREE (opcional, pero para motivar upgrade)
                    <div className="mt-6 text-center">
                      <p className="text-xs text-gray-500">Actualiza a PRO para más detalles avanzados.</p>
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