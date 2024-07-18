"use client";
import { useAuth } from "@/contexts/AuthContext";
import { selectedFilterConverting } from "@/utils/dates";
import { dateFiltering } from "@/utils/datesFiltering";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import LoaderSection from "../loaders/loaderSection";
import TransactionContent from "./transactionContent";
import AddTransactionModal from "../modals/newTransacModal";
import DropDownButton from "../ui/buttons/DropDownButton";
import PrimaryButton from "../ui/buttons/PrimaryButton";

const FilterSection = ({ wallets }) => {
  const [transaction, setTransactions] = useState([]);
  const [selectedWallet, setSelectedWallet] = useState({ name: null, id: null});
  const [selectedDateFilter, setSelectedDateFilter] = useState({ date: selectedFilterConverting("Today"), value: "Today"});
  const [isDateFilterOpen, setIsDateFilterOpen] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState();

  const dropDownWalletRef = useRef(null);
  const dropDownDateRef = useRef(null);
  const isFirstRender = useRef(true);

  const { currUser } = useAuth();

  const tempCurrTransac = [
    {
        "description": "",
        "date": {
            "seconds": 1720656000,
            "nanoseconds": 0
        },
        "name": "uang darurat",
        "amount": 100000,
        "userId": "3U40vTwzEcN43dAhrOSTE3BeLYd2",
        "createdAt": {
            "seconds": 1720714754,
            "nanoseconds": 923000000
        },
        "accountId": "e5107081-e068-41f4-85d5-a0a42e3f0668",
        "type": "income"
    },
    {
        "description": "",
        "date": {
            "seconds": 1720656000,
            "nanoseconds": 0
        },
        "name": "uang darurat",
        "amount": 100000,
        "userId": "3U40vTwzEcN43dAhrOSTE3BeLYd2",
        "createdAt": {
            "seconds": 1720714754,
            "nanoseconds": 923000000
        },
        "accountId": "e5107081-e068-41f4-85d5-a0a42e3f0668",
        "type": "income"
    },
    {
        "description": "",
        "date": {
            "seconds": 1720656000,
            "nanoseconds": 0
        },
        "name": "uang darurat",
        "amount": 100000,
        "userId": "3U40vTwzEcN43dAhrOSTE3BeLYd2",
        "createdAt": {
            "seconds": 1720714754,
            "nanoseconds": 923000000
        },
        "accountId": "e5107081-e068-41f4-85d5-a0a42e3f0668",
        "type": "income"
    },
    {
        "description": "",
        "date": {
            "seconds": 1720656000,
            "nanoseconds": 0
        },
        "name": "uang darurat",
        "amount": 100000,
        "userId": "3U40vTwzEcN43dAhrOSTE3BeLYd2",
        "createdAt": {
            "seconds": 1720714754,
            "nanoseconds": 923000000
        },
        "accountId": "e5107081-e068-41f4-85d5-a0a42e3f0668",
        "type": "income"
    },
    {
        "description": "",
        "date": {
            "seconds": 1720656000,
            "nanoseconds": 0
        },
        "name": "uang darurat",
        "amount": 100000,
        "userId": "3U40vTwzEcN43dAhrOSTE3BeLYd2",
        "createdAt": {
            "seconds": 1720714754,
            "nanoseconds": 923000000
        },
        "accountId": "e5107081-e068-41f4-85d5-a0a42e3f0668",
        "type": "income"
    },
    {
        "description": "",
        "date": {
            "seconds": 1720656000,
            "nanoseconds": 0
        },
        "name": "uang darurat",
        "amount": 100000,
        "userId": "3U40vTwzEcN43dAhrOSTE3BeLYd2",
        "createdAt": {
            "seconds": 1720714754,
            "nanoseconds": 923000000
        },
        "accountId": "e5107081-e068-41f4-85d5-a0a42e3f0668",
        "type": "income"
    },
    {
        "description": "",
        "date": {
            "seconds": 1720656000,
            "nanoseconds": 0
        },
        "name": "uang darurat",
        "amount": 100000,
        "userId": "3U40vTwzEcN43dAhrOSTE3BeLYd2",
        "createdAt": {
            "seconds": 1720714754,
            "nanoseconds": 923000000
        },
        "accountId": "e5107081-e068-41f4-85d5-a0a42e3f0668",
        "type": "income"
    },
    {
        "description": "",
        "date": {
            "seconds": 1720656000,
            "nanoseconds": 0
        },
        "name": "uang darurat",
        "amount": 100000,
        "userId": "3U40vTwzEcN43dAhrOSTE3BeLYd2",
        "createdAt": {
            "seconds": 1720714754,
            "nanoseconds": 923000000
        },
        "accountId": "e5107081-e068-41f4-85d5-a0a42e3f0668",
        "type": "income"
    },
    {
        "description": "",
        "date": {
            "seconds": 1720656000,
            "nanoseconds": 0
        },
        "name": "uang darurat",
        "amount": 100000,
        "userId": "3U40vTwzEcN43dAhrOSTE3BeLYd2",
        "createdAt": {
            "seconds": 1720714754,
            "nanoseconds": 923000000
        },
        "accountId": "e5107081-e068-41f4-85d5-a0a42e3f0668",
        "type": "income"
    },
    {
        "description": "",
        "date": {
            "seconds": 1720656000,
            "nanoseconds": 0
        },
        "name": "uang darurat",
        "amount": 100000,
        "userId": "3U40vTwzEcN43dAhrOSTE3BeLYd2",
        "createdAt": {
            "seconds": 1720714754,
            "nanoseconds": 923000000
        },
        "accountId": "e5107081-e068-41f4-85d5-a0a42e3f0668",
        "type": "income"
    },
    {
        "description": "",
        "date": {
            "seconds": 1720656000,
            "nanoseconds": 0
        },
        "name": "uang darurat",
        "amount": 100000,
        "userId": "3U40vTwzEcN43dAhrOSTE3BeLYd2",
        "createdAt": {
            "seconds": 1720714754,
            "nanoseconds": 923000000
        },
        "accountId": "e5107081-e068-41f4-85d5-a0a42e3f0668",
        "type": "income"
    },
    {
        "description": "",
        "date": {
            "seconds": 1720656000,
            "nanoseconds": 0
        },
        "name": "uang darurat",
        "amount": 100000,
        "userId": "3U40vTwzEcN43dAhrOSTE3BeLYd2",
        "createdAt": {
            "seconds": 1720714754,
            "nanoseconds": 923000000
        },
        "accountId": "e5107081-e068-41f4-85d5-a0a42e3f0668",
        "type": "income"
    },
    {
        "description": "",
        "date": {
            "seconds": 1720656000,
            "nanoseconds": 0
        },
        "name": "uang darurat",
        "amount": 100000,
        "userId": "3U40vTwzEcN43dAhrOSTE3BeLYd2",
        "createdAt": {
            "seconds": 1720714754,
            "nanoseconds": 923000000
        },
        "accountId": "e5107081-e068-41f4-85d5-a0a42e3f0668",
        "type": "income"
    },
    {
        "description": "",
        "date": {
            "seconds": 1720656000,
            "nanoseconds": 0
        },
        "name": "uang darurat",
        "amount": 100000,
        "userId": "3U40vTwzEcN43dAhrOSTE3BeLYd2",
        "createdAt": {
            "seconds": 1720714754,
            "nanoseconds": 923000000
        },
        "accountId": "e5107081-e068-41f4-85d5-a0a42e3f0668",
        "type": "income"
    },
    {
        "description": "",
        "date": {
            "seconds": 1720656000,
            "nanoseconds": 0
        },
        "name": "uang darurat",
        "amount": 100000,
        "userId": "3U40vTwzEcN43dAhrOSTE3BeLYd2",
        "createdAt": {
            "seconds": 1720714754,
            "nanoseconds": 923000000
        },
        "accountId": "e5107081-e068-41f4-85d5-a0a42e3f0668",
        "type": "income"
    },
    {
        "description": "",
        "date": {
            "seconds": 1720656000,
            "nanoseconds": 0
        },
        "name": "uang darurat",
        "amount": 100000,
        "userId": "3U40vTwzEcN43dAhrOSTE3BeLYd2",
        "createdAt": {
            "seconds": 1720714754,
            "nanoseconds": 923000000
        },
        "accountId": "e5107081-e068-41f4-85d5-a0a42e3f0668",
        "type": "income"
    },
    {
        "description": "",
        "date": {
            "seconds": 1720656000,
            "nanoseconds": 0
        },
        "name": "uang darurat",
        "amount": 100000,
        "userId": "3U40vTwzEcN43dAhrOSTE3BeLYd2",
        "createdAt": {
            "seconds": 1720714754,
            "nanoseconds": 923000000
        },
        "accountId": "e5107081-e068-41f4-85d5-a0a42e3f0668",
        "type": "income"
    },
    {
        "amount": 100000000,
        "date": {
            "seconds": 1720310400,
            "nanoseconds": 0
        },
        "createdAt": {
            "seconds": 1720713289,
            "nanoseconds": 75000000
        },
        "description": "amin",
        "accountId": "64b25906-38a6-4006-b21d-4631764b3d49",
        "userId": "3U40vTwzEcN43dAhrOSTE3BeLYd2",
        "name": "dompet 1",
        "type": "expanse"
    },
    {
        "accountId": "64b25906-38a6-4006-b21d-4631764b3d49",
        "type": "expanse",
        "createdAt": {
            "seconds": 1720699864,
            "nanoseconds": 815000000
        },
        "userId": "3U40vTwzEcN43dAhrOSTE3BeLYd2",
        "date": {
            "seconds": 1720656000,
            "nanoseconds": 0
        },
        "amount": 100000000,
        "description": "",
        "name": "dompet 1"
    },
    {
        "type": "expanse",
        "name": "dompet 1",
        "description": "",
        "userId": "3U40vTwzEcN43dAhrOSTE3BeLYd2",
        "createdAt": {
            "seconds": 1720672651,
            "nanoseconds": 840000000
        },
        "date": {
            "seconds": 1719792000,
            "nanoseconds": 0
        },
        "accountId": "64b25906-38a6-4006-b21d-4631764b3d49",
        "amount": 5000
    },
    {
        "name": "dompet 1",
        "description": "",
        "amount": 5555,
        "date": {
            "seconds": 1720310400,
            "nanoseconds": 0
        },
        "userId": "3U40vTwzEcN43dAhrOSTE3BeLYd2",
        "createdAt": {
            "seconds": 1720672583,
            "nanoseconds": 922000000
        },
        "accountId": "64b25906-38a6-4006-b21d-4631764b3d49",
        "type": "expanse"
    }
  ];

  const dateFilter = [
    {
      name: "Today",
      value: "Today"
    },
    {
      name: "Yesterday",
      value: "Yesterday"
    },
    {
      name: "Last 7 days",
      value: "Last 7 days"
    },
    {
      name: "Last 30 days",
      value: "Last 30 days"
    },
    {
      name: "This month",
      value: "This month"
    },
    {
      name: "Custom",
      value: "Custom"
    },
  ];

  useEffect(() => {
    
    // get default transaction filtered
    const getTransactionFiltered = async () => {
      setLoading(true);
      try {
          console.log("test useeffetc");
          await dateFiltering(
            currUser?.uid,
            selectedDateFilter.value,
            selectedWallet.id,
            setTransactions
          );
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if(isFirstRender.current) {
      isFirstRender.current = false;
      return
    };

    if(currUser) getTransactionFiltered();
  }, [currUser, selectedDateFilter, selectedWallet]);


  const handleNewTransactionBtn = async () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSelectedWallet = (e) => {
    if (e.target.name === selectedWallet.name) {
      setSelectedWallet({ name: null, id: null });
      setIsWalletOpen(!isWalletOpen);
    } else {
      setSelectedWallet({ name: e.target.name, id: e.target.value });
      setIsWalletOpen(!isWalletOpen);
    }
  };

  const handleSelectedFilterDate = async (e) => {
    if(e.target.value === selectedDateFilter.value) {
      setIsDateFilterOpen(!isDateFilterOpen);
      return;
    }
    
    setIsDateFilterOpen(!isDateFilterOpen);
    const date = selectedFilterConverting(e.target.value);
    setSelectedDateFilter({ date, value: e.target.value });
  };

  return (
    <>
      <div className="w-full text-base px-4 mt-20 flex flex-col gap-4 relative z-20">
        <div className="w-full flex items-center justify-between gap-4 font-title relative z-10">

          {/* drop down date */}
          <DropDownButton datas={dateFilter} handleSelectedItem={handleSelectedFilterDate} selectedItem={selectedDateFilter.date} />
          {/* <div className="relative min-w-fit " ref={dropDownDateRef}>
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
                      value={date.value}
                      name={date}
                      onClick={handleSelectedFilterDate}
                      className="block w-full transition-all ease-in-out duration-100 text-left px-4 py-2 text-sm hover:bg-green-300"
                    >
                      {date.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div> */}

          {/* drop down wallet */}
          <DropDownButton datas={wallets} handleSelectedItem={handleSelectedWallet} selectedItem={selectedWallet.name || "Wallet"} />

        </div>

        <div className="w-fit">
          <PrimaryButton handleClick={handleNewTransactionBtn} text={"New"} type={"primary"} value={"new"} />

          <AddTransactionModal isModalOpen={isModalOpen} user={currUser.uid} wallets={selectedWallet.name} handleCloseModal={handleNewTransactionBtn} />

        </div>
      </div>

      {loading ? (
        <LoaderSection width={"w-14"} />
      ) : (
        <TransactionContent transactions={transaction} />
      )}
    </>
  );
};

export default FilterSection;
