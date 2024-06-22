'use client'

import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
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
        const userRef = doc(db, 'users', idUser);
        const docSnap = await getDoc(userRef);
        if(docSnap.exists()) {
            return docSnap;
        } else {
            throw new Error("User not found");
        }
    } catch(e) {
        console.error(e.message);
    }
}

const addDocWallet = async (newData) => {
    try {
        const docRef = collection(db, 'user-wallets');
        await addDoc(docRef, newData);
    } catch (error) {
        console.error(error.message);
    }
};


const getDocUserWallet = async (idUser) => {
    try {
        const q = query(collection(db, 'user-wallets'), where("userId", "==", `${idUser}`));
        const docsSnap = await getDocs(q);
        if(docsSnap.empty) {
            throw new Error("Wallet gaada");
        } else {
            return docsSnap;
        }
    } catch(e) {
        console.error(e.message);
    };
};

const getDocUserTransactions = async (idUser) => {
    try {
        const docRef = doc(db, `user-transactions/${idUser}/transactions`);
        const docsSnap = await getDocs(docRef);
        if(docsSnap.empty) {
            throw new Error("Belum ada transaksi");
        } else {
            return docsSnap;
        }
    } catch (error) {
        console.log(error.message);
    }
};

const addDocTransaction = async (idUser, newData) => {
    try {
        const docRef = collection(db, `user-transactions/${idUser}/transactions`);
        await addDoc(docRef, newData);

        // updating amount of wallet
        const q = query(collection(db, 'user-wallets'), where("userId", "==", idUser));
        const docSnapshot = await getDocs(q);
        const currWallet = docSnapshot.docs.find(el => el.data().userId === idUser && el.data().accountId === newData.accountId);
        const walletRef = currWallet.ref;

        if(newData.type == "income") {
            await updateDoc(walletRef, {
                amount: currWallet.data().amount + newData.amount
            })
        } else {
            await updateDoc(walletRef, {
                amount: currWallet.data().amount - newData.amount
            })
        };

    } catch (error) {
        console.error(error.message);
    }
};


export {
    getDocUserById,
    getDocUserWallet,
    getDocUserTransactions,
    addDocTransaction,
    addDocWallet,
    addUser
};