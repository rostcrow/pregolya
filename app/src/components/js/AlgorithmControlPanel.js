import Container from "react-bootstrap/esm/Container";
import { BsChevronBarLeft, BsChevronLeft, BsChevronRight, BsChevronBarRight, BsPlay, BsStop } from "react-icons/bs";
import { useState  } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

const DEFAULT_RUN_BUTTON_STYLE = "btn-primary";
const DEFAULT_OTHER_BUTTON_STYLE = "btn-secondary";

export default function AlgorithmControlPanel( {running, controlState, setControlStateFunc, algorithmFacade, updateFunc} ) {

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
        if (running.current === true) {
            running.current = false;
            setStartMiddleEnd();
            return;
        } else {
            running.current = true;
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
            while(running.current && !algorithmFacade.algorithmIsOnEnd()) {
                algorithmFacade.forward();
                updateFunc();
                await sleep(sleepDurationMs);
            }

            if (algorithmFacade.algorithmIsOnEnd()) {
                running.current = false;
                setStartMiddleEnd();
            }
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
            <Container className="container-sm mt-3">
                <ButtonGroup>
                    <Button title="Jump to start" onClick={handleJumpToStart} className={startButtonStyle}><BsChevronBarLeft /></Button>
                    <Button title="Back" onClick={handleBack} className={backButtonStyle}><BsChevronLeft /></Button>
                    <Button title={runButtonTitle} onClick={handleRun} className={runButtonStyle}>{runButtonIcon}</Button>
                    <Button title="Forward" onClick={handleForward} className={forwardButtonStyle}><BsChevronRight /></Button>
                    <Button title="Jump to end" onClick={handleJumpToEnd} className={endButtonStyle}><BsChevronBarRight /></Button>
                </ButtonGroup>
            </Container>
            <Container className="container-sm mt-3">
                <Row>
                    <Col></Col>
                    <Col className="mb-2 col-8 col-md-6 col-lg-4">
                        <Form.Label>Run speed: {runSpeed}</Form.Label>
                        <Form.Range onChange={e => handleRange(e.target.value)} min={1} max={10} 
                            disabled={controlState === "running"}/>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        </>

    );

}