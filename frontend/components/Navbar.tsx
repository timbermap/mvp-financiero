'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import api from '@/services/api';

// Íconos
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default function Navbar() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<{ email: string; subscription_tier: string } | null>(null);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Fetch user profile when user is logged in
  useEffect(() => {
    if (user && !loading) {
      api.get('/api/v1/users/me')
        .then((res) => {
          setUserProfile(res.data);
        })
        .catch((error) => {
          console.error('Error fetching user profile:', error);
        });
    }
  }, [user, loading]);

  // Logout + redirect
  const handleLogout = async () => {
    await signOut(auth);
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
    setUserProfile(null);
    router.push('/');
  };

  // Cerrar menús al clickear afuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo + Products */}
          <div className="flex items-center h-full">
            <Link href="/" className="text-3xl font-bold text-blue-600">
              LogoFin
            </Link>

            {user && (
              <div
                className="hidden md:flex items-center h-full relative ml-10"
                onMouseEnter={() => setIsProductsMenuOpen(true)}
                onMouseLeave={() => setIsProductsMenuOpen(false)}
              >
                <button className="text-gray-700 hover:text-blue-600 font-medium">
                  Products
                </button>

                {isProductsMenuOpen && (
                  <div className="absolute left-0 top-full w-56 pt-2">
                    <div className="bg-white rounded-md shadow-xl py-1">
                      <Link
                        href="/product/rotations"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      >
                        Rotación de Sectores
                      </Link>

                      <Link
                        href="/product/portfolio"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      >
                        Portfolio Modelo
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Usuario Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {loading ? (
              <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
            ) : user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="h-10 w-10 bg-blue-600 text-white rounded-full font-semibold"
                >
                  {user.email?.charAt(0).toUpperCase()}
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 top-full w-56 pt-2">
                    <div className="bg-white rounded-md shadow-xl py-1">
                      <div className="px-4 py-2 border-b text-sm text-gray-800">
                        <div className="truncate">{userProfile?.email || user.email}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          Tier: {userProfile?.subscription_tier || 'Loading...'}
                        </div>
                      </div>

                      <Link
                        href="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Settings
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login" className="text-sm text-gray-700 hover:text-blue-600">
                  Login
                </Link>
                <Link href="/signup" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                  Sign Up for Free
                </Link>
              </>
            )}
          </div>

          {/* Mobile button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700"
            >
              {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil (opcional) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md" ref={mobileMenuRef}>
          <div className="px-4 py-3 space-y-2">
            {user && (
              <>
                <Link href="/product/rotations" className="block text-gray-700 hover:text-blue-600">
                  Rotación de Sectores
                </Link>
                <Link href="/product/portfolio" className="block text-gray-700 hover:text-blue-600">
                  Portfolio Modelo
                </Link>
                <Link href="/settings" className="block text-gray-700 hover:text-blue-600">
                  Settings
                </Link>
                <button onClick={handleLogout} className="block text-red-600">
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}