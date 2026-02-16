// app/product/rotations/page.tsx
'use client';

import { useEffect, useState } from 'react';
import api from '@/services/api';
import SectorTable from '@/components/sector/SectorTable';
import { SectorData } from '@/components/sector/types';
import { ChevronRight, TrendingUp, BarChart3, PieChart, Users, Shield } from 'lucide-react';

export default function LandingPage() {
  // --- ESTADO SIMPLIFICADO ---
  // Se eliminan 'dates' y 'selectedDate' que ya no son necesarios.
  const [data, setData] = useState<SectorData[]>([]);
  const [previousData, setPreviousData] = useState<SectorData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- LÓGICA DE FETCHING CORREGIDA ---
  // Un único useEffect que llama al endpoint público correcto.
  useEffect(() => {
    const fetchPublicData = async () => {
      setLoading(true);
      setError(null);
      try {
        // 1. Llama al nuevo endpoint público que no requiere autenticación.
        const response = await api.get('/api/v1/dashboard/latest');
        
        // 2. Extrae los datos actuales y anteriores de la respuesta.
        setData(response.data.currentData || []);
        setPreviousData(response.data.previousData || []);

      } catch (err) {
        console.error("Error fetching public dashboard data:", err);
        setError('Failed to fetch the latest sector data.');
      } finally {
        setLoading(false);
      }
    };

    fetchPublicData();
  }, []); // Se ejecuta solo una vez cuando el componente se monta.

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Product Hero: Sector Rotation Preview */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Sector Rotation Insights
            </h1>
            <p className="text-xl leading-relaxed">
              Weekly recommendations to overweight or underweight sectors based on market momentum, historical performance, and forward outlook. Build smarter portfolios with data-driven sector shifts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="/signup" 
                className="inline-flex items-center px-8 py-4 bg-white text-indigo-900 font-semibold rounded-lg shadow-xl hover:bg-gray-100 transition-all duration-300"
              >
                Start Building Your Portfolio
                <ChevronRight className="ml-2 w-5 h-5" />
              </a>
              <a 
                href="/portfolio" 
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-indigo-900 transition-all duration-300"
              >
                Explore Free Preview
              </a>
            </div>
          </div>
          <div className="hidden md:block">
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="Dynamic sector rotation chart" 
              className="rounded-xl shadow-2xl w-full"
            />
          </div>
        </div>
      </section>

      {/* Product Showcase: Sector Analysis Teaser */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Deep Sector Analysis
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Unlock suggested tickers, key metrics like volatility and momentum, plus probabilistic outlooks for each sector. Make informed picks with comprehensive breakdowns.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Sample Sector Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl hover:shadow-lg transition-shadow border border-blue-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Technology</h3>
                  <p className="text-sm text-blue-600">Bullish Signal</p>
                </div>
              </div>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Top Tickers: AAPL, MSFT, NVDA</li>
                <li>• Momentum: +12.5%</li>
                <li>• Volatility: Low</li>
                <li>• Outlook: 70% Upside Potential</li>
              </ul>
              <a href="/signup" className="block mt-4 text-blue-600 hover:underline text-sm font-medium">
                View Full Analysis →
              </a>
            </div>
            {/* Sample Sector Card */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl hover:shadow-lg transition-shadow border border-green-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-3">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Healthcare</h3>
                  <p className="text-sm text-green-600">Stable Signal</p>
                </div>
              </div>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Top Tickers: JNJ, PFE, UNH</li>
                <li>• Momentum: +3.2%</li>
                <li>• Volatility: Medium</li>
                <li>• Outlook: Defensive Growth</li>
              </ul>
              <a href="/signup" className="block mt-4 text-green-600 hover:underline text-sm font-medium">
                View Full Analysis →
              </a>
            </div>
            {/* Sample Sector Card */}
            <div className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-xl hover:shadow-lg transition-shadow border border-red-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mr-3">
                  <PieChart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Energy</h3>
                  <p className="text-sm text-red-600">Bearish Signal</p>
                </div>
              </div>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Top Tickers: XOM, CVX, SLB</li>
                <li>• Momentum: -8.1%</li>
                <li>• Volatility: High</li>
                <li>• Outlook: 55% Downside Risk</li>
              </ul>
              <a href="/signup" className="block mt-4 text-red-600 hover:underline text-sm font-medium">
                View Full Analysis →
              </a>
            </div>
          </div>
          <div className="text-center">
            <a 
              href="/signup" 
              className="inline-flex items-center px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Access All Sectors
              <ChevronRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Product Showcase: Suggested Portfolios */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Model Portfolios
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Three ready-to-use portfolios tailored to your risk tolerance. Includes sector allocation, rebalancing guidelines, and simulated historical performance.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Low Risk Portfolio */}
            <div className="bg-gray-800 p-6 rounded-xl hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-3">
                  {/* El ícono Shield ahora será renderizado correctamente */}
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Low Risk</h3>
                  <p className="text-sm text-gray-400">Conservative Growth</p>
                </div>
              </div>
              <ul className="text-sm text-gray-300 space-y-2 mb-4">
                <li>• 60% Defensive Sectors</li>
                <li>• Annual Rebalance</li>
                <li>• Simulated Return: +7.2% YTD</li>
                <li>• Top Holdings: JNJ, PG, V</li>
              </ul>
              <a href="/signup" className="block text-blue-400 hover:underline text-sm font-medium">
                Build This Portfolio →
              </a>
            </div>
            {/* Medium Risk Portfolio */}
            <div className="bg-gray-800 p-6 rounded-xl hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Medium Risk</h3>
                  <p className="text-sm text-gray-400">Balanced Income</p>
                </div>
              </div>
              <ul className="text-sm text-gray-300 space-y-2 mb-4">
                <li>• 40% Growth / 40% Value</li>
                <li>• Quarterly Rebalance</li>
                <li>• Simulated Return: +12.8% YTD</li>
                <li>• Top Holdings: AAPL, MSFT, JPM</li>
              </ul>
              <a href="/signup" className="block text-blue-400 hover:underline text-sm font-medium">
                Build This Portfolio →
              </a>
            </div>
            {/* High Risk Portfolio */}
            <div className="bg-gray-800 p-6 rounded-xl hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mr-3">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">High Risk</h3>
                  <p className="text-sm text-gray-400">Aggressive Growth</p>
                </div>
              </div>
              <ul className="text-sm text-gray-300 space-y-2 mb-4">
                <li>• 70% Momentum Sectors</li>
                <li>• Monthly Rebalance</li>
                <li>• Simulated Return: +18.5% YTD</li>
                <li>• Top Holdings: NVDA, TSLA, AMD</li>
              </ul>
              <a href="/signup" className="block text-blue-400 hover:underline text-sm font-medium">
                Build This Portfolio →
              </a>
            </div>
          </div>
          <div className="text-center mt-12">
            <a 
              href="/signup" 
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Choose Your Risk Level
              <ChevronRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Live Product Preview: Sector Table */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Live Sector Rankings
            </h2>
            <p className="text-xl text-gray-600">
              See the latest weekly rotation data. Track ranks, scores, signals, and trends across all US sectors. Upgrade for full historical access and custom tracking.
            </p>
          </div>
          {loading ? (
            <div className="text-center text-slate-500 py-12">
              Loading latest data...
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-12">
              Error: {error}
            </div>
          ) : data.length === 0 ? (
            <div className="text-center text-slate-500 py-12">
              No data available yet.
            </div>
          ) : (
            <SectorTable data={data} previousData={previousData} />
          )}
          <div className="text-center mt-12">
            <a 
              href="/signup" 
              className="inline-flex items-center px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Unlock Full Dashboard
              <ChevronRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Subscription Teaser */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4">
            Tailored for Every Investor
          </h2>
          <p className="text-xl mb-8">
            From free sector previews to premium portfolio tools—choose your plan and start optimizing today.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
            <div className="bg-white/10 p-6 rounded-xl">
              <h3 className="text-2xl font-bold mb-2">Free</h3>
              <ul className="text-left text-sm mb-4 space-y-1">
                <li>• Basic Sector Rankings</li>
                <li>• Weekly Updates</li>
                <li>• Model Portfolio Ideas</li>
              </ul>
              <a href="/signup" className="block w-full bg-white text-indigo-600 py-2 rounded-lg font-semibold">
                Get Started Free
              </a>
            </div>
            <div className="bg-white/10 p-6 rounded-xl">
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <ul className="text-left text-sm mb-4 space-y-1">
                <li>• Full Sector Analysis</li>
                <li>• Ticker Recommendations</li>
                <li>• Historical Data</li>
              </ul>
              <a href="/signup" className="block w-full bg-white text-indigo-600 py-2 rounded-lg font-semibold">
                Upgrade to Pro
              </a>
            </div>
            <div className="bg-white/10 p-6 rounded-xl">
              <h3 className="text-2xl font-bold mb-2">Premium</h3>
              <ul className="text-left text-sm mb-4 space-y-1">
                <li>• Custom Portfolios</li>
                <li>• Rebalancing Alerts</li>
                <li>• Priority Support</li>
              </ul>
              <a href="/signup" className="block w-full bg-white text-indigo-600 py-2 rounded-lg font-semibold">
                Go Premium
              </a>
            </div>
          </div>
          <a 
            href="/signup" 
            className="inline-flex items-center px-10 py-4 bg-white text-indigo-600 font-bold rounded-lg shadow-2xl hover:bg-gray-100 transition-all duration-300 text-lg"
          >
            Join Thousands of Investors
            <Users className="ml-3 w-6 h-6" />
          </a>
        </div>
      </section>
    </div>
  );
}