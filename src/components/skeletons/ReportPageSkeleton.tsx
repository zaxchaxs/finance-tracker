import { Skeleton } from "../ui/skeleton";
import FormInputSkeleton from "./FormInputSkeleton";

const ReportPageSkeleton = () => {
    return (
      <main className="text-base relative p-4 items-center w-full flex flex-col gap-3">
        <Skeleton className="w-20 h-[1.2rem] rounded-lg p-4 flex items-center justify-between" />
        <div className="w-full p-2 flex items-center gap-4 justify-between">
          <Skeleton className="w-full h-[1.5rem] rounded-lg p-4 flex items-center justify-between" />
          <Skeleton className="w-full h-[1.5rem] rounded-lg p-4 flex items-center" />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Skeleton className="w-32 h-[1.5rem] rounded-lg p-4 flex items-center" />
          <Skeleton className="w-32 h-[1.5rem] rounded-lg p-4 flex items-center" />
        </div>
        <div className="grid grid-cols-2 w-full">
          <FormInputSkeleton />
          <div />
        </div>
        <Skeleton className="w-full h-[25rem] rounded-lg p-4 flex items-center" />
      </main>
    );
};

export default ReportPageSkeleton;