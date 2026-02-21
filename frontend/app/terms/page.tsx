import PageLayout, { ContentSection } from '@/components/PageLayout';

export default function TermsPage() {
  return (
    <PageLayout
      title="Terms of Service"
      subtitle="Last updated: February 21, 2026"
    >
      <ContentSection title="1. Agreement to Terms">
        <p>By accessing or using the Site or our services, you agree to be bound by these Terms of Service (“Terms”). If you do not agree, you must not use the Site. These Terms constitute a legally binding agreement between you and MVP Financiero.</p>
      </ContentSection>

      <ContentSection title="2. User Accounts and Eligibility">
        <p>You must be at least 18 years old to use the Site. You are responsible for maintaining the confidentiality of your account and for all activities under it.</p>
      </ContentSection>

      <ContentSection title="3. Subscriptions and Billing">
        <p>Premium features are offered on a subscription basis (monthly or annual). You authorize us to charge your payment method automatically. Subscriptions auto-renew unless canceled. Cancellations take effect at the end of the current billing cycle. No refunds for partial periods except as required by law. We may change prices with notice.</p>
      </ContentSection>

      <ContentSection title="4. Intellectual Property">
        <p>All content on the Site is owned by or licensed to us and protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works without express written permission.</p>
      </ContentSection>

      <ContentSection title="5. User Conduct and Prohibited Activities">
        <p>You agree not to misuse the Site, including scraping data, distributing harmful code, infringing rights, or engaging in unlawful activities. All stock suggestions are for informational purposes only (see Disclaimer).</p>
      </ContentSection>

      <ContentSection title="6. Termination">
        <p>We may terminate or suspend your access at any time, with or without cause. Upon termination, your right to use the Site ceases immediately.</p>
      </ContentSection>

      <ContentSection title="7. Disclaimer of Warranties">
        <p>The Site and all content are provided “AS IS” and “AS AVAILABLE” without any warranties, express or implied. See full Disclaimer page for investment-specific disclaimers.</p>
      </ContentSection>

      <ContentSection title="8. Limitation of Liability">
        <p>To the maximum extent permitted by law, the Company shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits or investment losses, arising from your use of the Site. Our total liability shall not exceed the amount you paid us in the twelve months preceding the claim (or $100 if no payment).</p>
      </ContentSection>

      <ContentSection title="9. Indemnification">
        <p>You agree to indemnify and hold us harmless from any claims, losses, or damages arising from your use of the Site, breach of these Terms, or violation of law.</p>
      </ContentSection>

      <ContentSection title="10. Governing Law and Dispute Resolution">
        <p>These Terms are governed by the laws of [the State of Delaware, USA / the Argentine Republic]. Any disputes shall be resolved exclusively in the courts of [Delaware / Buenos Aires], or through binding arbitration if elected by us. You waive jury trial rights where applicable.</p>
      </ContentSection>

      <ContentSection title="11. Miscellaneous">
        <p>These Terms constitute the entire agreement. If any provision is invalid, the remainder remains in effect. We may assign these Terms; you may not.</p>
      </ContentSection>
    </PageLayout>
  );
}