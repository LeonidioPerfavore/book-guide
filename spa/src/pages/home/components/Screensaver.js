import {useEffect} from "react";

export const Screensaver = () => {

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            document.getElementById('left-block').style.width = "0";
            document.getElementById('right-block').style.width = "0";
            document.getElementById('press-enter-text').style.opacity = '0';
        }
    };

    useEffect(() => {
        /** Add an event handler to the global `document` object **/
        document.addEventListener('keypress', handleKeyPress);

        /** Returning a cleanup function to remove the handler when the component is unmounted **/
        return () => {
            document.removeEventListener('keypress', handleKeyPress);
        };
    }, []);

    return (
        <div className={'wrapper bg-main'}>
            <section id="start-page">
                <div className="blocks-wrapper">
                    <div className="dark-bg" id="left-block"/>
                    <div className="dark-bg" id="right-block"/>
                </div>
                <div className="press-enter-text" id="press-enter-text">
                    <span>T</span>
                    <span>E</span>
                    <span>S</span>
                    <span>T</span>
                    <span />
                    <span>T</span>
                    <span>A</span>
                    <span>S</span>
                    <span>K</span>
                    <p id="press-enter-blink-text">press enter to start</p>
                </div>
            </section>
        </div>
    );
};

export default Screensaver;
