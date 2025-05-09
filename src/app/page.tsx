"use client";
import Image from "next/image";
import homeIcon from "../../public/homeIcon.svg";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertModal } from "@/components/systems/AlertModal";
import TitleSection from "@/components/ui/Title";
import Link from "next/link";
import LoadingFullPage from "@/components/systems/LoadingFullPage";

export default function Home() {
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(true);
  const { currUser, loading } = useAuth();

  return loading ? (
    <LoadingFullPage className="bg-background z-0" />
  ) : (
    <main className="min-h-screen p-5 relative z-10 text-secondary bg-background w-full flex flex-col items-center justify-center py-10 gap-4">
      <AlertModal
        title="Hello There"
        description="For now, this web only works well on mobile view."
        isOpen={isAlertOpen}
        onAlertClose={() => setIsAlertOpen(false)}
      />
      <TitleSection className="text-3xl text-primary text-center font-header font-bold">
        Finance Tracker
      </TitleSection>

      <Image
        src={homeIcon}
        width={700}
        height={700}
        alt="test"
        className="w-[25vh] p-4"
      />
      <div className="text-center text-lg font-semibold p-4 font-title text-secondary">
        <TitleSection variant="h1">
          Manage your finances, track your incomes and expenses. Take control of your money.
        </TitleSection>
      </div>

      <div className="flex gap-4 items-center justify-center">
        <Link href={currUser ? '/dashboard' : '/signIn'} >
          <Button normalBtn>{currUser ? "Start" : "Sign In"}</Button>
        </Link>
      </div>
    </main>
  );
}
