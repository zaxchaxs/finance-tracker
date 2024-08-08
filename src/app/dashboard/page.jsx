"use client";
import Unauthenticate from "@/components/Unauthenticate";
import CurrentTransaction from "@/components/dahsboard/currentTransaction";
import NewTransactionSec from "@/components/dahsboard/newTransaction";
import UserWalletAccount from "@/components/dahsboard/userWalletAccount";
import LoaderPage from "@/components/loaders/loaderPage";
import NavbarPage from "@/components/navbars/NavbarPage";
import SolidShadow from "@/components/ui/solidShadow/SolidShadow";
import { useAuth } from "@/contexts/AuthContext";
import { getSnapshotUserWallet } from "@/libs/firestoreMethods";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

const DashboardPage = () => {
  const [isShowWallet, setIsShowWallet] = useState(true);
  const [isShowTransac, setIsShowTransac] = useState(false);
  const [isShowCurrTransac, setIsShowCurrTransac] = useState(false);
  const [userWalletData, setUserWalletData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currUser, loading: loadingCurrUser } = useAuth();

  const tempWalletData = [
    {
      accountId: "walletid1",
      userId: "user123",
      name: "wallet 1",
      amount: 100000,
    },
    {
      accountId: "walletid2",
      userId: "user123",
      name: "dompet 2",
      amount: 500000,
    },
  ];

  useEffect(() => {
    const getUserWallet = async () => {
      setLoading(true);
      try {
        await getSnapshotUserWallet(currUser?.uid, setUserWalletData);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (currUser) {
      getUserWallet();
    }
  }, [currUser]);

  return loadingCurrUser ? (
    <LoaderPage />
  ) : currUser ? (
    <main className="min-h-screen text-base relative font-passionOne bg-primary w-full flex flex-col gap-3">
      {/* Nav */}
      <NavbarPage title={"Dashboard"} />

      <div className="w-full px-4 my-20 flex flex-col items-center gap-2 relative z-10">        
      <ToastContainer
        position="top-right"
        limit={3}
        className={"flex flex-col items-end rounded-lg mt-20"}
        style={{ marginTop:  '4rem'}}
      />
        {/* Wallet sections */}
        <div className="pt-4 w-full text-primary flex flex-col items-center font-title"
        >
          <div className="relative w-full">
            <SolidShadow background={"bg-emerald-900"} />
            <div className="w-full flex gap-3 items-center ring-2 ring-black cursor-pointer p-2 rounded-lg relative z-10 bg-primary" onClick={() => setIsShowWallet(!isShowWallet)}>
              <FontAwesomeIcon
                className="w-2"
                size="1x"
                icon={faCaretRight}
                rotation={isShowWallet && 90}
              />
              <h1>My wallet account</h1>
            </div>
          </div>

        <UserWalletAccount
          isShowed={isShowWallet}
          userWallets={userWalletData}
          user={currUser}
          isGettingData={loading}
        />
        </div>

        {/* New Transaction Section */}
        <div
          className="pt-4 w-full text-primary flex flex-col items-center font-title"
        >
          <div className="relative w-full">
            <SolidShadow background={"bg-emerald-900"} />
            <div className="w-full flex gap-3 items-center ring-2 ring-black cursor-pointer p-2 rounded-lg relative z-10 bg-primary" onClick={() => setIsShowTransac(!isShowTransac)}>
            <FontAwesomeIcon
              className="w-2"
              size="1x"
              icon={faCaretRight}
              rotation={isShowTransac && 90}
            />
            <h1>New Transaction</h1>
            </div>
          </div>
        <NewTransactionSec
          isShowed={isShowTransac}
          walletAcountData={userWalletData}
          user={currUser}
          isGettingData={loading}
        />
        </div>

        {/* Current Transaction Section */}
        <div className="pt-4 w-full text-primary flex flex-col items-center font-title"
        >
          <div className="relative w-full">
          <SolidShadow background={"bg-emerald-900"} />
          <div
            className="w-full flex gap-3 items-center ring-2 ring-black cursor-pointer p-2 rounded-lg relative z-10 bg-primary"
            onClick={() => setIsShowCurrTransac(!isShowCurrTransac)}
          >
            <FontAwesomeIcon
              className="w-2"
              size="1x"
              icon={faCaretRight}
              rotation={isShowCurrTransac && 90}
            />
            <h1>Current Transactions</h1>
          </div>
            
          </div>
        </div>
        <CurrentTransaction isShowed={isShowCurrTransac} user={currUser} />
      </div>
    </main>
  ) : (
    <Unauthenticate />
  );
};

export default DashboardPage;