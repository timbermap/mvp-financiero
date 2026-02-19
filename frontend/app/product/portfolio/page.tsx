// src/app/products/portfolio/page.tsx

'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

// Importar tipos y constantes desde la nueva ruta
import { Risk, Horizon, VALID_RISKS, VALID_HORIZONS, VALID_PORTFOLIO_SIZES } from '@/components/portfolio/types';

// Importar componentes desde la nueva ruta global
import PortfolioHeader from '@/components/portfolio/PortfolioHeader';
import PortfolioStatusMessage from '@/components/portfolio/PortfolioStatusMessage';
import PortfolioTable from '@/components/portfolio/PortfolioTable';

// Importar custom hook desde la nueva ruta global
import { usePortfolioData } from '@/components/portfolio/usePortfolioData';

export default function PortfolioPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const risk = searchParams.get('risk') as Risk | null;
  const horizon = searchParams.get('horizon') as Horizon | null;

  // --- Parameter Validation Effect ---
  useEffect(() => {
    // Redirigir si los parámetros son inválidos o faltan
    if (!risk || !VALID_RISKS.includes(risk) || !horizon || !VALID_HORIZONS.includes(horizon)) {
      // Solo redirigir si hay searchParams, para evitar bucles en la carga inicial sin parámetros
      if (searchParams.toString()) {
        router.push('/dashboard'); // O a una página de error/default
      }
    }
  }, [risk, horizon, router, searchParams]);

  // Usar el custom hook para la lógica de datos
  const {
    groupedPortfolioData,
    dates,
    selectedDate,
    setSelectedDate,
    loading,
    error,
  } = usePortfolioData(risk, horizon);

  // Si los parámetros son inválidos, no renderizar nada hasta la redirección
  if (!risk || !VALID_RISKS.includes(risk) || !horizon || !VALID_HORIZONS.includes(horizon)) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Product: Portfolio
        </h1>
      </div>

      {loading ? (
        <PortfolioStatusMessage type="loading" message="Loading portfolio recommendations..." />
      ) : error ? (
        <PortfolioStatusMessage type="error" message={error} />
      ) : dates.length === 0 ? (
        <PortfolioStatusMessage
          type="no-data"
          message="Loading data..."
        />
      ) : (
        <>
          {/* Pass dates and onDateChange (setSelectedDate) to PortfolioHeader */}
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