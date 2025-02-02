"use client";
import {
  faChartColumn,
  faGear,
  faHouse,
  faMoneyBillAlt,
  faMoneyBillTransfer,
} from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import IconNavbar from "./IconNavbar";

const MobileNavbar = () => {
  const pathName = usePathname();
  const paths = pathName.split("/");
  const [activedPath, setActivedPath] = useState<string>("");

  useEffect(() => {
    if(!paths[1]) {
      setActivedPath("home")
    } else {
      setActivedPath(paths[1]);
    }
  }, [pathName])

  return (
    <div className="fixed bottom-0 md:top-0 h-fit z-[50] w-full bg-secondary p-2 justify-center items-center">
      <div className="rounded-t-xl w-full gap-4 relative grid grid-cols-5">
        <IconNavbar
          delay={0.3}
          path={"/transaction"}
          icon={faMoneyBillTransfer}
          label="Transaction"
          isActive={activedPath === 'transaction'}
        />        
        <IconNavbar
          delay={0.2}
          path={"/dashboard"}
          icon={faMoneyBillAlt}
          label="Dashboard"
          isActive={activedPath === 'dashboard'}
        />
        <div />
        <IconNavbar delay={0.1} path={"/"} icon={faHouse} label="Home" isHome isActive={activedPath === 'home'} />
        <IconNavbar
          delay={0.4}
          path={"/report"}
          icon={faChartColumn}
          label="Report"
          isActive={activedPath === 'report'}
        />
        <IconNavbar
          delay={0.4}
          path={"/setting"}
          icon={faGear}
          label="Setting"
          isActive={activedPath === 'setting'}
        />
      </div>
    </div>
  );
};

export default MobileNavbar;
