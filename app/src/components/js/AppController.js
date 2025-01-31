
//Libraries
import { useState } from 'react';
import Container from 'react-bootstrap/esm/Container.js';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//Components
import GraphCanvas from './GraphCanvas.js';
import GraphDropdown from './GraphDropdown.js';
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

//Initial state
const graphsJSON = graphExamplesArray;
const graphFactory = new GraphFactory();
const firstGraph = graphFactory.createDisplayGraphFromJSON(graphsJSON[0]);
const firstAlgGraph = graphFactory.createAlgorithmGraphFromGraph(firstGraph, true);

const bfs = new AlgorithmTag(
  "Broad-first search (BFS)", 
  BFSAlgorithm, BFSNodeVisualAdapter, BFSEdgeVisualAdapter, BFSSideComponentsFactory
);

const algorithmFacade = new AlgorithmFacade(firstAlgGraph, bfs, "0");

export default function AppController() {

    //States
    const [currentGraph, setCurrentGraph] = useState(firstGraph);
    const [refreshState, setRefreshState] = useState(true);
    const [sideComponents, setSideComponents] = useState([]);
  
    //Handling dropdown choice
    function changeCurrentGraph (index) {
      setCurrentGraph(graphFactory.createDisplayGraphFromJSON(graphsJSON[index]));
    }
  
    //Updates graph based on current algorithm state
    function updateGraph() {
  
      //Updating GraphCanvas
      const  visual = algorithmFacade.getCurrentGraphVisual();
      GraphVisualApplier.apply(currentGraph, visual);
      setRefreshState(refreshState => !refreshState);
  
      //Updating SidePanel
      const sideComp = algorithmFacade.getCurrentSideComponents();
      setSideComponents(sideComp);
    }

    return (
        <>
            <GraphDropdown graphsJSON={graphsJSON} itemFunc={changeCurrentGraph} />
            <Container>
                <Row>
                    <Col className="col-8">
                        <GraphCanvas graph={currentGraph} refreshState={refreshState}/>
                        <AlgorithmControlPanel algorithmFacade={algorithmFacade} updateGraph={updateGraph} />
                    </Col>
                    <Col className="col-4">
                        <SidePanel sideComponents={sideComponents}/>
                    </Col>
                </Row>
            </Container>
        </>

    );

}
