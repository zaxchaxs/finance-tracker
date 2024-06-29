import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const NewTransactionSec = ({isShowed, walletAcountData}) => {
    const [isShowWallet, setIsShowWallet] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedWallet, setSelectedWallet] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        console.log(selectedWallet);
    }, [selectedWallet])

    // handleFunctions
    const handleDateChange = (e) => {
        setSelectedDate(e.target.value)
    }
    const handleSelectedWallet = (e) => {
        setSelectedWallet(e.target.value);
        setIsShowWallet(false);
    }
    const handleDescChange = (e) => {
        setDescription(e.target.value);
    };
    

    return (
        <div className={`w-full px-4 flex text-secondary flex-col gap-2 ${isShowed ? "" : "hidden"}`} >
            <div className="w-full p-1 px-2 flex items-center cursor-pointer gap-2" onClick={() => setIsShowWallet(!isShowWallet)}>
                <FontAwesomeIcon icon={faCaretDown} rotation={!isShowWallet && 270} />
                <h1>To:</h1>
            </div>
            <div className={`${isShowWallet ? "" : "hidden"} flex flex-col gap-2`}>
                {
                    walletAcountData.map((e, i) => {
                        return (
                            <div onClick={handleSelectedWallet} key={i} className="cursor-pointer border-y-2 w-full border-secondary rounded-md p-1 px-3 group">
                                <button className="group-hover:translate-x-3 transition-all ease-in-out duration-200" value={e.name}>{e.name}</button>
                            </div>
                        )
                    })
                }
            </div>
            <div className={`w-full justify-between flex flex-col gap-2 text-secondary font-passionOne ${selectedWallet ? "" : "hidden"}`}>
                <input className="bg-transparent py-2" type="date" value={selectedDate} onChange={handleDateChange} name="Test" />
                <button className="p-1 px-2 bg-secondary hover:bg-secondary-hover rounded-lg text-green-200">Income</button>
                <button className="p-1 px-2 rounded-lg text-green-200 bg-danger hover:bg-danger-hover">Expanse</button>
            <div className="flex justify-between items-center py-2">
                <input className="focus:outline-none rounded-md p-1" type="text" value={description} onChange={handleDescChange} />
                <button className="p-1 px-2 bg-secondary rounded-lg text-green-200 hover:bg-secondary-hover">Submit</button>
            </div>
            </div>
      </div>
    )
}

export default NewTransactionSec;