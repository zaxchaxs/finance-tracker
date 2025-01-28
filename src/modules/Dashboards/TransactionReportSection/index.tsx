"use client";
import LoaderSection from "@/components/loaders/loaderSection";
import BarReChart from "@/components/systems/BarChart";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TitleSection from "@/components/ui/Title";
import { useAuth } from "@/contexts/AuthContext";
import {
  FilterFirestoreType,
  useSnapshotDatas,
} from "@/hooks/FirestoreApiHooks";
import useFirestoreFilteringQueries from "@/hooks/useFirestoreFilteringQueries";
import { TransactionType } from "@/types/transactionTypes";
import { WalletType } from "@/types/walletTypes";
import {
  todayConvertingTransactions,
  weekConvertingTransactions,
} from "@/utils/filteringData";
import { getRandomAdvice } from "@/utils/randomAdvice";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo, useState } from "react";
import AddTransactionDialog from "./AddTransactionDialog";

type PropsType = {
  wallets: WalletType[];
};
const TransactionReportSection = ({ wallets }: PropsType) => {
  const { currUser } = useAuth();
  const [isShowTransac, setIsShowTransac] = useState(false);
  const [isShowDialog, setIsShowDialog] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<"today" | "thisWeek">("today");
  const [selectedWallet, setSelectedWallet] = useState<string>();
  const { setTodayFiltering, setOneWeekFiltering } =
    useFirestoreFilteringQueries();
  const [selectedFilter, setSelectedFilter] = useState<FilterFirestoreType[]>(
    () => setTodayFiltering()
  );

  const {
    data: transactionsData,
    loading,
    updateSnapshotParams,
  } = useSnapshotDatas<TransactionType>(
    `user-transactions/${currUser?.uid}/transactions`,
    true,
    [...selectedFilter]
  );

  const transactionDesc = useMemo(() => {
    if (selectedTab === "today") {
      const convertedTransaction =
        todayConvertingTransactions(transactionsData);
      return {
        convertedTransaction,
        sumTransaction: {
          income: convertedTransaction?.reduce(
            (acc, curr) => ({
              ...acc,
              income: acc.income + curr.income,
            }),
            { income: 0 }
          ).income,
          expanse: convertedTransaction?.reduce(
            (acc, curr) => ({
              ...acc,
              expanse: acc.expanse + curr.expanse,
            }),
            { expanse: 0 }
          ).expanse,
        },
      };
    } else {
      const convertedTransaction = weekConvertingTransactions(transactionsData);
      return {
        convertedTransaction,
        sumTransaction: {
          income: convertedTransaction?.reduce(
            (acc, curr) => ({
              ...acc,
              income: acc.income + curr.income,
            }),
            { income: 0 }
          ).income,
          expanse: convertedTransaction?.reduce(
            (acc, curr) => ({
              ...acc,
              expanse: acc.expanse + curr.expanse,
            }),
            { expanse: 0 }
          ).expanse,
        },
      };
    }
  }, [transactionsData]);

  // func handler
  const handleChangeWallet = (val: string) => {
    if (val === "all") {
      setSelectedWallet("");
    } else {
      setSelectedWallet(val);
    }

    const newFilter: FilterFirestoreType[] = [
      {
        fieldPath: "accountId",
        opStf: "==",
        value: val,
      },
      ...selectedFilter,
    ];
    updateSnapshotParams(
      `user-transactions/${currUser?.uid}/transactions`,
      newFilter
    );
  };

  const handleChangeTab = (value: "today" | "thisWeek") => {
    if (selectedTab === value) return;

    if (value === "today") {
      setSelectedTab("today");
      const todayFilterQuery = setTodayFiltering();
      setSelectedFilter(todayFilterQuery);

      if (selectedWallet) {
        updateSnapshotParams(
          `user-transactions/${currUser?.uid}/transactions`,
          [
            {
              fieldPath: "accountId",
              opStf: "==",
              value: selectedWallet,
            },
            ...todayFilterQuery,
          ]
        );
        return;
      }

      updateSnapshotParams(
        `user-transactions/${currUser?.uid}/transactions`,
        todayFilterQuery
      );
    } else if (value === "thisWeek") {
      setSelectedTab("thisWeek");
      const weekFilterQuery = setOneWeekFiltering();
      setSelectedFilter(weekFilterQuery);

      if (selectedWallet) {
        updateSnapshotParams(
          `user-transactions/${currUser?.uid}/transactions`,
          [
            {
              fieldPath: "accountId",
              opStf: "==",
              value: selectedWallet,
            },
            ...weekFilterQuery,
          ]
        );
        return;
      }

      updateSnapshotParams(
        `user-transactions/${currUser?.uid}/transactions`,
        weekFilterQuery
      );
    }
  };

  const totalTransactions = transactionDesc.sumTransaction;
  return (
    <div
      className={`w-full flex flex-col items-center font-title shadow-md shadow-gray-400 rounded-lg`}
    >
      <div
        className={`relative w-full rounded-lg overflow-hidden ${
          isShowTransac ? "rounded-b-none" : ""
        }`}
      >
        <div
          className="w-full flex gap-3 items-center cursor-pointer p-4 relative z-10 bg-primary text-lightWhite"
          onClick={() => setIsShowTransac(!isShowTransac)}
        >
          <FontAwesomeIcon
            className="w-2 "
            size="1x"
            icon={faCaretRight}
            rotation={isShowTransac ? 90 : undefined}
          />
          <TitleSection>Current Reports</TitleSection>
        </div>
      </div>

      <div
        className={`w-full rounded-lg rounded-t-none p-4 flex text-secondary text-base flex-col gap-6 font-paragraf font-semibold relative ${
          isShowTransac ? "" : "hidden "
        }`}
      >
        {wallets?.length === 0 || !wallets ? (
          <div className="flex justify-center items-end w-full text-center py-2">
            <p>{`It seem you don't have a wallet account yet, try creating one.`}</p>
          </div>
        ) : (
          <>
            <div className="w-full flex justify-between items-center">
              <div className="flex items-center bg-foreground rounded-lg">
                <Select
                  value={selectedWallet}
                  onValueChange={(val) => handleChangeWallet(val)}
                >
                  <SelectTrigger className="bg-primary ring-black text-lightWhite">
                    <SelectValue placeholder="Select Wallet" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[20rem]">
                    {wallets.map((wallet, idx) => (
                      <SelectItem
                        key={idx}
                        value={wallet.accountId}
                        className="hover:border cursor-pointer rounded-md"
                      >
                        {wallet.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={() => setIsShowDialog(true)} className="w-full">
                {"Add Transaction"}
              </Button>
            </div>
            <>
              <Tabs defaultValue="today" className="w-full">
                <TabsList>
                  <TabsTrigger
                    onClick={() => handleChangeTab("today")}
                    value="today"
                  >
                    Today
                  </TabsTrigger>
                  <TabsTrigger
                    onClick={() => handleChangeTab("thisWeek")}
                    value="thisWeek"
                  >
                    This Week
                  </TabsTrigger>
                </TabsList>
                <TabsContent
                  value="today"
                  className="flex justify-center items-center"
                >
                  {loading ? (
                    <LoaderSection width="w-14" className="h-[20rem]" />
                  ) : (
                    <BarReChart
                      data={transactionDesc.convertedTransaction || []}
                      bars={[
                        {
                          dataKey: "income",
                          color: "#4B5945",
                        },
                        {
                          dataKey: "expanse",
                          color: "#FF1D48",
                        },
                      ]}
                      xAxisDataKey="dataKey"
                      width={350}
                    />
                  )}
                </TabsContent>
                <TabsContent value="thisWeek">
                  {loading ? (
                    <LoaderSection width="w-14" className="h-[20rem]" />
                  ) : (
                    <BarReChart
                      data={transactionDesc.convertedTransaction || []}
                      bars={[
                        {
                          dataKey: "income",
                          color: "#4B5945",
                        },
                        {
                          dataKey: "expanse",
                          color: "#FF1D48",
                        },
                      ]}
                      xAxisDataKey="dataKey"
                    />
                  )}
                </TabsContent>
              </Tabs>
              {!loading && (
                <div className="flex flex-col gap-4">
                  <div>
                    <TitleSection className="text-primary">{`Income: ${totalTransactions.income}`}</TitleSection>
                    <TitleSection className="text-danger">{`Expanse: ${totalTransactions.expanse}`}</TitleSection>
                  </div>
                  <TitleSection variant="h2" className="text-center">
                    {getRandomAdvice(
                      totalTransactions.income,
                      totalTransactions.expanse
                    )}
                  </TitleSection>
                </div>
              )}
            </>
          </>
        )}
      </div>

      <AddTransactionDialog
        isOpen={isShowDialog}
        setIsOpen={setIsShowDialog}
        wallets={wallets}
      />
    </div>
  );
};

export default TransactionReportSection;
