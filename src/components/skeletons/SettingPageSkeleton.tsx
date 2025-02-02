import { Skeleton } from "../ui/skeleton";

const SettingPageSkeleton = () => {
  return (
    <main className="text-base relative w-full flex flex-col gap-3">
      <div className="w-full p-4 flex flex-col items-center gap-4 relative z-10">
        <Skeleton className="w-full h-[5rem] rounded-lg p-4 flex items-center justify-between">
            <Skeleton className="w-24 h-[1.5rem] rounded-lg bg-background"/>
            <Skeleton className="w-8 h-[1.5rem] rounded-lg bg-background"/>
        </Skeleton>
        <Skeleton className="w-full h-[5rem] rounded-lg p-4 flex items-center">
            <Skeleton className="w-24 h-[1.5rem] rounded-lg bg-background"/>
        </Skeleton>
        <Skeleton className="w-full h-[5rem] rounded-lg p-4 flex items-center">
            <Skeleton className="w-24 h-[1.5rem] rounded-lg bg-background"/>
        </Skeleton>
      </div>
    </main>
  );
};

export default SettingPageSkeleton;
