import PageLayout, { ContentSection } from '@/components/PageLayout';

export default function DisclaimerPage() {
  return (
    <PageLayout
      title="Legal Disclaimer"
      subtitle="Important Regulatory & Legal Information – Please Read Carefully"
    >
      <ContentSection title="Educational and Informational Purposes Only – No Investment Advice">
        <p>The content, algorithms, model watchlists, data screens, charts, and any other materials provided by CurateVista (the “Company,” “we,” “us,” or “our”) on this website (the “Site”) are strictly for general educational, research, and informational purposes only. Nothing contained on the Site constitutes investment advice, financial advice, trading advice, a recommendation to purchase, sell or hold any security, or any other form of professional advice.</p>
        <p>CurateVista is a financial data and technology platform. We are not a registered investment adviser with the U.S. Securities and Exchange Commission (SEC), any state securities regulatory authority, or any regulatory body in any other jurisdiction. We are not a broker-dealer, nor do we provide personalized investment recommendations or fiduciary services. Any data or model watchlists provided are generated mechanically and do not take into account your individual financial situation, risk tolerance, or objectives. You should never treat any data on the Site as a direct basis for making any investment decision.</p>
      </ContentSection>

      <ContentSection title="No Fiduciary Relationship or Suitability">
        <p>By accessing the Site, you acknowledge and agree that no fiduciary, advisory, or client relationship is created between you and CurateVista. The algorithmic data on the Site does not constitute a solicitation or offer to buy or sell securities. Nothing on the Site is intended to be construed as suitable or appropriate for any specific person.</p>
      </ContentSection>

      <ContentSection title="Investment Risks and User Responsibility">
        <p>All investments in the stock market involve substantial risk of loss, including the potential loss of the entire principal invested. Past performance of any mathematical model or backtest is strictly hypothetical and is not indicative of future results. Market conditions and economic variables can cause significant volatility. You are solely and exclusively responsible for conducting your own independent research, due diligence, and for all trading decisions. We strongly recommend consulting with a licensed financial advisor before deploying capital in the financial markets.</p>
      </ContentSection>

      <ContentSection title="No Representations or Warranties">
        <p>All information on the Site is provided on an “AS IS” and “AS AVAILABLE” basis without any representations or warranties of any kind. We do not warrant the accuracy, completeness, or timeliness of the data provided. Algorithmic outputs rely on third-party market data which may be delayed, and we do not independently verify such third-party information.</p>
      </ContentSection>

      <ContentSection title="Limitation of Liability & Indemnification">
        <p>To the fullest extent permitted by applicable law, CurateVista, its founders, and affiliates shall not be liable for any direct, indirect, incidental, or consequential damages, including without limitation trading losses or loss of capital, arising out of your use of the Site or our data. You agree to indemnify and hold harmless the Company from any claims or financial losses resulting from your reliance on the platform's information.</p>
      </ContentSection>

      <ContentSection title="Governing Law">
        <p>Your continued use of the Site constitutes acceptance of this Disclaimer. This Disclaimer shall be governed by and construed in accordance with the laws of the State of Delaware, USA, without regard to conflict of laws principles.</p>
      </ContentSection>
    </PageLayout>
  );
}