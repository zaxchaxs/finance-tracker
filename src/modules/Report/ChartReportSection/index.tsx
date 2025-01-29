import { monthConvert } from "@/utils/monthConverting";
import { useState, useRef, useEffect } from "react";
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

type PropsType = {
  transactions: TransactionType[],
  loadingGetTransaction: boolean,
  wallets: WalletType[],
  loadingGetWallet: boolean,
  setDataFilter: () => void,
};

const ChartReportSection = ({
  transactions,
  loadingGetTransaction,
  wallets,
  loadingGetWallet,
  setDataFilter,
}: PropsType) => {
  const [data, setData] = useState(transactions);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [selectedWallet, setSelectedWallet] = useState<string>();
  const [selectedFilter, setSelectedFilter] = useState<"year" | "month">("year");
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const dropdownRef = useRef(null);

  const convertedMonth = monthConvert(month);
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

  useEffect(() => {
    if(wallets.length !== 0) {
      setSelectedWallet(() => JSON.stringify(wallets[0]))
    }
  }, [])

  // handler functions
  // const toggleWalletDropDown = () => {
  //   setIsWalletOpen(!isWalletOpen);
  // };
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsWalletOpen(isWalletOpen);
    }
  };
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
                onClick={() => setSelectedFilter("year")}
              >
                Year
              </Button>
              <Button
                normalBtn
                variant={selectedFilter === "month" ? "default" : "secondary"}
                className="rounded-l-none"
                onClick={() => setSelectedFilter("month")}
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
                <div className="bg-secondary h-full w-full text-center">
                  <DescriptionSection className="text-lightWhite">
                    {" "}
                    {selectedFilter === "year"
                      ? year
                      : `${convertedMonth}, ${year}`}
                  </DescriptionSection>
                </div>
                <Button
                  normalBtn
                  onClick={handleRightBtnClick}
                  className="rounded-l-none"
                >
                  <FontAwesomeIcon icon={faCaretRight} />
                </Button>
                {/* <button
                      value={"left"}
                      // onClick={handleLeftBtnClick}
                      className={`relative ring-1 ring-black z-10 h-full p-1.5 px-3 rounded-l-lg bg-third hover:bg-third-hover text-secondary active:bg-third`}
                    >
                    </button> */}
                {/* <button
                      value={"middle"}
                      className={`relative w-full ring-1 ring-black z-10 h-full p-1.5 px-3  bg-secondary text-lightWhite hover:bg-secondary active:bg-secondary`}
                    >
                      {selectedFilter === "year"
                        ? year
                        : `${convertedMonth}, ${year}`}
                    </button> */}
                {/* <button
                      value={"left"}
                      onClick={handleRightBtnClick}
                      className={`relative ring-1 ring-black z-10 h-full p-1.5 px-3 rounded-r-lg bg-third hover:bg-third-hover text-secondary active:bg-third`}
                    >
                      <FontAwesomeIcon icon={faCaretRight} />
                    </button> */}
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
            onValueChange={(val) => setSelectedWallet(val)}
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
        {/* <BarReChart /> */}

        {/* info */}
        {/* <AdviceInfo totalAmount={totalAmount} /> */}

        {/* All filtered transactions */}
        {/* <div className="w-full p-1 text-base rounded-md shadow-md items-center flex justify-center bg-secondary hover:bg-secondary-hover active:bg-secondary cursor-pointer">
            <button>{`Show all transaction in ${convertedMonth}, ${year}`}</button>
          </div> */}
      </>
    </div>
  );
};

export default ChartReportSection;
