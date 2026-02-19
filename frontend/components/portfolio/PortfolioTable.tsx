// src/components/portfolio/PortfolioTable.tsx

import React from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { PortfolioRecommendationData } from './types'; // Importar desde la misma carpeta

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

export default PortfolioTable;