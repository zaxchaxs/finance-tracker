import { cn } from "@/lib/utils";

type PropsType = {
  width: string;
  height?: string;
  className?: string;
}

const LoaderSection = ({width, height, className}: PropsType) => {
    return (
      <div className={cn("w-full flex p-4 justify-center items-center", className)}>
        <div className={`loaderSection ${width} ${height}`}></div>
      </div>
    );
};

export default LoaderSection;