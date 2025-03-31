import { useState } from "react";
import { WalletType } from "@/types/walletTypes";
import TitleSection from "@/components/ui/Title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { AddWalletDialog } from "./AddWalletDialog";
import WalletCardSkeleton from "@/components/skeletons/WalletCardSkeleton";
import WalletCard from "@/components/cards/walletCard";

type PropsType = {
  wallets: WalletType[];
  isGettingData: boolean;
};

const WalletAccountSection = ({ wallets, isGettingData }: PropsType) => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);

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
          <div className="w-full grid grid-cols-2 gap-2">
            {[1, 2, 3, 4].map((_, idx) => (
              <WalletCardSkeleton key={idx} />
            ))}
          </div>
        ) : !wallets || wallets.length < 1 ? (
          <div className="flex justify-center items-end w-full text-center py-2">
            <TitleSection>
              {`It seem you don't have a wallet account yet, try creating one.`}
            </TitleSection>
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
          </div>
        )}
        <AddWalletDialog isOpen={isOpenDialog} setIsOpen={setIsOpenDialog} />
      </div>
    </div>
  );
};

export default WalletAccountSection;
