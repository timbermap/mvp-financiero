import PageLayout, { ContentSection } from '@/components/PageLayout';

export default function TermsPage() {
  return (
    <PageLayout
      title="Terms of Service"
      subtitle="Last updated: February 21, 2026"
    >
      <ContentSection title="1. Agreement to Terms">
        <p>By accessing or using the Site or our data services, you agree to be bound by these Terms of Service (“Terms”). If you do not agree, you must not use the Site. These Terms constitute a legally binding agreement between you and CurateVista.</p>
      </ContentSection>

      <ContentSection title="2. User Accounts and Eligibility">
        <p>You must be at least 18 years old to use the Site. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
      </ContentSection>

      <ContentSection title="3. Subscriptions and Billing">
        <p>Premium data features and model watchlists are offered on a subscription basis (monthly or annual). You authorize us to charge your payment method automatically. Subscriptions auto-renew unless canceled. Cancellations take effect at the end of the current billing cycle. No refunds are provided for partial periods except as required by law. We reserve the right to change our pricing with prior notice.</p>
      </ContentSection>

      <ContentSection title="4. Intellectual Property">
        <p>All content, algorithms, data models, and software on the Site are owned by or licensed to CurateVista and are protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, scrape, or create derivative works for commercial purposes without express written permission.</p>
      </ContentSection>

      <ContentSection title="5. User Conduct and Prohibited Activities">
        <p>You agree not to misuse the Site, including scraping data, distributing harmful code, infringing rights, or engaging in unlawful activities. All data, model screens, and analytics provided by CurateVista are for informational and educational purposes only and do not constitute investment advice (see Disclaimer).</p>
      </ContentSection>

      <ContentSection title="6. Termination">
        <p>We may terminate or suspend your access to the platform at any time, with or without cause. Upon termination, your right to use the Site and access our data ceases immediately.</p>
      </ContentSection>

      <ContentSection title="7. Disclaimer of Warranties">
        <p>The Site and all data are provided “AS IS” and “AS AVAILABLE” without any warranties, express or implied. See our full Disclaimer page for specific limitations regarding financial data and market research.</p>
      </ContentSection>

      <ContentSection title="8. Limitation of Liability">
        <p>To the maximum extent permitted by law, CurateVista shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits or trading losses, arising from your use of our data or the Site. Our total liability shall not exceed the amount you paid us in the twelve months preceding the claim.</p>
      </ContentSection>

      <ContentSection title="9. Indemnification">
        <p>You agree to indemnify and hold us harmless from any claims, losses, trading losses, or damages arising from your use of the Site, reliance on our data, breach of these Terms, or violation of applicable laws.</p>
      </ContentSection>

      <ContentSection title="10. Governing Law and Dispute Resolution">
        <p>These Terms are governed by the laws of the State of Delaware, USA, without regard to conflict of law principles. Any disputes shall be resolved exclusively in the courts of Delaware, or through binding arbitration if elected by us. You waive jury trial rights where applicable.</p>
      </ContentSection>

      <ContentSection title="11. Miscellaneous">
        <p>These Terms constitute the entire agreement between you and CurateVista. If any provision is deemed invalid, the remainder remains in full effect. We may assign these Terms; you may not.</p>
      </ContentSection>
    </PageLayout>
  );
}