import Logo from "./Logo";
import {useNavigate} from "react-router-dom";

export const FullScreenNav = () => {

    const navigate = useNavigate();

    const navigateToBooks = () => {navigate('/books') }
    const navigateToAuthors = () => {navigate('/authors')}

    return (
        <div id={'full-screen-nav'}>
            <div className={'full-screen-navigation-wrapper'}>
                <Logo />

                    <span className={'full-screen-link'}>
                        <span onClick={navigateToBooks}>Books</span>
                    </span>

                    <span className={'full-screen-link'}>
                         <span onClick={navigateToAuthors}>Authors</span>
                    </span>

            </div>
        </div>
    );
};

export default FullScreenNav;
