"use client";
import LoaderSection from "@/components/loaders/loaderSection";
import BarReChart from "@/components/reports/BarChart";
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
import { ConvertedSumTransactionData } from "@/types/common";
import { TransactionType } from "@/types/transactionTypes";
import { WalletType } from "@/types/walletTypes";
import {
  todayConvertingTransactions,
  weekConvertingTransactions,
} from "@/utils/filteringData";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

type PropsType = {
  wallets: WalletType[];
};
const TransactionReportSection = ({ wallets }: PropsType) => {
  const { currUser } = useAuth();
  const [isShowTransac, setIsShowTransac] = useState(false);
  const [selectedTab, setSelectedTab] = useState<"today" | "thisWeek">("today");
  const [selectedWallet, setSelectedWallet] = useState<string>();
  const { setTodayFiltering, setOneWeekFiltering } = useFirestoreFilteringQueries();
  const [transactionFilters, setTransactionFilters] = useState<FilterFirestoreType[]>(() => setTodayFiltering());

  const {
    data: transactionsData,
    loading,
    updateSnapshotParams,
  } = useSnapshotDatas<TransactionType>(
    `user-transactions/${currUser?.uid}/transactions`,
    true,
    [...transactionFilters],
  );
  const [convertedTransaction, setConvertedTransaction] = useState<
    ConvertedSumTransactionData[] | null
  >(() => todayConvertingTransactions(transactionsData));

  useEffect(() => {
    if (selectedTab === "today") {
      setConvertedTransaction(() =>
        todayConvertingTransactions(transactionsData)
      );
    } else {
      setConvertedTransaction(() =>
        weekConvertingTransactions(transactionsData)
      );
    }
  }, [transactionsData]);

  // func handler

  const handleChangeWallet = (val: string) => {
    let tabFilter;
    if(selectedTab === "today"){
      tabFilter = setTodayFiltering();
    } else {
      tabFilter = setOneWeekFiltering();
    };

    const newFilter:FilterFirestoreType[] = [
      {
        fieldPath: "accountId",
        opStf: "==",
        value: ""
      },
      ...tabFilter
    ]
    updateSnapshotParams(
      `user-transactions/${currUser?.uid}/transactions`,
      newFilter
    );
  }
  const handleChangeTab = (value: "today" | "thisWeek") => {
    if (value === "today") {
      setSelectedTab("today");
      const todayFilterQuery = setTodayFiltering();
      updateSnapshotParams(
        `user-transactions/${currUser?.uid}/transactions`,
        todayFilterQuery,
        [
          {
            fieldPath: "createdAt",
            directionStr: "desc",
          },
        ]
      );
    } else if (value === "thisWeek") {
      setSelectedTab("thisWeek");
      const weekFilterQuery = setOneWeekFiltering();
      updateSnapshotParams(
        `user-transactions/${currUser?.uid}/transactions`,
        weekFilterQuery,
        [
          {
            fieldPath: "createdAt",
            directionStr: "desc",
          },
        ]
      );
    }
  };

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
        {false ? (
          //   {isGettingData ? (
          <LoaderSection width={"w-14"} />
        ) : wallets?.length === 0 || !wallets ? (
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
              <Button
                onClick={() =>
                  console.log(transactionsData, convertedTransaction)
                }
                className="w-full"
              >
                {loading ? "Loading...." : "Add Transaction"}
              </Button>
            </div>
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
                <BarReChart
                  data={convertedTransaction || []}
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
              </TabsContent>
              <TabsContent value="thisWeek">
                <BarReChart
                  data={convertedTransaction || []}
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
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </div>
  );
};

export default TransactionReportSection;
