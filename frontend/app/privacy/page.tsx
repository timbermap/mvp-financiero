import PageLayout, { ContentSection } from '@/components/PageLayout';

export default function PrivacyPage() {
  return (
    <PageLayout
      title="Privacy Policy"
      subtitle="Last updated: February 21, 2026"
    >
      <ContentSection title="1. Introduction">
        <p>This Privacy Policy explains how CurateVista (“Company,” “we,” “us,” or “our”) collects, uses, discloses, and safeguards your personal information when you visit or use our website (the “Site”) or subscribe to our data services. We are committed to protecting your privacy in compliance with applicable laws, including the California Consumer Privacy Act (CCPA), General Data Protection Regulation (GDPR) where applicable, and other relevant regulations.</p>
      </ContentSection>

      <ContentSection title="2. Information We Collect">
        <p>We collect personal information such as name, email address, billing information, usage data, cookies, IP address, and device information. This may include information you provide when creating an account, subscribing to our research tools, or contacting us, as well as automatically collected data.</p>
      </ContentSection>

      <ContentSection title="3. How We Use Your Information">
        <p>We use your information to provide and improve our data platform, process subscriptions and payments, communicate with you regarding platform updates, analyze usage trends, comply with legal obligations, and for other legitimate business purposes. We do not sell your personal information.</p>
      </ContentSection>

      <ContentSection title="4. Sharing of Information">
        <p>We may share your information with trusted service providers (e.g., payment processors, hosting services) who assist us in operating our platform, as required by law, or in connection with a business transfer. We do not share your data for cross-context behavioral advertising.</p>
      </ContentSection>

      <ContentSection title="5. Cookies and Tracking Technologies">
        <p>We use cookies and similar technologies to enhance your experience, analyze site traffic, and secure our platform. You can manage cookie preferences through your browser settings.</p>
      </ContentSection>

      <ContentSection title="6. Data Security">
        <p>We implement commercially reasonable administrative, technical, and physical safeguards to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
      </ContentSection>

      <ContentSection title="7. Data Retention and Your Rights">
        <p>We retain your information as long as necessary for the purposes described or as required by law. Depending on your location, you may have rights to access, correct, delete, or opt out of the processing of your data. To exercise these rights, please contact us using the details below.</p>
      </ContentSection>

      <ContentSection title="8. Children’s Privacy">
        <p>Our Site and data services are not intended for children under 18. We do not knowingly collect data from minors.</p>
      </ContentSection>

      <ContentSection title="9. International Transfers">
        <p>Your data may be transferred to and processed in countries outside your jurisdiction, including the United States, utilizing appropriate data protection safeguards.</p>
      </ContentSection>

      <ContentSection title="10. Changes to This Policy">
        <p>We may update this Privacy Policy periodically. We will notify you of material changes by updating the date at the top of this page or via email.</p>
      </ContentSection>

      <ContentSection title="11. Contact Us">
        <p>For questions regarding this policy or to exercise your privacy rights, contact us at legal@curatevista.com.</p>
      </ContentSection>
    </PageLayout>
  );
}