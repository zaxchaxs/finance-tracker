type PropsType = {
    background: string;
}

const SolidShadow = ({ background }: PropsType) => {
  return (
    <div
      className={`transition-all ease-in-out absolute w-full z-10 h-full rounded-lg top-0 left-0 ${background}`}
    ></div>
  );
};

export default SolidShadow