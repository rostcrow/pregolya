import Container from "react-bootstrap/esm/Container";
import { BsChevronBarLeft, BsChevronLeft, BsChevronRight, BsChevronBarRight, BsPlay, BsStop } from "react-icons/bs";
import { useState } from "react";

const runButtonStyle = "btn btn-primary mt-2 ms-2";
let running = false;

export default function AlgorithmControlPanel( {algorithmController, updateGraph} ) {

    const [runningState, setRunningState] = useState(false);

    //Setting dynamic variables dependent on runningState
    let runButtonIcon;
    let otherButtonsStyle;
    
    if (runningState) {
        runButtonIcon = <BsStop />;
        otherButtonsStyle = "btn btn-secondary mt-2 ms-2 disabled";
    } else {
        runButtonIcon = <BsPlay />
        otherButtonsStyle = "btn btn-secondary mt-2 ms-2";
    }

    //Handle jump to start button
    function handleJumpToStart() {
        algorithmController.jumpToStart();
        updateGraph();
    }
    
    //Handle back button
    function handleBack() {
        algorithmController.back();
        updateGraph();
    }

    //Handle run button
    function handleRun() {

        //Run/stop logic
        if (running) {
            running = false;
            setRunningState(false);
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
        }

        run();
    }

    //Handle forward button
    function handleForward() {
        algorithmController.forward();
        updateGraph();
    }

    //Handle jump to end button
    function handleJumpToEnd() {
        algorithmController.jumpToEnd();
        updateGraph();
    }

    return (
        <Container>
            <button type="button" className={otherButtonsStyle} onClick={handleJumpToStart}><BsChevronBarLeft /></button>
            <button type="button" className={otherButtonsStyle} onClick={handleBack}><BsChevronLeft /></button>
            <button type="button" className={runButtonStyle} onClick={handleRun}>{runButtonIcon}</button>
            <button type="button" className={otherButtonsStyle} onClick={handleForward}><BsChevronRight /></button>
            <button type="button" className={otherButtonsStyle} onClick={handleJumpToEnd}><BsChevronBarRight /></button>
        </Container>
    );

}