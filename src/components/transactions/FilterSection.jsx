"use client";
import { useAuth } from "@/contexts/AuthContext";
import { getSnapshotUserWallet } from "@/libs/firestoreMethods";
import { selectedFilterConverting } from "@/utils/dates";
import { dateFiltering } from "@/utils/datesFiltering";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";

const FilterSection = () => {
  const [transitions, setTransactions] = useState([]);
  const [wallets, setWallets] = useState([]);
  const [selectedWallet, setSelectedWallet] = useState({name: null, id: null});  
  const [selectedDateFilter, setSelectedDateFilter] = useState({date: "Today", value: ''});
  const [isDateFilterOpen, setIsDateFilterOpen] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false);

  const dropDownWalletRef = useRef(null);
  const dropDownDateRef = useRef(null);

  const { currUser, loading } = useAuth();

  const tempWalets = [
    {
      createdAt: {
        seconds: 1719721935,
        nanoseconds: 661000000,
      },
      name: "dompet 1",
      accountId: "64b25906-38a6-4006-b21d-4631764b3d49",
      userId: "3U40vTwzEcN43dAhrOSTE3BeLYd2",
      amount: 1233361123,
    },
    {
      userId: "3U40vTwzEcN43dAhrOSTE3BeLYd2",
      amount: 1500000,
      accountId: "e5107081-e068-41f4-85d5-a0a42e3f0668",
      name: "uang darurat",
      createdAt: {
        seconds: 1719885822,
        nanoseconds: 783000000,
      },
    },
  ];

  const tempCurrTransac = [
    {
      name: "dompet 1",
      description: "",
      type: "expanse",
      accountId: "64b25906-38a6-4006-b21d-4631764b3d49",
      createdAt: {
        seconds: 1720672651,
        nanoseconds: 840000000,
      },
      amount: 5000,
      userId: "3U40vTwzEcN43dAhrOSTE3BeLYd2",
      date: {
        seconds: 1719792000,
        nanoseconds: 0,
      },
    },
    {
      accountId: "64b25906-38a6-4006-b21d-4631764b3d49",
      description: "",
      createdAt: {
        seconds: 1720672583,
        nanoseconds: 922000000,
      },
      name: "dompet 1",
      date: {
        seconds: 1720310400,
        nanoseconds: 0,
      },
      amount: 5555,
      type: "expanse",
      userId: "3U40vTwzEcN43dAhrOSTE3BeLYd2",
    },
    {
      userId: "3U40vTwzEcN43dAhrOSTE3BeLYd2",
      name: "dompet 1",
      amount: 5555,
      createdAt: {
        seconds: 1720672566,
        nanoseconds: 81000000,
      },
      description: "",
      date: {
        seconds: 1720656000,
        nanoseconds: 0,
      },
      type: "income",
      accountId: "64b25906-38a6-4006-b21d-4631764b3d49",
    },
    {
      description: "",
      name: "dompet 1",
      amount: 100000,
      date: {
        seconds: 1720569600,
        nanoseconds: 0,
      },
      accountId: "64b25906-38a6-4006-b21d-4631764b3d49",
      userId: "3U40vTwzEcN43dAhrOSTE3BeLYd2",
      type: "expanse",
      createdAt: {
        seconds: 1720672264,
        nanoseconds: 280000000,
      },
    },
    {
      date: {
        seconds: 1720310400,
        nanoseconds: 0,
      },
      type: "expanse",
      accountId: "64b25906-38a6-4006-b21d-4631764b3d49",
      name: "dompet 1",
      userId: "3U40vTwzEcN43dAhrOSTE3BeLYd2",
      createdAt: {
        seconds: 1720672060,
        nanoseconds: 483000000,
      },
      amount: 200000000,
      description: "200000000",
    },
    {
      name: "dompet 1",
      createdAt: {
        seconds: 1720672010,
        nanoseconds: 619000000,
      },
      userId: "3U40vTwzEcN43dAhrOSTE3BeLYd2",
      date: {
        seconds: 1720137600,
        nanoseconds: 0,
      },
      description: "",
      accountId: "64b25906-38a6-4006-b21d-4631764b3d49",
      amount: 200000,
      type: "expanse",
    },
    {
      type: "expanse",
      createdAt: {
        seconds: 1720671951,
        nanoseconds: 762000000,
      },
      amount: 500000000,
      accountId: "64b25906-38a6-4006-b21d-4631764b3d49",
      description: "",
      userId: "3U40vTwzEcN43dAhrOSTE3BeLYd2",
      name: "dompet 1",
      date: {
        seconds: 1720310400,
        nanoseconds: 0,
      },
    },
    {
      amount: 1000000,
      userId: "3U40vTwzEcN43dAhrOSTE3BeLYd2",
      name: "dompet 1",
      createdAt: {
        seconds: 1720671313,
        nanoseconds: 867000000,
      },
      accountId: "64b25906-38a6-4006-b21d-4631764b3d49",
      date: {
        seconds: 1720656000,
        nanoseconds: 0,
      },
      type: "expanse",
      description: "",
    },
    {
      amount: 500000,
      createdAt: {
        seconds: 1720667838,
        nanoseconds: 476000000,
      },
      type: "expanse",
      accountId: "64b25906-38a6-4006-b21d-4631764b3d49",
      name: "dompet 1",
      userId: "3U40vTwzEcN43dAhrOSTE3BeLYd2",
      description: "",
      date: {
        seconds: 1719878400,
        nanoseconds: 0,
      },
    },
  ];

  const dateFilter = [
    "Today",
    "Yesterday",
    "Last 7 days",
    "Last 30 days",
    "This month",
    "Custom",
  ];

  useEffect(() => {

    try {
      // get default transaction filtered
      const getTransactionFiltered = async () => {
        await dateFiltering(currUser?.uid, selectedDateFilter.value, selectedWallet.id, setTransactions);
      };
      
      // if(currUser) getTransactionFiltered();

    } catch (error) {
      console.error(error.message);
    }

  }, [currUser, selectedDateFilter, selectedWallet]);

  useEffect(() => {

    // Get wallet doc
    try {
      const getWallets = async () => {
        await getSnapshotUserWallet(currUser?.uid, setWallets);
      }
      
      // if(currUser) getWallets();
    } catch (error) {
      console.error(error.message);
    }

    
    // handle for outside dropdown click
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (
      dropDownWalletRef.current &&
      !dropDownWalletRef.current.contains(event.target)
    ) {
      setIsWalletOpen(isWalletOpen);
    }
    if (
      dropDownDateRef.current &&
      !dropDownDateRef.current.contains(event.target)
    ) {
      setIsDateFilterOpen(isDateFilterOpen);
    }
  };

  const handleNewTransactionBtn = async () => {
    console.log(transitions);
  };

  const handleSelectedWallet = (e) => {
    if (e.target.name === selectedWallet.name) {
      setSelectedWallet({name: null, id: null});
      setIsWalletOpen(!isWalletOpen);
    } else {
      setSelectedWallet({name: e.target.name, id:e.target.value})
      setIsWalletOpen(!isWalletOpen);
    }
  };

  const handleSelectedFilterDate = async (e) => {
    setIsDateFilterOpen(!isDateFilterOpen);
    const date = selectedFilterConverting(e.target.value);
    setSelectedDateFilter({date, value: e.target.value});
  };

  return (
    <div className="w-full text-base p-2 flex flex-col gap-4">
      <div className="w-full flex items-center justify-between gap-4">
        <div className="relative min-w-fit " ref={dropDownDateRef}>
          <button
            className="py-2 px-4 rounded-md bg-secondary hover:bg-secondary-hover active:bg-secondary"
            onClick={() => setIsDateFilterOpen(!isDateFilterOpen)}
          >
            {selectedDateFilter.date}
          </button>

          {isDateFilterOpen && (
            <div className="absolute w-full rounded-md shadow-lg bg-primary ring-secondary ring-opacity-10 ring-2 z-10">
              <div
                className="py-1 text-secondary"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                {dateFilter.map((date, idx) => (
                  <button
                    key={idx}
                    value={date}
                    name={date}
                    onClick={handleSelectedFilterDate}
                    className="block w-full transition-all ease-in-out duration-100 text-left px-4 py-2 text-sm hover:bg-green-300"
                  >
                    {date}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative w-fit" ref={dropDownWalletRef}>
          <button
            onClick={() => setIsWalletOpen(!isWalletOpen)}
            className="py-2 px-3 flex items-center gap-2 w-fit bg-secondary hover:bg-secondary-hover text-base rounded-md"
          >
            {selectedWallet.name || "Wallet"}
            <FontAwesomeIcon icon={faCaretDown} className="w-3" />
          </button>

          {isWalletOpen && (
            <div className="absolute w-full rounded-md shadow-lg bg-primary ring-secondary ring-opacity-10 ring-2 z-10">
              <div
                className="py-1 text-secondary"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                {!tempWalets ? (
                  <h1 className="text-center block w-full px-4 py-2 text-sm">{`you don't have a wallet account yet`}</h1>
                ) : (
                  tempWalets?.map((wallet, idx) => (
                    <button
                      key={idx}
                      value={wallet.accountId}
                      name={wallet.name}
                      onClick={handleSelectedWallet}
                      className="block w-full transition-all ease-in-out duration-100 text-left px-4 py-2 text-sm hover:bg-green-300"
                    >
                      {wallet.name}
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="relative w-fit">
        <button
          onClick={handleNewTransactionBtn}
          className="py-2 px-4 rounded-md bg-secondary hover:bg-secondary-hover active:bg-secondary"
        >
          New
        </button>
      </div>
    </div>
  );
};

export default FilterSection;
