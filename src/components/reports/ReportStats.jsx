import { monthConvert } from "@/utils/monthConverting";
import { useState, useRef, useEffect } from "react";
import { monthDataFilter, yearDataFilter } from "@/utils/filteringData";
import Chart from "./BarChart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretLeft,
  faCaretRight,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import { sumTotalAmount } from "@/utils/sumAmount";
import { formatRupiah } from "@/utils/formatRupiah";
import AdviceInfo from "../AdviceInfo";
import LoaderSection from "../loaders/loaderSection";
import PrimaryButton from "../ui/buttons/PrimaryButton";
import SolidShadow from "../ui/solidShadow/SolidShadow";
import DropDownButton from "../ui/buttons/DropDownButton";

const ReportStats = ({
  transactions,
  isGettingData,
  wallets,
  setDataFilter,
}) => {
  const [data, setData] = useState(transactions);
  const [year, setYear] = useState();
  const [month, setMonth] = useState();
  const [selectedWallet, setSelectedWallet] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("year");
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const dropdownRef = useRef(null);

  const convertedMonth = monthConvert(month);
  const totalAmount = sumTotalAmount(data);

  useEffect(() => {
    if (!isGettingData) {
      if (selectedFilter === "year") {
        const filteredData = yearDataFilter(transactions, year);
        setData(filteredData);
      } else {
        const filteredData = monthDataFilter(transactions, month, year);
        setData(filteredData);
      }
    }
  }, [month, year, selectedFilter, transactions, isGettingData]);

  useEffect(() => {
    // getting current date;
    const currDate = new Date();
    setYear(currDate.getFullYear());
    setMonth(currDate.getMonth());

    // handle for outside dropdown click
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // handler functions
  const toggleWalletDropDown = () => {
    setIsWalletOpen(!isWalletOpen);
  };
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsWalletOpen(isWalletOpen);
    }
  };
  const handleSelectedFilter = (e) => {
    setSelectedFilter(e.target.value);
  };
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

  const handleSelectedWallet = (e) => {
    if (e.target.name === selectedWallet) {
      setSelectedWallet("Specify Wallet");
      setIsWalletOpen(!isWalletOpen);
      setDataFilter("all");
    } else {
      setSelectedWallet(e.target.name);
      setIsWalletOpen(!isWalletOpen);
      setDataFilter(e.target.value);
    }
  };

  return (
    <div className="w-full px-5 mt-20 flex flex-col gap-5 text-lightWhite font-title relative z-10">
      {isGettingData ? (
        <LoaderSection width={"w-14"} />
      ) : (
        <>
          {/* filter element sections */}
          <div className="w-full font-title text-base flex justify-between items-center">
            {/* btn filter */}
            <div className="flex w-full">
              <PrimaryButton
                handleClick={handleSelectedFilter}
                text={"Year"}
                type={selectedFilter === "year" ? "Primary" : "secondary"}
                value={"year"}
              />

              <PrimaryButton
                handleClick={handleSelectedFilter}
                text={"Month"}
                type={selectedFilter === "month" ? "Primary" : "secondary"}
                value={"month"}
              />
            </div>

            {/* Page Filter */}
            <div
              className="w-full flex items-center justify-center relative"
            >
              <div className="w-fit relative group flex">
                <SolidShadow background={"bg-teal-900"} />
                <div className="relative flex justify-center items-center mx-auto w-fit z-10 font-title">
                  <button
                    value={"left"}
                    onClick={handleLeftBtnClick}
                    className={`relative ring-1 ring-black z-10 h-full p-1.5 px-3 rounded-l-lg bg-third hover:bg-third-hover text-secondary active:bg-third`}
                  >
                    <FontAwesomeIcon icon={faCaretLeft} />
                  </button>
                  <button
                    value={"middle"}
                    className={`relative w-full ring-1 ring-black z-10 h-full p-1.5 px-3  bg-secondary text-lightWhite hover:bg-secondary active:bg-secondary`}
                  >
                    {selectedFilter === "year"
                      ? year
                      : `${convertedMonth}, ${year}`}
                  </button>
                  <button
                    value={"left"}
                    onClick={handleRightBtnClick}
                    className={`relative ring-1 ring-black z-10 h-full p-1.5 px-3 rounded-r-lg bg-third hover:bg-third-hover text-secondary active:bg-third`}
                  >
                    <FontAwesomeIcon icon={faCaretRight} />
                  </button>
                </div>
              </div>
            </div>

          </div>

          <div className="text-secondary text-base">
            <div className="flex justify-start items-center gap-1">
              <h1>{`Total Income: `}</h1>
              <h1 className="text-primary">{`${formatRupiah(
                totalAmount?.income
              )}`}</h1>
            </div>
            <div className="flex justify-start gap-1 items-center">
              <h1>{`Total Expanse: `}</h1>
              <h1 className="text-danger-hover">{`${formatRupiah(
                totalAmount?.expanse
              )}`}</h1>
            </div>
          </div>

              <div className="w-fit z-20">
                <DropDownButton datas={wallets} handleSelectedItem={handleSelectedWallet} selectedItem={selectedWallet || "Specify Wallet"} />

              </div>

          {/* chart graph */}
          <Chart data={data} />

          {/* info */}
          <AdviceInfo totalAmount={totalAmount} />

          {/* All filtered transactions */}
          {/* <div className="w-full p-1 text-base rounded-md shadow-md items-center flex justify-center bg-secondary hover:bg-secondary-hover active:bg-secondary cursor-pointer">
            <button>{`Show all transaction in ${convertedMonth}, ${year}`}</button>
          </div> */}
        </>
      )}
    </div>
  );
};

export default ReportStats;
