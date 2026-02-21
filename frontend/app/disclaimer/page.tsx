import PageLayout, { ContentSection } from '@/components/PageLayout';

export default function DisclaimerPage() {
  return (
    <PageLayout
      title="Disclaimer"
      subtitle="Important Legal Information – Please Read Carefully"
    >
      <ContentSection title="Educational and Informational Purposes Only – No Investment Advice">
        <p>The content, analyses, stock suggestions, market commentary, data, charts, and any other materials provided by MVP Financiero (the “Company,” “we,” “us,” or “our”) on this website (the “Site”) are strictly for general educational and informational purposes only. Nothing contained on the Site constitutes investment advice, financial advice, trading advice, a recommendation to purchase, sell or hold any security, portfolio, or investment strategy, or any other form of professional advice.</p>
        <p>We are not a registered investment adviser with the U.S. Securities and Exchange Commission (SEC), any state securities regulatory authority in the United States, or any regulatory body in any other jurisdiction. We are not a broker-dealer, nor do we hold ourselves out as providing personalized investment recommendations or fiduciary services of any kind. Any stock-related content or suggestions are general in nature and do not take into account your individual financial situation, objectives, risk tolerance, or any other personal circumstances. You should not treat any content on the Site as a basis for making any investment decision.</p>
      </ContentSection>

      <ContentSection title="No Fiduciary Relationship or Suitability">
        <p>By accessing the Site, you acknowledge and agree that no fiduciary, advisory, or client relationship is created between you and the Company. The information on the Site does not constitute a solicitation or offer to buy or sell securities in any jurisdiction where such activity would be unlawful. Nothing on the Site is intended to be, and should not be construed as, suitable or appropriate for any specific person.</p>
      </ContentSection>

      <ContentSection title="Investment Risks and User Responsibility">
        <p>All investments, including stocks traded in the United States, involve substantial risk of loss, including the potential loss of the entire principal invested. Past performance is not indicative of future results. Market conditions, economic factors, geopolitical events, company-specific developments, and other variables can cause significant volatility or total loss. You are solely and exclusively responsible for conducting your own independent research, analysis, due diligence, and for all investment decisions, including any based in whole or in part on information obtained from the Site. We strongly recommend consulting with a qualified, licensed financial advisor, attorney, accountant, or other appropriate professional before making any investment decisions.</p>
      </ContentSection>

      <ContentSection title="No Representations or Warranties">
        <p>All information on the Site is provided on an “AS IS” and “AS AVAILABLE” basis without any representations or warranties of any kind, express or implied, including but not limited to accuracy, completeness, timeliness, reliability, merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that the Site, its content, or any data (including third-party market data) will be uninterrupted, error-free, or free of viruses or other harmful components. Market data may be delayed and we do not independently verify third-party information.</p>
      </ContentSection>

      <ContentSection title="Limitation of Liability">
        <p>To the fullest extent permitted by applicable law, in no event shall the Company, its owners, officers, directors, employees, affiliates, agents, or licensors be liable for any direct, indirect, incidental, special, consequential, punitive, or exemplary damages, including without limitation loss of profits, revenue, data, goodwill, or investment losses, arising out of or in connection with your access to or use of the Site or any content thereon, even if we have been advised of the possibility of such damages. Your sole and exclusive remedy for any dissatisfaction with the Site is to discontinue use.</p>
      </ContentSection>

      <ContentSection title="Indemnification">
        <p>You agree to indemnify, defend, and hold harmless the Company and its affiliates, officers, directors, employees, and agents from and against any and all claims, liabilities, damages, losses, costs, and expenses (including reasonable attorneys’ fees) arising out of or relating to your use of the Site, any reliance on its content, your violation of this Disclaimer, or any applicable law.</p>
      </ContentSection>

      <ContentSection title="Changes and Governing Law">
        <p>We reserve the right to update this Disclaimer at any time. Your continued use of the Site constitutes acceptance of any changes. This Disclaimer shall be governed by and construed in accordance with the laws of the [State of Delaware, USA / Argentine Republic], without regard to conflict of laws principles.</p>
      </ContentSection>
    </PageLayout>
  );
}