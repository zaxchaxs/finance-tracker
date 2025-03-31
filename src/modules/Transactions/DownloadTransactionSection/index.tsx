import LoadingFullPage from "@/components/systems/LoadingFullPage";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TitleSection from "@/components/ui/Title";
import { useAuth } from "@/contexts/AuthContext";
import {
  FilterFirestoreType,
  useSnapshotDatas,
} from "@/hooks/FirestoreApiHooks";
import useToast from "@/hooks/useToast";
import { TransactionType } from "@/types/transactionTypes";
import { WalletType } from "@/types/walletTypes";
import { convertJSONToCSV, firestoreDateToString } from "@/utils/strings";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Timestamp } from "firebase/firestore";
import { useState } from "react";

type PropsType = {
  title?: string;
  wallets: WalletType[];
  loadingGetWallets: boolean;
};

export default function DownloadTransactionSection({
  title,
  wallets,
  loadingGetWallets,
}: PropsType) {
  const { currUser, docUser } = useAuth();
  const [isShowSection, setIsShowSection] = useState<boolean>(false);
  const [selectedWallet, setSelectedWallet] = useState<string>("");
  const { pushToast } = useToast();
  const [loadingDownload, setLoadingDownload] = useState<boolean>(false);
  const {
    data: transactionsData,
    loading: transactionLoading,
    reSnapshot,
    updateSnapshotParams,
  } = useSnapshotDatas<TransactionType>(
    `user-transactions/${currUser?.uid}/transactions`,
    false,
    [],
    [
      {
        fieldPath: "createdAt",
        directionStr: "desc",
      },
    ]
  );

  // handle function

  const handleDownload = () => {
    try {
      if(!selectedWallet || selectedWallet === "all") {
        pushToast({
          message: "Please select a wallet to download",
          isError: true
        })
        return
      };
      if(transactionLoading) {
        pushToast({
          message: "Please wait until the data is loaded",
          isError: true
        })
        return;
      }
      const editedTransactions = transactionsData.map((transaction) => {
        transaction.date = firestoreDateToString(
          transaction.date
        ) as unknown as Timestamp;
        transaction.createdAt = firestoreDateToString(
          transaction.createdAt
        ) as unknown as Timestamp;
        return transaction;
      });
      const csv = convertJSONToCSV(editedTransactions);
      downloadCSV(
        csv,
        `transactions_${docUser?.name}_${new Date().getMilliseconds()}.csv`
      );
      pushToast({
        message: "Downloaded",
        isError: false
      })
    } catch (error) {
      pushToast({
        message: "Download failed",
        isError: true,
      })
    }
  };

  const handleChangeWallet = (val: string) => {
    if (val === "all") {
      setSelectedWallet("");
    } else {
      setSelectedWallet(val);
    }

    const filterTransaction: FilterFirestoreType[] = [
      {
        fieldPath: "accountId",
        opStf: "==",
        value: val,
      },
    ];
    
    updateSnapshotParams(
      `user-transactions/${currUser?.uid}/transactions`,
      filterTransaction
    );
  };


  const downloadCSV = (csv: string, filename: string) => {
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section
      className={`w-full flex flex-col items-center font-title shadow-md shadow-gray-400 rounded-lg`}
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
          <TitleSection className="text-lightWhite">{title}</TitleSection>
        </div>
      </div>

      {/* content */}
      <div
        className={`w-full rounded-lg rounded-t-none p-2 flex text-secondary text-base flex-col gap-4 font-paragraf font-semibold relative ${
          isShowSection ? "" : "hidden "
        }`}
      >
        <div className="w-full flex justify-between items-center py-2 md:py-4">
          <div onClick={() => console.log(transactionsData)} className="w-full flex items-center justify-between rounded-lg">
            <Select
              value={selectedWallet}
              onValueChange={(val) => handleChangeWallet(val)}
            >
              <SelectTrigger className="w-fit bg-primary ring-black text-lightWhite">
                <SelectValue placeholder="Select Wallet" />
              </SelectTrigger>
              <SelectContent className="max-h-[20rem]">
                {loadingGetWallets ? (
                  <SelectGroup>
                    <SelectLabel>Loading...</SelectLabel>
                  </SelectGroup>
                ) : (
                  wallets.map((wallet, idx) => (
                    <SelectItem
                      key={idx}
                      value={wallet.accountId}
                      className="hover:border cursor-pointer rounded-md"
                    >
                      {wallet.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            <Button normalBtn onClick={handleDownload} variant={"default"}>
              Download
            </Button>
          </div>
        </div>
      </div>
      {transactionLoading && (
        <LoadingFullPage
          className="bg-primary/30 backdrop-blur-sm"
          description="This may take a few minutes"
        />
      )}
    </section>
  );
}
