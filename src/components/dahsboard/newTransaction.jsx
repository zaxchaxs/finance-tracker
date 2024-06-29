import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const NewTransactionSec = ({isShowed, walletAcountData}) => {
    const [isShowWallet, setIsShowWallet] = useState(false);

    return (
        <div className={`w-full px-4 flex text-secondary flex-col gap-2 ${isShowed ? "" : "hidden"}`} onClick={() => setIsShowWallet(!isShowWallet)}>
            <div className="w-full p-1 px-2 flex items-center cursor-pointer gap-2">
                <FontAwesomeIcon icon={faCaretDown} rotation={!isShowWallet && 270} />
                <h1>To:</h1>
            </div>
            <div className={`${isShowWallet ? "" : "hidden"} flex flex-col gap-2`}>
                {
                    walletAcountData.map((e, i) => {
                        return (
                            <div key={i} className="cursor-pointer border-y-2 w-full border-secondary rounded-md p-1 px-3 group">
                                <h1 className="group-hover:translate-x-3 transition-all ease-in-out duration-200">{e.name}</h1>
                            </div>
                        )
                    })
                }
            </div>
      </div>
    )
}

export default NewTransactionSec;