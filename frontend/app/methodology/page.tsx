import PageLayout, { ContentSection } from '@/components/PageLayout';

export default function MethodologyPage() {
  return (
    <PageLayout
      title="Our Methodology"
      subtitle="Transparency and a rules-based data process are the foundation of our platform."
    >
      <ContentSection title="Core Philosophy">
        <p>
          We believe in a quantitative, evidence-based approach to financial market research. Our data methodology is designed to be systematic and mathematical, removing behavioral biases from the research process. We focus strictly on identifying statistical momentum and algorithmic trends in market data.
        </p>
      </ContentSection>
      <ContentSection title="The Process: From Data to Model">
        <ol className="list-decimal list-inside space-y-3 mt-4 text-slate-600 leading-relaxed">
          <li><strong>Data Aggregation:</strong> We collect daily price, volume, and volatility data for a comprehensive set of US sector ETFs and equities from reliable institutional data providers.</li>
          <li><strong>Factor Calculation:</strong> Our proprietary algorithms calculate objective scores for key factors, including relative strength against baseline benchmarks, short-term and long-term momentum metrics, and volatility-adjusted returns.</li>
          <li><strong>Composite Scoring:</strong> Each sector and equity receives a composite mathematical score based on a weighted average of these factors. The weighting adapts depending on the chosen data parameter (e.g., Short-term models heavily weight recent momentum).</li>
          <li><strong>Ranking & Categorization:</strong> Sectors are objectively ranked based on their composite score. A qualitative trend indicator (Bullish, Neutral, Bearish) is assigned mechanically based on the sector's historical standard deviations.</li>
          <li><strong>Weekly Publication:</strong> The entire computational process is run mechanically at the close of each trading week, with the updated data sets and watchlists published for our subscribers before the market opens on Monday.</li>
        </ol>
      </ContentSection>
    </PageLayout>
  );
}