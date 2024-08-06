'use client'
import FormAuthenticate from "@/components/authenticates/Form";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoginPage = () => {
    const { currUser } = useAuth();
    const route = useRouter();

    useEffect(() => {
      currUser && route.push('/dashboard');
    }, []);
    
    return (
      <main className="max-h-screen text-lg font-title w-full relative z-10 pt-6 flex flex-col bg-slate-50">
      <div className="text-secondary p-6">
        <h1 className="text-3xl">Login</h1>
        <h2 className="text-xl">Welcome Back</h2>
      </div>

      <FormAuthenticate typePage={'login'} />

    </main>
    );
}

export default LoginPage;