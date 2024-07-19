import { sweetAlertAddTransac } from "@/libs/sweetAlert";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import PrimaryButton from "../ui/buttons/PrimaryButton";
import DropDownButton from "../ui/buttons/DropDownButton";
import InputForm from "../ui/InputForm";

const AddTransactionModal = ({ isModalOpen, handleCloseModal, user, wallets }) => {
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedType, setSelectedType] = useState("");
    const [selectedDate, setSelectedDate] = useState();
    const [selectedWallet, setSelectedWallet] = useState({name: '', id: ''})
    const [isShowWallet, setIsShowWallet] = useState(false);
    const dropDownWalletRef = useRef(null);

    const isOkToSubmit = selectedDate && selectedWallet.id && selectedType && amount > 0;

  const newData = {
    userId: user?.uid,
    accountId:  selectedWallet?.id,
    name: selectedWallet?.name,
    type: selectedType,
    amount: Number(amount),
    date: new Date(selectedDate),
    createdAt: new Date(),
    description,
  };

//   dropdown outside handle click
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [])

  const handleClickOutside = (event) => {
    if (
      dropDownWalletRef.current &&
      !dropDownWalletRef.current.contains(event.target)
    ) {
      setIsShowWallet(isShowWallet);
    }
  };

  const handleSelectedTypeBtn = (e) => {
    setSelectedType(e.target.value)
  };

  const handleSelectedWallet = (e) => {
    setIsShowWallet(!isShowWallet);
    setSelectedWallet({
        name: e.target.name,
        id: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(isOkToSubmit) {
        sweetAlertAddTransac(
            newData,
            setSelectedDate,
            setSelectedWallet,
            setSelectedType,
            setDescription,
            setAmount
        )
    };
    handleCloseModal(!isModalOpen)
  };

  return (
    <div
      className={`${
        isModalOpen ? "" : "hidden"
      } fixed inset-0 flex items-center backdrop-blur-sm justify-center z-50`}
    >
      <motion.div
        className="bg-secondary shadow-lg rounded-lg w-[65vh] p-4 relative text-lightWhite font-title"
        initial={{ scale: 0.1, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
      >
        <div className="w-full text-xl text-center border-b-2 p-2 border-primary">
          <h1>New Transaction</h1>
        </div>

        <div className="flex justify-between items-center w-full gap-2 py-4">
          <input
            className=" text-secondary py-2 focus:outline-none border-b-2 border-black p-2 rounded-lg w-full bg-third"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            name=""
          />
          <div className="relative w-full" ref={dropDownWalletRef}>
            <DropDownButton
              datas={wallets}
              handleSelectedItem={handleSelectedWallet}
              selectedItem={selectedWallet.name || "Wallet"}
            />
          </div>
        </div>

        <div className="text-base text-secondary flex flex-col gap-2 justify-center items-center ">
          <InputForm
            handleChange={(e) => setAmount(e.target.value)}
            name={"Amount"}
            isRequired={true}
            type={"text"}
            value={amount}
          />

          <InputForm
            handleChange={(e) => setDescription(e.target.value)}
            name={"Description"}
            isRequired={false}
            type={"text"}
            value={description}
          />
        </div>

        <div className="flex py-6 justify-between items-center gap-2 w-full">
          <div
            className={`w-full ${selectedType === "income" ? "scale-105" : ""}`}
          >
            <PrimaryButton
              handleClick={handleSelectedTypeBtn}
              text={"Income"}
              type={"primary"}
              value={"income"}
            />
          </div>
          <div
            className={`w-full ${
              selectedType === "expanse" ? "scale-105" : ""
            }`}
          >
            <PrimaryButton
              handleClick={handleSelectedTypeBtn}
              text={"Expanse"}
              type={"danger"}
              value={"expanse"}
            />
          </div>
        </div>

        <div className="py-2 flex items-center justify-between">
          <PrimaryButton
            handleClick={() => handleCloseModal(!isModalOpen)}
            text={"Close"}
            type={"danger"}
            value={"close"}
          />
          <div className={`${!isOkToSubmit && "hidden"}`}>
            <PrimaryButton
              handleClick={handleSubmit}
              text={"Submit"}
              type={"primary"}
              value={"submit"}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AddTransactionModal;
