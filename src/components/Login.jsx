"use client";
import { useEffect, useState } from "react";
import { auth, db } from "../../libs/firebase";
import {doc,
  getDoc,} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { loginWithEmailAndPassword, logout } from "../../libs/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (auth.currentUser) {
      console.log(`user : ${auth.currentUser.email}`)
      setUser(auth.currentUser)
    };
  }, []);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      setEmail("");
      setPassword("");

      // firebase auth
      const currUser = await loginWithEmailAndPassword(email, password);
      console.log(currUser.email);

      // checking user from firestore
      // const userRef = doc(db, "users", currUser.uid);
      // const docSnap = await getDoc(userRef);
      // if (!docSnap.exists()) {
      //   console.log("Kosong");
      // } else {
      //   console.log("ada");
      // }
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  const handleLogout = async () => {
    try {
      logout();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <form onSubmit={e => handleLoginSubmit(e)}>
        <input
          className="text-black"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          className="text-black"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
        <button className="mx-10" onClick={() => router.back()}>
          back
        </button>
      </form>
      <button onClick={handleLogout} className={`${auth.currentUser ? "" : "hidden"}`}>
        Logout
      </button>
    </>
  );
};

export default Login;
