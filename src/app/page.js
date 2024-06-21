"use client"
import { useEffect, useState } from "react";
import { auth } from "../../libs/firebase";
import { useRouter } from "next/navigation";
import { getTokenCookie } from "../../libs/cookiesToken";
import { logout } from "../../libs/auth";

export default function Home() {
  const [user, setUser] = useState("");
  const router = useRouter();

  const handleLogout = async () => {
    try {
      logout();
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    setUser(auth.currentUser);
    console.log(auth.currentUser?.email);

  }, [])

  const handlerToken = async () => {
    const token = await getTokenCookie();
    console.log((`Token : ${token}`).slice(0,30));
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Testing</h1>
      <button onClick={() => router.push("/login")}>Login page</button>
      <button onClick={() => router.push("/register")}>Register page</button>
      <button onClick={handlerToken}>Get Token</button>
      <button onClick={handleLogout} className={`${auth.currentUser ? "" : "hidden"}`}>
        Logout
      </button>
    </main>
  );
}
