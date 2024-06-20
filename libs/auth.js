import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {  auth, db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import { deleteTokenCookie, setTokenCookie } from "./cookiesToken";

export const registerWithEmailAndPassword = async (email, password) => {
    try{
        // firebase auth
        const { user } = await createUserWithEmailAndPassword(auth, email, password);

        // add user to firestore
        const newData = {
            userId: user.uid,
            email: user.email,
            name: user.displayName,
            createdAt: new Date(),
        }
        const userRef = doc(db, "users", `${user.uid}`);
        await setDoc(userRef, newData);
    } catch(e) {
        console.error(`${e.message} line 22`);
    }
};

export const loginWithEmailAndPassword = async (email, password) => {
    try{
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const token = await userCredential.user.getIdToken();
        setTokenCookie(token);
        return userCredential.user;
    } catch(e) {
        console.error(e);
    }
};

export const logout = async () => {
    try {
        await signOut(auth);
        deleteTokenCookie();
        console.log("success logout : " + auth.currentUser);
    } catch(error) {
        console.error(error.message);
    }
}