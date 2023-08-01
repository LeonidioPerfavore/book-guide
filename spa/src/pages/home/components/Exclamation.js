import { useState, useEffect } from "react";

export const Exclamation = () => {
    const [currentText, setCurrentText] = useState("");
    const [exclamation, setExclamation] = useState(true);
    const [actions, setActions] = useState(false);
    const [tutorial, setTutorial] = useState(false);
    const [fullText, setFullText] = useState(`Do you want to see the manual so you know how to use it?`);
    const [printingText, setPrintingText] = useState(false);

    const delay = 50;

    useEffect(() => {
        if (printingText) {
            typeText(fullText, 0);
        }
    }, [printingText, fullText]);

    const typeText = (text, index) => {
        if (index <= text.length) {
            setCurrentText(text.substring(0, index));
            setTimeout(() => {
                typeText(text, index + 1);
            }, delay);
        } else {
            setPrintingText(false);
        }
    };

    const showInfoAboutApp = () => {
        setPrintingText(true);
        setExclamation(false);
        if (!tutorial) {
            setTimeout(() => {
                setActions(true);
            }, 2500);
        }
    };

    const showTutorial = () => {
        setCurrentText("");
        setExclamation(false);
        setFullText(
            '\n' +
            'The application consists of 2 main sections: Books & Authors can be accessed using the links in the navbar or in the side menu (on a small resolution screen).\n' +
            'In both sections, CRUD operations can be performed.'
        );
        setActions(false);
        setTutorial(true);
        setPrintingText(true);
    };

    const dontShow = () => {
        setActions(false);
        setCurrentText("");
        setTutorial(false);
    };

    return (
        <div className={"grid-container"}>

            {exclamation ? (
                <div className="exclamation-container">
                    <div className="exclamation" id={"exclamation"} onClick={showInfoAboutApp}>
                        <span className="exclamation-dot">?</span>
                    </div>
                </div>
            ) : null}

            <div className="centered-text">
                {currentText ? (
                    <h4 className={"typed-text"}>
                        {currentText}
                    </h4>
                ) : null}

                {actions ? (
                    <h4>
                        <span onClick={showTutorial} className={"yes"}>Yes</span>
                        <span onClick={dontShow} className={"no"}>No</span>
                    </h4>
                ) : null}
            </div>

        </div>
    );
};

export default Exclamation;
