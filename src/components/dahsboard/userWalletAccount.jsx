import { useState } from "react";
import Wallet from "./wallet";
import { sweetAlertAddWallet } from "@/libs/sweetAlert";
import { v4 as uuidv4 } from "uuid";
import LoaderSection from "../loaders/loaderSection";

const UserWalletAccount = ({ isShowed, userWallets, user, isGettingData }) => {
  const [isAddWalletBtnClicked, setIsAddWalletBtnClicked] = useState(false);
  const [walletName, setWalletName] = useState("");
  const [walletAmount, setwalletAmount] = useState();

  //   handler functions
  const handleSubmit = (e) => {
    e.preventDefault();
    const accountId = uuidv4();
    if (walletName && walletAmount > 0) {
      const newData = {
        userId: user.uid,
        accountId,
        name: walletName,
        amount: Number(walletAmount),
        createdAt: new Date(),
      };
      sweetAlertAddWallet(
        newData,
        setIsAddWalletBtnClicked,
        setWalletName,
        setwalletAmount
      );
    }
  };

  return (
    <div
      className={`w-full px-4 flex text-secondary text-lg flex-col ${
        isShowed ? "" : "hidden"
      }`}
    >
      {isGettingData ? (
        <LoaderSection width={"w-14"} />
      ) : (
        <>
          <div>
            {userWallets?.length === 0 || !userWallets ? (
              <div className="flex justify-center items-end w-full text-center">
                <p>{`It seem you don't have a wallet account yet, try creating one.`}</p>
              </div>
            ) : (
              userWallets?.map((e, i) => (
                <Wallet key={i} data={e} />
              ))
            )}
          </div>

          <div className="w-full flex flex-col">
            <button
              className={`p-1 px-2 my-4 ${
                isAddWalletBtnClicked
                  ? "bg-danger hover:bg-danger-hover active:bg-danger"
                  : "active:bg-secondary bg-secondary hover:bg-secondary-hover"
              } rounded-lg text-green-200`}
              onClick={() => setIsAddWalletBtnClicked(!isAddWalletBtnClicked)}
            >
              {isAddWalletBtnClicked ? "Close" : "Add Wallet Account"}
            </button>

            <form
              className={`${
                isAddWalletBtnClicked ? "" : "hidden"
              } w-full px-4 text-secondary flex flex-col gap-4`}
            >
              <input
                type="text"
                placeholder="Name"
                className="focus:outline-none rounded-md p-1"
                value={walletName}
                onChange={(e) => setWalletName(e.target.value)}
              />
              <div className="flex gap-2 justify-between">
                <input
                  type="text"
                  placeholder="Amount"
                  className="focus:outline-none rounded-md p-1 w-full"
                  value={walletAmount}
                  onChange={(e) => setwalletAmount(e.target.value)}
                />
                <button
                  onClick={(e) => handleSubmit(e)}
                  className={`${
                    walletName && walletAmount > 0 ? "" : "hidden"
                  } p-1 px-4 bg-secondary rounded-lg text-green-200 hover:bg-secondary-hover`}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default UserWalletAccount;
