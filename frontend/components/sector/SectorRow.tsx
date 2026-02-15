'use client';

import { useState } from 'react';
import { SectorData, TrendStatus } from './types';
import SectorDetails from './SectorDetails';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
  sector: SectorData;
  previous?: SectorData;
}

function calculateTrend(
  current?: number,
  previous?: number
): TrendStatus {
  if (current == null || previous == null) return 'Stable';
  if (current > previous + 0.3) return 'Up';
  if (current < previous - 0.3) return 'Down';
  return 'Stable';
}

export default function SectorRow({ sector, previous }: Props) {
  const [open, setOpen] = useState(false);
  const trend = calculateTrend(sector.score, previous?.score);

  const trendColor =
    trend === 'Up'
      ? 'text-emerald-600'
      : trend === 'Down'
      ? 'text-red-500'
      : 'text-slate-500';

  return (
    <>
      <tr
        onClick={() => setOpen((v) => !v)}
        className="cursor-pointer hover:bg-slate-50 transition"
      >
        <td className="px-4 py-4 font-semibold text-slate-700">
          #{sector.rank}
        </td>

        <td className="px-4 py-4 font-bold text-slate-900">
          {sector.sector}
        </td>

        <td className="px-4 py-4 text-right font-medium text-slate-800">
          {sector.score.toFixed(2)}
        </td>

        <td className="px-4 py-4 text-center">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold
              ${
                sector.signal === 'Bullish'
                  ? 'bg-emerald-100 text-emerald-700'
                  : sector.signal === 'Bearish'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-slate-100 text-slate-700'
              }`}
          >
            {sector.signal}
          </span>
        </td>

        <td
          className={`px-4 py-4 text-right font-medium ${trendColor}`}
        >
          {trend}{' '}
          {trend === 'Up'
            ? '▲'
            : trend === 'Down'
            ? '▼'
            : '→'}
        </td>

        <td className="px-2 text-slate-400">
          {open ? <ChevronUp /> : <ChevronDown />}
        </td>
      </tr>

      {open && (
        <tr>
          <td colSpan={6} className="bg-slate-50">
            <SectorDetails sector={sector} />
          </td>
        </tr>
      )}
    </>
  );
}
