"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getTokenCookie } from "../../libs/cookiesToken";
import { logout } from "../../libs/auth";
import { useAuth } from "../../contexts/AuthContext";
import Image from "next/image";
import homeIcon from '../../public/homeIcon.svg'

export default function Home() {
  const { currUser, loading, isUserLogged } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      logout();
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    console.log(isUserLogged);
    console.log("user: " + currUser);
  }, [])

  const handlerToken = async () => {
    const token = await getTokenCookie();
    console.log((`Token : ${token}`).slice(0,30));
  }
  return (
    <main className="min-h-screen p-5 text-secondary bg-primary w-full flex flex-col items-center justify-between py-10 pb-14"> 
      <h1 className="text-3xl p-2 text-center w-full font-lilitaOne">Personal Finance Tracker</h1>
      <div className="boder-2 border-black">
        <Image src={homeIcon} width={700} height={700} alt="test" className="w-[25vh] p-4" />

      </div>
      <div className="text-center text-lg font-semibold p-4">
        <h1>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus nisi, exercitationem</h1>
      </div>
      <div className="gap-4 flex border-2 border-black p-4">
        <button>Login</button>
        <button>Login with Google</button>
      </div>
      {/* <h1></h1> */}
      {/* <button onClick={() => router.push("/login")}>Login page</button>
      <button onClick={() => router.push("/register")}>Register page</button>
      <button onClick={handlerToken}>Get Token</button>
      <button onClick={handleLogout} className={`${auth.currentUser ? "" : "hidden"}`}>
        Logout
      </button> */}
    </main>
  );
}
