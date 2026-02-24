import PageLayout, { ContentSection } from '@/components/PageLayout';

export default function AboutPage() {
  return (
    <PageLayout
      title="About Us"
      subtitle="Empowering self-directed researchers with clear, quantitative market data."
    >
      <ContentSection title="Our Mission">
        <p>
          Our mission at CurateVista is to democratize quantitative market research. We believe that independent, self-directed investors should have access to the same objective data models and analytical tools utilized by institutional researchers. We cut through the noise of opinion-based financial media to provide purely mathematical, rules-based data screens that help our users conduct smarter independent research.
        </p>
      </ContentSection>
      <ContentSection title="Our Story">
        <p>
          Founded by a team of data scientists and market researchers, CurateVista was born out of a simple frustration: the overwhelming amount of conflicting, emotional financial information available online. We set out to build a platform that was powerful yet intuitive, providing a clear, algorithmic framework for analyzing macroeconomic momentum and sector rotation. Today, we provide the underlying data tools that help independent investors analyze the markets with objective clarity.
        </p>
      </ContentSection>
    </PageLayout>
  );
}