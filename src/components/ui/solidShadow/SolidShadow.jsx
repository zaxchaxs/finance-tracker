const SolidShadow = ({background}) => {
    return (
        <div className={`group-hover:top-1.5 group-hover:left-1.5 transition-all ease-in-out duration-200 absolute w-full z-10 h-full rounded-lg top-1 left-1 ${background}`}></div>
    )
};

export default SolidShadow