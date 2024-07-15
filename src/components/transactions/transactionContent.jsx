import { sumTotalAmount } from "@/utils/sumAmount";
import TransactionDetail from "../dahsboard/transactionDefail";
import { formatRupiah } from "@/utils/formatRupiah";
import AdviceInfo from "../AdviceInfo";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

const TransactionContent = ({ transactions }) => {
  const [slicedTransac, setSlicedTransac] = useState();
    const [page, setPage] = useState(1);
    const [indexPage, setIndexPage] = useState({first: 0, last: 10});
    const [totalAmount, setTotalAmount] = useState({income: 0, expanse: 0});
    const scrollRef = useRef();

  const newObjAmount = Array(transactions.length)
    .fill(null)
    .map(() => ({
      income: 0,
      expanse: 0,
    }));

  useEffect(() => {
    const changeValObjAmount = () => {
      transactions.map((transac, idx) => {
        if (transac.type === "income") {
          newObjAmount[idx].income += transac.amount;
        } else if (transac.type === "expanse") {
          newObjAmount[idx].expanse += transac.amount;
        }
      });
      const result = sumTotalAmount(newObjAmount);
      setTotalAmount(result);
    };
    if(transactions.length !== 0) changeValObjAmount();
  }, [transactions]);

  // slicing transaction document
  useEffect(() => {
    setSlicedTransac(transactions?.slice(indexPage.first, indexPage.last));
    // if(scrollRef.current) scrollRef.current.scrollIntoView();
  }, [page])
  
  const handleNextPage = () => {
    if (page*10 >= transactions.length) return;

    setPage(page+1)
    setIndexPage({
      first: indexPage.first+10,
      last: indexPage.last+10
    })
  }
  
  const handlePrevPage = () => {
    if(page === 1) return;

    setPage(page-1)
    setIndexPage({
      first: indexPage.first-10,
      last: indexPage.last-10
    })
  }

  return (
    <div className="w-full text-base flex flex-col gap-4 text-secondary">
      <div className="text-secondary text-base">
        <div className="flex justify-start items-center gap-1">
          <h1>{`Total Income: `}</h1>
          <h1 className="text-primary">{`${formatRupiah(
            totalAmount.income
          )}`}</h1>
        </div>
        <div className="flex justify-start gap-1 items-center">
          <h1>{`Total Expanse: `}</h1>
          <h1 className="text-danger-hover">{`${formatRupiah(
            totalAmount.expanse
          )}`}</h1>
        </div>
      </div>

      <div className="rounded-lg border-2 border-secondary border-opacity-15 shadow-md p-2">
        {transactions.length === 0 ? (
          <div className="flex justify-center items-end w-full text-center">
            <p>{`No transactions yet.`}</p>
          </div>
        ) : (
          slicedTransac?.map((data, idx) => (
            <TransactionDetail key={idx} data={data} />
          ))
        )}
      </div>

      <div className="w-full flex justify-center items-center mx-auto" ref={scrollRef}>
        <button onClick={handlePrevPage} className="p-1 px-3 border-2 rounded-l-md border-secondary">
            <FontAwesomeIcon icon={faCaretLeft} />
        </button>
        <button className="p-1 px-3 border-y-2 border-secondary bg-secondary text-slate-100" onClick={() => console.log(slicedTransac.length)}>{page}</button>
        <button onClick={handleNextPage} className="p-1 px-3 border-2 rounded-r-md border-secondary" >
            <FontAwesomeIcon icon={faCaretRight} />
        </button>
      </div>
        
      <AdviceInfo totalAmount={totalAmount} />
    </div>
  );
};

export default TransactionContent;
