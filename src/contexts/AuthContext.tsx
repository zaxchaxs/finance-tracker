"use client";
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { auth } from '@/libs/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { getDocUserById } from '@/libs/firestoreMethods';
import { UserDocType } from '@/types/authenticationModel';

type PropType = {
  children: ReactNode;
}

type AuthContextType = {
  currUser: User | null,
  loading: boolean,
  docUser: UserDocType | null
}

const initialAuthContextState: AuthContextType = {
  currUser: null,
  loading: false,
  docUser: null
}
const AuthContext = createContext<AuthContextType>(initialAuthContextState);


export function AuthProviderContext({ children }: PropType) {
  const [currUser, setCurrUser] = useState<User | null>(null);
  const [docUser, setDocUser] = useState<UserDocType | null>(null);
  const [loading, setLoading] = useState(true);

  const userDocSnap = async (user: User) => {
    try {
      const userDocument = await getDocUserById(user.uid);
      setDocUser(userDocument)
    } catch (e) {
      const message = e instanceof Error ? e.message : "Something wrong!"
      console.error(message);
    }
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
