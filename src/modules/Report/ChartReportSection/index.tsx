import { monthConvert } from "@/utils/monthConverting";
import { useState, useRef, useEffect, useMemo } from "react";
import { sumTotalTransaction } from "@/utils/sumTotalTransaction";
import { TransactionType } from "@/types/transactionTypes";
import { WalletType } from "@/types/walletTypes";
import { Button } from "@/components/ui/button";
import TitleSection from "@/components/ui/Title";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BarReChart from "@/components/systems/BarChart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import {
  monthTransactionFilter,
  yearTransactionFilter,
} from "@/utils/filteringData";
import {
  FilterFirestoreType,
  OrderFirestoreType,
} from "@/hooks/FirestoreApiHooks";
import { User } from "firebase/auth";
import useFirestoreFilteringQueries from "@/hooks/useFirestoreFilteringQueries";
import { Skeleton } from "@/components/ui/skeleton";

type PropsType = {
  user: User;
  transactions: TransactionType[];
  loadingGetTransaction: boolean;
  updateTransaction: (
    collectionName: string,
    filters?: FilterFirestoreType[],
    orders?: OrderFirestoreType[],
    limit?: number
  ) => void;
  wallets: WalletType[];
  loadingGetWallet: boolean;
};

const ChartReportSection = ({
  user,
  transactions,
  loadingGetTransaction,
  updateTransaction,
  wallets,
  loadingGetWallet,
}: PropsType) => {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [selectedWallet, setSelectedWallet] = useState<string>();
  const [selectedFilter, setSelectedFilter] = useState<"year" | "month">(
    "year"
  );
  const [firestoreFilter, setFirestoreFilter] = useState<FilterFirestoreType[]>(
    []
  );

  const { setOneMonthFiltering, setOneYearFiltering } =
    useFirestoreFilteringQueries();

  const convertedMonth = useMemo(() => monthConvert(month), [month]);

  const transactionData = useMemo(
    () =>
      selectedFilter === "year"
        ? yearTransactionFilter(transactions, year)
        : monthTransactionFilter(transactions, month, year),
    [month, year, selectedFilter, transactions]
  );

  const totalTransaction = useMemo(() => {
    if (selectedWallet) {
      return sumTotalTransaction(transactionData, selectedWallet);
    }
  }, [transactionData]);

  // get default selected wallet
  useEffect(() => {
    if (wallets.length !== 0) {
      const defaultWallet = wallets[0];
      setSelectedWallet(() => JSON.stringify(defaultWallet));
      updateFirestoreFilter(defaultWallet.accountId, []);
    }
  }, [wallets]);

  // get filtered transaction
  useEffect(() => {
    if (firestoreFilter.length !== 0) {
      updateTransaction(
        `user-transactions/${user.uid}/transactions`,
        firestoreFilter
      );
    }
  }, [firestoreFilter]);

  // event handler
  const handleSelectedWallet = (value: string) => {
    if (!value) return;
    setSelectedWallet(value);

    const walletData: WalletType = JSON.parse(value);
    updateFirestoreFilter(
      walletData.accountId,
      selectedFilter === "year"
        ? setOneYearFiltering(year)
        : setOneMonthFiltering(year, month)
    );
  };
  const handleSelectedFilter = (val: "year" | "month") => {
    setSelectedFilter(val);
    if (selectedWallet) {
      const walletData: WalletType = JSON.parse(selectedWallet);
      const filterData =
        val === "year"
          ? setOneYearFiltering(year)
          : setOneMonthFiltering(year, month);
      updateFirestoreFilter(walletData.accountId, filterData);
    }
  };
  const handleNavigation = (direction: "left" | "right") => {
    if (!selectedWallet) return;
    const walletData: WalletType = JSON.parse(selectedWallet);

    let newYear = year;
    let newMonth = month;

    if (selectedFilter === "year") {
      newYear = direction === "right" ? year + 1 : year - 1;
      setYear(newYear);
      updateFirestoreFilter(walletData.accountId, setOneYearFiltering(newYear));
    } else {
      if (direction === "right") {
        newMonth = month === 11 ? 0 : month + 1;
        newYear = month === 11 ? year + 1 : year;
      } else {
        newMonth = month === 0 ? 11 : month - 1;
        newYear = month === 0 ? year - 1 : year;
      }
      setYear(newYear);
      setMonth(newMonth);
      updateFirestoreFilter(
        walletData.accountId,
        setOneMonthFiltering(newYear, newMonth)
      );
    }
  };

  const updateFirestoreFilter = (
    walletId: string,
    filterData: FilterFirestoreType[]
  ) => {
    setFirestoreFilter([
      { fieldPath: "accountId", opStf: "==", value: walletId },
      ...filterData,
    ]);
  };

  return (
    <div className="w-full flex text-base flex-col gap-4 text-lightWhite font-title">
      {/* filter sections */}
      {!loadingGetWallet && wallets.length === 0 ? (
        <div className="w-full text-center">
          <TitleSection>{`It seems you don't have wallet yet.`}</TitleSection>
          <TitleSection>Try to create one</TitleSection>
        </div>
      ) : (
        <>
          <div className="w-full flex flex-col items-center gap-2">
            <TitleSection className="text-secondary p-1 font-bold">
              Select Filter
            </TitleSection>

            <div className="w-full flex justify-between items-center gap-2">
              <div className="flex w-full">
                <Button
                  normalBtn
                  variant={selectedFilter === "year" ? "default" : "secondary"}
                  className="rounded-r-none"
                  value={"year"}
                  onClick={() => handleSelectedFilter("year")}
                >
                  Year
                </Button>
                <Button
                  normalBtn
                  variant={selectedFilter === "month" ? "default" : "secondary"}
                  className="rounded-l-none"
                  onClick={() => handleSelectedFilter("month")}
                >
                  Month
                </Button>
              </div>
              <div className="w-full flex items-center relative">
                <div className=" w-full relative flex justify-center items-center font-title">
                  <Button
                    normalBtn
                    onClick={() => handleNavigation("left")}
                    className="rounded-r-none"
                  >
                    <FontAwesomeIcon icon={faCaretLeft} />
                  </Button>
                  <Button
                    normalBtn
                    className="bg-secondary h-max w-full text-center rounded-none"
                  >
                    {selectedFilter === "year"
                      ? year
                      : `${convertedMonth}, ${year}`}
                  </Button>
                  <Button
                    normalBtn
                    onClick={() => handleNavigation("right")}
                    className="rounded-l-none"
                  >
                    <FontAwesomeIcon icon={faCaretRight} />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="text-secondary">
            <div className="flex justify-start items-center gap-1">
              <TitleSection>Total Income:</TitleSection>
              <TitleSection className="text-primary">
                {totalTransaction?.income}
              </TitleSection>
            </div>
            <div className="flex justify-start gap-1 items-center">
              <TitleSection>Total Expense:</TitleSection>
              <TitleSection className="text-danger">
                {totalTransaction?.expanse}
              </TitleSection>
            </div>
          </div>

          <div className="w-fit text-base">
            <TitleSection className="text-secondary p-1">
              Select Wallet
            </TitleSection>
            <Select onValueChange={handleSelectedWallet} value={selectedWallet}>
              <SelectTrigger className="text-lightWhite font-title font-bold bg-primary">
                <SelectValue placeholder="Select Wallet" />
              </SelectTrigger>
              <SelectContent className="bg-foreground font-bold text-primary max-h-[20rem]">
                {loadingGetWallet ? (
                  <SelectGroup>
                    <SelectLabel>Loading...</SelectLabel>
                  </SelectGroup>
                ) : (
                  wallets.map((wallet, idx) => (
                    <SelectItem key={idx} value={JSON.stringify(wallet)}>
                      {wallet.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
        </>
      )}

      {/* chart graph */}
      {loadingGetTransaction ? (
        <Skeleton className="w-full h-[25rem] rounded-lg" />
      ) : (
        <BarReChart
          data={transactionData}
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
          xAxisDataKey="name"
          width={1000}
        />
      )}
    </div>
  );
};

export default ChartReportSection;
