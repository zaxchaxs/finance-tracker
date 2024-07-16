import { sweetAlertAddTransac } from "@/libs/sweetAlert";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

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
        className="bg-secondary-hover shadow-lg rounded-md w-[65vh] p-4 relative text-slate-100"
        initial={{ scale: 0.1, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
      >
        <div className="w-full text-xl text-center border-b-2 p-2 border-primary">
            <h1>New Transaction</h1>
        </div>

        <div className="flex justify-between items-center w-full gap-2 py-4">
            <input type="date" className="w-full bg-transparent text-slate-100 focus:outline-none text-center text-lg" onChange={(e) => setSelectedDate(e.target.value)} />
            <div className="relative w-full" ref={dropDownWalletRef}>

                <button onClick={() => setIsShowWallet(!isShowWallet)} className="w-full p-1 px-3 bg-secondary hover:bg-green-600 active:bg-secondary rounded-md">
                    {selectedWallet.name || "Wallet"}
                </button>

                <div className={`absolute w-full z-[51] bg-primary border-secondary border-opacity-45 shadow-md text-secondary rounded-md ${isShowWallet ? "" : "hidden"}`}>
                    {
                        wallets?.map((obj, idx) => {
                            return (
                                <button onClick={handleSelectedWallet} value={obj.accountId} name={obj.name} className="w-full p-2 hover:bg-secondary hover:text-slate-100" key={idx}>{obj.name}</button>
                            )
                        })
                    }
                </div>
            </div>
        </div>

        <div className="text-base text-secondary flex flex-col gap-2 justify-center items-center ">
            <input value={amount} type="text" className="w-full p-1 rounded-lg focus:outline-none" placeholder="Amount" onChange={(e) => setAmount(e.target.value)} />
            <input value={description} type="text" className="w-full p-1 rounded-lg focus:outline-none" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div className="flex py-6 justify-between items-center gap-2 w-full">
            <button className={`${selectedType === 'income' && 'scale-110'} w-full p-1 px-3 bg-secondary hover:bg-green-600 active:bg-secondary rounded-md`} onClick={handleSelectedTypeBtn} value={"income"}>Income</button>
            <button className={`${selectedType === 'expanse' && 'scale-110'} w-full p-1 px-3 bg-danger hover:bg-danger-hover active:bg-danger rounded-md`} onClick={handleSelectedTypeBtn} value={"expanse"}>Expanse</button>
        </div>

        <div className="py-2 flex items-center justify-between">
            <button className="p-1 px-3 bg-danger hover:bg-danger-hover rounded-md" onClick={() => handleCloseModal(!isModalOpen)}>Close</button>
            <button className={`${!isOkToSubmit && 'hidden'} p-1 px-3 bg-secondary hover:bg-green-600 rounded-md`} onClick={handleSubmit}>Submit</button>
        </div>

      </motion.div>
    </div>
  );
};

export default AddTransactionModal;
