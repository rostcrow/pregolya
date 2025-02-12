
import Card from 'react-bootstrap/Card';
import GraphSelect from './GraphSelect';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import AlgorithmSelect from './AlgorithmSelect';
import Button from 'react-bootstrap/Button';

export default function GraphAlgorithmForm ( 
    {graphTags, algorithmTags, graphIndex, changeGraphFunc, algorithmIndex, changeAlgorithmFunc, optionsForm, submitFunc} ) {

    function handleSubmit() {
        submitFunc();
    }

    function handleClear() {
        changeGraphFunc(-1);
        changeAlgorithmFunc(-1);
    }

    const optionsComponents = optionsForm.getComponents();

    let submitButtonClass = "btn btn-primary mt-3";
    if (graphIndex === -1 || algorithmIndex === -1) {
        submitButtonClass += " disabled";
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
                        {optionsComponents}
                        <Row>
                            <Col>
                                <Button className={submitButtonClass} onClick={handleSubmit}>Submit</Button>
                                <Button className="btn btn-secondary mt-3 ms-3" onClick={handleClear}>Clear</Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );

}