import PageLayout, { ContentSection } from '@/components/PageLayout';

export default function RotationsPage() {
  return (
    <PageLayout
      title="Sector Momentum Analytics"
      subtitle="Track market leadership and monitor shifting macroeconomic trends with our algorithmic data models."
    >
      <ContentSection title="Understanding Sector Rotation Data">
        <p>
          Sector rotation is a macroeconomic concept that tracks how institutional volume shifts between different industry sectors over time. The goal of tracking this rotation is to mathematically identify which sectors are demonstrating relative strength (leadership) and which are showing technical weakness (lagging).
        </p>
      </ContentSection>
      <ContentSection title="Our Quantitative Approach">
        <p>
          Our algorithms compute a combination of mathematical factors to quantify the momentum of each GICS market sector. We focus strictly on objective data points:
        </p>
        <ul className="list-disc list-inside space-y-3 mt-4 text-slate-600 leading-relaxed">
          <li><strong>Relative Strength:</strong> How a sector performs statistically compared to a broader market baseline (e.g., S&P 500).</li>
          <li><strong>Momentum:</strong> The rate of acceleration of a sector's price trend, calculated across both short-term and long-term moving averages.</li>
          <li><strong>Volatility:</strong> Assessing the standard deviation and historical stability of a sector's price action.</li>
          <li><strong>Volume Flow:</strong> Tracking institutional activity by analyzing unusual or sustained trading volume patterns.</li>
        </ul>
        <p className="mt-6">
          This multi-factor calculation generates an objective trend score, providing you with clear, quantitative data for short-term (tactical) or long-term (strategic) market research.
        </p>
      </ContentSection>
    </PageLayout>
  );
}