"use client";
import {
  faChartColumn,
  faHouse,
  faMoneyBillAlt,
  faMoneyBillTransfer,
} from "@fortawesome/free-solid-svg-icons";
import IconNavbar from "./IconNavbar";

const MobileNavbar = () => {
  return (
    <div className="fixed bottom-0 z-[50] w-full bg-secondary p-2 justify-center items-center">
      <div className="rounded-t-xl w-full gap-4 relative grid grid-cols-5">
        <IconNavbar
          delay={0.4}
          path={"/report"}
          icon={faChartColumn}
          label="Report"
        />
        <IconNavbar
          delay={0.2}
          path={"/dashboard"}
          icon={faMoneyBillAlt}
          label="Dashboard"
        />
        <div />
        <IconNavbar delay={0.1} path={"/"} icon={faHouse} label="Home" isHome />
        <IconNavbar
          delay={0.3}
          path={"/transaction"}
          icon={faMoneyBillTransfer}
          label="Transaction"
        />
        <IconNavbar
          delay={0.4}
          path={"/report"}
          icon={faChartColumn}
          label="Report"
        />
      </div>
    </div>
  );
};

export default MobileNavbar;
