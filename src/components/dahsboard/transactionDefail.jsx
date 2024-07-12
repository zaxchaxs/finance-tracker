import { dateToString } from "@/utils/dates";
import { formatRupiah } from "@/utils/formatRupiah";
import { Timestamp } from "firebase/firestore";

const TransactionDetail = ({data}) => {

    // temporary
    const milliseconds = data.date.seconds * 1000 + data.date.nanoseconds / 1000000;
    // const currDate = new Date(milliseconds);
    const currDate = new Timestamp(data.date.seconds, data.date.nanoseconds);
    const date = dateToString(currDate);
    



    // const date = dateToString(data.date);
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
    )
}

export default TransactionDetail;