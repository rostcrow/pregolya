
import Card from 'react-bootstrap/Card';
import GraphSelect from './GraphSelect';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import AlgorithmSelect from './AlgorithmSelect';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

export default function GraphAlgorithmForm ( 
    {graphTags, algorithmTags, graphIndex, setGraphIndexFunc, changeGraphFunc, changeCurrentsFunc} ) {

    const [selectedAlgorithmIndex, setSelectedAlgorithmIndex] = useState(-1);
    const [options, setOptions] = useState([]);

    const bothSelected = (graphIndex !== -1) && (selectedAlgorithmIndex !== -1);
    let optionsForm = null;
    let optionsFormComponents = <></>;
    if (bothSelected) {
        const graph = graphTags[graphIndex].getAlgorithmGraph();
        const optionsFormClass = algorithmTags[selectedAlgorithmIndex].getOptionsFormClass();

        optionsForm = new optionsFormClass(options, setOptions, graph);
        optionsFormComponents = optionsForm.getComponents();
    }

    function handleChange() {

        if (graphIndex === -1 || selectedAlgorithmIndex === -1) {
            return;
        }

        changeCurrentsFunc(graphIndex, selectedAlgorithmIndex, options);
        setGraphIndexFunc(-1);
        setSelectedAlgorithmIndex(-1);
    }

    function handleClear() {
        changeGraphFunc(-1);
        setSelectedAlgorithmIndex(-1);
    }

    return (
        <>
            <Card className="my-3 mx-5">
                <Card.Body>
                    <Form>
                        <Row>
                            <Col>
                                <GraphSelect graphTags={graphTags} selected={graphIndex} changeFunc={changeGraphFunc}/>
                            </Col>
                            <Col>
                                <AlgorithmSelect tags={algorithmTags} selected={selectedAlgorithmIndex} setFunc={setSelectedAlgorithmIndex}/>
                            </Col>
                        </Row>
                        {optionsFormComponents}
                        <Row>
                            <Col>
                                <Button className="btn btn-primary mt-3" onClick={handleChange}>Change</Button>
                                <Button className="btn btn-secondary mt-3 ms-3" onClick={handleClear}>Clear</Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );

}