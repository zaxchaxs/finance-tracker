import { testingDate } from "@/utils/converTimeStamp";
import { formatRupiah } from "@/utils/formatRupiah";

const CurrentTransaction = ({ isShowed }) => {
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

  return (
    <div
      className={`w-full text-lg px-2 flex flex-col gap-1 ${
        isShowed ? "" : "hidden"
      }`}
    >
      <div className="w-full text-secondary">
        {tempCurrTransac.map((data, idx) => {
          return <ColItem key={idx} data={data} />;
        })}
      </div>
    </div>
  );
};

export default CurrentTransaction;

const ColItem = ({ data }) => {
  // testing date
  const date = testingDate(data.date);
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
        <p>{`Description: ${data.desc}`}</p>
      </div>
    </div>
  );
};
