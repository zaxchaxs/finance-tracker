import { TransactionType } from "@/types/transactionTypes";
import TitleSection from "../ui/Title";
import DescriptionSection from "../ui/Description";
import { Timestamp } from "firebase/firestore";
import { dateToString } from "@/utils/dateConverts";
import { currencyFormat } from "@/utils/currencyFormat";

type PropsType = {
  data: TransactionType;
};

const TransactionCard = ({ data }: PropsType) => {
  const date = dateToString(
    new Timestamp(data.date.seconds, data.date.nanoseconds)
  );

  data.description = data.description ? data.description : "-";

  return (
    <div className="w-full flex flex-col gap-2 bg-secondary p-2 rounded-lg">
      <div className="w-full flex items-center justify-between gap-2">
        <div className="flex gap-1 items-center">
          <TitleSection>
            {data.name.length > 17 ? `${data.name.slice(0, 17)}...` : data.name}{" "}
            -{" "}
          </TitleSection>
          <DescriptionSection
            className={data.type === "income" ? "text-primary" : "text-danger"}
          >
            {data.type}
          </DescriptionSection>
        </div>
        <DescriptionSection>{date}</DescriptionSection>
      </div>
      <div className="w-full flex justify-between items-center gap-2">
        <DescriptionSection>
          {data.description.length > 30 ? `${data.description.slice(0, 30)}...` : data.description}
        </DescriptionSection>
        {data.currency ? (
          <DescriptionSection>
            {currencyFormat(data.amount, data.currency)}
          </DescriptionSection>
        ) : (
          <DescriptionSection>{data.amount}</DescriptionSection>
        )}
      </div>
    </div>
  );
};

export default TransactionCard;
