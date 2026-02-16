'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { 
  Shield, 
  ShieldCheck, 
  ShieldAlert, 
  ArrowRight, 
  Lock, 
  Crown,
  BarChartHorizontalBig,
  PieChart,
  Loader2 // <-- Icono para el estado de carga
} from 'lucide-react';

// --- ¡IMPORTAMOS EL HOOK REAL DE TU APLICACIÓN! ---
import { useAuth } from '@/context/AuthContext'; 

/* ---------------------------------------------------
   COMPONENTE DE TARJETA DEL DASHBOARD (DashboardCard)
   (Este componente no necesita cambios, ya está listo para ser controlado por props)
--------------------------------------------------- */
type DashboardCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  isLocked: boolean;
  links: {
    name: string;
    href: string;
    icon: ReactNode;
  }[];
};

const DashboardCard = ({ icon, title, description, isLocked, links }: DashboardCardProps) => {
  const baseClasses = "relative group flex flex-col justify-between rounded-xl p-6 bg-slate-900 border border-slate-700 transition-all duration-300 h-full";
  const unlockedClasses = "hover:border-teal-500 hover:-translate-y-1";
  const lockedClasses = "opacity-60 filter grayscale-[50%]";

  return (
    <div className={`${baseClasses} ${isLocked ? lockedClasses : unlockedClasses}`}>
      {isLocked && (
        <div className="absolute top-4 right-4 flex items-center gap-2 bg-amber-500/10 text-amber-400 text-xs font-bold px-3 py-1 rounded-full">
          <Crown className="w-4 h-4" />
          PRO
        </div>
      )}

      <div>
        <div className="mb-4 text-teal-400">{icon}</div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-slate-400 text-sm">{description}</p>
      </div>

      <div className="mt-6 space-y-3">
        {links.map((link, index) => {
          const linkHref = isLocked ? '/upgrade' : link.href; // Redirige a upgrade si está bloqueado
          return (
            <Link href={linkHref} key={index} className={`flex items-center justify-between w-full text-sm font-semibold p-3 rounded-lg transition-colors ${isLocked ? 'bg-slate-800 cursor-not-allowed' : 'bg-slate-800/50 hover:bg-slate-800 text-slate-300 hover:text-white'}`}>
              <span className="flex items-center gap-2">
                {link.icon}
                {link.name}
              </span>
              {isLocked ? <Lock className="w-4 h-4 text-amber-400" /> : <ArrowRight className="w-4 h-4 text-slate-500" />}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

/* ---------------------------------------------------
   PÁGINA PRINCIPAL DEL DASHBOARD (CON AUTENTICACIÓN REAL)
--------------------------------------------------- */
export default function DashboardPage() {
  // --- Usamos el hook para obtener el estado real de autenticación y el tier ---
  // Asumimos que tu AuthContext ahora también provee 'userTier'
  const { user, loading } = useAuth();

  // --- Estado de Carga Profesional ---
  // Mientras se verifica el usuario, mostramos un loader para evitar parpadeos
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <Loader2 className="w-12 h-12 animate-spin text-teal-500" />
        <p className="mt-4 text-lg text-slate-400">Authenticating...</p>
      </div>
    );
  }

  // --- Si no hay usuario, puedes redirigir o mostrar un mensaje ---
  // (Opcional, pero recomendado si esta es una ruta protegida)
  if (!user) {
     return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
            <h2 className="text-2xl font-bold">Access Denied</h2>
            <p className="mt-2 text-slate-400">Please <Link href="/login" className="text-teal-400 hover:underline">log in</Link> to view your dashboard.</p>
        </div>
     )
  }

  const dashboardMatrixData = [
    // --- Fila: Bajo Riesgo ---
    { risk: 'Low', horizon: '1 Week', icon: <Shield className="w-8 h-8" />, title: "Low Risk / 1 Week", description: "Capital preservation strategies for short-term market stability." },
    { risk: 'Low', horizon: '2-4 Weeks', icon: <Shield className="w-8 h-8" />, title: "Low Risk / 2-4 Weeks", description: "Defensive sector plays with a focus on minimizing volatility." },
    { risk: 'Low', horizon: '1 Year', icon: <Shield className="w-8 h-8" />, title: "Low Risk / 1 Year", description: "Long-term holdings in historically stable and dividend-paying sectors." },
    // --- Fila: Medio Riesgo ---
    { risk: 'Medium', horizon: '1 Week', icon: <ShieldCheck className="w-8 h-8" />, title: "Medium Risk / 1 Week", description: "Tactical trades based on immediate bullish signals and trends." },
    { risk: 'Medium', horizon: '2-4 Weeks', icon: <ShieldCheck className="w-8 h-8" />, title: "Medium Risk / 2-4 Weeks", description: "Core strategy focusing on sectors with confirmed upward momentum." },
    { risk: 'Medium', horizon: '1 Year', icon: <ShieldCheck className="w-8 h-8" />, title: "Medium Risk / 1 Year", description: "Investing in sectors poised for cyclical growth over the next year." },
    // --- Fila: Alto Riesgo ---
    { risk: 'High', horizon: '1 Week', icon: <ShieldAlert className="w-8 h-8" />, title: "High Risk / 1 Week", description: "Aggressive, speculative plays on highly volatile sectors." },
    { risk: 'High', horizon: '2-4 Weeks', icon: <ShieldAlert className="w-8 h-8" />, title: "High Risk / 2-4 Weeks", description: "Targeting breakout sectors with high growth potential and risk." },
    { risk: 'High', horizon: '1 Year', icon: <ShieldAlert className="w-8 h-8" />, title: "High Risk / 1 Year", description: "Thematic investments in disruptive and emerging industries." },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Investment Strategy Dashboard</h1>
          <p className="mt-2 text-lg text-slate-400">Select a risk and time horizon to view your tailored strategy.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardMatrixData.map((card, index) => {
            
            // --- LÓGICA DE ACCESO CON DATOS REALES DEL BACKEND ---
            const isFreeAccess = card.risk === 'Medium' && card.horizon === '2-4 Weeks';
            const isLocked = userTier === 'FREE' && !isFreeAccess;

            return (
              <DashboardCard
                key={index}
                icon={card.icon}
                title={card.title}
                description={card.description}
                isLocked={isLocked}
                links={[
                  { name: 'Sector Rotation', href: `/dashboard/sector-rotation?risk=${card.risk}&horizon=${card.horizon}`, icon: <BarChartHorizontalBig className="w-4 h-4"/> },
                  { name: 'Portfolio', href: `/dashboard/portfolio?risk=${card.risk}&horizon=${card.horizon}`, icon: <PieChart className="w-4 h-4" /> },
                ]}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}