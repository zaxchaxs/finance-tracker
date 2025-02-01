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
  const [loading, setLoading] = useState(false);

  const userDocSnap = async (user: User) => {
    const docSnap = await getDocUserById(user.uid)
    setDocUser(docSnap.data())
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      try {
        if(user) {
          setCurrUser(user);
          await userDocSnap(user);
        } else {
          setCurrUser(null);
        };
      } catch (error) {
        const errMessage = error instanceof Error ? error.message : "Something Wrong!"
        console.error(errMessage)
      } finally {
        setLoading(false);
      };
    });

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
