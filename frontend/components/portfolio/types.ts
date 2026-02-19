// src/components/portfolio/types.ts

import { StaticImageData } from 'next/image';

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

// Configuración para el contenido del header
export const PORTFOLIO_CONTENT_CONFIG: Record<Horizon, { title: string; description: string }> = {
  week: { title: "Weekly Portfolio Recommendations", description: "Tactical portfolio recommendations for a 2-4 week horizon, focusing on short-term opportunities." },
  month: { title: "Monthly Portfolio Recommendations", description: "Strategic portfolio recommendations for a 1-3 month horizon, balancing growth and stability." },
  year: { title: "Yearly Portfolio Recommendations", description: "Long-term portfolio recommendations for a 12+ month horizon, designed for sustained growth." }
};