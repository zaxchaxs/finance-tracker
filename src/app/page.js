"use client"
import { useEffect, useState } from "react";
import { auth } from "../../libs/firebase";
import { useRouter } from "next/navigation";

export default function Home() {
  const [user, setUser] = useState("");
  const router = useRouter();

  useEffect(() => {
    setUser(auth.currentUser);
    console.log(auth.currentUser?.email);

  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Testing</h1>
      <button onClick={() => router.push("/login")}>Login page</button>
      <button onClick={() => router.push("/register")}>Register page</button>
    </main>
  );
}
