// components/sector/types.ts

export interface SectorBase {
  analysis_date: string;
  rank: number;
  sector: string;
  score: number;
  signal: string;
}

export interface SectorPro extends SectorBase {
  market_context: string;
  phase_and_health: string;
  rationale_and_elliott_wave: string;
  risk_and_volume_profile: string;
  execution_protocol: string;
  top_3_tickers: string;
  sector_portfolio_percentage: number;
  week_targets: string;
}

export type SectorData = SectorBase | SectorPro;

export type TrendStatus = 'Up' | 'Down' | 'Stable';

export const VALID_RISKS = ["low", "medium", "high"] as const;
export const VALID_HORIZONS = ["week", "month", "year"] as const;

export type Risk = typeof VALID_RISKS[number];
export type Horizon = typeof VALID_HORIZONS[number];