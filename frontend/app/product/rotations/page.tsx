'use client';

import { useEffect, useState } from 'react';
import api from '@/services/api';
import DatePicker from '@/components/DatePickerField';
import SectorTable from '@/components/sector/SectorTable';
import { SectorData } from '@/components/sector/types';

export default function PortfolioPage() {
  const [data, setData] = useState<SectorData[]>([]);
  const [previousData, setPreviousData] = useState<SectorData[]>([]);
  const [dates, setDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get('/api/v1/analysis-dates').then((res) => {
      const parsed = res.data.map((d: string) => new Date(d));
      setDates(parsed);
      setSelectedDate(parsed[0]);
    });
  }, []);

  useEffect(() => {
    if (!selectedDate) return;

    const fetchData = async () => {
      setLoading(true);

      const currentDate =
        selectedDate.toISOString().split('T')[0];

      const prevIndex = dates.findIndex(
        (d) => d.getTime() === selectedDate.getTime()
      );

      const prevDate =
        prevIndex + 1 < dates.length
          ? dates[prevIndex + 1]
              .toISOString()
              .split('T')[0]
          : null;

      const current = await api.get('/api/v1/dashboard', {
        params: { date: currentDate },
      });

      setData(current.data);

      if (prevDate) {
        const prev = await api.get('/api/v1/dashboard', {
          params: { date: prevDate },
        });
        setPreviousData(prev.data);
      } else {
        setPreviousData([]);
      }

      setLoading(false);
    };

    fetchData();
  }, [selectedDate, dates]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Sector Portfolio
        </h1>

        {selectedDate && (
          <DatePicker
            selected={selectedDate}
            onChange={setSelectedDate}
            includeDates={dates}
          />
        )}
      </div>

      {loading ? (
        <div className="text-center py-16 text-slate-500">
          Loading analysis…
        </div>
      ) : (
        <SectorTable
          data={data}
          previousData={previousData}
        />
      )}
    </div>
  );
}
