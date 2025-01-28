import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TransactionAddSection from "./TransactionAddSection";
import { useSnapshotDatas } from "@/hooks/FirestoreApiHooks";
import { WalletType } from "@/types/walletTypes";
import { useAuth } from "@/contexts/AuthContext";
import CurrentTransactionSection from "../Dashboards/CurrentTransactionSection";
import { TransactionType } from "@/types/transactionTypes";
import BalanceTransferSection from "./BalanceTransferSection";

const TransactionModule = () => {
  const { currUser } = useAuth();

  const {
    data: walletData,
    error,
    loading: loadingGetWallet,
  } = useSnapshotDatas<WalletType>(
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

  const { data: transactionsData, loading: transactionLoading } =
    useSnapshotDatas<TransactionType>(
      `user-transactions/${currUser?.uid}/transactions`,
      true,
      [],
      [
        {
          fieldPath: "createdAt",
          directionStr: "desc",
        },
      ],
      10
    );
  return (
    <div className="p-4 w-full flex flex-col gap-4">
      <Tabs defaultValue="addTransaction">
        <TabsList className="w-full gap-4">
          <TabsTrigger value="addTransaction">Add New Transaction</TabsTrigger>
          <TabsTrigger value="transferBalance">Transfer Balance</TabsTrigger>
        </TabsList>
        <TabsContent value="addTransaction" className="w-full">
          <TransactionAddSection wallets={walletData} />
        </TabsContent>
        <TabsContent value="transferBalance" className="w-full">
          <BalanceTransferSection wallets={walletData} />
        </TabsContent>
      </Tabs>
      
      <CurrentTransactionSection transactions={transactionsData} />
    </div>
  );
};

export default TransactionModule;
