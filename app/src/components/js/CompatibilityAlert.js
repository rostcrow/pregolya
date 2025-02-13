
import Alert from "react-bootstrap/Alert";

export default function CompatibilityAlert ( {message} ) {

    return (
        <Alert className={"mt-3"} key={"compatibility-alert"} variant={"danger"}>
            <Alert.Heading>Graph and algorithm are not compatible</Alert.Heading>
            <p>{message}</p>
        </Alert>
    );
}