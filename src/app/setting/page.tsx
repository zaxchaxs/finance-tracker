"use client";

import DashboardPageSkeleton from "@/components/skeletons/DashboardPageSkeleton";
import Unauthenticate from "@/components/Unauthenticate";
import { useAuth } from "@/contexts/AuthContext";
import SettingPageModule from "@/modules/Setting";

const SettingPage = () => {
  const { currUser, loading: loadingCurrUser } = useAuth();

  return loadingCurrUser ? (
    <DashboardPageSkeleton />
  ) : currUser ? (
    <SettingPageModule />
  ) : (
    <Unauthenticate />
  );
};

export default SettingPage;