// src/app/products/portfolio/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

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
import api from '@/services/api'; // <-- Added API import

export default function PortfolioPage() {
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

  // --- Parameter & Access Validation ---
  useEffect(() => {
    // 1. Validate basic params
    if (
      !risk ||
      !VALID_RISKS.includes(risk) ||
      !horizon ||
      !VALID_HORIZONS.includes(horizon)
    ) {
      if (searchParams.toString()) {
        router.replace('/dashboard');
      }
      return;
    }

    // 2. NEW: Redirect if limit reached and trying to access restricted URL
    if (!usageLoading && isLimitReached) {
      if (risk !== 'medium' || horizon !== 'month') {
        router.replace('/dashboard'); // replace prevents them from getting stuck in a back-button loop
      }
    }
  }, [risk, horizon, router, searchParams, usageLoading, isLimitReached]);

  const {
    groupedPortfolioData,
    dates,
    selectedDate,
    setSelectedDate,
    loading,
    error,
  } = usePortfolioData(risk, horizon);

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
        <PortfolioStatusMessage type="loading" message="Verifying access..." />
      </div>
    );
  }

  // Enhanced error display for 429 monthly limit (Fallback just in case)
  const displayError = error ? (
    typeof error === 'object' && error?.code === 'MONTHLY_LIMIT_REACHED' ? (
      <PortfolioStatusMessage
        type="error"
        message={
          <div className="text-center py-8">
            <div className="text-6xl mb-6">⏳</div>
            <p className="text-xl font-semibold mb-2">{error.message}</p>
            <p className="text-sm mb-6">
              Resets on <span className="font-mono">{error.reset_date}</span>
            </p>
            <Link
              href="/upgrade"
              className="inline-block bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-3 rounded-2xl font-semibold hover:scale-105 transition"
            >
              Upgrade to PRO – Unlimited clicks
            </Link>
          </div>
        }
      />
    ) : (
      <PortfolioStatusMessage type="error" message={error} />
    )
  ) : null;

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
      ) : displayError ? (
        displayError
      ) : dates.length === 0 ? (
        <PortfolioStatusMessage type="no-data" message="Loading data.." />
      ) : (
        <>
          <PortfolioHeader
            horizon={horizon}
            risk={risk}
            selectedDate={selectedDate}
            dates={dates}
            onDateChange={setSelectedDate}
            isLimitReached={isLimitReached} // <-- Pass the limit state to the header
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