//Importing libraries and build-in files
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@react-sigma/core/lib/react-sigma.min.css";
import { createContext, useState } from 'react';
import Container from 'react-bootstrap/esm/Container.js';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//Importing my components and classes
//  Components
import Topbar from './components/js/Topbar.js';
import GraphCanvas from './components/js/GraphCanvas.js';
import GraphDropdown from './components/js/GraphDropdown.js';
import AlgorithmControlPanel from './components/js/AlgorithmControlPanel.js';
import SidePanel from './components/js/SidePanel.js';

//  Classes
import graphExamplesArray from "./graph_examples/all_examples.js";
import GraphFactory from './classes/GraphFactory.js';
import GraphVisualApplier from './classes/GraphVisualApplier.js';
import AlgorithmTag from './classes/AlgorithmTag.js';
import BFSAlgorithm from './classes/BFSAlgorithm.js';
import BFSNodeVisualAdapter from './classes/BFSNodeVisualAdapter.js';
import BFSEdgeVisualAdapter from './classes/BFSEdgeVisualAdapter.js';
import BFSSideComponentsFactory from './classes/BFSSideComponentsFactory.js';
import AlgorithmFacade from './classes/AlgorithmFacade.js';

export const ChoosingGraphContext = createContext(null);
export const CurrentGraphContext = createContext(null);

const graphsJSON = graphExamplesArray;
const graphFactory = new GraphFactory();
const firstGraph = graphFactory.createDisplayGraphFromJSON(graphsJSON[0]);
const firstAlgGraph = graphFactory.createAlgorithmGraphFromGraph(firstGraph, true);

const bfs = new AlgorithmTag(
  "Broad-first search (BFS)", 
  BFSAlgorithm, BFSNodeVisualAdapter, BFSEdgeVisualAdapter, BFSSideComponentsFactory
);

const algorithmFacade = new AlgorithmFacade(firstAlgGraph, bfs, "0");

function App() {

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

    //Updating SidePanel
    const sideComp = algorithmFacade.getCurrentSideComponents();
    setSideComponents(sideComp);

    setRefreshState(refreshState => !refreshState);
  }
  
  return (
    <div className="App">
      <Topbar />
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

      
      <script src="https://cdnjs.cloudflare.com/ajax/libs/sigma.js/2.4.0/sigma.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/graphology/0.25.4/graphology.umd.min.js"></script>
    </div>

  );
}

export default App;
