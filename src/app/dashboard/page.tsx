"use client";
import Unauthenticate from "@/components/Unauthenticate";
import DashboardPageSkeleton from "@/components/skeletons/DashboardPageSkeleton";
import { useAuth } from "@/contexts/AuthContext";
import DashboardModule from "@/modules/Dashboards";

const DashboardPage = () => {
  const { currUser, loading: loadingCurrUser } = useAuth();

  return loadingCurrUser ? (
    <DashboardPageSkeleton />
  ) : currUser ? (
    <DashboardModule />
  ) : (
    <Unauthenticate />
  );
};

export default DashboardPage;