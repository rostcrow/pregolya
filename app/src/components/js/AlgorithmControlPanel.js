import Container from "react-bootstrap/esm/Container";
import { BsChevronBarLeft, BsChevronLeft, BsChevronRight, BsChevronBarRight, BsPlay, BsStop } from "react-icons/bs";
import { useState } from "react";
import Form from "react-bootstrap/Form";

const DEFAULT_RUN_BUTTON_STYLE = "btn btn-primary mt-2 ms-2";
const DEFAULT_OTHER_BUTTON_STYLE = "btn btn-secondary mt-2 ms-2";

let running = false;

export default function AlgorithmControlPanel( {controlState, setControlStateFunc, algorithmFacade, updateFunc} ) {

    //States
    const [runSpeed, setRunSpeed] = useState(6);

    //Setting dynamic variables dependent on runningState
    let buttonStyles = [DEFAULT_OTHER_BUTTON_STYLE, DEFAULT_OTHER_BUTTON_STYLE, 
        DEFAULT_RUN_BUTTON_STYLE, DEFAULT_OTHER_BUTTON_STYLE, DEFAULT_OTHER_BUTTON_STYLE];

    let leftButtonStyles = [0, 1];
    let rightButtonStyles = [2, 3, 4];
    let nonRunButtonStyles = [0, 1, 3, 4];
    
    let runButtonTitle;
    let runButtonIcon;

    if (controlState === "running") {
        //Running

        runButtonTitle = "Stop";
        runButtonIcon = <BsStop />;
        
        for (const index of nonRunButtonStyles) {
            buttonStyles[index] += " disabled";
        }

    } else {

        runButtonTitle = "Run";
        runButtonIcon = <BsPlay />

        if (controlState === "start") {
            //Start, can't go further back

            for (const index of leftButtonStyles) {
                buttonStyles[index] += " disabled";
            }

        } else if (controlState === "end") {
            //End, can't go further forward

            for (const index of rightButtonStyles) {
                buttonStyles[index] += " disabled";
            }
        }
    }

    let startButtonStyle = buttonStyles[0];
    let backButtonStyle = buttonStyles[1];
    let runButtonStyle = buttonStyles[2];
    let forwardButtonStyle = buttonStyles[3];
    let endButtonStyle = buttonStyles[4];

    //Sets correct control state based on algorithm
    function setStartMiddleEnd() {
        if (algorithmFacade.algorithmIsOnStart()) {
            setControlStateFunc("start");
        } else if (algorithmFacade.algorithmIsOnEnd()) {
            setControlStateFunc("end");
        } else {
            setControlStateFunc("middle");
        }
    }

    //Handle jump to start button
    function handleJumpToStart() {
        //Updating graph
        algorithmFacade.jumpToStart();
        updateFunc();
        
        //Updating state
        setStartMiddleEnd();
    }
    
    //Handle back button
    function handleBack() {
        //Updating graph
        algorithmFacade.back();
        updateFunc();

        //Updating states
        setStartMiddleEnd();
    }

    //Handle run button
    function handleRun() {

        //Run/stop logic
        if (running) {
            running = false;
            setStartMiddleEnd();

            return;
        } else {
            running = true;
            setControlStateFunc("running");
        }

        //Sleep function
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        //Counting sleep duration
        let sleepDurationMs = 1000 / runSpeed;

        //Run function
        async function run() {
            while(running && !algorithmFacade.algorithmIsOnEnd()) {
                algorithmFacade.forward();
                updateFunc();
                await sleep(sleepDurationMs);
            }

            //Run end
            running = false;
            setStartMiddleEnd();
        }

        run();
    }

    //Handle forward button
    function handleForward() {
        //Updating graph
        algorithmFacade.forward();
        updateFunc();

        //Updating state
        setStartMiddleEnd();
    }

    //Handle jump to end button
    function handleJumpToEnd() {
        //Updating graph
        algorithmFacade.jumpToEnd();
        updateFunc();

        //Updating states
        setStartMiddleEnd();
    }

    //Handle range change
    function handleRange(value) {
        setRunSpeed(value);
    }

    return (
        <>
            <Container>
                <button title="Jump to start" type="button" className={startButtonStyle} onClick={handleJumpToStart}>
                    <BsChevronBarLeft />
                </button>
                <button title="Back" type="button" className={backButtonStyle} onClick={handleBack}>
                    <BsChevronLeft />
                </button>
                <button title={runButtonTitle} type="button" className={runButtonStyle} onClick={handleRun}>
                    {runButtonIcon}
                </button>
                <button title="Forward" type="button" className={forwardButtonStyle} onClick={handleForward}>
                    <BsChevronRight />
                </button>
                <button title="Jump to end" type="button" className={endButtonStyle} onClick={handleJumpToEnd}>
                    <BsChevronBarRight />
                </button>
            </Container>
            <Container>
                <p className="mt-3">Run speed: {runSpeed}</p>
                <Form.Range className="mb-5 w-25" onChange={e => handleRange(e.target.value)} min={1} max={10} 
                    disabled={controlState === "running"}/>

            </Container>
        </>

    );

}