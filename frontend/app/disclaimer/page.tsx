import PageLayout, { ContentSection } from '@/components/PageLayout';

export default function DisclaimerPage() {
  return (
    <PageLayout
      title="Disclaimer"
      subtitle="Important information regarding the use of our service and data."
    >
      <ContentSection title="No Investment Advice">
        <p>
          The information provided by MVP Financiero is for educational and informational purposes only and should not be construed as investment advice, financial advice, trading advice, or any other sort of advice. You should not treat any of the website's content as such. MVP Financiero does not recommend that any security, portfolio of securities, transaction, or investment strategy is suitable for any specific person.
        </p>
      </ContentSection>
      <ContentSection title="Risk of Investing">
        <p>
          All investments involve risk, including the potential loss of principal. The past performance of any investment, investment strategy, or investment style is not indicative of future results. You are solely responsible for conducting your own research and due diligence before making any investment decisions. We recommend you consult with a qualified financial advisor.
        </p>
      </ContentSection>
      <ContentSection title="Accuracy of Information">
        <p>
          While we strive to provide accurate and up-to-date information, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.
        </p>
      </ContentSection>
    </PageLayout>
  );
}