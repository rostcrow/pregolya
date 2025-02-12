
import Alert from "react-bootstrap/Alert";

export default function CompatibilityAlert ( {message} ) {

    return (
        <Alert className={"mt-3"} key={"compatibility-alert"} variant={"danger"}>
            {message}
        </Alert>
    );


}