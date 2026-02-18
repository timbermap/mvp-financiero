import PageLayout, { ContentSection } from '@/components/PageLayout';

export default function MethodologyPage() {
  return (
    <PageLayout
      title="Our Methodology"
      subtitle="Transparency and a rules-based process are the foundation of our analysis."
    >
      <ContentSection title="Core Philosophy">
        <p>
          We believe in a quantitative, evidence-based approach to financial markets. Our methodology is designed to be systematic and unemotional, removing guesswork and behavioral biases from the investment process. We focus on identifying durable trends in market leadership.
        </p>
      </ContentSection>
      <ContentSection title="The Process: From Data to Signal">
        <ol>
          <li><strong>Data Aggregation:</strong> We collect daily price and volume data for a comprehensive set of US sector ETFs from reliable financial data providers.</li>
          <li><strong>Factor Calculation:</strong> Our proprietary algorithms calculate scores for key factors, including relative strength against a benchmark, short-term and long-term momentum, and volatility-adjusted returns.</li>
          <li><strong>Composite Scoring:</strong> Each sector receives a composite "Score" based on a weighted average of these factors. The weighting depends on the model (e.g., Weekly models prioritize short-term momentum).</li>
          <li><strong>Ranking & Signal:</strong> Sectors are ranked based on their composite score. A "Signal" (Bullish, Neutral, Bearish) is then assigned based on the sector's score relative to its own historical performance and the market benchmark.</li>
          <li><strong>Weekly Publication:</strong> The entire process is run at the close of each week, with the new analysis published for our members before the market opens on Monday.</li>
        </ol>
      </ContentSection>
    </PageLayout>
  );
}