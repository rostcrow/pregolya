
import Alert from "react-bootstrap/Alert";

export default function CompatibilityAlert ( {variant, messageLines} ) {

    let alertVariant = "";
    let heading = "";

    if (variant === "error") {
        alertVariant = "danger";
        heading = "Graph and algortihm are not compatible";
    } else if (variant === "warning") {
        alertVariant = "warning";
        heading = "Graph will be converted to be compatible with algorithm";
    }

    let content = [];
    for (const message of messageLines) {
        content.push(<p>{message}</p>);
    }

    return (
        <Alert className={"mt-3"} key={"compatibility-alert"} variant={alertVariant}>
            <Alert.Heading>{heading}</Alert.Heading>
            {content}
        </Alert>
    );
}