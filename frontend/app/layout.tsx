// frontend/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar"; // <-- IMPORTAR NAVBAR
import Footer from "@/components/Footer"; // <-- IMPORTAR FOOTER

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MVP Financiero",
  description: "Análisis de mercados con IA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <AuthProvider>
          <Navbar /> {/* <-- AÑADIR NAVBAR AQUÍ */}
          <main className="flex-grow">
            {children}
          </main>
          <Footer /> {/* <-- AÑADIR FOOTER AQUÍ */}
        </AuthProvider>
      </body>
    </html>
  );
}