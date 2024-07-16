const SecondButton = ({handleClick}) => {
    return(
        <div className="relative z-0 group shadow-lg font-tittle text-secondary">
            <div className="group-hover:top-1.5 group-hover:left-1.5 transition-all ease-in-out duration-200 absolute w-full z-10 h-full rounded-lg top-1 left-1 bg-teal-900"></div>
            <button onClick={handleClick} className="relative w-full ring-1 ring-black z-10 h-full bg-third  hover:bg-third-hover active:bg-third p-2 px-4 rounded-lg">
                Testing
            </button>
        </div>
    )
};

export default SecondButton;