"use client";
import { useEffect, useState } from "react";
import { auth, db } from "../libs/firebase";
import {doc,
  getDoc,} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { loginWithEmailAndPassword, logout } from "../libs/auth";
import { getTokenCookie } from "../libs/cookiesToken";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [email, setEmail] = useState("");
  
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      setEmail("");
      setPassword("");

      // firebase auth
      // const currUser = await loginWithEmailAndPassword(email, password);
      // console.log(currUser.email);

      // checking user from firestore
      // const userRef = doc(db, "users", currUser.uid);
      // const docSnap = await getDoc(userRef);
      console.log(e);

      if (!docSnap.exists()) {
        console.log("Email didn't exists!");
      } else {
        router.push("/");
      }
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
    <main className="max-h-screen text-lg font-passionOne  w-full pt-6 flex flex-col bg-slate-50">
      <div className="text-secondary p-6">
        <h1 className="text-3xl">Login</h1>
        <h2 className="text-xl">Welcome Back</h2>
      </div>

      <div className="bg-primary h-screen w-full rounded-t-5xl p-4 shadow-lg flex flex-col justify-center items-center">
        <form className="w-full text-base flex flex-col justify-center items-center gap-2" onSubmit={e => handleLoginSubmit(e)}>
          <input
            className="text-secondary w-full rounded-lg p-2 px-4 outline-none"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <div className="w-full relative items-center">
            <input
              className=" w-full rounded-lg p-2 px-4 outline-none"
              type={typeInput}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button
              className="absolute right-2 top-2"
              type="button"
              onClick={handleShowPassword}
            >
              <FontAwesomeIcon color="#9F9F9F" icon={typeInput === 'password'? faEye : faEyeSlash} />
            </button>
          </div>
          <div>
            <button className="p-2 px-7 rounded-full bg-secondary hover:bg-secondary-hover active:bg-secondary shadow-md" type="submit">Login</button>
          </div>
        </form>
        
        <p className="text-primary text-base py-3">Or login with</p>
        <div className="flex gap-10 text-base">
          <button className="p-2 px-7 rounded-full bg-danger hover:bg-danger-hover shadow-md">Google</button>
          <button className="p-2 px-7 rounded-full bg-gray-700 hover:bg-gray-800 shadow-md">Github</button>
        </div>

        <div className="text-primary text-base flex gap-2 py-6 items-center">
          <p className="">Need an account?</p>
          <button className="text-blue-500" onClick={() => router.push('/register')}>
            Signup
          </button>
        </div>

      </div>

    </main>
  );
};

export default Login;
