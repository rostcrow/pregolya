
//Libraries
import { useState } from 'react';
import Container from 'react-bootstrap/esm/Container.js';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//Components
import GraphCanvas from './GraphCanvas.js';
import AlgorithmControlPanel from './AlgorithmControlPanel.js';
import SidePanel from './SidePanel.js';

//Classes
import graphExamplesArray from "../../graph_examples/all_examples.js";
import GraphFactory from '../../classes/GraphFactory.js';
import GraphVisualApplier from '../../classes/GraphVisualApplier.js';
import AlgorithmTag from '../../classes/AlgorithmTag.js';
import BFSAlgorithm from '../../classes/BFSAlgorithm.js';
import BFSNodeVisualAdapter from '../../classes/BFSNodeVisualAdapter.js';
import BFSEdgeVisualAdapter from '../../classes/BFSEdgeVisualAdapter.js';
import BFSSideComponentsFactory from '../../classes/BFSSideComponentsFactory.js';
import AlgorithmFacade from '../../classes/AlgorithmFacade.js';
import GraphAlgorithmForm from './GraphAlgorithmForm.js';

//Initial state
const graphsJSON = graphExamplesArray;
const graphFactory = new GraphFactory();
const firstGraph = graphFactory.createDisplayGraphFromJSON(graphsJSON[0]);
const firstAlgGraph = graphFactory.createAlgorithmGraphFromGraph(firstGraph, true);

const bfs = new AlgorithmTag(
  "Breadth-first search (BFS)", 
  BFSAlgorithm, BFSNodeVisualAdapter, BFSEdgeVisualAdapter, BFSSideComponentsFactory
);

const algorithmTags = [bfs];

const firstAlgorithmFacade = new AlgorithmFacade(firstAlgGraph, bfs, "0");

export default function AppControl() {

    //States
    const [currentGraph, setCurrentGraph] = useState(firstGraph);
    const [currentAlgorithmFacade, setCurrentAlgorithmFacade] = useState(firstAlgorithmFacade);
    const [graphRefreshState, setGraphRefreshState] = useState(true);
    const [sideComponents, setSideComponents] = useState([]);
    const [algorithmControlState, setAlgorithmControlState] = useState("start");
  
    //Handling form
    function changeCurrents(graphIndex, algorithmIndex) {
        const graph = graphFactory.createDisplayGraphFromJSON(graphsJSON[graphIndex]);
        const algorithmGraph = graphFactory.createAlgorithmGraphFromGraph(graph, true);
        const algorithmFacade = new AlgorithmFacade(algorithmGraph, algorithmTags[algorithmIndex], "0");

        setCurrentGraph(graph);
        setCurrentAlgorithmFacade(algorithmFacade);
        setSideComponents(algorithmFacade.getCurrentSideComponents());
        setAlgorithmControlState("start");
    }

  
    //Updates graph and side panel
    function update() {
  
      //Updating GraphCanvas
      const  visual = currentAlgorithmFacade.getCurrentGraphVisual();
      GraphVisualApplier.apply(currentGraph, visual);
      setGraphRefreshState(graphRefreshState => !graphRefreshState);
  
      //Updating SidePanel
      const sideComp = currentAlgorithmFacade.getCurrentSideComponents();
      setSideComponents(sideComp);
    }

    return (
        <>
            <GraphAlgorithmForm graphsJSON={graphsJSON} algorithmTags={algorithmTags} changeFunc={changeCurrents}/>
            <Container>
                <Row>
                    <Col className="col-8">
                        <GraphCanvas graph={currentGraph} refreshState={graphRefreshState}/>
                        <AlgorithmControlPanel controlState={algorithmControlState} 
                            setControlStateFunc={setAlgorithmControlState} 
                            algorithmFacade={currentAlgorithmFacade} updateFunc={update} />
                    </Col>
                    <Col className="col-4">
                        <SidePanel sideComponents={sideComponents}/>
                    </Col>
                </Row>
            </Container>
        </>

    );

}
