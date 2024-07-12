import { getSnapshotUserTransaction } from "@/libs/firestoreMethods";
import { dateToString } from "@/utils/dates";
import { formatRupiah } from "@/utils/formatRupiah";
import { useEffect, useState } from "react";
import LoaderSection from "../loaders/loaderSection";
import TransactionDetail from "./transactionDefail";

const CurrentTransaction = ({ isShowed, user }) => {
  const [currTransaction, setCurrTransaction] = useState(null);
  const [isGettingData, setIsGettingData] = useState(false);
  useEffect(() => {
    setIsGettingData(true);
    try { 
      const limit = 5;
      const getCurrTransac = async () => {
        await getSnapshotUserTransaction(user?.uid, setCurrTransaction, limit);
      };
      if(user) getCurrTransac();
      
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsGettingData(false);
    }
  }, [user]);

  return (
    <div
      className={`w-full text-lg text-secondary px-2 flex flex-col gap-1 ${
        isShowed ? "" : "hidden"
      }`}
    >
      {isGettingData ? (
        <LoaderSection width={"w-14"} />
      ) : (
        <>
          {currTransaction?.length === 0 || !currTransaction ? (
            <div className="flex justify-center items-end w-full text-center">
              <p>{`No transactions yet.`}</p>
            </div>
          ) : (
            <div className="w-full text-secondary">
              {currTransaction?.map((data, idx) => {
                return <TransactionDetail key={idx} data={data} />
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CurrentTransaction;

