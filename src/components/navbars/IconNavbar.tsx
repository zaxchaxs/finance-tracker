import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { Icon } from "next/dist/lib/metadata/types/metadata-types";
import Link from "next/link";
import DescriptionSection from "../ui/Description";
import { cn } from "@/lib/utils";

type PropsType = {
  path: string;
  icon: IconProp
  label: string
  delay: number;
  isHome?: boolean;
  isActive?: boolean;
}

const IconNavbar = ({ path, icon, delay, label, isHome, isActive }: PropsType) => {
  return (
    <Link href={path} className={cn("group", isHome ? "p-2 rounded-full px-4 border absolute w-fit left-1/2  -translate-x-1/2 -translate-y-5 md:translate-y-0 bg-secondary" : "", isActive ? "border-secondary" : "border-lightWhite")}>
      <motion.div
        initial={{ scale: 0.3, opacity: 0.3 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ delay: delay }}
        className={cn(
          "flex flex-col justify-center items-center", isActive ? "text-primary" : "text-lightWhite"
        )}
      >
        <FontAwesomeIcon
          icon={icon}
          color={`${ isActive ? "#4B5945" : "#FFFDF5"}`}
          size="2x"
          className="w-8 group-hover:scale-105"
        />
        <DescriptionSection className="font-title text-[12px]">
          {label}
        </DescriptionSection>
      </motion.div>
    </Link>
  );
};

export default IconNavbar;
