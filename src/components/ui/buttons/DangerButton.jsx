import SolidShadow from "../solidShadow/SolidShadow";

const DangerButton = ({ handleClick }) => {
  return (
    <div className="relative z-0 group shadow-lg font-tittle text-lightWhite">
      <SolidShadow background={"bg-rose-900"} />
      <button
        onClick={handleClick}
        className="relative w-full ring-1 ring-black z-10 h-full bg-danger hover:bg-danger-hover active:bg-danger p-2 px-4 rounded-lg"
      >
        Testing
      </button>
    </div>
  );
};

export default DangerButton;
