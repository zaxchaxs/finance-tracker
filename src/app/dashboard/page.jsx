"use client";
import Unauthenticate from "@/components/Unauthenticate";
import CurrentTransaction from "@/components/dahsboard/currentTransaction";
import NewTransactionSec from "@/components/dahsboard/newTransaction";
import UserWalletAccount from "@/components/dahsboard/userWalletAccount";
import NavbarPage from "@/components/navpage/NavPage";
import { useAuth } from "@/contexts/AuthContext";
import { getSnapshotUserWallet } from "@/libs/firestoreMethods";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const [isShowWallet, setIsShowWallet] = useState(true);
  const [isShowTransac, setIsShowTransac] = useState(false);
  const [isShowCurrTransac, setIsShowCurrTransac] = useState(false);
  const [userWalletData, setUserWalletData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currUser } = useAuth();

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
  

  return currUser ? (
    <main className="min-h-screen text-xl  p-6 font-passionOne bg-primary w-full py-4 flex flex-col gap-5">
      {/* Nav */}
      <NavbarPage title={"Dashboard"} />

      <div
        className="pt-4 py-2  w-full text-primary flex items-center gap-2 cursor-pointer border-b-2 border-green-950"
        onClick={() => setIsShowWallet(!isShowWallet)}
      >
        <FontAwesomeIcon
          className="w-2"
          size="1x"
          icon={faCaretRight}
          rotation={isShowWallet && 90}
        />
        <h1>My wallet account</h1>
      </div>
      <UserWalletAccount
        isShowed={isShowWallet}
        userWallets={userWalletData}
        user={currUser}
        isGettingData={loading}
      />

      {/* New Transaction Section */}
      <div
        className={`w-full py-2 text-primary flex items-center gap-2 cursor-pointer border-b-2 border-green-950 z-10`}
        onClick={() => setIsShowTransac(!isShowTransac)}
      >
        <FontAwesomeIcon
          className="w-2"
          size="1x"
          icon={faCaretRight}
          rotation={isShowTransac && 90}
        />
        <h1>New Transaction</h1>
      </div>
      <NewTransactionSec
        isShowed={isShowTransac}
        walletAcountData={userWalletData}
        user={currUser}
        isGettingData={loading}
      />

      {/* Current Transaction Section */}
      <div
        className={`w-full py-2 text-primary flex items-center gap-2 cursor-pointer border-b-2 border-green-950 z-10`}
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
      <CurrentTransaction isShowed={isShowCurrTransac} user={currUser} />
    </main>
  ) : (
    <Unauthenticate />
  );
};

export default DashboardPage;
