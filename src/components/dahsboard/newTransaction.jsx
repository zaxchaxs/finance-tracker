import { sweetAlertAddTransac } from "@/libs/sweetAlert";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const NewTransactionSec = ({ user, isShowed, walletAcountData }) => {
  const [isShowWallet, setIsShowWallet] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedWallet, setSelectedWallet] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  // handleFunctions
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };
  const handleSelectedWallet = (detailsWallet) => {
    setSelectedWallet(detailsWallet);
    setIsShowWallet(false);
  };
  const handleSelectedType = (e) => {
    setSelectedType(e.target.value);
  };
  const handleDescChange = (e) => {
    setDescription(e.target.value);
  };
  const handleAmountChange = (e) => {
    setAmount(Number(e.target.value));
  };
  const handleSubmit = (e) => {
    if (selectedDate && selectedWallet && selectedType && amount > 0) {
      e.preventDefault();
      sweetAlertAddTransac(
        newData,
        setSelectedDate,
        setSelectedWallet,
        setSelectedType,
        setDescription,
        setAmount
      );
    }
    e.preventDefault();
  };

  const newData = {
    userId: user?.uid,
    accountId: selectedWallet?.accountId,
    name: selectedWallet?.name,
    type: selectedType,
    amount,
    date: selectedDate,
    createdAt: new Date(),
    description,
  };

  return (
    <div
      className={`w-full px-4 flex text-secondary flex-col gap-2 ${
        isShowed ? "" : "hidden"
      }`}
    >
      {walletAcountData?.length === 0 || !walletAcountData ? (
        <div className="flex justify-center items-end w-full text-center">
          <p>{`It seem you don't have a wallet account yet, try creating one.`}</p>
        </div>
      ) : (
        <>
          <div
            className="w-full p-1 px-2 flex items-center cursor-pointer gap-2"
            onClick={() => setIsShowWallet(!isShowWallet)}
          >
            <FontAwesomeIcon
              icon={faCaretDown}
              rotation={!isShowWallet && 270}
            />
            <h1>To:</h1>
          </div>
          <div
            className={`${isShowWallet ? "" : "hidden"} flex flex-col gap-2`}
          >
            {walletAcountData.map((e, i) => {
              const detailsWallet = {
                accountId: e.accountId,
                name: e.name,
              };

              return (
                <div
                  onClick={() => handleSelectedWallet(detailsWallet)}
                  key={i}
                  className="cursor-pointer border-y-2 w-full border-secondary rounded-md p-1 px-3 group"
                >
                  <button className="group-hover:translate-x-3 transition-all ease-in-out duration-200">
                    {e.name}
                  </button>
                </div>
              );
            })}
          </div>

          <div
            className={`text-secondary font-passionOne w-full justify-between flex flex-col gap-2 ${
              selectedWallet ? "" : "hidden"
            }`}
          >
              <input
                className="bg-transparent py-2 focus:outline-none"
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                name="Test"
              />
              <button
                className={`${
                  selectedType === "income" ? "scale-105" : ""
                } p-1 px-2 bg-secondary hover:bg-secondary-hover rounded-lg text-green-200`}
                value={"income"}
                onClick={handleSelectedType}
              >
                Income
              </button>
              <button
                className={`${
                  selectedType === "expanse" ? "scale-105" : ""
                } p-1 px-2 rounded-lg text-green-200 bg-danger hover:bg-danger-hover`}
                value={"expanse"}
                onClick={handleSelectedType}
              >
                Expanse
              </button>
              <input
                type="text"
                name=""
                id=""
                placeholder="Amount"
                className="focus:outline-none rounded-md p-1 my-4"
                value={amount}
                onChange={handleAmountChange}
              />

              <form className="flex justify-between items-center py-2" onSubmit={(e) => handleSubmit(e)}>
                <input
                  placeholder="Descriptions"
                  className="focus:outline-none rounded-md p-1"
                  type="text"
                  value={description}
                  onChange={handleDescChange}
                />
                <button
                  onClick={(e) => handleSubmit(e)}
                  className={`${
                    selectedDate && selectedWallet && selectedType && amount > 0
                      ? ""
                      : "hidden"
                  } p-1 px-2 bg-secondary rounded-lg text-green-200 hover:bg-secondary-hover`}
                >
                  Submit
                </button>
              </form>
          </div>
        </>
      )}
    </div>
  );
};

export default NewTransactionSec;
