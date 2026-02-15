'use client';

import { useState } from 'react';
import { SectorData } from './types';
import SectorRow from './SectorRow';

interface Props {
  data: SectorData[];
  previousData?: SectorData[];
}

export default function SectorTable({ data, previousData = [] }: Props) {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="text-center text-slate-500 py-12">
        No data available for this date
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      <table className="w-full border-collapse">
        <thead className="bg-slate-50 text-slate-600 text-sm">
          <tr>
            <th className="px-4 py-3 text-left">Rank</th>
            <th className="px-4 py-3 text-left">Sector</th>
            <th className="px-4 py-3 text-right">Score</th>
            <th className="px-4 py-3 text-center">Signal</th>
            <th className="px-4 py-3 text-right">Trend</th>
          </tr>
        </thead>

        <tbody>
          {data.map((sector) => {
            const prev = previousData.find(
              (p) => p.sector === sector.sector
            );

            return (
              <SectorRow
                key={`${sector.analysis_date}-${sector.sector}`}
                sector={sector}
                previous={prev}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
