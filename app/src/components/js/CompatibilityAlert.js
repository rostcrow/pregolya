
// IMPORT
// React Bootstrap
import Alert from "react-bootstrap/Alert";

// CODE
// This component represents alert for compatibility
export default function CompatibilityAlert ( {variant, content} ) {

    // Generating heading
    let alertVariant = "";
    let heading = "";

    if (variant === "error") {
        // Error
        alertVariant = "danger";
        heading = "Graph and algortihm are not compatible";
    } else if (variant === "warning") {
        // Warning
        alertVariant = "warning";
        heading = "Graph will be converted to be compatible with algorithm";
    }

    // Generating messages
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