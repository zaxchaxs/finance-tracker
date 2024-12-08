"use client";
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { auth } from '@/libs/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { getDocUserById } from '@/libs/firestoreMethods';
import { DocumentData } from 'firebase/firestore';

type PropType = {
  children: ReactNode;
}

type AuthContextType = {
  currUser: User | null,
  loading: boolean,
  docUser: DocumentData | null
}

const initialAuthContextState: AuthContextType = {
  currUser: null,
  loading: false,
  docUser: null
}
const AuthContext = createContext<AuthContextType>(initialAuthContextState);


export function AuthProviderContext({ children }: PropType) {
  const [currUser, setCurrUser] = useState<User | null>(null);
  const [docUser, setDocUser] = useState<DocumentData>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user) {
        setCurrUser(user);
      }
        
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
