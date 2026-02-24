import PageLayout, { ContentSection } from '@/components/PageLayout';

export default function PortfolioPage() {
  return (
    <PageLayout
      title="Model Watchlists & Data Screens"
      subtitle="Translate sector momentum data into targeted equity watchlists for your independent research. (Premium Feature)"
    >
      <ContentSection title="Beyond Macro Signals">
        <p>
          Our screening tools are designed for self-directed researchers who want to bridge the gap between macroeconomic trends and specific equities. Instead of just tracking sector leadership, you can generate, backtest, and monitor data-driven watchlists utilizing our algorithmic models.
        </p>
      </ContentSection>
      <ContentSection title="Key Platform Features">
        <ul className="list-disc list-inside space-y-3 mt-4 text-slate-600 leading-relaxed">
          <li><strong>Algorithmic Screens:</strong> Access mechanically generated stock watchlists tailored to specific volatility parameters (Low, Balanced, High Beta) and time horizons.</li>
          <li><strong>Historical Backtesting:</strong> Analyze how these mathematical parameters would have performed under historical market conditions to understand statistical risk and drawdowns.</li>
          <li><strong>Data Alerts:</strong> Receive automated notifications when a sector on your watchlist triggers a trend regime change or when new relative strength leaders emerge.</li>
          <li><strong>Quantitative Metrics:</strong> Review statistical data points including Sharpe Ratio, Max Drawdown, and Beta to evaluate historical volatility objectively.</li>
        </ul>
        <p className="mt-6 text-slate-700 font-medium">
          Upgrade to CurateVista Premium to unlock full access to our quantitative screening tools and historical data sets.
        </p>
      </ContentSection>
    </PageLayout>
  );
}