
// IMPORT
// React Bootstrap
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

// CODE
// This component represents alert for incorrent file input
export default function FileAlert( {show, setShowFunc, heading, errorStack} ) {

    // Making error stack
    let keyCounter = 0; 
    let formattedErrorStack = [];
    for (const error of errorStack) {
        formattedErrorStack.push(<p key={keyCounter++}>{error}</p>);
    }

    // Handles closing of component
    function handleClose() {
        setShowFunc(false);
    }

    return (
        <Alert className="mt-3" show={show} variant="danger">
            <Alert.Heading>{heading}</Alert.Heading>
            {formattedErrorStack}
            <Button variant="outline-danger" onClick={handleClose}>Close</Button>
        </Alert>
    );  

}