"use client"
import Image from "next/image";
import { useEffect } from "react";
import { auth } from "../../utils/firebase";
import { Router } from "next/router";

export default function Home() {
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
    </main>
  );
}
