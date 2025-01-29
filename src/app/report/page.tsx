'use client'
import DashboardPageSkeleton from "@/components/skeletons/DashboardPageSkeleton";
import Unauthenticate from "@/components/Unauthenticate";
import { useAuth } from "@/contexts/AuthContext";
import ReportPageModule from "@/modules/Report/page";

const ReportPage = () => {
  const { currUser, loading: loadingCurrUser } = useAuth();
  return loadingCurrUser ? (
    <DashboardPageSkeleton />
  ) : currUser ? (
    <ReportPageModule />
  ) : (
    <Unauthenticate />
  );
};

export default ReportPage;
