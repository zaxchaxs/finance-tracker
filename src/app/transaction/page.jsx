"use client";
import LoaderPage from "@/components/loaders/loaderPage";
import NavbarPage from "@/components/navbars/NavbarPage";
import FilterSection from "@/components/transactions/FilterSection";
import Unauthenticate from "@/components/Unauthenticate";
import { useAuth } from "@/contexts/AuthContext";
import { getSnapshotUserWallet } from "@/libs/firestoreMethods";
import React, { Suspense, useEffect, useState } from "react";

const TransactionPage = () => {
  const [wallets, setWallets] = useState([]);
  const { currUser, loading } = useAuth();

  const LazyComponent = React.lazy(() => import('@/components/Lazy/LazyComponent'));

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
    try {
      // get wallet and transaction doc
      const getDefaultDataDoc = async () => {
        await getSnapshotUserWallet(currUser?.uid, setWallets);
      };
      if (currUser) getDefaultDataDoc();
    } catch (error) {
      console.error(error.message);
    }
  }, [currUser]);

  return loading ? (
    <LoaderPage />
  ) : currUser ? (
    <main className="min-h-screen text-xl p-6 font-passionOne bg-primary w-full py-4 flex flex-col gap-5">
      {/* Nav */}
      <NavbarPage title={"Transaction"} />
      
      <FilterSection wallets={tempWalets} />
    </main>
  ) : (
    <Unauthenticate />
  );
};

export default TransactionPage;
