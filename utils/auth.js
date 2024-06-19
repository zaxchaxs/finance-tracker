import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
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
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch(e) {
        console.error(e);
        alert("email atau password salah!")
    }
};

export const logout = async => {
    try {
        signOut(auth)
        console.log("success logout");
    } catch(error) {
        console.error(error.message);
    }
}