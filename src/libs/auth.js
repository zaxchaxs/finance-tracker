
import { createUserWithEmailAndPassword, GithubAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import {  auth } from "./firebase";
import { addUser, getDocUserById } from "./firestoreMethods";
import { successSweetAlert } from "./sweetAlert";

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
        await signInWithPopup(auth, provider);
    } catch (error) {
        console.error(error.message);
        throw Error(error.message)
    }
}