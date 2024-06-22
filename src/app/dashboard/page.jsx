"use client"
import { faCaretDown, faCaretRight, faUser, faUserAlt, faUserCircle, faUserLarge } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const DashboardPage = () => {
    const [isShowWallet, setIsShowWallet] = useState(true);
    const [isShowTransac, setIsShowTransac] = useState(false);

    const tempWalletData = [
        {
            accounId: "walletid1",
            userId: "user123",
            name: "wallet 1",
            amount: 100000,
        },
        {
            accounId: "walletid2",
            userId: "user123",
            name: "dompet 2",
            amount: 500000,
        }
    ]

    return (
      <main className="min-h-screen text-xl p-6 font-passionOne bg-primary w-full py-4">
        <div className="w-full border-b-2 text-primary border-secondary p-2 font-lilitaOne text-2xl flex justify-between">
          <h1 className="">Dashboard</h1>
          <button>
            <FontAwesomeIcon icon={faUserAlt} />
          </button>
        </div>
        <div
          className="pt-4 py-2  w-full text-primary flex items-center gap-2 cursor-pointer"
          onClick={() => setIsShowWallet(!isShowWallet)}
        >
          <FontAwesomeIcon
            className="w-2"
            size="1x"
            icon={faCaretRight}
            rotation={isShowWallet && 90}
          />
          <h1>My account wallet</h1>
        </div>
        <div
          className={`w-full px-4 flex text-secondary flex-col ${
            isShowWallet ? "" : "hidden"
          }`}
        >
            {
                tempWalletData.map((e, i) => <Wallet key={i} name={e.name} amount={e.amount} />)
            }
        </div>
        <div className={`w-full py-2 text-primary flex items-center gap-2 cursor-pointer `} onClick={() => setIsShowTransac(!isShowTransac)}>
        <FontAwesomeIcon
            className="w-2"
            size="1x"
            icon={faCaretRight}
            rotation={isShowTransac && 90}
          />
          <h1>New Transaction</h1>
        </div>
          <NewTransactionSec isShowed={isShowTransac} walletAcountData={tempWalletData} />
      </main>
    );
};

export default DashboardPage;


const NewTransactionSec = ({isShowed, walletAcountData}) => {
    const [isShowWallet, setIsShowWallet] = useState(false);

    return (
        <div className={`w-full px-4 flex text-secondary flex-col gap-1 ${isShowed ? "" : "hidden"}`}>
            <div className="w-full p-1 px-2 flex justify-between items-center cursor-pointer" onClick={() => setIsShowWallet(!isShowWallet)}>
                <h1>To:</h1>
                <FontAwesomeIcon icon={faCaretDown} rotation={!isShowWallet && 90} />
            </div>
            <div className={`${isShowWallet ? "" : "hidden"} flex flex-col gap-1`}>
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

const Wallet = ({name, amount}) => {
    return(
        <div className="flex justify-between border-b-2 p-2 rounded-md border-secondary w-full">
            <h1>{name}</h1>
            <p>{`${amount} IDR`}</p>
      </div>
    )
}
