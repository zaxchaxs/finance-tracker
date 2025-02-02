"use client";

import {
  collection,
  doc,
  getCountFromServer,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { UserDocType } from "@/types/authenticationModel";

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

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Something wrong!";
    console.error(errMessage);
  }
}

export const getDocumentCount = async (collectionName: string) => {
  try {
    const col = collection(db, collectionName);
    const snapshot = await getCountFromServer(col);
    return snapshot.data().count;
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Something wrong!";
    console.error(errMessage);
    return 0;
  }
}