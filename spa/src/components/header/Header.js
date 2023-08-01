import MobileNav from "./components/MobileNav";
import FullScreenNav from "./components/FullScreenNav";
import Fade from "./components/Fade";

export const Header = () => {

    return (
        <div className={'header'} id={'main-navbar'}>
            <FullScreenNav />
            <MobileNav />
            <Fade />
        </div>
    );
};

export default Header;
