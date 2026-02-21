'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import api from '@/services/api';

// --- Modern Lucide icons ---
import { 
  ChevronDown, 
  UserCircle, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  BarChart3 
} from 'lucide-react';

// --- Active NavLink with emerald accent ---
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + '?');

  return (
    <Link
      href={href}
      className={`flex items-center h-full px-4 text-sm font-semibold transition-all border-b-2
        ${isActive
          ? 'text-emerald-600 border-emerald-600'
          : 'text-slate-600 border-transparent hover:text-slate-900 hover:border-slate-300'
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

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Fetch user profile
  useEffect(() => {
    if (user && !loading) {
      api.get('/api/v1/users/me')
        .then((res) => setUserProfile(res.data))
        .catch((error) => console.error('Error fetching user profile:', error));
    }
  }, [user, loading]);

  const handleLogout = async () => {
    await signOut(auth);
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
    setUserProfile(null);
    router.push('/');
  };

  // Close menus when clicking outside
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
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* === LEFT SIDE: Logo + Navigation === */}
          <div className="flex items-center gap-10 h-full">
            {/* Professional Logo with emerald accent */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-emerald-600 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tighter text-slate-900 group-hover:text-emerald-600 transition-colors">
                Horizon
              </span>
            </Link>

            {/* Desktop Navigation - only for logged-in users */}
            {user && (
              <div className="hidden md:flex items-center h-full gap-2">
                <NavLink href="/dashboard">Dashboard</NavLink>

                {/* Products Dropdown - clean & professional */}
                <div className="relative group h-full flex items-center">
                  <button className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
                    Products
                    <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                  </button>

                  <div className="absolute top-full left-0 w-64 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-white rounded-2xl shadow-xl ring-1 ring-black/5 py-2 border border-slate-100">
                      <Link 
                        href="/product/rotations?risk=medium&horizon=month" 
                        className="flex items-center gap-3 px-5 py-3 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl mx-1 transition-colors"
                      >
                        <BarChart3 className="w-4 h-4" />
                        Sector Rotation
                      </Link>
                      <Link 
                        href="/product/portfolio?risk=medium&horizon=month" 
                        className="flex items-center gap-3 px-5 py-3 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl mx-1 transition-colors"
                      >
                        <BarChart3 className="w-4 h-4" />
                        Model Portfolio
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* === RIGHT SIDE: User actions === */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-4">
              {loading ? (
                <div className="h-9 w-28 bg-slate-100 rounded-2xl animate-pulse" />
              ) : user ? (
                <div className="relative" ref={userMenuRef}>
                  <button 
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2.5 pl-3 pr-4 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl transition-all"
                  >
                    <UserCircle className="w-6 h-6 text-slate-600" />
                    <div className="text-left">
                      <p className="text-xs font-medium text-slate-500">Account</p>
                      <p className="text-sm font-semibold text-slate-900 -mt-0.5 truncate max-w-[140px]">
                        {userProfile?.email || user.email}
                      </p>
                    </div>
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute top-full right-0 mt-3 w-72">
                      <div className="bg-white rounded-2xl shadow-xl ring-1 ring-black/5 border border-slate-100 overflow-hidden">
                        <div className="px-6 py-5 border-b border-slate-100 bg-slate-50">
                          <p className="font-semibold text-slate-900">{userProfile?.email || user.email}</p>
                          <span className={`inline-block mt-2 text-xs font-bold px-3 py-1 rounded-full 
                            ${userProfile?.subscription_tier === 'Pro' 
                              ? 'bg-emerald-100 text-emerald-700' 
                              : 'bg-slate-200 text-slate-600'}`}>
                            {userProfile?.subscription_tier || 'Free'}
                          </span>
                        </div>

                        <div className="p-2">
                          <Link 
                            href="/settings" 
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-3 px-5 py-3 text-sm text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
                          >
                            <Settings className="w-4 h-4" />
                            Settings
                          </Link>
                          <button 
                            onClick={handleLogout} 
                            className="w-full flex items-center gap-3 px-5 py-3 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            Logout
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link 
                    href="/login" 
                    className="px-5 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    Log in
                  </Link>
                  <Link 
                    href="/login?register=true" 
                    className="px-5 py-2 text-sm font-semibold text-white bg-emerald-600 rounded-2xl hover:bg-emerald-700 transition-all active:scale-95"
                  >
                    Get started free
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* === Mobile Menu === */}
      {isMobileMenuOpen && (
        <div ref={mobileMenuRef} className="md:hidden bg-white border-t border-slate-200 py-4">
          <div className="px-6 space-y-1">
            {user ? (
              <>
                <Link href="/dashboard" className="block px-4 py-3 font-semibold text-slate-700 rounded-2xl hover:bg-slate-100">Dashboard</Link>
                <Link href="/product/rotations?risk=medium&horizon=month" className="block px-4 py-3 font-semibold text-slate-700 rounded-2xl hover:bg-slate-100">Sector Rotation</Link>
                <Link href="/product/portfolio?risk=medium&horizon=month" className="block px-4 py-3 font-semibold text-slate-700 rounded-2xl hover:bg-slate-100">Model Portfolio</Link>
                <Link href="/settings" className="block px-4 py-3 font-semibold text-slate-700 rounded-2xl hover:bg-slate-100">Settings</Link>
                <button 
                  onClick={handleLogout} 
                  className="w-full text-left px-4 py-3 font-semibold text-red-600 hover:bg-red-50 rounded-2xl"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="block px-4 py-3 font-semibold text-slate-700 rounded-2xl hover:bg-slate-100">Log in</Link>
                <Link href="/login?register=true" className="block w-full text-center px-4 py-3 font-semibold text-white bg-emerald-600 rounded-2xl hover:bg-emerald-700">Get started free</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}