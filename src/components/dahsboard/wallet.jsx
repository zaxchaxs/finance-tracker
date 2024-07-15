import { formatRupiah } from "@/utils/formatRupiah";
import {
  faPenToSquare,
  faSquareXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UpdateModal from "@/components/modals/updateModal";
import { useState } from "react";

const Wallet = ({ data }) => {
  const [isInfoClicked, setIsInfoClicked] = useState(false);
  const amountConverted = formatRupiah(data.amount);

  return (
    <div className="flex justify-between border-b-2 p-2 rounded-md border-secondary">

      {/* modal */}
    <UpdateModal isInfoClicked={isInfoClicked} data={data} setIsInfoClicked={setIsInfoClicked} />

      <h1>{data.name}</h1>
      <div className="flex gap-4 items-center justify-center">
        <p>{`${amountConverted}`}</p>
        <button onClick={() => setIsInfoClicked(!isInfoClicked)}>
          <FontAwesomeIcon icon={faPenToSquare} color="#059669" />
        </button>
      </div>
    </div>
  );
};

export default Wallet;
