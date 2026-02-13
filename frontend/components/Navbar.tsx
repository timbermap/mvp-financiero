// components/Navbar.tsx
'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';

export default function Navbar() {
  const { user, loading } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
    // No necesitas redirigir, el AuthContext se encargará de actualizar el estado
  };

  return (
    <nav className="w-full bg-white shadow-md p-4 flex justify-between items-center">
      {/* Lado Izquierdo: Logo y Productos */}
      <div className="flex items-center space-x-8">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          LogoFin
        </Link>
        <div className="hidden md:flex space-x-4">
          <Link href="/dashboard" className="text-gray-600 hover:text-blue-500">
            Rotación de Sectores
          </Link>
          {/* <Link href="/portfolio" className="text-gray-600 hover:text-blue-500">Portfolio Modelo</Link> */}
        </div>
      </div>

      {/* Lado Derecho: Lógica de Autenticación */}
      <div className="flex items-center space-x-4">
        {loading ? (
          <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
        ) : user ? (
          // -- VISTA LOGUEADA --
          <div className="relative">
            <button onClick={handleLogout} className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600">
              Logout
            </button>
            {/* Aquí podrías añadir un dropdown para el perfil */}
          </div>
        ) : (
          // -- VISTA DESCONECTADA --
          <>
            <Link href="/login" className="text-gray-600 hover:text-blue-500">
              Login
            </Link>
            <Link href="/signup" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Sign Up for Free
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}