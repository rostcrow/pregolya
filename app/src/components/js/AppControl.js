
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
import BFSAlgorithmOptionsForm from '../../classes/BFSAlgorithmOptionsForm.js';

//Initial state
const graphsJSON = graphExamplesArray;
const graphFactory = new GraphFactory();
const firstGraph = graphFactory.createDisplayGraphFromJSON(graphsJSON[0]);
const firstAlgGraph = graphFactory.createAlgorithmGraphFromGraph(firstGraph, true);

const bfs = new AlgorithmTag(
  "Breadth-first search (BFS)", 
  BFSAlgorithm, BFSNodeVisualAdapter, BFSEdgeVisualAdapter, BFSSideComponentsFactory, BFSAlgorithmOptionsForm
);

const algorithmTags = [bfs];

const firstAlgorithmFacade = new AlgorithmFacade(firstAlgGraph, bfs, "0");

export default function AppControl() {

    //States
    const [currentVisibleGraph, setCurrentVisibleGraph] = useState(firstGraph);
    const [currentWorkingGraph, setCurrentWorkingGraph] = useState(firstGraph);
    const [selectedGraphIndex, setSelectedGraphIndex] = useState(-1);
    const [graphPreview, setGraphPreview] = useState(false);

    const [graphRefreshState, setGraphRefreshState] = useState(true);
    const [sideComponents, setSideComponents] = useState(firstAlgorithmFacade.getCurrentSideComponents());

    const [currentAlgorithmFacade, setCurrentAlgorithmFacade] = useState(firstAlgorithmFacade);
    const [algorithmControlState, setAlgorithmControlState] = useState("start");
  
    //Handling graph change in form
    function changeGraph (graphIndex) {

        setSelectedGraphIndex(graphIndex);

        if (graphIndex === -1) {
            setCurrentVisibleGraph(currentWorkingGraph);
            setGraphPreview(false);
        } else {
            const graph = graphFactory.createDisplayGraphFromJSON(graphsJSON[graphIndex]);
            setCurrentVisibleGraph(graph);
            setGraphPreview(true);
        }
    }

    //Handling form change
    function changeCurrents(graphIndex, algorithmIndex, algorithmOptions) {
        const graph = graphFactory.createDisplayGraphFromJSON(graphsJSON[graphIndex]);
        const algorithmGraph = graphFactory.createAlgorithmGraphFromGraph(graph, true);
        const algorithmFacade = new AlgorithmFacade(algorithmGraph, algorithmTags[algorithmIndex], ...algorithmOptions);

        setCurrentVisibleGraph(graph);
        setCurrentWorkingGraph(graph);
        setGraphPreview(false);
        setCurrentAlgorithmFacade(algorithmFacade);
        setSideComponents(algorithmFacade.getCurrentSideComponents());
        setAlgorithmControlState("start");
    }

  
    //Updates graph and side panel
    function update() {
  
      //Updating GraphCanvas
      const  visual = currentAlgorithmFacade.getCurrentGraphVisual();
      GraphVisualApplier.apply(currentWorkingGraph, visual);
      setGraphRefreshState(graphRefreshState => !graphRefreshState);
  
      //Updating SidePanel
      const sideComp = currentAlgorithmFacade.getCurrentSideComponents();
      setSideComponents(sideComp);
    }

    return (
        <>
            <GraphAlgorithmForm graphsJSON={graphsJSON} algorithmTags={algorithmTags} 
                graphIndex={selectedGraphIndex} setGraphIndexFunc={setSelectedGraphIndex}                
                changeGraphFunc={changeGraph} changeCurrentsFunc={changeCurrents}/>
            <Container>
                <Row>
                    <Col className="col-8">
                        <GraphCanvas graph={currentVisibleGraph} refreshState={graphRefreshState} graphPreview={graphPreview}/>
                        <AlgorithmControlPanel controlState={algorithmControlState} 
                            setControlStateFunc={setAlgorithmControlState} 
                            algorithmFacade={currentAlgorithmFacade} updateFunc={update} graphPreview={graphPreview} />
                    </Col>
                    <Col className="col-4">
                        <SidePanel sideComponents={sideComponents} graphPreview={graphPreview}/>
                    </Col>
                </Row>
            </Container>
        </>

    );

}
