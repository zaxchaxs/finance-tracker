"use client";
import Unauthenticate from "@/components/Unauthenticate";
import LoaderPage from "@/components/loaders/loaderPage";
import NavbarPage from "@/components/navbars/NavbarPage";
import ReportStats from "@/components/reports/ReportStats";
import tempTransaction from "@/components/tempTransactions";
import { useAuth } from "@/contexts/AuthContext";
import {
  getSnapshotUserTransaction,
  getSnapshotUserWallet,
} from "@/libs/firestoreMethods";
import { useEffect, useState } from "react";

const ReportPage = () => {
  const [wallets, setWallets] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [isGettingData, setIsGettingData] = useState(false);
  const { currUser, loading } = useAuth();

  useEffect(() => {
    setIsGettingData(true);
    try {
      if (!loading && currUser) {
        const docSnapshotTransactions = async () => {
          await getSnapshotUserTransaction(currUser?.uid, setTransactions, null);
          await getSnapshotUserWallet(currUser?.uid, setWallets);
        };
        docSnapshotTransactions();
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsGettingData(false);
    }
  }, [currUser]);

  const handleFilterData = (id) => {
    setFilteredTransactions(transactions.filter((obj) => obj.accountId == id));
  };

  return loading ? (
    <LoaderPage />
  ) : currUser ? (
    <main className="min-h-screen text-xl p-6 font-passionOne bg-primary w-full py-4 flex flex-col gap-5">
      {/* nav */}
      <NavbarPage title={"Reports"} />

      <ReportStats
        transactions={
          filteredTransactions.length === 0
            ? transactions
            : filteredTransactions
        }
        isGettingData={isGettingData}
        wallets={wallets}
        setDataFilter={handleFilterData}
      />
    </main>
  ) : (
    <Unauthenticate />
  );
};

export default ReportPage;
