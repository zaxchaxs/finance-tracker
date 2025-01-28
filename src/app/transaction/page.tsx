"use client";
import LoaderPage from "@/components/loaders/loaderPage";
import Unauthenticate from "@/components/Unauthenticate";
import { useAuth } from "@/contexts/AuthContext";
import TransactionModule from "@/modules/Transactions";

const TransactionPage = () => {
  const { currUser, loading } = useAuth();

  return loading ? (
    <LoaderPage />
  ) : currUser ? (
    <TransactionModule />
  ) : (
    <Unauthenticate />
  );
};

export default TransactionPage;
