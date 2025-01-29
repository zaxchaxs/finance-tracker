import { Skeleton } from "../ui/skeleton";
import FormInputSkeleton from "./FormInputSkeleton";

const TransactionPageSkeleton = () => {
  return (
    <main className="p-4 w-full">
      <div className="w-full flex flex-col justify-center gap-2 items-center">
        <div className="flex gap-2 w-full">
          <Skeleton className="w-full h-[2rem] rounded-lg" />
          <Skeleton className="w-full h-[2rem] rounded-lg" />
        </div>
        <Skeleton className="w-[25vh] h-[2rem] rounded-lg" />
        <div className="flex w-full flex-col gap-4 items-center">
          <FormInputSkeleton />
          <div className="w-full justify-between flex gap-2">
            <FormInputSkeleton />
            <FormInputSkeleton />
          </div>
          <FormInputSkeleton />
          <FormInputSkeleton />
        </div>
      </div>
    </main>
  );
};

export default TransactionPageSkeleton;
