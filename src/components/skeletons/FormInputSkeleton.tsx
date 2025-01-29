import { Skeleton } from "../ui/skeleton"

const FormInputSkeleton = () => {
    return <div className="w-full flex flex-col gap-1">
        <Skeleton className="w-20 h-[1.5rem]" />
        <Skeleton className="w-full h-[2rem]" />
    </div>
};

export default FormInputSkeleton;