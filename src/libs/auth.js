
import { createUserWithEmailAndPassword, GithubAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import {  auth, db } from "./firebase";
import { addUser, getDocUserById } from "./firestoreMethods";
import { successSweetAlert } from "./sweetAlert";
import { doc, getDoc } from "firebase/firestore";

export const registerWithEmailAndPassword = async (email, password, name) => {
    try{
        // firebase auth
        const { user } = await createUserWithEmailAndPassword(auth, email, password);

        // add user to firestore
        if(user) {
            const newData = {
                userId: user.uid,
                email: user.email,
                name: name,
                createdAt: new Date(),
                photoURL: user.photoURL

            }
            await addUser(user.uid, newData);
        }

        // const userRef = doc(db, "users", `${user.uid}`);
        // await setDoc(userRef, newData);
    } catch(e) {
        console.error(e.message);
        throw Error(e.message)
    }
    successSweetAlert();
};

export const loginWithEmailAndPassword = async (email, password) => {
    try{
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        if(user) await getDocUserById(user.uid);

        return user;
    } catch(e) {
        console.error(e);
        throw new Error("Email or password wrong.");
    };
};

export const logout = async () => {
    try {
        await signOut(auth);
    } catch(error) {
        console.error(error.message);
    }
}

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
        window.location.href = '/dashboard';
    } catch (error) {
        console.error(error.message);
        throw Error(error.message)
    }
}