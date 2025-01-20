import Container from "react-bootstrap/esm/Container";
import { BsChevronBarLeft, BsChevronLeft, BsChevronRight, BsChevronBarRight } from "react-icons/bs";

const buttonStyle = "btn btn-secondary mt-2 ms-2";

export default function AlgorithmControlPanel( {algorithmController, updateGraph} ) {

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
            <button type="button" className={buttonStyle} onClick={handleJumpToStart}><BsChevronBarLeft /></button>
            <button type="button" className={buttonStyle} onClick={handleBack}><BsChevronLeft /></button>
            <button type="button" className={buttonStyle} onClick={handleForward}><BsChevronRight /></button>
            <button type="button" className={buttonStyle} onClick={handleJumpToEnd}><BsChevronBarRight /></button>
        </Container>
    );

}