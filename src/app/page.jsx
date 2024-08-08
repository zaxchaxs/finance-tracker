"use client";
import { useRouter } from "next/navigation";
import { logout } from "@/libs/auth";
import Image from "next/image";
import homeIcon from "../../public/homeIcon.svg";
import { useAuth } from "@/contexts/AuthContext";
import LoaderPage from "@/components/loaders/loaderPage";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import { sideSweetAlertError, sideSweetAlertSuccess } from "@/libs/sweetAlert";
import LoaderLightSection from "@/components/loaders/loaderLightSection";

export default function Home() {
  const { currUser, loading } = useAuth();
  const router = useRouter();
  const [loadingAuth, setLoadingAuth] = useState(false);

  const handleLogout = async () => {
    setLoadingAuth(true);
    try {
      await logout();
      sideSweetAlertSuccess("Success to logout")
    } catch (error) {
      sideSweetAlertError("Failed to logout");
    } finally {
       setLoadingAuth(false);
    };
  };

  return loading ? (
    <LoaderPage />
  ) : (
    <main className="min-h-screen p-5 relative z-10 text-secondary bg-primary w-full flex flex-col items-center justify-between py-10 pb-14">
      
      <ToastContainer
        position="top-right"
        limit={3}
        className={"flex flex-col items-end rounded-lg mt-20"}
        style={{ marginTop:  '4rem'}}
      />

      <h1 className="text-3xl p-4 text-primary text-center w-full font-header">
        Zaxch Finance Tracker
      </h1>
      <div>
        <Image
          src={homeIcon}
          width={700}
          height={700}
          alt="test"
          className="w-[25vh] p-4"
        />
      </div>
      <div className="text-center text-lg font-semibold p-4 font-title text-secondary">
        <h1>
          Manage your finances, track your incomes and expenses. Take control of
          your money.
        </h1>
      </div>

      <div className="flex gap-4 items-center justify-center">
        <PrimaryButton
          handleClick={currUser ? handleLogout : () => router.push("/login")}
          text={currUser ? loadingAuth ? <LoaderLightSection width={"w-10"} /> : "Logout" : "Login"}
          value={currUser ? "Logout" : "Login"}
          type={currUser ? "danger" : "primary"}
        />

        <PrimaryButton className={currUser ? "" : "hidden"} handleClick={() => router.push("/dashboard")} text={"Start"} type={"primary"} value={"Start"} />

      </div>
    </main>
  );
}
