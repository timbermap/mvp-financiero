import PageLayout, { ContentSection } from '@/components/PageLayout';

export default function RotationsPage() {
  return (
    <PageLayout
      title="Sector Rotation Analysis"
      subtitle="Identify market leadership and capitalize on shifting trends with our proprietary rotation models."
    >
      <ContentSection title="What is Sector Rotation?">
        <p>
          Sector rotation is an investment strategy that involves moving capital from one industry sector to another in an attempt to outperform the overall market. The goal is to position your portfolio in sectors that are poised for growth while avoiding those that are weakening.
        </p>
      </ContentSection>
      <ContentSection title="Our Approach">
        <p>
          Our models analyze a combination of factors to determine the strength and momentum of each market sector. We focus on:
        </p>
        <ul>
          <li><strong>Relative Strength:</strong> How a sector performs compared to the broader market (e.g., S&P 500).</li>
          <li><strong>Momentum:</strong> The rate of acceleration of a sector's price trend, both short-term and long-term.</li>
          <li><strong>Volatility:</strong> Assessing the risk and stability of a sector's performance.</li>
          <li><strong>Volume Analysis:</strong> Tracking institutional capital flows by analyzing trading volume patterns.</li>
        </ul>
        <p>
          This multi-factor approach provides a robust signal, helping you make informed decisions for a 2-4 week tactical horizon (Weekly Model) or a multi-month strategic view (Monthly/Yearly Models).
        </p>
      </ContentSection>
    </PageLayout>
  );
}