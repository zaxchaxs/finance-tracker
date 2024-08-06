import { useState } from "react";
import Wallet from "./wallet";
import { sideSweetAlertError, sideSweetAlertWarning, sweetAlertAddWallet } from "@/libs/sweetAlert";
import { v4 as uuidv4 } from "uuid";
import LoaderSection from "../loaders/loaderSection";
import PrimaryButton from "../ui/buttons/PrimaryButton";
import InputForm from "../ui/InputForm";
import LoaderLightSection from "../loaders/loaderLightSection";

const UserWalletAccount = ({ isShowed, userWallets, user, isGettingData }) => {
  const [isAddWalletBtnClicked, setIsAddWalletBtnClicked] = useState(false);
  const [walletName, setWalletName] = useState("");
  const [walletAmount, setwalletAmount] = useState();
  const [loadingAddDoc, setLoadingAddDoc] = useState(false);

  //   handler functions
  const handleSubmit = (e) => {
    e.preventDefault();

    const isWalletAlreadyExist = userWallets.find(obj => obj.name === walletName);
    if(isWalletAlreadyExist) {
      sideSweetAlertWarning(`${walletName} is already exists!`);
      return;
    };

    const addDocWallet = () => {
      try {
        const accountId = uuidv4();
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
          setwalletAmount,
          setLoadingAddDoc
        );
      } catch (error) {
        sideSweetAlertError("Failed to add wallet!")
      }
    };

    if (walletName && walletAmount > 0) {
      addDocWallet()
    } else {
      sideSweetAlertWarning("Please fill the form")
    };

  };

  return (
    <div
      className={`w-full rounded-lg rounded-t-none py-2 px-4 flex shadow-md shadow-black text-secondary text-lg flex-col font-paragraf font-semibold relative ${
        isShowed ? "" : "hidden"
      }`}
    >
      {isGettingData ? (
          <LoaderSection width={"w-14"} />
      ) : (
        <>
          {userWallets.length === 0 || !userWallets ? (
            <div className="flex justify-center items-end w-full text-center py-2">
              <p>{`It seem you don't have a wallet account yet, try creating one.`}</p>
            </div>
          ) : (
            <div>
              {userWallets?.map((e, i) => (
                <Wallet key={i} data={e} />
              ))}
            </div>
          )}
          <div className="w-full flex flex-col font-title">
            <div className="py-4">
                <PrimaryButton
                  handleClick={() =>
                    setIsAddWalletBtnClicked(!isAddWalletBtnClicked)
                  }
                  text={isAddWalletBtnClicked ? "close" : 'Add Wallet Account'}
                  type={isAddWalletBtnClicked ? "danger" : 'primary'}
                  value={isAddWalletBtnClicked ? "close" : 'Add Wallet Account'}
                />
            </div>

            <form
              className={`${
                isAddWalletBtnClicked ? "" : "hidden"
              } w-full px-4 text-secondary flex flex-col gap-4 py-4 font-paragraf`}
              onSubmit={handleSubmit}
            >
              <InputForm handleChange={(e) => setWalletName(e.target.value)} name={"Name"} value={walletName} type={"text"}isRequired={true} />

              <div className="flex gap-2 justify-between">
                <InputForm handleChange={(e) => setwalletAmount(e.target.value)} name={"Amount"} value={walletAmount} type={"text"}  isRequired={true} inputMode={"numeric"} />
                <PrimaryButton handleClick={(e) => handleSubmit(e)} text={loadingAddDoc ? <LoaderLightSection width={"w-7"} /> : "Submit" } type={"primary"} value={"submit"} />
                
              </div>
            </form>
          </div>
        </>
      )}
      
    </div>
  );
};

export default UserWalletAccount;
