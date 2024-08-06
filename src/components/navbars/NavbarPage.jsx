import NavUserInfo from "./NavbarUserInfo";

const NavbarPage = ({title}) => {
    return (
      <>
        <div className="z-50 w-full shadow-xl font-header fixed top-0">
          <div className="relative flex justify-between z-50 ring-1 ring-black rounded-b-lg bg-primary text-primary p-4 text-2xl font-header">
            <h1 className="">{title}</h1>
            <NavUserInfo />
          </div>
          <div className="w-full absolute z-0 h-full rounded-lg top-1 left-0 bg-emerald-900"></div>
        </div>
      </>
    )
};

export default NavbarPage;