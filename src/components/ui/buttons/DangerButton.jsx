const DangerButton = ({handleClick}) => {
    return(
        <div className="relative z-0 group shadow-lg font-tittle text-lightWhite">
            <div className="group-hover:top-1.5 group-hover:left-1.5 transition-all ease-in-out duration-200 absolute w-full z-10 h-full rounded-lg top-1 left-1 bg-rose-900"></div>
            <button onClick={handleClick} className="relative w-full ring-1 ring-black z-10 h-full bg-danger hover:bg-danger-hover active:bg-danger p-2 px-4 rounded-lg">
                Testing
            </button>
        </div>
    )
};

export default DangerButton;