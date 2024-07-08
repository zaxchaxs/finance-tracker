'use client'
import Login from "@/components/Login";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

const LoginPage = () => {
    const { currUser } = useAuth();
    const route = useRouter();

    return currUser ? (
      <div className="w-full h-screen flex items-center justify-center">
        <button onClick={() => route.push("/")}>Sudah Login</button>
      </div>
    ) : (
      <Login />
    );
}

export default LoginPage;