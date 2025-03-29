import { ReactNode } from "react";
import DescriptionSection from "../ui/Description";

type PropsType = {
  children?: ReactNode;
  description?: string;
};
export default function LoadingFullPage({ children, description }: PropsType) {
  return <main className="h-screen bg-primary/30 backdrop-blur-sm w-full flex  flex-col justify-center items-center gap-12 z-[1000] absolute top-0 left-0">
    <div className="loaderPage"></div>
    {children}
    {description && <DescriptionSection>{description}</DescriptionSection>}
  </main>;
}
