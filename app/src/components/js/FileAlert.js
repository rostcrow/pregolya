import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

export default function FileAlert( {show, setShowFunc, heading, errorStack} ) {

    let formattedErrorStack = [];
    for (const error of errorStack) {
        formattedErrorStack.push(error);
        formattedErrorStack.push(<br/>);
    }

    function handleClose() {
        setShowFunc(false);
    }

    return (
        <Alert className="mt-3" show={show} variant="danger">
            <Alert.Heading>{heading}</Alert.Heading>
            <p>{formattedErrorStack}</p>
            <Button variant="outline-danger" onClick={handleClose}>Close</Button>
        </Alert>
    );  

}