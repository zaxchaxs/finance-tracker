const { doc, getDoc, collection, query, where, getDocs, addDoc, setDoc } = require("firebase/firestore")
const { db } = require("./firebase");

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

const getDocUserWallet = async (idUser) => {
    try {
        const q = query(collection(db, 'user-wallets'), where("id", "==", idUser));
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
            return docsSnap.docs;
        }
    } catch (error) {
        console.log(error.message);
    }
};

const addDocTransaction = async (idUser, newData) => {
    try {
        const docRef = doc(db, `user-transactions/${idUser}/transactions`);
        await addDoc(docRef, newData);
    } catch (error) {
        console.error(e.message);
    }
};

const addDocWallet = async (newData) => {
    try {
        const docRef = doc(db, 'user-wallets');
        await addDoc(docRef, newData);
    } catch (error) {
        console.error(error.message);
    }
};

const addUser = async (idUser, newData) => {
    try {
        const docRef = doc(db, 'users', idUser);
        await setDoc(userRef, newData)
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