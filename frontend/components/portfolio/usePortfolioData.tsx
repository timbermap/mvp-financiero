// components/Portfolio/usePortfolioData.ts

import { useState, useEffect } from 'react';
import api from '@/services/api'; // Asegúrate de que esta ruta sea correcta
import {
  Risk,
  Horizon,
  PortfolioRecommendationData,
  GroupedPortfolioData,
  VALID_RISKS,
  VALID_HORIZONS,
  VALID_PORTFOLIO_SIZES
} from '@/components/portfolio/types'; // Importar desde la nueva ruta

interface UsePortfolioDataResult {
  groupedPortfolioData: GroupedPortfolioData;
  dates: Date[];
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  loading: boolean;
  error: string | null;
}

export function usePortfolioData(risk: Risk | null, horizon: Horizon | null): UsePortfolioDataResult {
  const [groupedPortfolioData, setGroupedPortfolioData] = useState<GroupedPortfolioData>({
    3: [],
    5: [],
    8: [],
  });
  const [dates, setDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- Fetch Available Dates Effect ---
  useEffect(() => {
    if (risk && horizon && VALID_RISKS.includes(risk) && VALID_HORIZONS.includes(horizon)) {
      setLoading(true);
      setError(null);
      setDates([]);
      setSelectedDate(null); // Reset selected date when filters change

      api.get('/api/v1/portfolio-dates', { params: { risk, horizon } })
        .then((res) => {
          const parsedDates = res.data.map((d: string) => new Date(d)).sort((a: Date, b: Date) => b.getTime() - a.getTime());
          setDates(parsedDates);

          if (parsedDates.length > 0) {
            setSelectedDate(parsedDates[0]); // Select the latest date by default
          } else {
            setGroupedPortfolioData({ 3: [], 5: [], 8: [] });
            setLoading(false);
          }
        })
        .catch(err => {
          console.error("Failed to fetch available portfolio dates:", err);
          setError("Could not load available analysis dates for portfolios.");
          setLoading(false);
        });
    } else {
      // If risk or horizon are invalid/missing, clear data and stop loading
      setGroupedPortfolioData({ 3: [], 5: [], 8: [] });
      setDates([]);
      setSelectedDate(null);
      setLoading(false);
      setError(null); // Clear error if parameters become invalid
    }
  }, [risk, horizon]);

  // --- Fetch Portfolio Data Effect ---
  useEffect(() => {
    if (!selectedDate || !risk || !horizon) {
      // If selectedDate is null (e.g., no dates available), or filters are missing,
      // ensure loading is false and data is cleared.
      setGroupedPortfolioData({ 3: [], 5: [], 8: [] });
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const currentDateString = selectedDate.toISOString().split('T')[0];

      try {
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

  return {
    groupedPortfolioData,
    dates,
    selectedDate,
    setSelectedDate,
    loading,
    error,
  };
}