"use client";

import TransactionCard from "@/components/cards/TransactionCard";
import TransactionCardSkeleton from "@/components/skeletons/TransactionCardSkeleton";
import DescriptionSection from "@/components/ui/Description";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import TitleSection from "@/components/ui/Title";
import { TransactionType } from "@/types/transactionTypes";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo, useState } from "react";

type PropsType = {
  transactions: TransactionType[]
  loadingGetTransaction: boolean;
  title?: string;
  itemsPerPage?: number;
};

const CurrentTransactionSection = ({
  transactions,
  loadingGetTransaction,
  title = "Current Transaction",
  itemsPerPage = 10,
}: PropsType) => {
  const [isShowSection, setIsShowSection] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  const paginatedTransaction = useMemo(() => {
    return transactions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  }, [transactions, currentPage]);

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
          <TitleSection className="text-lightWhite">{title}</TitleSection>
        </div>
      </div>

      {/* content */}
      <div
        className={`w-full rounded-lg rounded-t-none p-2 flex text-secondary text-base flex-col gap-4 font-paragraf font-semibold relative ${
          isShowSection ? "" : "hidden "
        }`}
      >
        {loadingGetTransaction ? (
          Array(5)
            .fill(null)
            .map((_, idx) => <TransactionCardSkeleton key={idx} />)
        ) : transactions.length === 0 ? (
          <div className="w-full p-4">
            <TitleSection className="text-secondary text-center">
              There is no transaction history yet.
            </TitleSection>
          </div>
        ) : (
          <>
          {
            paginatedTransaction.map((transaction, i) => (
              <TransactionCard key={i} data={transaction} />
            ))
          }
            <div id="pagination" className="overflow-hidden w-full flex flex-col items-center">
              <DescriptionSection className="p-2 w-full text-start">
                {`Showing 1 - ${paginatedTransaction.length} from page ${currentPage} of ${totalPages}`}
              </DescriptionSection>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#pagination"
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                    />
                  </PaginationItem>
                  {currentPage > 2 && (
                    <PaginationEllipsis onClick={() => setCurrentPage(1)} />
                  )}
                  {[
                    ...Array(totalPages)
                      .fill(null)
                      .map((_, idx) => {
                        const maxItem = currentPage + 2;

                        if (idx + 1 < maxItem && idx > currentPage - 3) {
                          return (
                            <PaginationItem key={idx}>
                              <PaginationLink
                                href="#pagination"
                                isActive={idx + 1 === currentPage}
                                onClick={() => setCurrentPage(idx + 1)}
                              >
                                {idx + 1}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        }
                        return;
                      }),
                  ]}

                  {currentPage < totalPages-1 && totalPages > 2 ? (
                    <PaginationEllipsis
                      onClick={() => setCurrentPage(totalPages)}
                    />
                  ) : (
                    <></>
                  )}

                  {/* {totalPages > 5 && (
                    <PaginationEllipsis
                      onClick={() => setCurrentPage(totalPages)}
                    />
                  )} */}

                  <PaginationItem>
                    <PaginationNext
                      href="#pagination"
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default CurrentTransactionSection;
