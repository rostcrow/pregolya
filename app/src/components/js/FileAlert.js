import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

export default function FileAlert( {show, setShowFunc, heading, errorStack} ) {

    let keyCounter = 0; 
    let formattedErrorStack = [];
    for (const error of errorStack) {
        formattedErrorStack.push(<p key={keyCounter++}>{error}</p>);
    }

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