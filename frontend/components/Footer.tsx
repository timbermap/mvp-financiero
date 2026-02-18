// components/Footer.tsx
import { Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Columna 1: Marca y Eslogan */}
          <div className="space-y-4 md:col-span-2 lg:col-span-1">
            <a href="/" className="font-bold text-xl text-white hover:text-teal-400 transition-colors">
              MVP Financiero
            </a>
            <p className="text-sm text-slate-400 max-w-xs">
              Data-driven insights for smarter sector investing.
            </p>
          </div>

          {/* Columna 2: Producto (Actualizado) */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm text-slate-400 tracking-wider uppercase">
              Product
            </h3>
            <ul className="space-y-3 text-sm">
              <li><a href="/rotations" className="hover:text-teal-400 transition-colors">Rotations</a></li>
              <li><a href="/portfolio" className="hover:text-teal-400 transition-colors">Portfolio</a></li>
              <li><a href="/methodology" className="hover:text-teal-400 transition-colors">Methodology</a></li>
              <li><a href="/pricing" className="hover:text-teal-400 transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Columna 3: Recursos (Actualizado) */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm text-slate-400 tracking-wider uppercase">
              Resources
            </h3>
            <ul className="space-y-3 text-sm">
              <li><a href="/faq" className="hover:text-teal-400 transition-colors">FAQ</a></li>
              <li><a href="/contact" className="hover:text-teal-400 transition-colors">Contact Us</a></li>
              <li><a href="/disclaimer" className="hover:text-teal-400 transition-colors">Disclaimer</a></li>
            </ul>
          </div>

          {/* Columna 4: Compañía */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm text-slate-400 tracking-wider uppercase">
              Company
            </h3>
            <ul className="space-y-3 text-sm">
              <li><a href="/about" className="hover:text-teal-400 transition-colors">About Us</a></li>
              <li><a href="/terms" className="hover:text-teal-400 transition-colors">Terms of Service</a></li>
              <li><a href="/privacy" className="hover:text-teal-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-slate-500 order-2 sm:order-1 mt-4 sm:mt-0">
            &copy; {new Date().getFullYear()} MVP Financiero. All rights reserved.
          </p>
          <div className="flex space-x-4 order-1 sm:order-2">
            <a href="#" aria-label="Twitter" className="text-slate-500 hover:text-teal-400 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" aria-label="LinkedIn" className="text-slate-500 hover:text-teal-400 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}