import { WalletType } from "@/types/walletTypes";
import DescriptionSection from "../ui/Description";
import groceryIcon from "@/../public/assets/icons/gorcery.svg";
import Image from "next/image";
import { formatRupiah } from "@/utils/formatRupiah";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import TitleSection from "../ui/Title";
type PropsType = {
  data: WalletType;
  isDetailCard?: boolean;
};

const WalletCard = ({ data, isDetailCard }: PropsType) => {
  return (
    <Link
      href={`#${data.accoundId}`}
      className="flex gap-2 p-2 bg-secondary-hover rounded-md"
    >
      {isDetailCard ? (
        <Link href={"#"} className="flex items-center gap-2">
          <FontAwesomeIcon icon={faBarsStaggered} size="2x" color="#4B5945" />
          <TitleSection className="text-primary">
            View All
          </TitleSection>
        </Link>
      ) : (
        <>
          <Image alt="" src={groceryIcon} width={30} height={30} />
          <div>
            <DescriptionSection className="font-semibold text-center text-primary">
              {data.name.length > 15
                ? `${data.name.slice(0, 15)}...`
                : data.name}
            </DescriptionSection>
            <DescriptionSection className="text-primary">
              {formatRupiah(data.amount)}
            </DescriptionSection>
          </div>
        </>
      )}
    </Link>
  );
};

export default WalletCard;
