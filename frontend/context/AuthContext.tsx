// frontend/context/AuthContext.tsx
'use client'; // Indica que este código corre en el navegador, no en el servidor

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';

// Definimos qué información vamos a compartir
interface AuthContextType {
  user: User | null; // El usuario o nulo si no hay nadie
  loading: boolean;  // ¿Estamos esperando a Firebase?
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Esta función de Firebase nos avisa cuando cambia el estado (login/logout)
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children} 
    </AuthContext.Provider>
  );
};

// Un hook personalizado para usar el contexto fácilmente
export const useAuth = () => useContext(AuthContext);