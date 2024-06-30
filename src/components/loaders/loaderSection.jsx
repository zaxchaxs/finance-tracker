const LoaderSection = ({width}) => {
    return (
      <div className="w-full flex justify-center items-center">
        <div className={`loaderSection ${width}`}></div>
      </div>
    );
};

export default LoaderSection;