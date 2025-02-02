"use client";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getCountFromServer,
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
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { UserDocType } from "@/types/authenticationModel";

export const addUser = async (idUser, newData) => {
  try {
    const userRef = doc(db, "users", `${idUser}`);
    await setDoc(userRef, newData);
  } catch (error) {
    console.error(error.message);
    throw Error(error.message);
  }
};

export const addDocWallet = async (newData) => {
  try {
    const docRef = collection(db, "user-wallets");
    await addDoc(docRef, newData);
  } catch (error) {
    console.error(error.message);
    throw new Error(`Something wrong: ${error.message}`);
  }
};

export const updateWalletDoc = async (accountId, newData) => {
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

export const deleteWalletDoc = async (accountId, userId) => {
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

export const getSnapshotUserWallet = <T,>(idUser: string, onUpdate: (data: T[]) => void): (() => void) => {
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

export const getSnapshotUserTransaction = async (idUser, setTransaction, limitNum) => {

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

export const getDocsFilterdTransactions = async (idUser, startAt, endAt, walletId, setTransaction) => {
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

export const addDocTransaction = async (idUser, newData) => {
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
    } catch(error) {
      const errMessage = error instanceof Error ? error.message : "Something wrong!";
      console.error(errMessage);
    }
}

export const getDocumentCount = async (collectionName: string) => {
  try {
    const col = collection(db, collectionName);
    const snapshot = await getCountFromServer(col);
    console.log(snapshot.data());
    return snapshot.data().count;
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Something wrong!";
      console.error(errMessage);
      return 0;
  }
}