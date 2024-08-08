import { useEffect, useState } from "react";
import SolidShadow from "../solidShadow/SolidShadow";

const PrimaryButton = ({handleClick, text, type, value, className}) => {
    const [background, setBackground] = useState({bg: "", bgSolid: ""});

    useEffect(() => {
        switch (type) {
            case "primary":
                setBackground({bg: "bg-secondary text-lightWhite hover:bg-secondary active:bg-secondary", bgSolid: "bg-emerald-900"})
                break;
    
            case "secondary":
                setBackground({bg: "bg-third hover:bg-third-hover text-secondary active:bg-third", bgSolid: "bg-teal-900"})
                break;
                
            case "danger": 
                setBackground({bg: "bg-danger hover:bg-danger-hover text-lightWhite active:bg-danger", bgSolid: "bg-rose-900"})
                break;
                
            case "dark": 
                setBackground({bg: "bg-gray-700 hover:bg-gray-600 text-lightWhite active:bg-gray-700", bgSolid: "bg-gray-900"})
                break;
                
            default:
                setBackground({bg: "bg-secondary hover:bg-secondary active:bg-secondary", bgSolid: "bg-emerald-900"})
                break;
        }
    }, [type, value]);
    
    return(
        <div className={`relative z-0 group shadow-lg font-title ${className}`}>
            <SolidShadow background={background.bgSolid} />
            <button value={value} onClick={handleClick} className={`relative w-full ring-1 ring-black z-10 h-full p-1.5 px-3 rounded-lg ${background.bg}`}>
                {text}
            </button>
        </div>
    )
};

export default PrimaryButton;