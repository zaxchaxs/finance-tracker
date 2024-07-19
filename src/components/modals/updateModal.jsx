import { deleteWalletDoc, updateWalletDoc } from "@/libs/firestoreMethods";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import LoaderSection from "../loaders/loaderSection";
import { failedSweetAlert, sweetAlertDeleteWallet } from "@/libs/sweetAlert";
import PrimaryButton from "../ui/buttons/PrimaryButton";
import InputForm from "../ui/InputForm";
import SolidShadow from "../ui/solidShadow/SolidShadow";

const UpdateModal = ({data, isInfoClicked, setIsInfoClicked}) => {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const [isCorectlyInputing, setIsCorectlyInputing] = useState(true);

    const newData = {
        name: name ? name : data.name,
        amount: amount ? amount : data.amount
    };

    const closeIcon = (
      <FontAwesomeIcon
        icon={faSquareXmark}
        size="1x"
        className="w-6"
      />
    );


    // handler funtions
    const handleCloseModal = () => {
      setIsInfoClicked(false);
      setIsCorectlyInputing(true);
    };

    const handleUpdate = async () => {
        if(name || amount) {
            setLoadingUpdate(true);
            try {
                await updateWalletDoc(data.accountId, newData)
            } catch (error) {
              failedSweetAlert(error.message);
            } finally {
                setName("");
                setAmount("");
                setLoadingUpdate(false);
                setIsInfoClicked(false);
            }
        } else {
          setIsCorectlyInputing(false);
        }
    };
    const handleDelete = async () => {
      setLoadingUpdate(true);
      try {
        // console.log(data.accountId);
        // await deleteWalletDoc(data.accountId, data.userId);
        sweetAlertDeleteWallet(data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoadingUpdate(false);
        setIsInfoClicked(false);
      }
    }

    return (
        <div 
            className={`${isInfoClicked ? "" : "hidden"} fixed inset-0 flex items-center backdrop-blur-sm justify-center z-50`}
        >
          <div className="relative">
            <motion.div
            initial={{ scale: 0.1, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            // transition={{ type: 'spring', bounce: 0.5 }}
            >
              <SolidShadow background={"bg-emerald-900"} />

            </motion.div>
            <motion.div 
                className="bg-secondary shadow-lg rounded-md w-[50vh] p-4 relative py-5 z-10"
                initial={{ scale: 0.1, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', bounce: 0.5 }}
            >
                <div className="w-full flex justify-center items-center text-2xl font-title text-lightWhite py-2">
                  <h1>{data.name}</h1>

                  {/* close btn */}
                  <div className="absolute right-5 z-0 group shadow-lg font-title">
                    <SolidShadow background={"bg-rose-900"} />
                    <button value={"close"} onClick={handleCloseModal} className={`relative w-full ring-1 ring-black z-10 h-full p-1 px-2 rounded-lg bg-danger hover:bg-danger-hover text-lightWhite active:bg-danger`}>
                      {closeIcon}
                    </button>
                  </div>
                  {/* <button className="absolute right-5" onClick={() => setIsInfoClicked(false)}>
                    <FontAwesomeIcon
                      icon={faSquareXmark}
                      color="#EF4444"
                      size="2x"
                      className="w-6"
                    />
                  </button> */}
                </div>
                <div className="py-4 w-full flex flex-col gap-4">
                  <InputForm handleChange={(e) => setName(e.target.value)} isRequired={false} name={"Name"} type={"text"} value={name} />
                  <InputForm handleChange={(e) => setAmount(Number(e.target.value))} isRequired={false} name={"Amount"} type={"text"} value={amount} />
                </div>

                <div className={`w-full ${!isCorectlyInputing ? "" : "hidden"} text-lightWhite font-paragraf font-semibold text-center`}>
                    <p>Please fill form correctly</p>
                </div>

                <div className="w-full flex justify-between py-4">
                  {
                      loadingUpdate ? 
                      <div className="py-2 w-full">
                          <LoaderSection width={'w-14'} />
                      </div>
                      :
                      <div className="flex w-full justify-between items-center">
                        <PrimaryButton handleClick={handleDelete} type={"danger"} text={"Delete"} value={"delete"} />
                        <PrimaryButton handleClick={handleUpdate} type={"secondary"} text={"Update"} value={"update"} />
                          {/* <button className="p-1 px-2 rounded-md bg-danger hover:bg-danger-hover" onClick={handleDelete}>Delete</button>
                          <button className={`p-1 px-2 rounded-md bg-blue-500 hover:bg-blue-600`} onClick={handleUpdate}>Update</button> */}
                      </div>
                  }
                </div>
                
            </motion.div>

          </div>
      </div>
    )
}   

export default UpdateModal;