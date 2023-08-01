import {useNavigate} from "react-router-dom";

export const Logo = () => {

    const navigate = useNavigate();

    const navigateToHome = () => {navigate('/')}

    return (
        <div className={'logo-wrapper'} id={'logo-wrapper'}>
            <span className={'logo'} id={'logo'} onClick={navigateToHome}>
                <span className={'text-book'}>Book</span><span className={'text-guide'}>Guide</span>
            </span>
       </div>
    );
};

export default Logo;
