import DescriptionSection from "../ui/Description";

interface PageInfoBadgeProps {
    pageName: string;
}

const PageInfoBadge = ({ pageName }: PageInfoBadgeProps) => {
  return (
    <div className="fixed top-0 w-full flex items-center justify-center z-50 text-lightWhite">
      <DescriptionSection variant="span" className="bg-primary py-1 px-2 w-fit rounded-b-lg ">{pageName}</DescriptionSection>
    </div>
  );
};

export default PageInfoBadge;