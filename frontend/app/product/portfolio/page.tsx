// src/app/products/portfolio/page.tsx

'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

import {
  Risk,
  Horizon,
  VALID_RISKS,
  VALID_HORIZONS,
  VALID_PORTFOLIO_SIZES,
} from '@/components/portfolio/types';

import PortfolioHeader from '@/components/portfolio/PortfolioHeader';
import PortfolioStatusMessage from '@/components/portfolio/PortfolioStatusMessage';
import PortfolioTable from '@/components/portfolio/PortfolioTable';

import { usePortfolioData } from '@/components/portfolio/usePortfolioData';

export default function PortfolioPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const risk = searchParams.get('risk') as Risk | null;
  const horizon = searchParams.get('horizon') as Horizon | null;

  // --- Parameter Validation ---
  useEffect(() => {
    if (
      !risk ||
      !VALID_RISKS.includes(risk) ||
      !horizon ||
      !VALID_HORIZONS.includes(horizon)
    ) {
      if (searchParams.toString()) {
        router.push('/dashboard');
      }
    }
  }, [risk, horizon, router, searchParams]);

  const {
    groupedPortfolioData,
    dates,
    selectedDate,
    setSelectedDate,
    loading,
    error,
  } = usePortfolioData(risk, horizon);

  // Prevent render while redirecting
  if (
    !risk ||
    !VALID_RISKS.includes(risk) ||
    !horizon ||
    !VALID_HORIZONS.includes(horizon)
  ) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Product: Portfolio
        </h1>
      </div>

      {/* --- STATUS STATES --- */}
      {loading ? (
        <PortfolioStatusMessage
          type="loading"
          message="Loading portfolio recommendations..."
        />
      ) : error ? (
        <PortfolioStatusMessage
          type="error"
          message={error}
        />
      ) : dates.length === 0 ? (
        <PortfolioStatusMessage
          type="no-data"
          message="Loading data.."
        />
      ) : (
        <>
          <PortfolioHeader
            horizon={horizon}
            risk={risk}
            selectedDate={selectedDate}
            dates={dates}
            onDateChange={setSelectedDate}
          />

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