'use client'
import {
  faChartColumn,
  faCircleArrowRight,
  faHouse,
  faMoneyBillAlt,
  faMoneyBillTransfer,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [index, setIndex] = useState('z-10');

  const handleClickNav = () => {
    if(isNavOpen) {
      setTimeout(() => {
        setIndex('')
      }, 300);
      setIsNavOpen(!isNavOpen);
    } else {
      setIndex('z-10')
      setIsNavOpen(!isNavOpen);
    }
  }

  return (

    <div className={`fixed top-1/2 bg-danger -translate-y-1/2 ${isNavOpen ? 'z-50' : index}`}>
      <motion.div
        animate={{ x: isNavOpen ? 1 : -70, opacity: isNavOpen ? 1 : 0.1 }}
        transition={{ type: "spring", bounce: 0.6 }}
        className={`bg-secondary rounded-r-2xl flex flex-col p-4 gap-8 py-5 `}
      >
        <IconNavbar delay={0.1} route={"/"} icon={faHouse} />
        <IconNavbar delay={0.2} route={"/dashboard"} icon={faMoneyBillAlt} />
        <IconNavbar
          delay={0.3}
          route={"/transaction"}
          icon={faMoneyBillTransfer}
        />
        <IconNavbar delay={0.4} route={"/report"} icon={faChartColumn} />
      </motion.div>

      <motion.button
              className="p-3 z-50" onClick={handleClickNav}
              transition={{ repeat: Infinity, ease: 'easeInOut', duration: 1.2 }}
            >
              <FontAwesomeIcon
              flip={isNavOpen && "horizontal" }
                icon={faCircleArrowRight}
                color="#059669"
                size="2x"
                className="w-8"
              />

        </motion.button>
    </div>
  );
};

const IconNavbar = ({ route, icon, delay }) => {
  return (
    <Link href={route}>
      <motion.div
        initial={{ scale: 0.3, opacity: 0.3 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ delay: delay }}
      >
        <FontAwesomeIcon
          icon={icon}
          color="#BBF7D0"
          size="2x"
          className="w-8 hover:scale-105"
        />
      </motion.div>
    </Link>
  );
};

export default Navbar;