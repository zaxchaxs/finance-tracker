'use client'
import ReportPageSkeleton from "@/components/skeletons/ReportPageSkeleton";
import Unauthenticate from "@/components/Unauthenticate";
import { useAuth } from "@/contexts/AuthContext";
import ReportPageModule from "@/modules/Report";

const ReportPage = () => {
  const { currUser, loading: loadingCurrUser } = useAuth();
  return loadingCurrUser ? (
    <ReportPageSkeleton />
  ) : currUser ? (
      <ReportPageModule user={currUser} />
  ) : (
    <Unauthenticate />
  );
};

export default ReportPage;
