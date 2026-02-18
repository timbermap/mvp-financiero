import PageLayout, { ContentSection } from '@/components/PageLayout';

export default function AboutPage() {
  return (
    <PageLayout
      title="About Us"
      subtitle="Empowering investors with clear, data-driven market insights."
    >
      <ContentSection title="Our Mission">
        <p>
          Our mission is to level the playing field for individual investors. We believe that everyone should have access to the same quality of data and analytical tools that were once only available to large financial institutions. We cut through the noise of financial media to provide objective, quantitative signals that help our users build smarter, more resilient portfolios.
        </p>
      </ContentSection>
      <ContentSection title="Our Story">
        <p>
          Founded by a team of data scientists and passionate investors, MVP Financiero was born out of a simple frustration: the overwhelming amount of conflicting financial information. We set out to build a platform that was powerful yet simple, providing a clear, rules-based framework for understanding market trends through the lens of sector rotation. Today, we help thousands of investors navigate the markets with greater confidence.
        </p>
      </ContentSection>
    </PageLayout>
  );
}