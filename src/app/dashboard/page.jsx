"use client"
import CurrentTransaction from "@/components/dahsboard/currentTransaction";
import NewTransactionSec from "@/components/dahsboard/newTransaction";
import { useAuth } from "@/contexts/AuthContext";
import { formatRupiah } from "@/utils/formatRupiah";
import { faCaretDown, faCaretRight, faUser, faUserAlt, faUserCircle, faUserLarge } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const DashboardPage = () => {
    const [isShowWallet, setIsShowWallet] = useState(true);
    const [isShowTransac, setIsShowTransac] = useState(false);
    const [ isShowCurrTransac, setIsShowCurrTransac] = useState(false);
    const { currUser } = useAuth();

    const tempWalletData = [
        {
            accountId: "walletid1",
            userId: "user123",
            name: "wallet 1",
            amount: 100000,
        },
        {
            accountId: "walletid2",
            userId: "user123",
            name: "dompet 2",
            amount: 500000,
        }
    ]

    return (
      <main className="min-h-screen text-xl  p-6 font-passionOne bg-primary w-full py-4 flex flex-col gap-5">
        
        {/* Nav */}
        <div className="z-10 w-full border-b-2 text-primary border-secondary p-2 font-lilitaOne text-2xl flex justify-between">
          <h1 className="">Dashboard</h1>
          <button>
            <FontAwesomeIcon icon={faUserAlt} />
          </button>
        </div>
      
        <div
          className="pt-4 py-2  w-full text-primary flex items-center gap-2 cursor-pointer border-b-2 border-green-950"
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
          {tempWalletData.map((e, i) => (
            <Wallet key={i} name={e.name} amount={e.amount} />
          ))}
        </div>

        {/* New Transaction Section */}
        <div
          className={`w-full py-2 text-primary flex items-center gap-2 cursor-pointer border-b-2 border-green-950 z-10`}
          onClick={() => setIsShowTransac(!isShowTransac)}
        >
          <FontAwesomeIcon
            className="w-2"
            size="1x"
            icon={faCaretRight}
            rotation={isShowTransac && 90}
          />
          <h1>New Transaction</h1>
        </div>
        <NewTransactionSec
          isShowed={isShowTransac}
          walletAcountData={tempWalletData}
          user={currUser}
        />

        {/* Current Transaction Section */}
        <div
          className={`w-full py-2 text-primary flex items-center gap-2 cursor-pointer border-b-2 border-green-950 z-10`}
          onClick={() => setIsShowCurrTransac(!isShowCurrTransac)}
        >
          <FontAwesomeIcon
            className="w-2"
            size="1x"
            icon={faCaretRight}
            rotation={isShowCurrTransac && 90}
          />
          <h1>Current Transactions</h1>
        </div>
        <CurrentTransaction isShowed={isShowCurrTransac} />
      </main>
    );
};

export default DashboardPage;

const Wallet = ({name, amount}) => {
  const amountConverted = formatRupiah(amount)
    return(
        <div className="flex justify-between border-b-2 p-2 rounded-md border-secondary w-full">
            <h1>{name}</h1>
            <p>{`${amountConverted}`}</p>
      </div>
    )
}