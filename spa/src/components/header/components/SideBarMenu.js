import {useNavigate} from "react-router-dom";

export const SideBarMenu = () => {

    const navigate = useNavigate();

    const navigateToBooks = () => {navigate('/books'); }
    const navigateToAuthors = () => {navigate('/authors')}

    return (
        <div id="sidebar-menu">
            <div className={'sidebar-nav-wrapper'}>
                <div className={'sidebar-item'} onClick={navigateToBooks}>
                    <div className={'nav-text'}>Books</div>
                    <div className={'dash'}/>
                </div>
                <div className={'sidebar-item'} onClick={navigateToAuthors}>
                    <div className={'nav-text'}>Authors</div>
                    <div className={'dash'}/>
                </div>
            </div>
        </div>
    );
};

export default SideBarMenu;
