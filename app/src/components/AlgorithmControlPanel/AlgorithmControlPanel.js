import Container from "react-bootstrap/esm/Container";
import { BsChevronBarLeft, BsChevronLeft, BsChevronRight, BsChevronBarRight, BsPlay, BsStop } from "react-icons/bs";
import { useState } from "react";

const DEFAULT_RUN_BUTTON_STYLE = "btn btn-primary mt-2 ms-2";
const DEFAULT_OTHER_BUTTON_STYLE = "btn btn-secondary mt-2 ms-2";

let running = false;

export default function AlgorithmControlPanel( {algorithmController, updateGraph} ) {

    const [runningState, setRunningState] = useState(false);
    const [start, setStart] = useState(true);
    const [end, setEnd] = useState(false);

    //Setting dynamic variables dependent on runningState
    let buttonStyles = [DEFAULT_OTHER_BUTTON_STYLE, DEFAULT_OTHER_BUTTON_STYLE, 
        DEFAULT_RUN_BUTTON_STYLE, DEFAULT_OTHER_BUTTON_STYLE, DEFAULT_OTHER_BUTTON_STYLE];

    let leftButtonStyles = [0, 1];
    let rightButtonStyles = [2, 3, 4];
    let nonRunButtonStyles = [0, 1, 3, 4];
    
    let runButtonTitle;
    let runButtonIcon;

    if (runningState) {
        //Running

        runButtonTitle = "Stop";
        runButtonIcon = <BsStop />;
        
        for (const index of nonRunButtonStyles) {
            buttonStyles[index] += " disabled";
        }

    } else {

        runButtonTitle = "Run";
        runButtonIcon = <BsPlay />

        if (start) {
            //Start, can't go further back

            for (const index of leftButtonStyles) {
                buttonStyles[index] += " disabled";
            }

        } else if (end) {
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

    //Functions
    function setStartEndStates() {
        if (algorithmController.algorithmIsOnStart()) {
            setStart(true);
            setEnd(false);
        } else if (algorithmController.algorithmIsOnEnd()) {
            setStart(false);
            setEnd(true);
        } else {
            setStart(false);
            setEnd(false);
        }
    }

    //Handle jump to start button
    function handleJumpToStart() {
        //Updating graph
        algorithmController.jumpToStart();
        updateGraph();
        
        //Updating states
        setStartEndStates();
    }
    
    //Handle back button
    function handleBack() {
        //Updating graph
        algorithmController.back();
        updateGraph();

        //Updating states
        setStartEndStates();
    }

    //Handle run button
    function handleRun() {

        //Run/stop logic
        if (running) {
            running = false;
            setRunningState(false);
            setStartEndStates();

            return;
        } else {
            running = true;
            setRunningState(true);
        }

        //Sleep function
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        //Run function
        async function run() {
            while(running && algorithmController.algorithmIsRunnable()) {
                algorithmController.forward();
                updateGraph();
                await sleep(100);
            }

            //Run end
            running = false;
            setRunningState(false);
            setStartEndStates();
        }

        run();
    }

    //Handle forward button
    function handleForward() {
        //Updating graph
        algorithmController.forward();
        updateGraph();

        //Updating states
        setStartEndStates();
    }

    //Handle jump to end button
    function handleJumpToEnd() {
        //Updating graph
        algorithmController.jumpToEnd();
        updateGraph();

        //Updating states
        setStartEndStates();
    }

    return (
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
    );

}