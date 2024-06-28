"use client"
import { faCaretDown, faCaretRight, faUser, faUserAlt, faUserCircle, faUserLarge } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const DashboardPage = () => {
    const [isShowWallet, setIsShowWallet] = useState(true);
    const [isShowTransac, setIsShowTransac] = useState(false);
    const [ isShowCurrTransac, setIsShowCurrTransac] = useState(false);

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
      <main className="min-h-screen text-xl p-6 font-passionOne bg-primary w-full py-4 flex flex-col gap-5">
        <div className="w-full border-b-2 text-primary border-secondary p-2 font-lilitaOne text-2xl flex justify-between">
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

        <div
          className={`w-full py-2 text-primary flex items-center gap-2 cursor-pointer border-b-2 border-green-950`}
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
        />

        <div
          className={`w-full py-2 text-primary flex items-center gap-2 cursor-pointer border-b-2 border-green-950`}
          onClick={() => setIsShowCurrTransac(!isShowCurrTransac)}
        >
          <FontAwesomeIcon
            className="w-2"
            size="1x"
            icon={faCaretRight}
            rotation={isShowTransac && 90}
          />
          <h1>Current Transactions</h1>
        </div>
        <CurrentTransaction isShowed={isShowCurrTransac} />
      </main>
    );
};

export default DashboardPage;

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

const CurrentTransaction = ({ isShowed }) => {
  const tempCurrTransac = [
    {
      transactionId: "transacid1",
      userId: "user123",
      accountId: "walletid1",
      amount: 10000,
      type: "expanse",
      date: new Date(),
      desc: "belu nasi padang"
    },
    {
      transactionId: "transacid2",
      userId: "user123",
      accountId: "walletid1",
      amount: 5000,
      type: "expanse",
      date: new Date(),
      desc: "esteh"
    },
    {
      transactionId: "transacid3",
      userId: "user123",
      accountId: "walletid1",
      amount: 50000,
      type: "income",
      date: new Date(),
      desc: "transfer mamah"
    },
    {
      transactionId: "transacid4",
      userId: "user123",
      accountId: "walletid2",
      amount: 150000,
      type: "income",
      date: new Date(),
      desc: "transfer papah"
    },
  ]

  return(
<div className={`w-full flex flex-col gap-1 ${isShowed ? "" : "hidden"}`}>
  <table className="">
    <thead className="w-full font-normal text-primary">
      <tr >
        <th>Name</th>
        <th>Desc</th>
        <th>Amount</th>
      </tr>
    </thead>
    <tbody className="text-secondary font-normal">
      <tr className="border-2 border-black w-full">
        <td className="text-justify px-2 border-2 border-black">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae eum consequuntur quis, modi consectetur officiis animi quidem iure autem temporibus neque vel molestiae incidunt velit perspiciatis atque minus, enim optio?</td>
        <td className="text-justify px-2 border-2 border-black">Beli nasi goreng buat makan malam Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem voluptatibus nisi optio officiis repudiandae consectetur voluptatem. Dignissimos error, illo rerum placeat voluptatibus fugiat, reiciendis corrupti quidem incidunt deleniti, odio veniam?</td>
        <td className="text-justify px-2 border-2 border-black">wallet1</td>
      </tr>
    </tbody>
  </table>
      {/* <h1>Current Transaction</h1> */}
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