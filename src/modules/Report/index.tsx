"use client";
import Unauthenticate from "@/components/Unauthenticate";
import LoaderPage from "@/components/loaders/loaderPage";
import { useAuth } from "@/contexts/AuthContext";
import { useSnapshotDatas } from "@/hooks/FirestoreApiHooks";
import { WalletType } from "@/types/walletTypes";
import { TransactionType } from "@/types/transactionTypes";
import ChartReportSection from "@/modules/Report/ChartReportSection";
import { User } from "firebase/auth";

type PropsType = {
  user: User
};

export default function ReportPageModule({user}: PropsType) {
  const { data: walletData, loading: loadingGetWallet } =
    useSnapshotDatas<WalletType>(
      "user-wallets",
      true,
      [
        {
          fieldPath: "userId",
          opStf: "==",
          value: user.uid,
        },
      ],
      [
        {
          fieldPath: "name",
          directionStr: "desc",
        },
      ]
    );

  const { data: transactionsData, loading: transactionLoading, updateSnapshotParams } =
    useSnapshotDatas<TransactionType>(
      `user-transactions/${user.uid}/transactions`,
      false,
      [],
      [
        {
          fieldPath: "createdAt",
          directionStr: "desc",
        },
      ],
    );

  return (
    <main className="min-h-screen text-lg w-full py-4 flex flex-col gap-5">
      <ChartReportSection
        user={user}
        setDataFilter={() => {}}
        wallets={walletData}
        loadingGetWallet={loadingGetWallet}
        transactions={transactionsData}
        loadingGetTransaction={transactionLoading}
        updateTransaction={updateSnapshotParams}
      />
    </main>
  );
}
