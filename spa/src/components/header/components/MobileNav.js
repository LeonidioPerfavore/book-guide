import Logo from "./Logo";
import BurgerBtn from "./BurgerBtn";
import SideBarMenu from "./SideBarMenu";

export const Header = () => {

    return (
            <div id={'mobile-nav'}>
                <BurgerBtn />
                <Logo />
                <SideBarMenu />
            </div>
    );
};

export default Header;
