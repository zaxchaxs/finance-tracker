import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt, faClose } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/contexts/AuthContext";
import { logout } from "@/libs/auth";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

const NavUserInfo = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { docUser, currUser } = useAuth();
  const router = useRouter();

  const handleClickNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="relative">
      <button onClick={handleClickNav}>
        <FontAwesomeIcon icon={faUserAlt} />
      </button>

      <div className={`fixed top-0 right-0 ${isNavOpen ? "z-[51]" : "hidden"}`}>
        <motion.div
          animate={{ x: isNavOpen ? 1 : 150, opacity: isNavOpen ? 1 : 0 }}
          transition={{ type: "spring", bounce: 0.6 }}
          className={`bg-secondary rounded-l-2xl flex flex-col p-4 gap-8 py-5 h-screen ${
            !isNavOpen && "opacity-0"
          }`}
        >
          <div className="flex justify-between gap-6 text-slate-100 p-2 px-4 border-b-2 border-primary">
            <h1>{`Hello ${
              docUser?.name || currUser?.displayName || "there"
            }!`}</h1>
            <button onClick={handleClickNav}>
              <FontAwesomeIcon icon={faClose} />
            </button>
          </div>
          <div className=" text-slate-100 w-full flex items-center justify-between h-full text-base flex-col">
            <h1>In Progress😉</h1>
            <button
              className="text-lg bg-danger hover:bg-danger-hover rounded-lg text-slate-100 p-1 px-2"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NavUserInfo;
