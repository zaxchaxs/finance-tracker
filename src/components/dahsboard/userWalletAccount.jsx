import { useState } from "react";
import Wallet from "./wallet"
import { sweetAlertAddWallet } from "@/libs/sweetAlert";

const UserWalletAccount = ({isShowed, userWallets, user}) => {
  const [isAddWalletBtnClicked, setIsAddWalletBtnClicked] = useState(false);
  const [walletName, setWalletName] = useState("");
  const [walletAmount, setwalletAmount] = useState();

//   handler functions
const handleSubmit = (e) => {
    e.preventDefault();
    if(walletName && walletAmount > 0) {
        const newData = {
            userId: user.uid,
            name: walletName,
            amount: walletAmount
        };
        // console.log(newData);
        sweetAlertAddWallet(newData, setIsAddWalletBtnClicked, setWalletName, setwalletAmount);
    }
};

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
        },
      ];

    return (
        <div
        className={`w-full px-4 flex text-secondary flex-col ${
            isShowed ? "" : "hidden"
        }`}
      >
        {
          tempWalletData.map((e, i) => (
            <Wallet key={i} name={e.name} amount={e.amount} />
          ))
        }
        <button className={`p-1 px-2 my-4 ${isAddWalletBtnClicked ? 'bg-danger hover:bg-danger-hover active:bg-danger' : 'active:bg-secondary bg-secondary hover:bg-secondary-hover'} rounded-lg text-green-200`} onClick={() => setIsAddWalletBtnClicked(!isAddWalletBtnClicked)} >{isAddWalletBtnClicked ? 'Close' : 'Add Wallet Account'}</button>
        
        <form className={`${isAddWalletBtnClicked ? "" : "hidden"} w-full px-4 text-secondary flex flex-col gap-4`}>
            
          <input type="text" placeholder="Name" className="focus:outline-none rounded-md p-1" value={walletName} onChange={(e) => setWalletName(e.target.value)} />
          <div className="flex gap-2 justify-between">
            <input type="text" placeholder="Amount" className="focus:outline-none rounded-md p-1 w-full" value={walletAmount} onChange={(e) => setwalletAmount(e.target.value)} />
            <button
              onClick={(e) => handleSubmit(e)}
              className={`${
                walletName && walletAmount > 0
                  ? ""
                  : "hidden"
              } p-1 px-4 bg-secondary rounded-lg text-green-200 hover:bg-secondary-hover`}
            >
              Submit
            </button>

          </div>
        </form>
      </div>
    )
}

export default UserWalletAccount