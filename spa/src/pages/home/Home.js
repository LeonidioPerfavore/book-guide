import Screensaver from "./components/Screensaver";
import Header from "../../components/header/Header";
import Exclamation from "./components/Exclamation";

export const Home = () => {

    return (
        <div>
            <Screensaver />
            <Header />
            <h1 className={'main-header'}>Home</h1>
            <Exclamation />
        </div>
    );
};

export default Home;
