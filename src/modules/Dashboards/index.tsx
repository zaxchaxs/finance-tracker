import CurrentTransaction from "@/components/dahsboard/currentTransaction";
import NewTransactionSec from "@/components/dahsboard/newTransaction";
import SolidShadow from "@/components/ui/solidShadow/SolidShadow";
import { useAuth } from "@/contexts/AuthContext";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo, useState } from "react";
import WalletAccountSection from "./WalletSection/WalletAccoutSection";
import { WalletType } from "@/types/walletTypes";
import { useSnapshotDatas } from "@/hooks/FirestoreApiHooks";
import TransactionReportSection from "./TransactionReportSection";

const DashboardModule = () => {
  const [isShowCurrTransac, setIsShowCurrTransac] = useState(false);
  const { currUser } = useAuth();

  const {
    data: walletsData,
    error,
    loading: loadingGetWallet,
  } = useSnapshotDatas<WalletType>(
    "user-wallets",
    true,
    [
      {
        fieldPath: "userId",
        opStf: "==",
        value: currUser?.uid,
      },
    ],
    [
      {
        fieldPath: "name",
        directionStr: "desc",
      },
    ]
  );

  return (
    <main className="min-h-screen text-base relative font-passionOne bg-background w-full flex flex-col gap-3">
      <div className="w-full p-4 flex flex-col items-center gap-4 relative z-10">
        <WalletAccountSection
          wallets={walletsData}
          user={currUser}
          isGettingData={loadingGetWallet}
        />

        <TransactionReportSection wallets={walletsData} />

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
