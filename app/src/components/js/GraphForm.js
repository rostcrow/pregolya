
// IMPORT
// React
import { useState } from "react";

// React Bootstrap
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

// My components
import FileAlert from "./FileAlert";
import FileInputInfoButton from "./FileInputInfoButton";
import FileInputInfo from "./FileInputInfo";

// My classes
import JSONValidator from '../../classes/JSONValidator';
import GraphTagFactory from "../../classes/GraphTagFactory";

// CODE
// Globals
const MAX_FILE_SIZE_KB = 100;

// Clears file input
export function clearFileInput() {
    document.getElementById("file-input").value = "";
}

// This components represents form for choosing or uploading graph
export default function GraphForm ( {graphTags, graphTagIndex, handleGraphChooseChange, handleGraphInputChange, handleSubmit, handleClear} ) {

    // States
    const [showFileAlert, setShowFileAlert] = useState(false);
    const [fileAlertHeading, setFileAlertHeading] = useState("");
    const [fileAlertErrorStack, setFileAlertErrorStack] = useState([]); 
    const [showFileInputInfo, setShowFileInputInfo] = useState(false);

    // Initiliazing options in select
    let options = [];
    for (const [index, graphTag] of graphTags.entries()) {
        const graphName = graphTag.getNameWithType();
        options.push(<option key={index} value={index}>{graphName}</option>);
    }

    // Handles graph select change
    function handleSelectOnChange(e) {
        handleGraphChooseChange(Number(e.target.value));
    }

    // Invokes file alert
    function invokeFileAlert(heading, errorStack) {
        clearFileInput();
        handleGraphInputChange(null);
        setFileAlertHeading(heading);
        setFileAlertErrorStack(errorStack);
        setShowFileAlert(true);
    }

    // Handles input control change
    function handleControlOnChange(e) {

        // Closing previous file alert
        setShowFileAlert(false);

        // Getting file
        let file = e.target.files[0];

        // Checking file undefined
        if (file === undefined) {
            return;
        }

        // Checking file size
        if (file.size > MAX_FILE_SIZE_KB * 1024) {
            // Too big

            const message = `Maximum size of chosen file can be ${MAX_FILE_SIZE_KB} kB`;
            invokeFileAlert("File too large", [message]);

            return;
        }

        if (file.size === 0) {
            // Empty

            const message = "Chosen file is empty";
            invokeFileAlert("Empty file", [message]);

            return;
        }

        // Reading
        var reader = new FileReader();

        reader.onload = function(e) {

            let content = e.target.result;
            let json;    
        
            // Parsing json
            try {
                json = JSON.parse(content);
            } catch (e) {
                // Parsing error

                const message = "Content of chosen file is not JSON format";
                invokeFileAlert("Content not JSON", [message]);

                return;
            }

            // Validating json schema
            const errorsArray = JSONValidator.validate(json);

            if (errorsArray.length !== 0) {
                // Some errors found in schema
                invokeFileAlert("Schema of JSON not valid", errorsArray);

                return;
            }

            // Creating graph tag
            let graphTag;
            try {
                graphTag = GraphTagFactory.createFromJson(json);
                let graph = graphTag.getAlgorithmGraph();

                // Checking number of nodes
                if (graph.nodes().length === 0) {
                    // No nodes
                    invokeFileAlert("Graph has no nodes", ["Graph needs to have at least one node"])
                    return;
                }

            } catch (e) {
                // Error met
                invokeFileAlert("Graph is illogical", [e.message]);
                return;
            }

            // Successful
            handleGraphInputChange(graphTag);
        };

        reader.readAsText(file);

    }

    // Handles file info click
    function handleFileInfoClick() {
        setShowFileInputInfo(showFileInputInfo => !showFileInputInfo);
    }

    // Counting if submit is disabled
    let submitDisabled = false;
    if (graphTagIndex === -1) {

        if (document.getElementById("file-input") !== null) {
            if (document.getElementById("file-input").value === "") {
                submitDisabled = true;
            }
        } else {
            submitDisabled = true;
        }
    }

    // Style of file input
    let fileInputClassName = "";
    if (showFileAlert) {
        fileInputClassName = "border border-5 border-danger-subtle"
    }

    return (
        <Card className="mx-3 mx-md-5 my-3 bg-light">
            <Card.Header as="h5" className="text-start">Graph</Card.Header>
            <Card.Body>
                <Form>
                    <Row>
                        <Col className="col-12 col-md-6 mt-2">
                            <Form.Group className="text-start">
                                <Form.Label>Choose graph</Form.Label>
                                <Form.Select value={graphTagIndex} onChange={e => handleSelectOnChange(e)}>
                                    <option key="-1" value={-1}>...</option>
                                    {options}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col className="col-12 col-md-6 mt-2">
                            <Form.Group className="text-start">
                                <Form.Label>
                                    or upload one <FileInputInfoButton func={handleFileInfoClick} />
                                </Form.Label>
                                <FileInputInfo show={showFileInputInfo}/>
                                <Form.Control className={fileInputClassName} 
                                id="file-input" type="file" onChange={e => handleControlOnChange(e)}/>
                            </Form.Group>
                            <FileAlert show={showFileAlert} setShowFunc={setShowFileAlert}
                            heading={fileAlertHeading} errorStack={fileAlertErrorStack} />
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