import { formatRupiah } from "@/utils/formatRupiah";
import {
  faPenToSquare,
  faSquareXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Wallet = ({ data }) => {
  const amountConverted = formatRupiah(data.amount);

  return (
    <div className="flex justify-between border-b-2 p-2 rounded-md border-secondary">
      <div className="fixed inset-0 flex items-center backdrop-blur-sm justify-center z-50">

        <div className="bg-secondary rounded-md w-[50vh] p-4 relative text-lightGreen">
          <div className="w-full flex justify-center items-center text-2xl">
            <h1>Wallet Info</h1>
            <button className="absolute right-5">
              <FontAwesomeIcon
                icon={faSquareXmark}
                color="#EF4444"
                size="2x"
                className="w-6"
              />
            </button>
          </div>
          <div className="py-4 w-full flex flex-col gap-4">
            <input
              type="text"
              placeholder="Name"
              className="p-1 rounded-lg focus:outline-none"
            />
            <input
              type="text"
              placeholder="Amount"
              className="p-1 rounded-lg focus:outline-none"
            />
          </div>
          <div className="w-full flex justify-between">
            <button className="p-1 px-2 rounded-md bg-danger hover:bg-danger-hover">Delete</button>
            <button className="p-1 px-2 rounded-md bg-blue-500 hover:bg-blue-600">Update</button>
          </div>
        </div>
      </div>

      <h1>{data.name}</h1>
      <div className="flex gap-4 items-center justify-center">
        <p>{`${amountConverted}`}</p>
        <button onClick={() => console.log(data)}>
          <FontAwesomeIcon icon={faPenToSquare} color="#059669" />
        </button>
      </div>
    </div>
  );
};

export default Wallet;
