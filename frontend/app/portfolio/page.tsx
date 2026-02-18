import PageLayout, { ContentSection } from '@/components/PageLayout';

export default function PortfolioPage() {
  return (
    <PageLayout
      title="Portfolio Construction Tools"
      subtitle="Translate our data-driven insights into actionable portfolio strategies. (Premium Feature)"
    >
      <ContentSection title="Beyond the Signals">
        <p>
          Our Portfolio tools are designed for serious investors who want to move from analysis to execution. Instead of just knowing which sectors are leading, you can build, test, and manage model portfolios based on our proprietary data.
        </p>
      </ContentSection>
      <ContentSection title="Key Features">
        <ul>
          <li><strong>Model Portfolios:</strong> Access pre-built portfolios based on different risk profiles (Low, Medium, High Risk) and time horizons.</li>
          <li><strong>Backtesting Engine:</strong> Simulate how our strategies would have performed under historical market conditions to understand potential risk and return.</li>
          <li><strong>Custom Alerts:</strong> Receive notifications when a sector in your portfolio changes its signal or when a new leader emerges.</li>
          <li><strong>Risk Metrics:</strong> Analyze key portfolio metrics like Sharpe Ratio, Max Drawdown, and Beta to ensure your strategy aligns with your risk tolerance.</li>
        </ul>
        <p>
          Upgrade to our Premium plan to unlock these powerful tools and take your investing to the next level.
        </p>
      </ContentSection>
    </PageLayout>
  );
}