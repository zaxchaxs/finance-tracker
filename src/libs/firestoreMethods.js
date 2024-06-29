'use client'

import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, setDoc, updateDoc, where } from "firebase/firestore";
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

const getSnapshotUserWallet = async (idUser) => {
    let data = [];
  
    try {
      const q = query(collection(db, 'user-wallets'), where("userId", "==", idUser));
      
      return new Promise((resolve, reject) => {
        const unsubscribe = onSnapshot(q, snapshot => {
          data = snapshot.docs.map(doc => doc.data());
          
          unsubscribe(); // Unsubscribe pas udh dapet data
          resolve(data);
        }, (error) => {
          console.error(error);
          unsubscribe(); // Unsubscribe pas udh dapet data
          reject(error);
        });
      });
  
    } catch (e) {
      console.error(e.message);
      throw e; // Lempar error agar bisa ditangani di luar fungsi
    }
  };

// const getSnapshotUserWallet = async (idUser) => {
//     let data = [];
    
//     try {
//         const q = query(collection(db, 'user-wallets'), where("userId", "==", `${idUser}`));
//         const unsubscribe = onSnapshot(q, snapshot => {
//             data = snapshot.docs.map(doc => doc.data());
//             console.log(data);
//             // return data;

//             () => unsubscribe();
//         })
        
//         console.log(data);
//         return data;
//         // const docsSnap = await getDocs(q);
//         // if(docsSnap.empty) {
//         //     throw new Error("Wallet gaada");
//         // } else {
//         //     return docsSnap;
//         // }
//     } catch(e) {
//         console.error(e.message);
//     };
// };

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
    getSnapshotUserWallet,
    getDocUserTransactions,
    addDocTransaction,
    addDocWallet,
    addUser
};