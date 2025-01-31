"use client";

import TransactionCard from "@/components/cards/TransactionCard";
import TransactionCardSkeleton from "@/components/skeletons/TransactionCardSkeleton";
import TitleSection from "@/components/ui/Title";
import { TransactionType } from "@/types/transactionTypes";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
type PropsType = {
    transactions: TransactionType[]
    loadingGetTransaction: boolean;
};


const CurrentTransactionSection = ({ transactions, loadingGetTransaction }: PropsType) => {
  const [isShowSection, setIsShowSection] = useState<boolean>(false);
  return (
    <div
      className={`w-full flex flex-col items-center font-title shadow-md shadow-gray-400 rounded-lg mb-[5rem]`}
    >
      <div
        className={`relative w-full rounded-lg overflow-hidden ${
          isShowSection ? "rounded-b-none" : ""
        }`}
      >
        <div
          className="w-full flex gap-3 items-center cursor-pointer p-4 relative z-10 bg-primary text-lightWhite"
          onClick={() => setIsShowSection(!isShowSection)}
        >
          <FontAwesomeIcon
            className="w-2 "
            size="1x"
            icon={faCaretRight}
            rotation={isShowSection ? 90 : undefined}
          />
          <TitleSection className="text-lightWhite">Current Transactions</TitleSection>
        </div>
      </div>

      {/* content */}
      <div
        className={`w-full rounded-lg rounded-t-none p-2 flex text-secondary text-base flex-col gap-6 font-paragraf font-semibold relative ${
          isShowSection ? "" : "hidden "
        }`}
      >
        {loadingGetTransaction
          ? Array(5)
              .fill(null)
              .map((_, idx) => <TransactionCardSkeleton key={idx} />)
          : transactions.map((transaction, i) => (
              <TransactionCard key={i} data={transaction} />
            ))}
      </div>
    </div>
  );
};

export default CurrentTransactionSection;
