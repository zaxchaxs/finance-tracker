import { ReactNode } from "react";
import DescriptionSection from "../ui/Description";
import { cn } from "@/lib/utils";

type PropsType = {
  className?: string;
  children?: ReactNode;
  description?: string;
};
export default function LoadingFullPage({ children, description, className }: PropsType) {
  return <main className={cn("h-screen w-full flex  flex-col justify-center items-center gap-12 z-[1000] absolute top-0 left-0", className)}>
    <div className="loaderPage"></div>
    {children}
    {description && <DescriptionSection>{description}</DescriptionSection>}
  </main>;
}
