import { sideSweetAlertWarning, sweetAlertAddTransac } from "@/libs/sweetAlert";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import LoaderSection from "../loaders/loaderSection";
import PrimaryButton from "../ui/buttons/PrimaryButton";
import InputForm from "../ui/InputForm";
import LoaderLightSection from "../loaders/loaderLightSection";

const NewTransactionSec = ({
  user,
  isShowed,
  walletAcountData,
  isGettingData,
}) => {
  const [isShowWallet, setIsShowWallet] = useState(false);
  const [loadingAddDoc, setLoadingAddDoc] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedWallet, setSelectedWallet] = useState({accountId: "", name: ''});
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
    setAmount(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedDate && selectedWallet.accountId && selectedType && amount > 0) {
      sweetAlertAddTransac(
        newData,
        setSelectedDate,
        setSelectedWallet,
        setSelectedType,
        setDescription,
        setAmount,
        setLoadingAddDoc
      );
    } else {
      sideSweetAlertWarning("Please fill the form!");
    }
  };

  const newData = {
    userId: user?.uid,
    accountId: selectedWallet.accountId,
    name: selectedWallet.name,
    type: selectedType,
    amount: Number(amount),
    date: new Date (selectedDate),
    createdAt: new Date(),
    description,
  };

  return (
    <div
      className={`w-full rounded-lg rounded-t-none p-4 flex shadow-md shadow-black text-secondary text-base flex-col font-paragraf font-semibold relative ${
        isShowed ? "" : "hidden"
      }`}
    >
      {isGettingData ? (
          <LoaderSection width={"w-14"} />
      ) : (
        <>
          {walletAcountData?.length === 0 || !walletAcountData ? (
            <div className="flex justify-center items-end w-full text-center py-2">
              <p>{`It seem you don't have a wallet account yet, try creating one.`}</p>
            </div>
          ) : (
            <>
              <PrimaryButton handleClick={() => setIsShowWallet(!isShowWallet)} text={selectedWallet.name ? selectedWallet.name : isShowWallet ? "Close " : "To:" } type={"secondary"} value={"isShowwallet"} />

              <div
                className={`${
                  isShowWallet ? "" : "hidden"
                } flex flex-col gap-2 py-4`}
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
                      className="cursor-pointer ring-2 ring-secondary w-full rounded-md p-1 px-3 group"
                    >
                      <button className="group-hover:translate-x-3 transition-all ease-in-out duration-200">
                        {e.name}
                      </button>
                    </div>
                  );
                })}
              </div>

              <div
                className={`text-secondary font-passionOne w-full justify-between flex flex-col gap-2.5 py-4 ${
                  selectedWallet.accountId ? "" : "hidden"
                }`}
              >
                <input
                  className="bg-transparent w-full py-2 focus:outline-none border-b-2 border-black p-2 rounded-lg"
                  type="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  name="Test"
                />
                <div className={`${
                    selectedType === "income" ? "scale-105" : ""
                  }`}>
                  <PrimaryButton handleClick={handleSelectedType} value={"income"} text={"Income"} type={"primary"} />
                </div>

                <div className={`${
                    selectedType === "expanse" ? "scale-105" : ""
                  }`}>
                  <PrimaryButton handleClick={handleSelectedType} value={"expanse"} text={"Expanse"} type={"danger"} />

                </div>

                <form
                  className="flex flex-col items-center py-4 gap-3 "
                  onSubmit={handleSubmit}
                >
                  <InputForm handleChange={handleAmountChange} isRequired={true} name={"Amount"} type={"text"} value={amount} inputMode={"numeric"} />

                  <div className="flex justify-between gap-3 w-full items-center">
                    <InputForm handleChange={handleDescChange} isRequired={false} name={"Description"} type={"text"} value={description} />
                    <div className={`${
                        selectedDate &&
                        selectedWallet.accountId &&
                        selectedType &&
                        amount > 0
                          ? ""
                          : "hidden"
                      }`}>
                      <PrimaryButton handleClick={handleSubmit} text={loadingAddDoc ? <LoaderLightSection width={"w-7"} /> : "Submit"} type={"primary"} value={"submit"} />

                    </div>
                  </div>
                </form>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default NewTransactionSec;
