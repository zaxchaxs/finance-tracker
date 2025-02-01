"use client";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  FirestoreError,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "./firebase";
import { WalletType } from "@/types/walletTypes";
import { signInWithEmailAndPassword } from "firebase/auth";

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

const getSnapshotUserWallet = <T,>(idUser: string, onUpdate: (data: T[]) => void): (() => void) => {
    const q = query(
      collection(db, "user-wallets"),
      where("userId", "==", idUser)
    );

    const unsubscribe = onSnapshot<DocumentData, DocumentData>(q, (snapshot) => {
      const response = snapshot.docs.map((doc) => ({ ...doc.data() as T }));
      onUpdate(response)
    }, error => {
      console.error(error.message)
      throw new Error(error.message);
    });
    
    return unsubscribe;
};

const getSnapshotUserTransaction = async (idUser, setTransaction, limitNum) => {

  try {
    const q = limitNum ?
      query(
        collection(db, `user-transactions/${idUser}/transactions`),
        orderBy("createdAt", "desc"),
        limit(limitNum)
      ) :
      query(
        collection(db, `user-transactions/${idUser}/transactions`),
        orderBy("date", "desc"),
      )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((e) => ({
        ...e.data(),
      }));
      setTransaction(data);
    });
  } catch (error) {
    console.error(error.message);
  }
};

const getDocsFilterdTransactions = async (idUser, startAt, endAt, walletId, setTransaction) => {
  try {
    const q = walletId ?
      query(
        collection(db, `user-transactions/${idUser}/transactions`),
        where("date", ">=", startAt),
        where("date", "<=", endAt),
        where('accountId', '==', walletId),
        orderBy("date", "desc")
      )
      :
      query(
        collection(db, `user-transactions/${idUser}/transactions`),
        where("date", ">=", startAt),
        where("date", "<=", endAt),
        orderBy("date", "desc")
      )

    const docSnap = await getDocs(q);
    const data = docSnap.docs.map(document => document.data());

    setTransaction(data);

  } catch (error) {
    console.error(error.message);
    throw new Error(`Error getDocs: ${error.message}`)
  }
}

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
        el.data().userId === idUser && el.data().accountId === newData.accountId
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

const loginWithEmailAndPassword = async (email: string, password: string) => {
    try{
      const { user } = await signInWithEmailAndPassword(auth, email, password);
        if(user) await getDocUserById(user.uid);
        return user;
    } catch(e) {
      const errMessage = e instanceof Error ? e.message : "Something wrong!";
        console.error(errMessage);
      throw new Error("Email or password wrong.");
    };
};

export {
  loginWithEmailAndPassword,
  getDocUserById,
  getSnapshotUserWallet,
  getSnapshotUserTransaction,
  getDocsFilterdTransactions,
  addDocTransaction,
  addDocWallet,
  addUser,
  updateWalletDoc,
  deleteWalletDoc,
};
