import NavUserInfo from "./NavbarUserInfo";

const NavbarPage = ({title}) => {
    return (
        <div className="z-10 w-full border-b-2 text-primary border-secondary p-2 font-lilitaOne text-2xl flex justify-between">
        <h1 className="">{title}</h1>

        <NavUserInfo />
      </div>
    )
};

export default NavbarPage;