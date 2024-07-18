"use client";
import { useRouter } from "next/navigation";
import { logout } from "@/libs/auth";
import Image from "next/image";
import homeIcon from "../../public/homeIcon.svg";
import { useAuth } from "@/contexts/AuthContext";
import LoaderPage from "@/components/loaders/loaderPage";
import DangerButton from "@/components/ui/buttons/DangerButton";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";

export default function Home() {
  const { currUser, loading } = useAuth();
  const router = useRouter();

  const handleClickLogin = () => {};

  const handleClickLogout = () => {};

  return loading ? (
    <LoaderPage />
  ) : (
    <main className="min-h-screen p-5 text-secondary bg-primary w-full flex flex-col items-center justify-between py-10 pb-14">
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

      <PrimaryButton
        handleClick={currUser ? logout : () => router.push("/login")}
        text={currUser ? "Logout" : "Login"}
        value={currUser ? "Logout" : "Login"}
        type={currUser ? "danger" : "primary"}
      />
    </main>
  );
}
