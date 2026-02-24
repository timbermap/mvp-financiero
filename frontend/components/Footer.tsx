import Link from 'next/link';
import { Twitter, Linkedin, BarChart3 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          
          {/* === Columna Marca === */}
          <div className="lg:col-span-5">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 bg-emerald-600 rounded-2xl flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-3xl tracking-tighter text-white group-hover:text-emerald-400 transition-colors">
                CurateVista
              </span>
            </Link>
            
            {/* Texto ajustado para enfoque en "datos" e "investigación" */}
            <p className="mt-6 text-slate-400 max-w-md leading-relaxed">
              Systematic sector data and algorithmic model screens designed for independent market research.
            </p>
          </div>

          {/* === Product === */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-sm tracking-widest uppercase text-slate-400 mb-5">Platform</h3>
            <ul className="space-y-3 text-[15px]">
              {/* Rutas mantenidas, textos cambiados */}
              <li><Link href="/rotations" className="hover:text-emerald-400 transition-colors">Sector Analytics</Link></li>
              <li><Link href="/portfolio" className="hover:text-emerald-400 transition-colors">Model Watchlists</Link></li>
              <li><Link href="/methodology" className="hover:text-emerald-400 transition-colors">Methodology</Link></li>
              <li><Link href="/pricing" className="hover:text-emerald-400 transition-colors">Pricing</Link></li>
            </ul>
          </div>

          {/* === Resources === */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-sm tracking-widest uppercase text-slate-400 mb-5">Resources</h3>
            <ul className="space-y-3 text-[15px]">
              <li><Link href="/faq" className="hover:text-emerald-400 transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-emerald-400 transition-colors">Contact Us</Link></li>
              <li><Link href="/disclaimer" className="hover:text-emerald-400 transition-colors">Disclaimer</Link></li>
            </ul>
          </div>

          {/* === Company === */}
          <div className="lg:col-span-3">
            <h3 className="font-semibold text-sm tracking-widest uppercase text-slate-400 mb-5">Company</h3>
            <ul className="space-y-3 text-[15px]">
              <li><Link href="/about" className="hover:text-emerald-400 transition-colors">About Us</Link></li>
              <li><Link href="/terms" className="hover:text-emerald-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* === Bottom Bar === */}
        <div className="mt-20 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} CurateVista. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6 text-slate-400">
            <a href="#" aria-label="Twitter" className="hover:text-emerald-400 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-emerald-400 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}