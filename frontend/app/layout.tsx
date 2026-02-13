// frontend/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext"; // Asumiendo carpeta 'context'
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MVP Financiero - Análisis de Sectores",
  description: "Dashboard inteligente para rotación de sectores y portafolios. Versión PRO para detalles avanzados.",
  keywords: "finanzas, inversión, sectores, AI, MVP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthProvider>
          {/* Header simple para navegación (mejora: usability) */}
          <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">MVP Financiero</h1>
            <nav>
              <Link href="/login" className="mr-4">Login</Link>
              <Link href="/signup">Signup</Link>
            </nav>
          </header>
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}