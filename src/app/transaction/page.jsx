"use client";
import LoaderPage from "@/components/loaders/loaderPage";
import NavbarPage from "@/components/navbars/NavbarPage";
import FilterSection from "@/components/transactions/FilterSection";
import Unauthenticate from "@/components/Unauthenticate";
import { useAuth } from "@/contexts/AuthContext";
import { getSnapshotUserWallet } from "@/libs/firestoreMethods";
import { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";

const TransactionPage = () => {
  const [wallets, setWallets] = useState([]);
  const { currUser, loading } = useAuth();

  useEffect(() => {
    const getDefaultDataDoc = async () => {
      try {
        await getSnapshotUserWallet(currUser?.uid, setWallets);
        
      } catch (error) {
        console.error(error.message);
      }
    }

    if (currUser) getDefaultDataDoc();
  }, [currUser]);

  return loading ? (
    <LoaderPage />
  ) : currUser ? (
    <main className="min-h-screen text-base relative bg-primary w-full flex flex-col gap-3">
      {/* Nav */}
      <NavbarPage title={"Transaction"} />
      <ToastContainer
        position="top-right"
        limit={3}
        className={"flex flex-col items-end rounded-lg mt-20 font-title"}
        style={{ marginTop:  '5rem'}}
      />
      
      <FilterSection wallets={wallets} />
    </main>
  ) : (
    <Unauthenticate />
  );
};

export default TransactionPage;
