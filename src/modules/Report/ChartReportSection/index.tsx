import { monthConvert } from "@/utils/monthConverting";
import { useState, useRef, useEffect, useMemo } from "react";
import { sumTotalAmount } from "@/utils/sumAmount";
import { currencyFormat } from "@/utils/currencyFormat";
import { TransactionType } from "@/types/transactionTypes";
import { WalletType } from "@/types/walletTypes";
import { Button } from "@/components/ui/button";
import TitleSection from "@/components/ui/Title";
import SelectInputControler from "@/components/inputControler/SelectInputControler";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import BarReChart from "@/components/systems/BarChart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import DescriptionSection from "@/components/ui/Description";
import { monthTransactionFilter, yearTransactionFilter } from "@/utils/filteringData";
import { FilterFirestoreType, OrderFirestoreType } from "@/hooks/FirestoreApiHooks";
import { User } from "firebase/auth";
import useFirestoreFilteringQueries from "@/hooks/useFirestoreFilteringQueries";

type PropsType = {
  user: User;
  transactions: TransactionType[],
  loadingGetTransaction: boolean,
  updateTransaction: (collectionName: string, filters?: FilterFirestoreType[], orders?: OrderFirestoreType[], limit?: number) => void,
  wallets: WalletType[],
  loadingGetWallet: boolean,
  setDataFilter: () => void,
};

const ChartReportSection = ({
  user,
  transactions,
  loadingGetTransaction,
  updateTransaction,
  wallets,
  loadingGetWallet,
  setDataFilter,
}: PropsType) => {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [selectedWallet, setSelectedWallet] = useState<string>();
  const [selectedFilter, setSelectedFilter] = useState<"year" | "month">("year");
  const [firestoreFilter, setFirestoreFilter] = useState<FilterFirestoreType[]>([]);

  const {setOneMonthFiltering, setOneYearFiltering} = useFirestoreFilteringQueries();

  const convertedMonth = useMemo(() => {
    return monthConvert(month);
  }, [month]);

  const transactionData = useMemo(() => {
    if(selectedFilter == "year") {
      return yearTransactionFilter(transactions, year);
    } else {
      return monthTransactionFilter(transactions, month, year);
    }
  }, [month, year, selectedFilter, transactions])

  // get default selected wallet
  useEffect(() => {
    if(wallets.length !== 0) {
      const defaultWallet = wallets[0];
      setSelectedWallet(() => JSON.stringify(defaultWallet))
      setFirestoreFilter([{
        fieldPath: "accountId",
        opStf: "==",
        value: defaultWallet.accountId
      }])
    }
  }, [wallets]);

  // get filtered transaction
  useEffect(() => {
    console.log(firestoreFilter);
    
    // updateTransaction(`user-transactions/${user.uid}/transactions`, firestoreFilter);
  }, [firestoreFilter])

  const handleSelectedWallet = (value: string) => {
    if(!value) return;
    setSelectedWallet(value);

    const selectedWalletData:WalletType = JSON.parse(value);
    setFirestoreFilter([
      {
        fieldPath: "accountId",
        opStf: "==",
        value: selectedWalletData.accountId,
      },
    ]);
  }

  const handleSelectedFilter = (val: "year" | "month") => {
    if(val === "year") {
      setSelectedFilter("year")
      if(selectedWallet) {
        const selectedWalletData:WalletType = JSON.parse(selectedWallet);
        setFirestoreFilter([
          {
            fieldPath: "accountId",
            opStf: "==",
            value: selectedWalletData.accountId,
          },
          ...setOneYearFiltering(year)
        ]); 
      }
    } else {
      setSelectedFilter("month");
      if(selectedWallet) {
        const selectedWalletData:WalletType = JSON.parse(selectedWallet);
        setFirestoreFilter([
          {
            fieldPath: "accountId",
            opStf: "==",
            value: selectedWalletData.accountId,
          },
          ...setOneMonthFiltering(year, month),
        ]); 
      }
    }
  };

  // const totalAmount = sumTotalAmount(data);

  // useEffect(() => {
  //   if (!isGettingData) {
  //     if (selectedFilter === "year") {
  //       const filteredData = yearDataFilter(transactions, year);
  //       setData(filteredData);
  //     } else {
  //       const filteredData = monthDataFilter(transactions, month, year);
  //       setData(filteredData);
  //     }
  //   }
  // }, [month, year, selectedFilter, transactions, isGettingData]);

  // useEffect(() => {
  //   // getting current date;
  //   const currDate = new Date();
  //   setYear(currDate.getFullYear());
  //   setMonth(currDate.getMonth());
  //   // handle for outside dropdown click
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  // handler functions
  // const toggleWalletDropDown = () => {
  //   setIsWalletOpen(!isWalletOpen);
  // };

  // const handleClickOutside = (event) => {
  //   if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //     setIsWalletOpen(isWalletOpen);
  //   }
  // };

  // const handleSelectedFilter = (e) => {
  //   setSelectedFilter(e.target.value);
  // };
  
  const handleRightBtnClick = () => {
    if (selectedFilter === "year") {
      setYear(year + 1);
    } else {
      if (month === 11) {
        setMonth(0);
        setYear(year + 1);
        return;
      }
      setMonth(month + 1);
    }
  };

  const handleLeftBtnClick = () => {
    if (selectedFilter === "year") {
      setYear(year - 1);
    } else {
      if (month === 0) {
        setMonth(11);
        setYear(year - 1);
        return;
      }
      setMonth(month - 1);
    }
  };

  // const handleSelectedWallet = (e) => {
  //   if (e.target.name === selectedWallet) {
  //     setSelectedWallet("Specify Wallet");
  //     setIsWalletOpen(!isWalletOpen);
  //     setDataFilter("all");
  //   } else {
  //     setSelectedWallet(e.target.name);
  //     setIsWalletOpen(!isWalletOpen);
  //     setDataFilter(e.target.value);
  //   }
  // };

  return (
    <div className="w-full px-5 flex text-base flex-col gap-5 text-lightWhite font-title relative z-10">
      <>
        {/* filter input sections */}
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
                  onClick={handleLeftBtnClick}
                  className="rounded-r-none"
                >
                  <FontAwesomeIcon icon={faCaretLeft} />
                </Button>
                <Button
                  normalBtn
                  className="bg-secondary h-max w-full text-center rounded-none"
                  onClick={() => console.log(transactions)}
                >
                  {selectedFilter === "year"
                    ? year
                    : `${convertedMonth}, ${year}`}
                </Button>
                <Button
                  normalBtn
                  onClick={handleRightBtnClick}
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
            <TitleSection className="text-primary">1000</TitleSection>
          </div>
          <div className="flex justify-start gap-1 items-center">
            <TitleSection>Total Expense:</TitleSection>
            <TitleSection className="text-danger">5000</TitleSection>
          </div>
        </div>

        <div className="w-fit text-base">
          <TitleSection className="text-secondary p-1">
            Select Wallet
          </TitleSection>
          <Select
            onValueChange={handleSelectedWallet}
            value={selectedWallet}
          >
            <SelectTrigger className="text-lightWhite font-title font-bold bg-primary">
              <SelectValue placeholder="Select Wallet" />
            </SelectTrigger>
            <SelectContent className="bg-foreground font-bold text-primary max-h-[20rem]">
              {wallets.map((wallet, idx) => (
                <SelectItem key={idx} value={JSON.stringify(wallet)}>
                  {wallet.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* chart graph */}
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

        <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi modi eveniet culpa. Exercitationem nihil, voluptates culpa tempora labore aut, sint dignissimos reprehenderit accusantium alias ipsa repellendus enim consequatur? Ad, voluptatibus?</h1>

        {/* info */}
        {/* <AdviceInfo totalAmount={10000} /> */}

        {/* All filtered transactions */}
        {/* <div className="w-full p-1 text-base rounded-md shadow-md items-center flex justify-center bg-secondary hover:bg-secondary-hover active:bg-secondary cursor-pointer">
            <button>{`Show all transaction in ${convertedMonth}, ${year}`}</button>
          </div> */}
      </>
    </div>
  );
};

export default ChartReportSection;
