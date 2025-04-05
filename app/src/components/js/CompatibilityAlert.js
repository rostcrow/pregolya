
import Alert from "react-bootstrap/Alert";

export default function CompatibilityAlert ( {variant, content} ) {

    let alertVariant = "";
    let heading = "";

    if (variant === "error") {
        alertVariant = "danger";
        heading = "Graph and algortihm are not compatible";
    } else if (variant === "warning") {
        alertVariant = "warning";
        heading = "Graph will be converted to be compatible with algorithm";
    }

    let keyCounter = 0;
    let formattedContent = [];
    for (const message of content) {
        formattedContent.push(<div key={keyCounter++}>{message}</div>);
    }

    return (
        <Alert className={"mt-3"} key={"compatibility-alert"} variant={alertVariant}>
            <Alert.Heading>{heading}</Alert.Heading>
            {formattedContent}
        </Alert>
    );
}