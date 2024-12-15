import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import LoaderSection from "../../../components/loaders/loaderSection";
import { addWalletSchema, WalletType } from "@/types/walletTypes";
import { User } from "firebase/auth";
import TitleSection from "@/components/ui/Title";
import WalletCard from "@/components/cards/walletCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { AddWalletDialog } from "./AddWalletDialog";
import { z } from "zod";
import { usePostData } from "@/hooks/FirestoreHooks";

type PropsType = {
  wallets: WalletType[];
  user: User | null;
  isGettingData: boolean;
};

const WalletAccountSection = ({ wallets, user, isGettingData }: PropsType) => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const { postData } = usePostData();

  //   handler functions
  const handleSubmit = (values: z.infer<typeof addWalletSchema>) => {
    const newData: WalletType = {
      ...values,
      userId: user?.uid || "",
      accountId: uuidv4(),
      createdAt: new Date().toDateString(),
      balance: Number(values.balance.split(" ")[1]),
      currency: JSON.parse(values.currency).code,
      isPinned: false,
    };

    console.log(newData);
    postData(newData, "user-wallets");
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
                    accountId: "",
                    balance: 0,
                    userId: "",
                    createdAt: "",
                    currency: "IDR",
                    isPinned: true,
                    icon: "",
                  }}
                />
              )}
            </div>

            <AddWalletDialog
              isOpen={isOpenDialog}
              setIsOpen={setIsOpenDialog}
              onSubmit={handleSubmit}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletAccountSection;
