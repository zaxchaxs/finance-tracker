import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import {  auth, db } from "./firebase";
import { addUser } from "./firestoreMethods";
import { doc, getDoc } from "firebase/firestore";

export const loginWithGithub = async () => {
    const provider = new GithubAuthProvider();
    try {
        const { user } = await signInWithPopup(auth, provider);
        if(user){
            // getting user in firestore. if didnt exists, create one. Uhuy.
            const docSnap = await getDoc(doc(db, 'users', user.uid));
            
            if(!docSnap.exists()) {
                const newData = {
                    name: user.displayName,
                    email: user.email,
                    userId: user.uid,
                    createdAt: new Date(),
                    photoURL: user.photoURL
                };
                await addUser(user.uid, newData);
            };
        };
    } catch (error) {
        console.error(error.message);
        throw Error(error.message);
    }
};

export const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
        const { user } = await signInWithPopup(auth, provider);
        if(user) {
            // getting user in firestore. if didnt exists, create one. Uhuy.
            const docSnap = await getDoc(doc(db, 'users', user.uid));
            if(!docSnap.exists()) {
                const newData = {
                    name: user.displayName,
                    email: user.email,
                    userId: user.email,
                    createdAt: new Date(),
                    photoURL: user.photoURL
                };
                await addUser(user.uid, newData);
            };
        };
    } catch (error) {
        console.error(error.message);
        throw Error(error.message);
    };
}