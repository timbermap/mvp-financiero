import PageLayout, { ContentSection } from '@/components/PageLayout';

export default function PrivacyPage() {
  return (
    <PageLayout
      title="Privacy Policy"
      subtitle="Last updated: February 21, 2026"
    >
      <ContentSection title="1. Introduction">
        <p>This Privacy Policy explains how MVP Financiero (“Company,” “we,” “us,” or “our”) collects, uses, discloses, and safeguards your personal information when you visit or use our website (the “Site”) or subscribe to our services. We are committed to protecting your privacy in compliance with applicable laws, including the California Consumer Privacy Act (CCPA), General Data Protection Regulation (GDPR) where applicable, and other relevant regulations.</p>
      </ContentSection>

      <ContentSection title="2. Information We Collect">
        <p>We collect personal information such as name, email address, billing information, usage data, cookies, IP address, and device information. This may include information you provide when creating an account, subscribing, or contacting us, as well as automatically collected data.</p>
      </ContentSection>

      <ContentSection title="3. How We Use Your Information">
        <p>We use your information to provide and improve our services, process subscriptions and payments, communicate with you, analyze usage, comply with legal obligations, and for other legitimate business purposes. We do not sell your personal information.</p>
      </ContentSection>

      <ContentSection title="4. Sharing of Information">
        <p>We may share your information with service providers (e.g., payment processors, hosting services) who assist us, as required by law, or in connection with a business transfer. We do not share for cross-context behavioral advertising.</p>
      </ContentSection>

      <ContentSection title="5. Cookies and Tracking Technologies">
        <p>We use cookies and similar technologies to enhance your experience, analyze traffic, and personalize content. You can manage preferences through your browser settings. For more details, see our Cookie Policy (if separate).</p>
      </ContentSection>

      <ContentSection title="6. Data Security">
        <p>We implement commercially reasonable administrative, technical, and physical safeguards to protect your personal information. However, no method of transmission or storage is 100% secure, and we cannot guarantee absolute security.</p>
      </ContentSection>

      <ContentSection title="7. Data Retention and Your Rights">
        <p>We retain your information as long as necessary for the purposes described or as required by law. Depending on your location, you may have rights to access, correct, delete, or opt out of the sale/processing of your data. To exercise these rights, contact us at the details below.</p>
      </ContentSection>

      <ContentSection title="8. Children’s Privacy">
        <p>Our Site is not intended for children under 13 (or 16 under GDPR). We do not knowingly collect data from children.</p>
      </ContentSection>

      <ContentSection title="9. International Transfers">
        <p>Your data may be transferred to and processed in countries outside your jurisdiction, including the United States and Argentina, with appropriate safeguards.</p>
      </ContentSection>

      <ContentSection title="10. Changes to This Policy">
        <p>We may update this Privacy Policy. We will notify you of material changes and the updated date will be posted.</p>
      </ContentSection>

      <ContentSection title="11. Contact Us">
        <p>For questions or to exercise your rights, contact us at [your email] or [your address in Buenos Aires].</p>
      </ContentSection>
    </PageLayout>
  );
}