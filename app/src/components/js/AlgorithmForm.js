
// IMPORT
// React Bootstrap
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

// My classes
import CompatibilityAlert from "./CompatibilityAlert";

// Converts array to string
function arrayToString(array) {
    
    let ret = "";

    const len = array.length;
    for (let i = 0; i < len; i++) {
        ret += array[i];

        if (i !== len - 1) {
            ret += ", ";
        }
    }

    return ret;
}

// This components represents form for choosing algorithm and its options
export default function AlgorithmForm ( {algorithmTags, algortihmTagIndex, handleAlgorithmChooseChange, optionsForm, 
    handleSubmit, handleClear, graphTag} ) {

    // Making options
    let options = [];
    for (const [index, algorithmTag] of algorithmTags.entries()) {
        options.push(<option key={index} value={index}>{algorithmTag.getName()}</option>)
    }

    // Handles change of algorithm
    function handleSelectChange(e) {
        handleAlgorithmChooseChange(Number(e.target.value));
    }

    // Compatibility check
    let submitDisabled = false;
    let compatibilityComponent = <></>;
    let selectClassName = "";

    const graphType = graphTag.getType();

    const algorithmTag = algorithmTags[algortihmTagIndex];
    const compatibilityTable = algorithmTag.getCompatibilityTable();

    if (compatibilityTable.isInCompatible(graphType)) {
        // Not compatible, showing error message

        submitDisabled = true;
        selectClassName = "border border-5 border-danger-subtle";

        // Generating message
        const algorithmName = algorithmTag.getName();

        const compatible = compatibilityTable.getCompatible();
        const compatibleStr = arrayToString(compatible);

        const convertibleKeys = compatibilityTable.getConvertibleKeys();
        const convertibleKeysStr = arrayToString(convertibleKeys);

        let content = [
            <p><b>{algorithmName}</b> is not compatible with graph type <b>{graphType}</b>.</p>,
            <p><b>{algorithmName}</b> is compatible with these graph types: <b>{compatibleStr}</b>.</p>
        ];

        if (convertibleKeys.length !== 0) {
            content.push(<p>These graph types can be converted to be compatible: <b>{convertibleKeysStr}</b>.</p>);
        }
        
        // Making component
        compatibilityComponent = <CompatibilityAlert variant={"error"} content={content}/>;

    } else if (compatibilityTable.isConvertible(graphType)) {
        // Not compatible, but can be converted

        selectClassName = "border border-5 border-warning-subtle";

        // Generating message
        const algorithmName = algorithmTag.getName();

        const compatible = compatibilityTable.getCompatible();
        const compatibleStr = arrayToString(compatible);

        const convertibleTo = compatibilityTable.getConvertibleTo(graphType);
    
        const content = [
            <p>Graph will be converted from type <b>{graphType}</b> to type <b>{convertibleTo}</b>.</p>,
            <p><b>{algorithmName}</b> is compatible with these graph types: <b>{compatibleStr}</b>.</p>
        ];

        // Making component
        compatibilityComponent = <CompatibilityAlert variant={"warning"} content={content}/>;

    }

    return (
        <Card className="mx-5 my-3 bg-light">
            <Card.Header as="h5" className="text-start">Algorithm</Card.Header>
            <Card.Body>
                <Form>
                    <Row>
                        <Col className="col-12 col-md-6 mt-2">
                            <Form.Group className="text-start">
                                <Form.Label>Choose algorithm</Form.Label>
                                <Form.Select className={selectClassName} 
                                    value={algortihmTagIndex} onChange={e => handleSelectChange(e)}>
                                    {options}
                                </Form.Select>
                            </Form.Group>
                            {compatibilityComponent}
                        </Col>
                        <Col className="col-12 col-md-6 mt-2">
                            {optionsForm.getComponents()}
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col className="text-start">
                            <Button variant="primary" className="me-3" onClick={handleSubmit} 
                                disabled={submitDisabled}>Submit</Button>
                            <Button variant="secondary" onClick={handleClear}>Clear changes</Button>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );


}