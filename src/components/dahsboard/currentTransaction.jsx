import { getSnapshotUserTransaction } from "@/libs/firestoreMethods";
import { useEffect, useState } from "react";
import LoaderSection from "../loaders/loaderSection";
import TransactionDetail from "./transactionDefail";

const CurrentTransaction = ({ isShowed, user }) => {
  const [currTransaction, setCurrTransaction] = useState(null);
  const [isGettingData, setIsGettingData] = useState(false);

  useEffect(() => {
    const limit = 5;
    const getCurrTransac = async () => {
      setIsGettingData(true);
      try {
        await getSnapshotUserTransaction(user?.uid, setCurrTransaction, limit);
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsGettingData(false);
      }
    };
    
    if (user) getCurrTransac();
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

