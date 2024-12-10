"use client";
import Unauthenticate from "@/components/Unauthenticate";
import LoaderPage from "@/components/loaders/loaderPage";
import { useAuth } from "@/contexts/AuthContext";
import DashboardModule from "@/modules/Dashboards";

const DashboardPage = () => {
  const { currUser, loading: loadingCurrUser } = useAuth();

  return loadingCurrUser ? (
    <LoaderPage />
  ) : currUser ? (
    <DashboardModule />
  ) : (
    <Unauthenticate />
  );
};

export default DashboardPage;