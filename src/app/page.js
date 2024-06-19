"use client"
import Image from "next/image";
import { useEffect } from "react";
import { auth } from "../../utils/firebase";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if(!auth.currentUser) {
      console.log("Belum login");
    } else {
      console.log(`Sudah login ${auth.currentUser.email}`);
    }
  })
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Testing</h1>
      <button onClick={() => router.push("/login")}>Login page</button>
      <button onClick={() => router.push("/register")}>Register page</button>
    </main>
  );
}
