'use client'
import TitleSection from "@/components/ui/Title";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import SignInForm from "../FormAuthentications/SignInForm";

const SignInModule = () => {
    const { currUser } = useAuth();
    const route = useRouter();

    useEffect(() => {
      currUser && route.push('/dashboard');
    }, []);
    
    return (
      <main className="max-h-screen text-lg font-title w-full relative pt-6 flex flex-col overflow-hidden">
      <div className="text-secondary p-6 h-full">
        <TitleSection className="font-header text-3xl md:text-4xl font-bold" variant="h1">
          Sign In
        </TitleSection>
        <TitleSection>Welcome Back</TitleSection>
      </div>
      
      <SignInForm />
    </main>
    );
}

export default SignInModule;