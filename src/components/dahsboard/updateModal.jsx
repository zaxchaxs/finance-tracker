import { updateWalletDoc } from "@/libs/firestoreMethods";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useState } from "react";
import LoaderSection from "../loaders/loaderSection";

const UpdateModal = ({data, isInfoClicked, setIsInfoClicked}) => {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const newData = {
        name: name ? name : data.name,
        amount: amount ? amount : data.amount
    };

    const handleUpdate = async () => {
        if(name || amount) {
            setLoadingUpdate(true);
            try {
                console.log(newData);
                console.log(data);
                await updateWalletDoc(data.accountId, newData)
            } catch (error) {
                console.error(error.message);
            } finally {
                setName("");
                setAmount("");
                setLoadingUpdate(false);
                setIsInfoClicked(false);
            }
        }
    };

    return (
        <div 
            className={`${isInfoClicked ? "" : "hidden"} fixed inset-0 flex items-center backdrop-blur-sm justify-center z-50`}
        >
        <motion.div 
            className="bg-secondary-hover shadow-lg rounded-md w-[50vh] p-4 relative text-lightGreen"
            initial={{ scale: 0.1, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', bounce: 0.5 }}
        >
          <div className="w-full flex justify-center items-center text-2xl">
            <h1>{data.name}</h1>

            {/* close btn */}
            <button className="absolute right-5" onClick={() => setIsInfoClicked(false)}>
              <FontAwesomeIcon
                icon={faSquareXmark}
                color="#EF4444"
                size="2x"
                className="w-6"
              />
            </button>
          </div>
          <div className="py-4 w-full flex flex-col gap-4">
            <input
            onChange={(e) => setName(e.target.value)}
            value={name}
              type="text"
              placeholder="Name"
              className="p-1 rounded-lg focus:outline-none text-secondary"
            />
            <input
            onChange={(e) => setAmount(Number(e.target.value))}
            value={amount}
              type="text"
              placeholder="Amount"
              className="p-1 rounded-lg focus:outline-none text-secondary"
            />
          </div>
          <div className="w-full flex justify-between">
            {
                loadingUpdate ? 
                <div className="py-2 w-full">
                    <LoaderSection width={'w-14'} />
                </div>
                :
                <>
                    <button className="p-1 px-2 rounded-md bg-danger hover:bg-danger-hover">Delete</button>
                    <button className={`p-1 px-2 rounded-md bg-blue-500 hover:bg-blue-600`} onClick={handleUpdate}>Update</button>
                </>

            }
          </div>
        </motion.div>
      </div>
    )
}   

export default UpdateModal;