import { FormEvent, useState } from "react";
import Wallet from "../../../components/dahsboard/wallet";
import {
  sideSweetAlertError,
  sideSweetAlertWarning,
  sweetAlertAddWallet,
} from "@/libs/sweetAlert";
import { v4 as uuidv4 } from "uuid";
import LoaderSection from "../../../components/loaders/loaderSection";
import { addWalletSchema, WalletType } from "@/types/walletTypes";
import { User } from "firebase/auth";
import TitleSection from "@/components/ui/Title";
import { Button } from "@/components/ui/button";
import WalletCard from "@/components/cards/walletCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { AddWalletDialog } from "./AddWalletDialog";
import { z } from "zod";

type PropsType = {
  wallets: WalletType[];
  user: User | null;
  isGettingData: boolean;
};

const WalletAccountSection = ({
  wallets,
  user,
  isGettingData,
}: PropsType) => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [walletName, setWalletName] = useState("");
  const [walletAmount, setwalletAmount] = useState();
  const [loadingAddDoc, setLoadingAddDoc] = useState(false);

  //   handler functions
  const handleSubmit = (values: z.infer<typeof addWalletSchema>) => {
    // e.preventDefault();
    console.log(values)
    return;


    const isWalletAlreadyExist = wallets.find((obj) => obj.name === walletName);
    if (isWalletAlreadyExist) {
      sideSweetAlertWarning(`${walletName} is already exists!`);
      return;
    }

    const addDocWallet = () => {
      try {
        const accountId = uuidv4();
        const newData = {
          userId: user?.uid,
          accountId,
          name: walletName,
          amount: Number(walletAmount),
          createdAt: new Date(),
        };
        sweetAlertAddWallet(
          newData,
          setIsOpenDialog,
          setWalletName,
          setwalletAmount,
          setLoadingAddDoc
        );
      } catch (error) {
        sideSweetAlertError("Failed to add wallet!");
      }
    };

    if (walletName && walletAmount) {
      addDocWallet();
    } else {
      sideSweetAlertWarning("Please fill the form");
    }
  };

  return (
    <div className="w-full flex flex-col items-center shadow-md shadow-gray-400 rounded-lg overflow-hidden">
      <div className="w-full flex items-center p-4 bg-primary justify-between">
        <TitleSection className="text-lightWhite">My Wallets</TitleSection>

        <FontAwesomeIcon
          className="cursor-pointer"
          icon={faPlusSquare}
          size="2x"
          color="#F1F5F9"
          onClick={() => setIsOpenDialog(true)}
        />
      </div>
      <div className={`w-full py-2 px-4 `}>
        {isGettingData ? (
          <LoaderSection width={"w-14"} />
        ) : !wallets || wallets.length < 1 ? (
          <div className="flex justify-center items-end w-full text-center py-2">
            <p>{`It seem you don't have a wallet account yet, try creating one.`}</p>
          </div>
        ) : (
          <div className="w-full">
            <div className="w-full grid grid-cols-2 gap-2">
              {wallets.length > 5
                ? wallets
                    .slice(0, 5)
                    .map((wallet, i) => <WalletCard key={i} data={wallet} />)
                : wallets?.map((wallet, i) => (
                    <WalletCard key={i} data={wallet} />
                  ))}
              {wallets.length > 5 && (
                <WalletCard
                  isDetailCard
                  data={{
                    name: "See More",
                    accoundId: "",
                    balance: 0,
                    userId: "",
                    createdAt: "",
                    currency: "IDR"
                  }}
                />
              )}
            </div>

            <AddWalletDialog isOpen={isOpenDialog} setIsOpen={setIsOpenDialog} onSubmit={handleSubmit} />
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletAccountSection;
