"use client";
import LoaderPage from "@/components/loaders/loaderPage";
import NavbarPage from "@/components/navbars/NavbarPage";
import FilterSection from "@/components/transactions/FilterSection";
import Unauthenticate from "@/components/Unauthenticate";
import { useAuth } from "@/contexts/AuthContext";
import { getSnapshotUserWallet } from "@/libs/firestoreMethods";
import { useEffect, useRef, useState } from "react";

const TransactionPage = () => {
  const [wallets, setWallets] = useState([]);
  const { currUser, loading } = useAuth();
  const isFirstRender = useRef(true);

  const tempWalets = [
    {
      createdAt: {
        seconds: 1719721935,
        nanoseconds: 661000000,
      },
      name: "dompet 1",
      accountId: "64b25906-38a6-4006-b21d-4631764b3d49",
      userId: "3U40vTwzEcN43dAhrOSTE3BeLYd2",
      amount: 1233361123,
    },
    {
      userId: "3U40vTwzEcN43dAhrOSTE3BeLYd2",
      amount: 1500000,
      accountId: "e5107081-e068-41f4-85d5-a0a42e3f0668",
      name: "uang darurat",
      createdAt: {
        seconds: 1719885822,
        nanoseconds: 783000000,
      },
    },
  ];

  useEffect(() => {
    const getDefaultDataDoc = async () => {
      try {
        await getSnapshotUserWallet(currUser?.uid, setWallets);
        
      } catch (error) {
        console.error(error.message);
      }
    }

    if(isFirstRender.current) {
      isFirstRender.current = false;
      return
    };

    if (currUser) getDefaultDataDoc();
  }, [currUser]);

  return loading ? (
    <LoaderPage />
  ) : currUser ? (
    <main className="min-h-screen text-lg relative font-passionOne bg-primary w-full flex flex-col gap-3">
      {/* Nav */}
      <NavbarPage title={"Transaction"} />
      
      <FilterSection wallets={wallets} />
    </main>
  ) : (
    <Unauthenticate />
  );
};

export default TransactionPage;
