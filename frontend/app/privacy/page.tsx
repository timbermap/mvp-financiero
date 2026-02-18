import PageLayout, { ContentSection } from '@/components/PageLayout';

export default function PrivacyPage() {
  return (
    <PageLayout
      title="Privacy Policy"
      subtitle="Last updated: [Date]"
    >
      <ContentSection title="1. Information We Collect">
        <p>We collect several different types of information for various purposes to provide and improve our Service to you. This may include, but is not limited to: Email address, First name and last name, Cookies and Usage Data.</p>
      </ContentSection>
      <ContentSection title="2. Use of Data">
        <p>MVP Financiero uses the collected data for various purposes: to provide and maintain our Service, to notify you about changes to our Service, to provide customer support, to gather analysis or valuable information so that we can improve our Service...</p>
      </ContentSection>
      <ContentSection title="3. Security of Data">
        <p>The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>
        <p><strong>[...Add more sections as needed: Data Retention, Your Data Protection Rights, Service Providers, etc...]</strong></p>
      </ContentSection>
    </PageLayout>
  );
}