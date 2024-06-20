"use client";
import { useEffect, useState } from "react";
import { loginWithEmailAndPassword, logout } from "../../utils/auth";
import { auth, db } from "../../utils/firebase";
import {doc,
  getDoc,} from "firebase/firestore";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (auth.currentUser) console.log("Sudah login brow");
  }, []);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      setEmail("");
      setPassword("");

      // firebase auth
      const currUser = await loginWithEmailAndPassword(email, password);
      if (!currUser) throw Error;
      // cookies.set("token", token);
      // const token = await currUser.getIdToken();
      // cookies().set("UserToken", token);

      // checking user from firestore
      const userRef = doc(db, "users", currUser.uid);
      const docSnap = await getDoc(userRef);
      if (!docSnap.exists()) {
        console.log("Kosong");
      } else {
        console.log("ada");
      }


      console.log("Token:" + token);
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
      <form onSubmit={handleLoginSubmit}>
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
      <button onClick={handleLogout} className={`${auth ? "" : "hidden"}`}>
        Logout
      </button>
    </>
  );
};

export default Login;
