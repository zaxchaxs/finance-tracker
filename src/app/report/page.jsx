"use client";
import Unauthenticate from "@/components/Unauthenticate";
import LoaderPage from "@/components/loaders/loaderPage";
import NavbarPage from "@/components/navbars/NavbarPage";
import ReportStats from "@/components/reports/ReportStats";
import tempTransaction from "@/components/tempTransactions";
import { useAuth } from "@/contexts/AuthContext";
import { getSnapshotUserTransaction, getSnapshotUserWallet } from "@/libs/firestoreMethods";
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
      if(!loading && currUser) {
        const docSnapshotTransactions = async () => {
          await getSnapshotUserTransaction(currUser?.uid, setTransactions);
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
    setFilteredTransactions(transactions.filter(obj => obj.accountId == id));
  };

  return loading ? (
    <>
    <div className="flex gap-5">
      <button onClick={() => console.log(filteredTransactions.length === 0 ? transactions : filteredTransactions)}>Testing</button>
      <button onClick={() => handleFilterData('e5107081-e068-41f4-85d5-a0a42e3f0668')}>test 1</button>
      <button onClick={() => handleFilterData('64b25906-38a6-4006-b21d-4631764b3d49')}>Test 2</button>
      <button onClick={() => handleFilterData('all')}>Test 3</button>
    </div>
      <LoaderPage />
    </>
  ) : currUser ? (
    <main className="min-h-screen text-xl p-6 font-passionOne bg-primary w-full py-4 flex flex-col gap-5">
      {/* nav */}
      <NavbarPage title={"Reports"} />

      <ReportStats transactions={filteredTransactions.length === 0 ? transactions : filteredTransactions} isGettingData={isGettingData} wallets={wallets} setDataFilter={handleFilterData} />
    </main>
  ) : (
    <Unauthenticate />
  );
};

export default ReportPage;
