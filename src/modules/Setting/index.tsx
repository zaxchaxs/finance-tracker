import LoadingFullPage from "@/components/systems/LoadingFullPage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import DescriptionSection from "@/components/ui/Description";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import TitleSection from "@/components/ui/Title";
import { useAuth } from "@/contexts/AuthContext";
import { useSnapshotDatas } from "@/hooks/FirestoreApiHooks";
import useToast from "@/hooks/useToast";
import { cn } from "@/lib/utils";
import { getDocumentCount, logout } from "@/libs/firestoreMethods";
import { UserDocType } from "@/types/authenticationModel";
import { TransactionType } from "@/types/transactionTypes";
import { convertJSONToCSV, firestoreDateToString } from "@/utils/strings";
import { Timestamp } from "firebase/firestore";
import { LucideArrowLeftRight, LucideWallet } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

type PropsType = {
  userDoc: UserDocType;
};

export default function SettingPageModule({ userDoc }: PropsType) {
  const [loading, setLoading] = useState<boolean>(false);
  const [totalTransaction, setTotalTransaction] = useState<number>(0);
  const [totalWallet, setTotalWallet] = useState<number>(0);
  const router = useRouter();
  const { currUser } = useAuth();

  const {
    data: transactionsData,
    loading: transactionLoading,
    reSnapshot,
  } = useSnapshotDatas<TransactionType>(
    `user-transactions/${currUser?.uid}/transactions`,
    false,
    [],
    [
      {
        fieldPath: "createdAt",
        directionStr: "desc",
      },
    ]
  );

  const getItemCount = async () => {
    setLoading(true);
    try {
      const walletCount = await getDocumentCount("user-wallets");
      setTotalWallet(walletCount);
      const transactionCount = await getDocumentCount(
        `user-transactions/${userDoc.userId}/transactions`
      );
      setTotalTransaction(transactionCount);
    } catch (error) {
      const errMessage =
        error instanceof Error ? error.message : "Something wrong!";
      console.error(errMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getItemCount();
  }, []);

  useEffect(() => {
    if (transactionsData.length > 0 && !transactionLoading) {
      const editedTransactions = transactionsData.map((transaction) => {
        transaction.date = firestoreDateToString(
          transaction.date
        ) as unknown as Timestamp;
        transaction.createdAt = firestoreDateToString(
          transaction.createdAt
        ) as unknown as Timestamp;
        return transaction;
      });
      const csv = convertJSONToCSV(editedTransactions);
      downloadCSV(
        csv,
        `transactions_${userDoc.name}_${new Date().getMilliseconds()}.csv`
      );
    }
  }, [transactionLoading, transactionsData]);

  const handleLogout = async () => {
    await logout();
    router.push("/signIn");
  };

  const downloadCSV = (csv: string, filename: string) => {
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen text-base relative w-full flex flex-col items-center">
      <div className="w-full flex flex-col gap-3">
        <div className="bg-primary p-4 flex flex-col gap-4 items-center justify-center w-full rounded-b-5xl">
          <div className="flex items-center w-full gap-2">
            <Avatar>
              <AvatarImage src={userDoc.photoURL || ""} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-center text-lightWhite">
              <TitleSection className="text-lightWhite">
                {userDoc.name}
              </TitleSection>
              <DescriptionSection>{userDoc.email}</DescriptionSection>
            </div>
          </div>
          <div className="w-[95%] border border-lightWhite" />
          <div className="grid grid-cols-2 w-full p-4">
            <BadgeItem
              icon={<LucideWallet />}
              item={totalWallet}
              label="Wallets"
              className="text-lightWhite"
              loadingGetItem={loading}
            />
            <BadgeItem
              icon={<LucideArrowLeftRight />}
              item={totalTransaction}
              label="Transactions"
              className="text-lightWhite"
              loadingGetItem={loading}
            />
          </div>
        </div>
        <div className="px-4">
          <div className="border-b border-primary p-2 rounded-b-sm flex justify-between items-center">
            <div className="flex flex-col">
              <TitleSection variant="h2">Theme</TitleSection>
              <DescriptionSection>Light</DescriptionSection>
            </div>
            <Switch id="airplane-mode" />
          </div>
        </div>
        <div className=" w-fit p-4 flex flex-col gap-4 relative z-10">
          <Button normalBtn onClick={() => reSnapshot()} variant={"default"}>
            Download transaction data
          </Button>
          <Button normalBtn onClick={handleLogout} variant={"destructive"}>
            Logout
          </Button>
        </div>
      </div>
      <div className="w-fit p-4">
        <Button variant={"destructive"}>Delete my account</Button>
      </div>
      {transactionLoading && (
        <LoadingFullPage className="bg-primary/30 backdrop-blur-sm" description="This may take a few minutes" />
      )}
    </main>
  );
}

type BadgePropsType = {
  label: string;
  item: string | number;
  icon: ReactNode;
  className?: string;
  loadingGetItem?: boolean;
};

const BadgeItem = ({
  label,
  icon,
  item,
  className,
  loadingGetItem,
}: BadgePropsType) => {
  return (
    <div
      className={cn(
        "w-full flex flex-col gap-1 items-center justify-center",
        className
      )}
    >
      <div className="w-fit rounded-full flex items-center justify-center bg-primary-hover p-2.5">
        {icon}
      </div>
      <div className="flex flex-col gap-2 text-center items-center">
        <Label>{label}</Label>
        {loadingGetItem ? (
          <Skeleton className="w-14 h-3 bg-primary-hover rounded-md" />
        ) : (
          <Label>{item}</Label>
        )}
      </div>
    </div>
  );
};
