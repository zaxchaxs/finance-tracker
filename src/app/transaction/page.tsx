"use client";
import TransactionPageSkeleton from "@/components/skeletons/TransactionPageSkeleton";
import Unauthenticate from "@/components/Unauthenticate";
import { useAuth } from "@/contexts/AuthContext";
import TransactionModule from "@/modules/Transactions";

const TransactionPage = () => {
  const { currUser, loading } = useAuth();

  return loading ? (
    <TransactionPageSkeleton />
  ) : currUser ? (
    <TransactionModule />
  ) : (
    <Unauthenticate />
  );
};

export default TransactionPage;
