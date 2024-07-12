import TransactionDetail from "../dahsboard/transactionDefail";

const TransactionContent = ({ transactions }) => {
  return (
    <div className="w-full text-base p-2 flex flex-col gap-4 text-secondary">
      <div>
        {transactions.length === 0 ? (
          <div className="flex justify-center items-end w-full text-center">
            <p>{`No transactions yet.`}</p>
          </div>
        ) : (
          transactions.map((data, idx) => (
            <TransactionDetail key={idx} data={data} />
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionContent;
