import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export const registerWithEmailAndPassword = async (email, password) => {
    try{
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    } catch(e) {
        console.error(e.message);
    }
};

export const loginWithEmailAndPassword = async (email, password) => {
    try{
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
    } catch(e) {
        console.error(e.message);
    }
};