import { formatRupiah } from "@/utils/formatRupiah";

const Wallet = ({ name, amount }) => {
    const amountConverted = formatRupiah(amount);
    return (
      <div className="flex justify-between border-b-2 p-2 rounded-md border-secondary w-full">
        <h1>{name}</h1>
        <p>{`${amountConverted}`}</p>
      </div>
    );
  };

  export default Wallet;