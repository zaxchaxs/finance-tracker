import { getSnapshotUserTransaction } from "@/libs/firestoreMethods";
import { dateToString } from "@/utils/dates";
import { formatRupiah } from "@/utils/formatRupiah";
import { useEffect, useState } from "react";
import LoaderSection from "../loaders/loaderSection";

const CurrentTransaction = ({ isShowed, user }) => {
  const [currTransaction, setCurrTransaction] = useState(null);
  const [isGettingData, setIsGettingData] = useState(false);
  const tempCurrTransac = [
    {
      transactionId: "transacid1",
      userId: "user123",
      accountId: "walletid1",
      name: "wallet 1",
      amount: 10000,
      type: "expanse",
      date: "2024-06-26",
      desc: "belu nasi padang asdjas akjdas ks asdasi Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati corrupti saepe nihil quos nemo culpa, voluptates natus sapiente veniam inventore nobis qui ipsam sint illum dignissimos nostrum quae, harum magni.",
    },
    {
      transactionId: "transacid2",
      userId: "user123",
      accountId: "walletid1",
      name: "wallet 1",
      amount: 5000,
      type: "expanse",
      date: "2024-06-26",
      desc: "esteh",
    },
    {
      transactionId: "transacid3",
      userId: "user123",
      accountId: "walletid1",
      name: "wallet 1",
      amount: 50000,
      type: "income",
      date: "2024-06-26",
      desc: "transfer mamah",
    },
    {
      transactionId: "transacid4",
      userId: "user123",
      accountId: "walletid2",
      name: "dompet 2",
      amount: 150000,
      type: "income",
      date: "2024-06-26",
      desc: "transfer papah",
    },
  ];

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
                return <ColItem key={idx} data={data} />;
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CurrentTransaction;

const ColItem = ({ data }) => {
  // testing date
  const date = dateToString(data.date);
  const amount = formatRupiah(data.amount);

  return (
    <div className="w-full border-secondary rounded-lg text-base mb-2 p-2 border-b-2">
      <div className="flex justify-between items-center">
        <p>{date}</p>
        <p
          className={`${
            data.type === "expanse" ? "text-danger" : "text-green-800"
          }`}
        >{`${data.type === "expanse" ? "-" : "+"} ${amount}`}</p>
      </div>
      <div className="w-full text-justify">
        <p>{`${data.type === "expanse" ? `From` : "To"}: ${data.name}`}</p>
        <p>{`Description: ${data.description}`}</p>
      </div>
    </div>
  );
};
