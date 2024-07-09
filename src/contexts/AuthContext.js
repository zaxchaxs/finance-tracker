"use client";
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '@/libs/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getDocUserById } from '@/libs/firestoreMethods';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [docUser, setDocUser] = useState({});
  const [currUser, setCurrUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrUser(user);
      setLoading(false);
    });

    const userDocSnap = async () => {
      const docSnap = await getDocUserById(currUser?.uid)
      setDocUser(docSnap.data())
    };

    if(currUser) {
      userDocSnap()
    } else {
      setCurrUser(null);
    };

    return () => unsubscribe();
  }, [currUser]);

  return (
    <AuthContext.Provider value={{ currUser, loading, docUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
