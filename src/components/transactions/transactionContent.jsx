import { sumTotalAmount } from "@/utils/sumAmount";
import TransactionDetail from "../dahsboard/transactionDefail";
import { formatRupiah } from "@/utils/formatRupiah";
import AdviceInfo from "../AdviceInfo";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import SolidShadow from "../ui/solidShadow/SolidShadow";

const TransactionContent = ({ transactions }) => {
  const [slicedTransac, setSlicedTransac] = useState();
    const [page, setPage] = useState(1);
    const [indexPage, setIndexPage] = useState({first: 0, last: 10});
    const [totalAmount, setTotalAmount] = useState({income: 0, expanse: 0});
    const isFirstRender = useRef(true);

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

    if(isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

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
    <div className="w-full text-base flex flex-col gap-4 text-secondary relative z-10 p-4">

      <div className="p-2  shadow-md shadow-gray-600  rounded-lg">
        <div className="text-secondary text-base font-title px-2">
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

        <div className="rounded-lg font-paragraf font-semibold ">
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
      </div>

      {/* Pagination */}
      <div className="w-full flex items-center justify-center relative">
        <div className="w-fit relative group">
            <SolidShadow background={"bg-teal-900"} />
              <div className="relative flex justify-center items-center mx-auto w-fit z-10 font-title">
                    <button value={"left"} onClick={handlePrevPage} className={`relative w-full ring-1 ring-black z-10 h-full p-1.5 px-3 rounded-l-lg bg-third hover:bg-third-hover text-secondary active:bg-third`}>
                      <FontAwesomeIcon icon={faCaretLeft} />
                    </button>
                    <button value={"left"} className={`relative w-full ring-1 ring-black z-10 h-full p-1.5 px-3  bg-secondary text-lightWhite hover:bg-secondary active:bg-secondary`}>
                      {page}
                    </button>
                    <button value={"left"} onClick={handleNextPage} className={`relative w-full ring-1 ring-black z-10 h-full p-1.5 px-3 rounded-r-lg bg-third hover:bg-third-hover text-secondary active:bg-third`}>
                      <FontAwesomeIcon icon={faCaretRight} />
                    </button>
              </div>
            </div>
      </div>
        
      <AdviceInfo totalAmount={totalAmount} />
    </div>
  );
};

export default TransactionContent;
