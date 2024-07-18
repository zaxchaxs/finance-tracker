"use client";

import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import SolidShadow from "../solidShadow/SolidShadow";

const DropDownButton = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef();

  const data = [
    {
      accountId: "walletid1",
      userId: "user123",
      name: "wallet 1",
      amount: 100000,
    },
    {
      accountId: "walletid1",
      userId: "user123",
      name: "Dompet digital",
      amount: 100000,
    },
    {
      accountId: "walletid1",
      userId: "user123",
      name: "Uang saku",
      amount: 100000,
    },
  ];

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectedButton = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (
      dropDownRef.current &&
      !dropDownRef.current.contains(event.target)
    ) {
      setIsOpen(isOpen);
    }
  };

  return (
    <>
      <div
        className="relative z-0 group shadow-lg font-tittle text-secondary"
        ref={dropDownRef}
      >
          <SolidShadow background={"bg-teal-900"} />

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-full ring-1 ring-black z-10 h-full bg-third  hover:bg-third-hover active:bg-third p-2 px-4 rounded-lg flex gap-2 justify-between items-center"
        >
          Testing
          <FontAwesomeIcon icon={faCaretDown} />
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full rounded-lg bg-third ring-1 ring-black shadow-lg">
            {!data ? (
              <h1 className="text-center block w-full px-4 py-2 text-sm">{`you don't have a wallet account yet`}</h1>
            ) : (
              data.map((el, idx) => {
                return (
                  <button
                    key={idx}
                    onClick={handleSelectedButton}
                    className="block w-full transition-all ease-in-out duration-200 p-2 px-4 hover:bg-third-hover"
                  >
                    {el.name}
                  </button>
                );
              })
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default DropDownButton;
