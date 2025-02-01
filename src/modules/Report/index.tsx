"use client";
import { useSnapshotDatas } from "@/hooks/FirestoreApiHooks";
import { WalletType } from "@/types/walletTypes";
import { TransactionType } from "@/types/transactionTypes";
import ChartReportSection from "@/modules/Report/ChartReportSection";
import { User } from "firebase/auth";
import CurrentTransactionSection from "../Dashboards/CurrentTransactionSection";

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
      <div className="w-full p-4 flex flex-col items-center gap-4">
        <ChartReportSection
          user={user}
          wallets={walletData}
          loadingGetWallet={loadingGetWallet}
          transactions={transactionsData}
          loadingGetTransaction={transactionLoading}
          updateTransaction={updateSnapshotParams}
        />
        <CurrentTransactionSection
          title="List Transaction"
          transactions={transactionsData}
          loadingGetTransaction={transactionLoading}
        />
      </div>
    </main>
  );
}
