import CurrentTransaction from "@/components/dahsboard/currentTransaction";
import NewTransactionSec from "@/components/dahsboard/newTransaction";
import SolidShadow from "@/components/ui/solidShadow/SolidShadow";
import { useAuth } from "@/contexts/AuthContext";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import WalletAccountSection from "./WalletSection/WalletAccoutSection";
import { WalletType } from "@/types/walletTypes";
import { useSnapshotDatas } from "@/hooks/FirestoreHooks";
import TitleSection from "@/components/ui/Title";

const DashboardModule = () => {
  const [isShowTransac, setIsShowTransac] = useState(false);
  const [isShowCurrTransac, setIsShowCurrTransac] = useState(false);
  const { currUser, loading } = useAuth();

  const {
    data: walletsData,
    error,
    loading: loadingGetWallet,
  } = useSnapshotDatas<WalletType>("user-wallets", [
    {
      fieldPath: "userId",
      opStf: "==",
      value: currUser?.uid,
    },
  ]);

  return (
    <main className="min-h-screen text-base relative font-passionOne bg-background w-full flex flex-col gap-3">
      <div className="w-full px-4 flex flex-col items-center gap-2 relative z-10">
        <ToastContainer
          position="top-right"
          limit={3}
          className={"flex flex-col items-end rounded-lg mt-20"}
          style={{ marginTop: "4rem" }}
        />

        {/* Wallet sections */}
        <WalletAccountSection
          wallets={walletsData}
          user={currUser}
          isGettingData={loadingGetWallet}
        />

        {/* New Transaction Section */}
        <div className="pt-4 w-full text-primary flex flex-col items-center font-title">
          <div className="relative w-full">
            <SolidShadow background={"bg-emerald-900"} />
            <div
              className="w-full flex gap-3 items-center ring-2 ring-black cursor-pointer p-2 rounded-lg relative z-10 bg-primary"
              onClick={() => setIsShowTransac(!isShowTransac)}
            >
              <FontAwesomeIcon
                className="w-2"
                size="1x"
                icon={faCaretRight}
                rotation={isShowTransac ? 90 : undefined}
              />
              <h1>New Transaction</h1>
            </div>
          </div>
          <NewTransactionSec
            isShowed={isShowTransac}
            walletAcountData={walletsData}
            user={currUser}
            isGettingData={loadingGetWallet}
          />
        </div>

        {/* Current Transaction Section */}
        <div className="pt-4 w-full text-primary flex flex-col items-center font-title">
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
                rotation={isShowCurrTransac ? 90 : undefined}
              />
              <h1>Current Transactions</h1>
            </div>
          </div>
        </div>
        <CurrentTransaction isShowed={isShowCurrTransac} user={currUser} />
      </div>
    </main>
  );
};

export default DashboardModule;
