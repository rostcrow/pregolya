
import Card from 'react-bootstrap/Card';
import GraphSelect from './GraphSelect';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import AlgorithmSelect from './AlgorithmSelect';
import Button from 'react-bootstrap/Button';
import GraphAlgorithmCompatibilityChecker from '../../classes/GraphAlgorithmCompatibilityChecker';
import CompatibilityAlert from './CompatibilityAlert';
import FileInput from './FileInput';

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
        const compatibilityMessage = 
            GraphAlgorithmCompatibilityChecker.check(chosenGraph, algorithmTags[selectedAlgorithmIndex]);

        if (compatibilityMessage.isCompatible()) {
            //Compatible, showing options, submit allowed
            optionsHeading = <h3 className='mt-3'>Options</h3>;
            optionsComponents = optionsForm.getComponents();
            submitButtonDisabled = false;
        } else {
            //Not compatible, showing message
            compatibilityComponent = <CompatibilityAlert message={compatibilityMessage.getMessage()}/>;
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