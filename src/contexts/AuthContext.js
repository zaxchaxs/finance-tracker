"use client";
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '@/libs/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currUser, setCurrUser] = useState();
  const [loading, setLoading] = useState(true);
  const [isUserLogged, setIsUserLogged] = useState(false);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currUser, loading, isUserLogged }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
