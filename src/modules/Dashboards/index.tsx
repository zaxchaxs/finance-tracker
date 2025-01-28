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
    <main className="min-h-screen text-base relative font-passionOne w-full flex flex-col gap-3">
      <div className="w-full p-4 flex flex-col items-center gap-4 relative z-10">
        <WalletAccountSection
          wallets={walletData}
          isGettingData={loadingGetWallet}
        />

        <TransactionReportSection isGettingWallets={loadingGetWallet} wallets={walletData} />

        {/* Current Transaction Section */}
        <CurrentTransactionSection loadingGetTransaction={transactionLoading} transactions={transactionsData} />
      </div>
    </main>
  );
};

export default DashboardModule;
