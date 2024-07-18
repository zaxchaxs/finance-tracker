import SolidShadow from "../solidShadow/SolidShadow";

const SecondButton = ({handleClick, value}) => {
    return(
        <div className="relative z-0 group shadow-lg font-tittle text-secondary">
            <SolidShadow background={"bg-teal-900"} />
            <button onClick={handleClick} className="relative w-full ring-1 ring-black z-10 h-full bg-third  hover:bg-third-hover active:bg-third p-2 px-4 rounded-lg">
            <SolidShadow background={"bg-teal-900"} />
            {value}
            </button>
        </div>
    )
};

export default SecondButton;