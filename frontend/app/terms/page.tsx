import PageLayout, { ContentSection } from '@/components/PageLayout';

export default function TermsPage() {
  return (
    <PageLayout
      title="Terms of Service"
      subtitle="Last updated: [Date]"
    >
      <ContentSection title="1. Agreement to Terms">
        <p>By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the service.</p>
      </ContentSection>
      <ContentSection title="2. Subscriptions">
        <p>Some parts of the Service are billed on a subscription basis. You will be billed in advance on a recurring and periodic basis ("Billing Cycle"). Billing cycles are set either on a monthly or annual basis, depending on the type of subscription plan you select when purchasing a Subscription.</p>
      </ContentSection>
      <ContentSection title="3. Content">
        <p>Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material. You are responsible for the Content that you post on or through the Service...</p>
        <p><strong>[...Add more sections as needed: User Accounts, Termination, Limitation of Liability, Governing Law, etc...]</strong></p>
      </ContentSection>
    </PageLayout>
  );
}