
import Card from 'react-bootstrap/Card';
import GraphSelect from './GraphSelect';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import AlgorithmSelect from './AlgorithmSelect';
import Button from 'react-bootstrap/Button';
import GraphAlgorithmCompatibilityChecker from '../../classes/GraphAlgorithmCompatibilityChecker';
import CompatibilityAlert from './CompatibilityAlert';
import GraphTag from '../../classes/GraphTag';

export default function GraphAlgorithmForm ( {graphTags, selectedGraphIndex, changeSelectedGraphIndexFunc, changeImportedGraphFunc, 
    chosenGraph, algorithmTags, selectedAlgorithmIndex, changeSelectedAlgorithmIndexFunc, optionsForm, submitFunc, clearFunc} ) {
    
    //Funcs
    function handleSubmit() {
        submitFunc();
    }

    function handleClear() {
        clearFunc();
    }

    function handleImportFileChange(e) {

        let file = e.target.files[0];

        if (file.size > 0) {
            var reader = new FileReader();

            reader.onload = function(e) {

                let content = e.target.result;
                let graphTag = new GraphTag(JSON.parse(content));


                changeImportedGraphFunc(graphTag);
            };

            reader.readAsText(file);
        }

    }

    //Checking compatibility
    let compatibilityComponent = <></>;
    let optionsComponents = <></>;
    let submitButtonDisabled = true;

    if (chosenGraph !== null && selectedAlgorithmIndex !== -1) {
        const compatibilityMessage = 
            GraphAlgorithmCompatibilityChecker.check(chosenGraph, algorithmTags[selectedAlgorithmIndex]);

        if (compatibilityMessage.isCompatible()) {
            //Compatible, showing options, submit allowed
            optionsComponents = optionsForm.getComponents();
            submitButtonDisabled = false;
        } else {
            //Not compatible, showing message
            compatibilityComponent = <CompatibilityAlert message={compatibilityMessage.getMessage()}/>;
        }
    }    

    return (
        <>
            <Card className="my-3 mx-5">
                <Card.Body>
                    <Form>
                        <Row>
                            <Col>
                                <GraphSelect tags={graphTags} selectedIndex={selectedGraphIndex} 
                                    changeFunc={changeSelectedGraphIndexFunc}/>
                            </Col>
                            <Col>
                                <AlgorithmSelect tags={algorithmTags} selectedIndex={selectedAlgorithmIndex} 
                                    changeFunc={changeSelectedAlgorithmIndexFunc}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className='mt-2'>
                                    <Form.Label>or import file</Form.Label>
                                    <Form.Control id="file-input" type="file" onChange={e => handleImportFileChange(e)}/>
                                </Form.Group>
                            </Col>
                            <Col></Col>
                        </Row>
                        {compatibilityComponent}
                        {optionsComponents}
                        <Row>
                            <Col>
                                <Button className="btn btn-primary mt-3" onClick={handleSubmit} 
                                    disabled={submitButtonDisabled}>Submit</Button>
                                <Button className="btn btn-secondary mt-3 ms-3" onClick={handleClear}>Clear</Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );

}