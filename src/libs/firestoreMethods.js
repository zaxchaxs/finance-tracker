"use client";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
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
import { db } from "./firebase";

const addUser = async (idUser, newData) => {
  try {
    const userRef = doc(db, "users", `${idUser}`);
    await setDoc(userRef, newData);
  } catch (error) {
    console.error(error.message);
  }
};

const getDocUserById = async (idUser) => {
  try {
    const userRef = doc(db, "users", idUser);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      return docSnap;
    } else {
      throw new Error("User not found");
    }
  } catch (e) {
    console.error(e.message);
  }
};

const addDocWallet = async (newData) => {
  try {
    const docRef = collection(db, "user-wallets");
    await addDoc(docRef, newData);
  } catch (error) {
    console.error(error.message);
    throw new Error(`Something wrong: ${error.message}`);
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

const getSnapshotUserWallet = async (idUser, setUserWalletData) => {
  try {
    const q = query(
      collection(db, "user-wallets"),
      where("userId", "==", idUser)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newData = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      setUserWalletData(newData);
      // unsubscribe();
    });
  } catch (e) {
    console.error(e.message);
    throw e; // Lempar error biar bisa ditangani di luar fungsi
  }
};

const getSnapshotUserTransaction = async (idUser, setCurrTransaction) => {
  try {
    const q = query(
      collection(db, `user-transactions/${idUser}/transactions`),
      orderBy("createdAt", "desc"),
      limit(5)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((e) => ({
        ...e.data(),
      }));
      setCurrTransaction(data);
    });
  } catch (error) {
    console.error(error.message);
  }
};

const addDocTransaction = async (idUser, newData) => {
  // updating amount of wallet
  try {
    const q = query(
      collection(db, "user-wallets"),
      where("userId", "==", idUser)
    );
    const docSnapshot = await getDocs(q);
    if (docSnapshot.empty) throw Error;

    const currWallet = docSnapshot.docs.find(
      (el) =>
        el.data().userId === idUser &&
        el.data().accountId === newData.accountId
    );
    const walletRef = currWallet.ref;

    if (newData.type == "income") {
      await updateDoc(walletRef, {
        amount: currWallet.data().amount + newData.amount,
      });
    } else {
      await updateDoc(walletRef, {
        amount: currWallet.data().amount - newData.amount,
      });
    }
  } catch (error) {
    console.error(error.message);
    throw new Error(`Failed to update amount wallet`);
  }

  // addingDoc
  try {
    const docRef = collection(db, `user-transactions/${idUser}/transactions`);
    await addDoc(docRef, newData);
  } catch (error) {
    console.error(error.message);
    throw new Error(`Failed to add transaction`);
  }
};

export {
  getDocUserById,
  getSnapshotUserWallet,
  getSnapshotUserTransaction,
  addDocTransaction,
  addDocWallet,
  addUser,
  updateWalletDoc,
  deleteWalletDoc,
};
