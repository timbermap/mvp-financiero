// frontend/app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'; // Importaciones de Firestore
import { auth, db } from '@/lib/firebase'; // Importamos 'auth' y 'db'

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false); // Para cambiar entre Login y Registro
  const [error, setError] = useState('');
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      if (isRegistering) {
        // --- Lógica de Registro ---
        // 1. Crear el usuario en Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const newUser = userCredential.user;

        // 2. Crear el documento del usuario en la base de datos Firestore
        // Esto es CRUCIAL para que el AuthContext pueda encontrar su 'tier'
        await setDoc(doc(db, "users", newUser.uid), {
          email: newUser.email,
          tier: 'FREE', // Asignamos el tier por defecto a los nuevos usuarios
          createdAt: serverTimestamp(), // Buena práctica: guardar la fecha de creación
        });

      } else {
        // --- Lógica de Inicio de Sesión ---
        await signInWithEmailAndPassword(auth, email, password);
      }

      // Si todo va bien, redirigimos al dashboard
      router.push('/dashboard'); 

    } catch (err: any) {
      console.error("Error de autenticación:", err);
      // Mensajes de error amigables para el usuario
      if (err.code === 'auth/invalid-credential') {
        setError('El email o la contraseña son incorrectos.');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('Este email ya está registrado. Intenta iniciar sesión.');
      } else if (err.code === 'auth/weak-password') {
        setError('La contraseña es muy débil. Debe tener al menos 6 caracteres.');
      } else {
        setError('Ocurrió un error inesperado. Por favor, intenta de nuevo.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          {isRegistering ? 'Crear una Cuenta' : 'Bienvenido de Nuevo'}
        </h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password"className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete={isRegistering ? "new-password" : "current-password"}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
          >
            {isRegistering ? 'Registrarse' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {isRegistering ? '¿Ya tienes una cuenta?' : '¿Aún no tienes cuenta?'}
            <button
              onClick={() => {
                setIsRegistering(!isRegistering);
                setError(''); // Limpiamos errores al cambiar de modo
              }}
              className="font-medium text-blue-600 hover:text-blue-500 ml-1"
            >
              {isRegistering ? 'Inicia Sesión' : 'Regístrate gratis'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}