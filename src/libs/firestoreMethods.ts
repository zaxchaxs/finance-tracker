"use client";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const addUser = async (idUser, newData) => {
  try {
    const userRef = doc(db, "users", `${idUser}`);
    await setDoc(userRef, newData);
  } catch (error) {
    console.error(error.message);
    throw Error(error.message);
  }
};

const getDocUserById = async (idUser) => {
  try {
    const userRef = doc(db, "users", idUser);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      return docSnap;
    } else {
      throw new Error("User/email not found!");
    }
  } catch (e) {
    console.error(e.message);
    throw e.message;
  }
};

const updateWalletDoc = async (accountId, newData) => {
  try {
    const q = query(
      collection(db, "user-wallets"),
      where("accountId", "==", accountId)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) throw new Error("Wallet Account ID Not Found");

    querySnapshot.forEach(async (document) => {
      const docRef = doc(db, "user-wallets", document.id);
      await updateDoc(docRef, newData);
    });
  } catch (error) {
    console.error(error.message);
    throw new Error(`${error.message}`);
  }
};

const deleteWalletDoc = async (accountId, userId) => {
  try {
    // Deleting transactions history of the wallet first
    const queryTransac = query(
      collection(db, "user-transactions", userId, "transactions"),
      where("accountId", "==", accountId)
    );
    const querySnapshotTransac = await getDocs(queryTransac);

    if (!querySnapshotTransac.empty) {
      querySnapshotTransac.forEach(async (document) => {
        const docRef = doc(
          db,
          "user-transactions",
          userId,
          "transactions",
          document.id
        );
        await deleteDoc(docRef);
      });
    }

    //   and delete doc wallet
    const queryWallet = query(
      collection(db, "user-wallets"),
      where("accountId", "==", accountId)
    );
    const querySnapshotWallet = await getDocs(queryWallet);

    if (querySnapshotWallet.empty)
      throw new Error("Wallet Account ID Not Found");

    querySnapshotWallet.forEach(async (document) => {
      const docRef = doc(db, "user-wallets", document.id);
      await deleteDoc(docRef);
    });
  } catch (error) {
    console.error(error.message);
    throw new Error(`${error.message}`);
  }
};

const loginWithEmailAndPassword = async (email: string, password: string) => {
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

const registerWithEmailAndPassword = async (name: string, email: string, password: string) => {
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

export {
  loginWithEmailAndPassword,
  registerWithEmailAndPassword,
  getDocUserById,
  addUser,
  updateWalletDoc,
  deleteWalletDoc,
};
