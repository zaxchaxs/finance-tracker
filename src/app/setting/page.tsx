"use client";
import SettingPageSkeleton from "@/components/skeletons/SettingPageSkeleton";
import Unauthenticate from "@/components/Unauthenticate";
import { useAuth } from "@/contexts/AuthContext";
import SettingPageModule from "@/modules/Setting";

const SettingPage = () => {
  const { currUser, loading: loadingCurrUser, docUser } = useAuth();

  return loadingCurrUser ? (
    <SettingPageSkeleton />
  ) : currUser && docUser ? (
    <SettingPageModule userDoc={docUser} />
  ) : (
    <Unauthenticate />
  );
};

export default SettingPage;