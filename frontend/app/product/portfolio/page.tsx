// src/app/portfolio/page.tsx

'use client';

import { useEffect, useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { BarChart3, Calendar, AlertTriangle, Wallet, ArrowDownRight, ArrowUpRight } from 'lucide-react';
import api from '@/services/api'; // Asegúrate de que esta ruta sea correcta
import DatePicker from '@/components/DatePickerField'; // Asegúrate de que esta ruta sea correcta

// =======================================================
// 1. Tipos y Constantes (Fusionados de portfolio/types.ts)
// =======================================================

export const VALID_RISKS = ["low", "medium", "high"] as const;
export const VALID_HORIZONS = ["week", "month", "year"] as const;
export type Risk = typeof VALID_RISKS[number];
export type Horizon = typeof VALID_HORIZONS[number];

export const VALID_PORTFOLIO_SIZES = [3, 5, 8] as const;
export type PortfolioSize = typeof VALID_PORTFOLIO_SIZES[number];

export type PositionDirection = "long" | "short";

export interface PortfolioRecommendationData {
  id: number;
  portfolio_size: PortfolioSize;
  analysis_date: string;
  risk: Risk;
  horizon: Horizon;
  ticker: string;
  sector: string | null;
  suggested_portfolio_percentage: number;
  entry_price: number | null;
  last_price: number;
  stop_loss: number | null;
  take_profit: number | null;
  risk_reward_ratio: number | null;
  direction: PositionDirection;
  trade_tactic: string | null;
  entry_strategy: string | null;
  rationale: string | null;
  confidence: number | null;
  notes: string | null;
  tags: string | null;
  created_at: string;
  updated_at: string;
}

export type GroupedPortfolioData = Record<PortfolioSize, PortfolioRecommendationData[]>;

// =======================================================
// 2. Componente PortfolioTable (Fusionado de PortfolioTable.tsx)
// =======================================================

interface PortfolioTableProps {
  title: string;
  data: PortfolioRecommendationData[];
}

const PortfolioTable: React.FC<PortfolioTableProps> = ({ title, data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h3 className="text-xl font-semibold text-slate-800 mb-4">{title}</h3>
        <p className="text-slate-500">No recommendations available for this portfolio size.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-8">
      <h3 className="text-xl font-semibold text-slate-800 mb-4">{title}</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Ticker
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Sector
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Allocation
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Direction
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Entry Price
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Last Price
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Stop Loss
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Take Profit
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                R/R Ratio
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Entry Strategy
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Confidence
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {data.map((rec) => (
              <tr key={rec.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                  {rec.ticker}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  {rec.sector || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  {rec.suggested_portfolio_percentage?.toFixed(2)}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    rec.direction === 'long' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {rec.direction === 'long' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {rec.direction}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  {rec.entry_price ? `$${rec.entry_price.toFixed(2)}` : 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  {rec.last_price ? `$${rec.last_price.toFixed(2)}` : 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  {rec.stop_loss ? `$${rec.stop_loss.toFixed(2)}` : 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  {rec.take_profit ? `$${rec.take_profit.toFixed(2)}` : 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  {rec.risk_reward_ratio ? rec.risk_reward_ratio.toFixed(2) : 'N/A'}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 max-w-xs truncate" title={rec.entry_strategy || ''}>
                  {rec.entry_strategy || 'N/A'}
                </td>
                 <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  {rec.confidence ? `${rec.confidence.toFixed(1)}%` : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


// =======================================================
// 3. Componente Principal PortfolioPage (Fusionado de PortfolioPage.tsx)
// =======================================================

// Define content configuration for portfolio pages
const contentConfig: Record<Horizon, { title: string; description: string }> = {
  week: { title: "Weekly Portfolio Recommendations", description: "Tactical portfolio recommendations for a 2-4 week horizon, focusing on short-term opportunities." },
  month: { title: "Monthly Portfolio Recommendations", description: "Strategic portfolio recommendations for a 1-3 month horizon, balancing growth and stability." },
  year: { title: "Yearly Portfolio Recommendations", description: "Long-term portfolio recommendations for a 12+ month horizon, designed for sustained growth." }
};

export default function PortfolioPage() {
  const [groupedPortfolioData, setGroupedPortfolioData] = useState<GroupedPortfolioData>({
    3: [],
    5: [],
    8: [],
  });
  const [dates, setDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  const risk = searchParams.get('risk') as Risk | null;
  const horizon = searchParams.get('horizon') as Horizon | null;

  // --- Parameter Validation Effect ---
  useEffect(() => {
    if (searchParams.toString() && (!risk || !VALID_RISKS.includes(risk) || !horizon || !VALID_HORIZONS.includes(horizon))) {
      router.push('/dashboard');
    }
  }, [risk, horizon, router, searchParams]);

  // --- Fetch Available Dates Effect ---
  useEffect(() => {
    if (risk && horizon && VALID_RISKS.includes(risk) && VALID_HORIZONS.includes(horizon)) {
      setLoading(true);
      setError(null);
      setDates([]);

      // NUEVA RUTA API para las fechas del portafolio
      api.get('/api/v1/portfolio-dates', { params: { risk, horizon } })
        .then((res) => {
          const parsedDates = res.data.map((d: string) => new Date(d)).sort((a: Date, b: Date) => b.getTime() - a.getTime());
          setDates(parsedDates);

          if (parsedDates.length > 0) {
            setSelectedDate(parsedDates[0]);
          } else {
            setSelectedDate(null);
            setGroupedPortfolioData({ 3: [], 5: [], 8: [] });
            setLoading(false);
          }
        })
        .catch(err => {
          console.error("Failed to fetch available portfolio dates:", err);
          setError("Could not load available analysis dates for portfolios.");
          setLoading(false);
        });
    }
  }, [risk, horizon]);

  // --- Fetch Portfolio Data Effect ---
  useEffect(() => {
    if (!selectedDate || !risk || !horizon) {
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const currentDateString = selectedDate.toISOString().split('T')[0];

      try {
        // NUEVA RUTA API para las recomendaciones de portafolio
        const res = await api.get('/api/v1/portfolio-recommendations', {
          params: { date: currentDateString, risk, horizon }
        });

        const recommendations: PortfolioRecommendationData[] = res.data;

        // Group data by portfolio_size
        const newGroupedData: GroupedPortfolioData = { 3: [], 5: [], 8: [] };
        recommendations.forEach(item => {
          if (VALID_PORTFOLIO_SIZES.includes(item.portfolio_size)) {
            newGroupedData[item.portfolio_size].push(item);
          }
        });
        setGroupedPortfolioData(newGroupedData);

      } catch (err) {
        console.error("Failed to fetch portfolio recommendations:", err);
        setError("An error occurred while fetching portfolio recommendations.");
        setGroupedPortfolioData({ 3: [], 5: [], 8: [] });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedDate, risk, horizon]);

  // Memoized content for header
  const analysisTitle = useMemo(() => horizon ? contentConfig[horizon].title : 'Portfolio Recommendations', [horizon]);
  const analysisDescription = useMemo(() => horizon ? contentConfig[horizon].description : 'View curated investment portfolios based on your risk and time horizon.', [horizon]);
  const formattedDate = useMemo(() => selectedDate ? selectedDate.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '', [selectedDate]);

  // --- Helper Component for Status Messages ---
  const StatusMessage = ({ children }: { children: React.ReactNode }) => (
    <div className="text-center py-16 text-slate-500 bg-slate-50 rounded-lg flex flex-col items-center gap-4">
      {children}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
        <h1 className="text-2xl font-bold text-slate-900">
          Portfolio Recommendations
        </h1>
        {dates.length > 0 && selectedDate && (
          <DatePicker selected={selectedDate} onChange={setSelectedDate} includeDates={dates} />
        )}
      </div>

      {loading ? (
        <StatusMessage>Loading portfolio recommendations...</StatusMessage>
      ) : error ? (
        <StatusMessage><AlertTriangle className="w-8 h-8 text-red-500" /> {error}</StatusMessage>
      ) : dates.length === 0 ? (
        <StatusMessage>
          <AlertTriangle className="w-8 h-8 text-amber-500" />
          No portfolio recommendations found for the selected risk and horizon criteria.
        </StatusMessage>
      ) : (
        <>
          <div className="text-center mb-8 py-8 px-4 bg-slate-100 rounded-xl">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Wallet className="w-8 h-8 text-indigo-600" />
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

          {VALID_PORTFOLIO_SIZES.map((size) => (
            <PortfolioTable
              key={size}
              title={`${size}-Ticker Portfolio`}
              data={groupedPortfolioData[size]}
            />
          ))}
        </>
      )}
    </div>
  );
}
