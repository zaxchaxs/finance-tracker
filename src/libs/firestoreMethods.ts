"use client";

import {
  collection,
  doc,
  getCountFromServer,
  getDoc,
  setDoc,
  deleteDoc,
  getDocs,
  where,
  query,
  QueryConstraint,
} from "firebase/firestore";
import { auth, db } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, deleteUser, User, GoogleAuthProvider, signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { UserDocType } from "@/types/authenticationModel";
import { FirebaseError } from "firebase/app";

export const addUser = async (idUser: string, newData: object) => {
  try {
    const userRef = doc(db, "users", `${idUser}`);
    await setDoc(userRef, newData);
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Something wrong!";
    console.error(errMessage);
    throw Error(errMessage);
  }
};

export const getDocUserById = async (idUser: string): Promise<UserDocType> => {
  try {
    const userRef = doc(db, "users", idUser);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      return docSnap.data() as UserDocType;
    } else {
      throw new Error("User not found!");
    }
  } catch (e) {
    const errMessage = e instanceof Error ? e.message : "Something wrong!"
    console.error(errMessage);
    throw new Error(errMessage);
  }
};

export const loginWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    if (user) await getDocUserById(user.uid);
    return user;
  } catch (e) {
    const errMessage = e instanceof Error ? e.message : "Something wrong!";
    console.error(errMessage);
    throw new Error("Email or password wrong.");
  };
};

export const registerWithEmailAndPassword = async (name: string, email: string, password: string) => {
  try {
    // firebase auth
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    // add user to firestore
    if (user) {
      const newData = {
        userId: user.uid,
        email: user.email,
        name: name,
        createdAt: new Date(),
        photoURL: user.photoURL

      }
      await addUser(user.uid, newData);
    } else {
      throw new Error("Firebase error authenticating")
    }
  } catch (e) {
    const errMessage = e instanceof Error ? e.message : "Something wrong!";
    console.error(errMessage);
  }
};

export const registerWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account"
    });
    const { user } = await signInWithPopup(auth, provider);
    if (user) {
      const newData = {
        userId: user.uid,
        email: user.email,
        name: user.displayName,
        createdAt: new Date(),
        photoURL: user.photoURL

      }
      await addUser(user.uid, newData);
    } else {
      throw new Error("Firebase error authenticating")
    }
  } catch (error) {    
    const credential = GoogleAuthProvider.credentialFromError(error as FirebaseError);
    if (credential) {
      console.error(credential);
    }
    const errMessage = error instanceof Error ? error.message : "Something wrong!";
    console.error(errMessage);
    throw new Error(errMessage);
  }
}

export const registerWithGithub = async () => {
  try {
    const provider = new GithubAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account"
    });
    const { user } = await signInWithPopup(auth, provider);
    if (user) {
      const newData = {
        userId: user.uid,
        email: user.email,
        name: user.displayName,
        createdAt: new Date(),
        photoURL: user.photoURL

      }
      await addUser(user.uid, newData);
    } else {
      throw new Error("Firebase error authenticating")
    }
  } catch (error) {    
    const credential = GithubAuthProvider.credentialFromError(error as FirebaseError);
    if (credential) {
      console.error(credential);
    }
    const errMessage = error instanceof Error ? error.message : "Something wrong!";
    console.error(errMessage);
    throw new Error(errMessage);
  }
}

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Something wrong!";
    console.error(errMessage);
  }
}

export const deleteUserAccount = async (user: User) => {
  try {
    const transactionQ = query(collection(db, "user-transactions", user.uid, "transactions"));
    const transactionSnap = await getDocs(transactionQ);
    transactionSnap.forEach(async doc => {
      deleteDoc(doc.ref)
    });
    
    // delete all wallets
    const walletQ = query(collection(db, 'user-wallets'), where("userId", "==", user.uid))
    const walletSnap = await getDocs(walletQ);
    walletSnap.forEach(async (doc) => {  
      await deleteDoc(doc.ref)
    })

    const userRef = doc(db, "users", user.uid);
    await deleteDoc(userRef);
    await deleteUser(user);
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Something wrong!";
    console.error(errMessage);
  }
}

export const getDocumentCount = async (collectionName: string, ...queryConstainr: QueryConstraint[]) => {
  try {
    const q = query(collection(db, collectionName), ...queryConstainr)
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Something wrong!";
    console.error(errMessage);
    return 0;
  }
}