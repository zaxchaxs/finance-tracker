import { monthConvert } from "@/utils/monthConverting";
import { useState, useRef, useEffect } from "react";
import { monthDataFilter, yearDataFilter } from "@/utils/filteringData";
import Chart from "./BarChart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretLeft,
  faCaretRight,
} from "@fortawesome/free-solid-svg-icons";

const ReportStats = ({ datas }) => {
  const [data, setData] = useState(datas);
  const [year, setYear] = useState();
  const [month, setMonth] = useState();
  const [selectedWallet, setSelectedWallet] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("year");
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const dropdownRef = useRef(null);
  const convertedMonth = monthConvert(month);

  const years = Array.from(
    new Set(datas.map((item) => new Date(item.date).getFullYear()))
  );

  useEffect(() => {
    if (selectedFilter === "year") {
      const filteredData = yearDataFilter(datas, year);
      setData(filteredData);
    } else {
      const filteredData = monthDataFilter(datas, month, year);
      setData(filteredData);
    }
  }, [month, year, selectedFilter]);

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
    if (e.target.value === selectedWallet) {
      setSelectedWallet("Specify Wallet");
      setIsWalletOpen(!isWalletOpen);
    } else {
      setSelectedWallet(e.target.value);
      setIsWalletOpen(!isWalletOpen);
    }
  };

  return (
    <div className="w-full p-2 flex flex-col gap-5 text-slate-100 ">
      <div className="w-full font-passionOne text-base flex justify-between items-center">
        <div className="flex">
          <button
            value={"year"}
            className={`${
              selectedFilter === "year"
                ? "bg-secondary hover:bg-secondary-hover"
                : "hover:bg-green-300 text-secondary"
            } p-1 px-3 border-2 border-secondary rounded-md duration-200 ease-in-out transition-all`}
            onClick={handleSelectedFilter}
          >
            Year
          </button>
          <button
            value={"month"}
            className={`${
              selectedFilter === "month"
                ? "bg-secondary hover:bg-secondary-hover"
                : "hover:bg-green-300 text-secondary"
            } p-1 px-3 border-2 border-secondary rounded-md duration-200 ease-in-out transition-all`}
            onClick={handleSelectedFilter}
          >
            Month
          </button>
        </div>
        <div className="flex text-secondary">
          <button
            className={`p-1 px-3 border-2 border-secondary rounded-l-md hover:bg-green-300 transition-all ease-in-out duration-200`}
            onClick={handleLeftBtnClick}
          >
            <FontAwesomeIcon icon={faCaretLeft} />
          </button>
          <button
            onClick={() => console.log(data)}
            className={`p-1 px-3 border-y-2 border-secondary`}
          >
            {selectedFilter === "year" ? year : `${convertedMonth}, ${year}`}
          </button>
          <button
            className={`p-1 px-3 border-2 border-secondary rounded-r-md hover:bg-green-300 transition-all ease-in-out duration-200`}
            onClick={handleRightBtnClick}
          >
            <FontAwesomeIcon icon={faCaretRight} />
          </button>
        </div>
      </div>

      <div
        className="relative font-passionOne text-base w-fit "
        ref={dropdownRef}
      >
        <button
          onClick={toggleWalletDropDown}
          className="py-2 px-3 flex items-center gap-2 w-fit bg-secondary hover:bg-secondary-hover text-base rounded-md"
        >
          {selectedWallet || "Specify Wallet"}
          <FontAwesomeIcon icon={faCaretDown} />
        </button>

        {isWalletOpen && (
          <div className="absolute w-full rounded-md shadow-lg bg-primary ring-secondary ring-opacity-10 ring-2 z-10">
            <div
              className="py-1 text-secondary"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {years.map((year, idx) => (
                <button
                  key={idx}
                  value={year}
                  onClick={handleSelectedWallet}
                  className="block w-full transition-all ease-in-out duration-100 text-left px-4 py-2 text-sm hover:bg-green-300"
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <Chart data={data} />
    </div>
  );
};

export default ReportStats;
