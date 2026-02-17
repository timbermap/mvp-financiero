'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import api from '@/services/api';

// --- NUEVO: Íconos de Lucide React para un look moderno ---
import { ChevronDown, UserCircle, Settings, LogOut, Menu, X, LayoutDashboard } from 'lucide-react';

// --- NUEVO: Componente Link Activo para resaltar la página actual ---
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center h-full px-3 text-sm font-semibold transition-colors
        ${isActive
          ? 'text-blue-600 border-b-2 border-blue-600'
          : 'text-slate-600 hover:text-blue-600'
        }`}
    >
      {children}
    </Link>
  );
}


export default function Navbar() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<{ email: string; subscription_tier: string } | null>(null);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Cierra el menú móvil cuando cambia la ruta
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Fetch del perfil de usuario (sin cambios)
  useEffect(() => {
    if (user && !loading) {
      api.get('/api/v1/users/me')
        .then((res) => setUserProfile(res.data))
        .catch((error) => console.error('Error fetching user profile:', error));
    }
  }, [user, loading]);

  // Logout (sin cambios)
  const handleLogout = async () => {
    await signOut(auth);
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
    setUserProfile(null);
    router.push('/');
  };

  // Click afuera para cerrar menús (mejorado)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* === LADO IZQUIERDO: Logo y Navegación Principal === */}
          <div className="flex items-center gap-8 h-full">
            <Link href="/" className="text-2xl font-bold text-slate-900 tracking-tight">
              LogoFin
            </Link>

            {/* Navegación para usuarios logueados (Free y Pro) */}
            {user && (
              <div className="hidden md:flex items-center h-full gap-6">
                <NavLink href="/dashboard">Dashboard</NavLink>
                
                {/* --- Menú de Productos Rediseñado --- */}
                <div className="relative group h-full flex items-center">
                  <button className="flex items-center gap-1 text-sm font-semibold text-slate-600 hover:text-blue-600 group-hover:text-blue-600">
                    <span>Products</span>
                    <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                  </button>
                  <div className="absolute top-full left-0 w-56 pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 invisible group-hover:visible">
                    <div className="bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 py-1">
                      <Link href="/product/rotations?risk=medium&horizon=month" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">Rotación de Sectores</Link>
                      <Link href="/product/portfolio" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">Portfolio Modelo</Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* === LADO DERECHO: Acciones y Menú de Usuario === */}
          <div className="flex items-center">
            <div className="hidden md:flex items-center gap-4">
              {loading ? (
                <div className="h-8 w-24 bg-slate-200 rounded-md animate-pulse" />
              ) : user ? (
                // --- Menú de Usuario Rediseñado ---
                <div className="relative" ref={userMenuRef}>
                  <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="flex items-center justify-center h-9 w-9 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors">
                    <UserCircle className="w-6 h-6 text-slate-600" />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute top-full right-0 w-64 pt-2">
                      <div className="bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="px-4 py-3 border-b border-slate-200">
                          <p className="text-sm font-semibold text-slate-800 truncate">{userProfile?.email || user.email}</p>
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full mt-1 inline-block ${userProfile?.subscription_tier === 'Pro' ? 'bg-violet-100 text-violet-700' : 'bg-blue-100 text-blue-700'}`}>
                            {userProfile?.subscription_tier || 'Free'}
                          </span>
                        </div>
                        <div className="py-1">
                          <Link href="/settings" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                            <Settings className="w-4 h-4 text-slate-500" />
                            <span>Settings</span>
                          </Link>
                          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700">
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // --- Botones para usuarios "Open" ---
                <>
                  <Link href="/login" className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-blue-600">Login</Link>
                  <Link href="/signup" className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">Sign Up</Link>
                </>
              )}
            </div>

            {/* --- Botón de Menú Móvil --- */}
            <div className="md:hidden ml-4">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-600">
                {isMobileMenuOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Panel de Menú Móvil --- */}
      {isMobileMenuOpen && (
        <div ref={mobileMenuRef} className="md:hidden bg-white border-t border-slate-200">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {user ? (
              <>
                <Link href="/dashboard" className="block px-2 py-2 font-semibold text-slate-700 rounded-md hover:bg-slate-100">Dashboard</Link>
                <Link href="/product/rotations?risk=medium&horizon=month" className="block px-2 py-2 font-semibold text-slate-700 rounded-md hover:bg-slate-100">Rotación de Sectores</Link>
                <Link href="/product/portfolio" className="block px-2 py-2 font-semibold text-slate-700 rounded-md hover:bg-slate-100">Portfolio Modelo</Link>
                <Link href="/settings" className="block px-2 py-2 font-semibold text-slate-700 rounded-md hover:bg-slate-100">Settings</Link>
                <button onClick={handleLogout} className="w-full text-left px-2 py-2 font-semibold text-red-600 rounded-md hover:bg-red-50">Logout</button>
              </>
            ) : (
              <>
                <Link href="/login" className="block px-2 py-2 font-semibold text-slate-700 rounded-md hover:bg-slate-100">Login</Link>
                <Link href="/signup" className="block w-full text-center px-2 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}