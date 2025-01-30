"use client";
import Unauthenticate from "@/components/Unauthenticate";
import LoaderPage from "@/components/loaders/loaderPage";
import NavbarPage from "@/components/Navbars/NavbarPage";
import ReportStats from "@/modules/Report/ChartReportSection";
import tempTransaction from "@/components/tempTransactions";
import { useAuth } from "@/contexts/AuthContext";
import {
  getSnapshotUserTransaction,
  getSnapshotUserWallet,
} from "@/libs/firestoreMethods";
import { useEffect, useRef, useState } from "react";
import { useSnapshotDatas } from "@/hooks/FirestoreApiHooks";
import { WalletType } from "@/types/walletTypes";
import { TransactionType } from "@/types/transactionTypes";
import ChartReportSection from "@/modules/Report/ChartReportSection";

export default function ReportPageModule() {
  const { currUser, loading } = useAuth();

  const { data: walletData, loading: loadingGetWallet } =
    useSnapshotDatas<WalletType>(
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

  const { data: transactionsData, loading: transactionLoading, updateSnapshotParams } =
    useSnapshotDatas<TransactionType>(
      `user-transactions/${currUser?.uid}/transactions`,
      false,
      [],
      [
        {
          fieldPath: "createdAt",
          directionStr: "desc",
        },
      ],
      10
    );

  //   const handleFilterData = (id) => {
  //     setFilteredTransactions(transactions.filter((obj) => obj.accountId == id));
  //   };

  return loading ? (
    <LoaderPage />
  ) : currUser ? (
    <main className="min-h-screen text-lg w-full py-4 flex flex-col gap-5">
      <ChartReportSection
        user={currUser}
        setDataFilter={() => {}}
        wallets={walletData}
        loadingGetWallet={loadingGetWallet}
        transactions={transactionsData}
        loadingGetTransaction={transactionLoading}
        updateTransaction={updateSnapshotParams}
      />
    </main>
  ) : (
    <Unauthenticate />
  );
}
