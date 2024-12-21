import { useAuth } from "@/contexts/AuthContext";
import WalletAccountSection from "./WalletSection/WalletAccoutSection";
import { WalletType } from "@/types/walletTypes";
import { useSnapshotDatas } from "@/hooks/FirestoreApiHooks";
import TransactionReportSection from "./TransactionReportSection";
import CurrentTransactionSection from "./CurrentTransactionSection";
import { TransactionType } from "@/types/transactionTypes";

const DashboardModule = () => {
  const { currUser } = useAuth();

  const {
    data: walletData,
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

  const {data: transactionsData, loading: transactionLoading} = useSnapshotDatas<TransactionType>(
    `user-transactions/${currUser?.uid}/transactions`,
    true,
    [],
    [
      {
        fieldPath: "createdAt",
        directionStr: "desc",
      },
    ],
    10
  );

  return (
    <main className="min-h-screen text-base relative font-passionOne bg-background w-full flex flex-col gap-3">
      <div className="w-full p-4 flex flex-col items-center gap-4 relative z-10">
        <WalletAccountSection
          wallets={walletData}
          isGettingData={loadingGetWallet}
        />

        <TransactionReportSection wallets={walletData} />

        {/* Current Transaction Section */}
        <CurrentTransactionSection transactions={transactionsData} />
        {/* <div className="pt-4 w-full text-primary flex flex-col items-center font-title">
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
        <CurrentTransaction isShowed={isShowCurrTransac} user={currUser} /> */}
      </div>
    </main>
  );
};

export default DashboardModule;
