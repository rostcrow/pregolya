
import Card from 'react-bootstrap/Card';
import GraphSelect from './GraphSelect';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import AlgorithmSelect from './AlgorithmSelect';
import Button from 'react-bootstrap/Button';
import GraphAlgorithmCompatibilityChecker from '../../classes/GraphAlgorithmCompatibilityChecker';
import CompatibilityAlert from './CompatibilityAlert';

export default function GraphAlgorithmForm ( 
    {graphTags, algorithmTags, graphIndex, changeGraphFunc, algorithmIndex, changeAlgorithmFunc, optionsForm, submitFunc} ) {

    function handleSubmit() {
        submitFunc();
    }

    function handleClear() {
        changeGraphFunc(-1);
        changeAlgorithmFunc(-1);
    }

    //Checking compatibility
    let compatibilityComponent = <></>;
    let optionsComponents = <></>;
    let submitButtonDisabled = true;

    if (graphIndex !== -1 && algorithmIndex !== -1) {
        const compatibilityMessage = GraphAlgorithmCompatibilityChecker.check(graphTags[graphIndex], algorithmTags[algorithmIndex]);

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
                                <GraphSelect tags={graphTags} selected={graphIndex} changeFunc={changeGraphFunc}/>
                            </Col>
                            <Col>
                                <AlgorithmSelect tags={algorithmTags} selected={algorithmIndex} changeFunc={changeAlgorithmFunc}/>
                            </Col>
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