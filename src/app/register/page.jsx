'use client';
import FormAuthenticate from "@/components/authenticates/Form";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const RegisterPage = () => {
  const { currUser} = useAuth();
  const router = useRouter();

    useEffect(() => {
      currUser && router.push('/dashboard')
    }, [])
    return(
        <main className="max-h-screen text-secondary text-lg font-title w-full pt-6 flex flex-col bg-slate-50 z-10 relative">
        <div className=" p-6">
          <h1 className="text-3xl">Sign Up</h1>
          <h2 className="text-xl">Welcome</h2>
        </div>
  
        <FormAuthenticate typePage={'register'} />
      </main>
    )
}

export default RegisterPage;