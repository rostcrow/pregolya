
import Card from 'react-bootstrap/Card';
import GraphSelect from './GraphSelect';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import AlgorithmSelect from './AlgorithmSelect';
import Button from 'react-bootstrap/Button';
import CompatibilityAlert from './CompatibilityAlert';
import FileInput from './FileInput';

//Helpful func to convert array to string
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

export default function GraphAlgorithmForm ( {graphTags, selectedGraphIndex, changeSelectedGraphIndexFunc, changeImportedGraphFunc, 
    chosenGraph, algorithmTags, selectedAlgorithmIndex, changeSelectedAlgorithmIndexFunc, optionsForm, submitFunc, clearFunc} ) {
    
    //Funcs
    function handleSubmit() {
        submitFunc();
    }

    function handleClear() {
        clearFunc();
    }
    
    //Checking compatibility
    let compatibilityComponent = <></>;
    let optionsHeading = <></>;
    let optionsComponents = <></>;
    let submitButtonDisabled = true;

    if (chosenGraph !== null && selectedAlgorithmIndex !== -1) {

        const graphTag = chosenGraph;
        const graphType = graphTag.getType();

        const algorithmTag = algorithmTags[selectedAlgorithmIndex];
        const compatibilityTable = algorithmTag.getCompatibilityTable();

        if (compatibilityTable.isCompatible(graphType)) {
            //Compatible, showing options, submit allowed

            optionsHeading = <h3 className='mt-3'>Options</h3>;
            optionsComponents = optionsForm.getComponents();
            submitButtonDisabled = false;

        } else if (compatibilityTable.isInCompatible(graphType)) {
            //Not compatible, showing error message

            //Generating message
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
            
            //Making component
            compatibilityComponent = <CompatibilityAlert variant={"error"} content={content}/>;

        } else if (compatibilityTable.isConvertible(graphType)) {
            //Not compatible, but can be converted

            optionsHeading = <h3 className='mt-3'>Options</h3>;
            optionsComponents = optionsForm.getComponents();
            submitButtonDisabled = false;

            //Generating message
            const algorithmName = algorithmTag.getName();

            const compatible = compatibilityTable.getCompatible();
            const compatibleStr = arrayToString(compatible);

            const convertibleTo = compatibilityTable.getConvertibleTo(graphType);
        
            const content = [
                <p>Graph will be converted from type <b>{graphType}</b> to type <b>{convertibleTo}</b>.</p>,
                <p><b>{algorithmName}</b> is compatible with these graph types: <b>{compatibleStr}</b>.</p>
            ];

            //Making component
            compatibilityComponent = <CompatibilityAlert variant={"warning"} content={content}/>;

        }
    }

    return (
        <>
            <Card className="my-3 mx-5 bg-light">
                <Card.Body>
                    <Form>
                        <Row>
                            <Col className="col-12 col-lg-6">
                                <GraphSelect tags={graphTags} selectedIndex={selectedGraphIndex} 
                                    changeFunc={changeSelectedGraphIndexFunc}/>
                                <FileInput changeImportedGraphFunc={changeImportedGraphFunc} />
                            </Col>
                            <Col className="col-12 col-lg-6 mt-2 mt-lg-0">
                                <AlgorithmSelect tags={algorithmTags} selectedIndex={selectedAlgorithmIndex} 
                                    changeFunc={changeSelectedAlgorithmIndexFunc}/>
                            </Col>
                        </Row>
                        {compatibilityComponent}
                        {optionsHeading}
                        {optionsComponents}
                        <Row className="mt-3">
                            <Col className="text-end p-0">
                                <Button className="btn btn-primary me-2" onClick={handleSubmit}
                                disabled={submitButtonDisabled}>Submit</Button>
                            </Col>
                            <Col className="text-start p-0">
                                <Button className="btn btn-secondary ms-2" onClick={handleClear}>Clear</Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );

}