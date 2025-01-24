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
import Topbar from './components/Topbar/Topbar.js';
import GraphCanvas from './components/GraphCanvas/GraphCanvas.js';
import GraphDropdown from './components/GraphDropdown/GraphDropdown.js';
import AlgorithmControlPanel from './components/AlgorithmControlPanel/AlgorithmControlPanel.js';

//  Classes
import graphExamplesArray from "./graph_examples/all_examples.js";
import GraphFactory from './classes/GraphFactory.js';
import GraphVisualApplier from './classes/GraphVisualApplier.js';
import BFSAlgorithm from './classes/BFSAlgorithm.js';
import AlgorithmController from './classes/AlgorithmController.js';
import SidePanel from './components/SidePanel/SidePanel.js';


export const ChoosingGraphContext = createContext(null);
export const CurrentGraphContext = createContext(null);

const graphsJSON = graphExamplesArray;
const graphFactory = new GraphFactory();
const firstGraph = graphFactory.createDisplayGraphFromJSON(graphsJSON[0]);
const algorithmController = new AlgorithmController();
algorithmController.setAlgorithm(new BFSAlgorithm(graphFactory.createAlgorithmGraphFromGraph(firstGraph), "0"));

function App() {

  const [currentGraph, setCurrentGraph] = useState(firstGraph);
  const [refreshState, setRefreshState] = useState(true);
  const [sideComponents, setSideComponents] = useState({"": <></>});

  //Handling dropdown choice
  function changeCurrentGraph (index) {
    setCurrentGraph(graphFactory.createDisplayGraphFromJSON(graphsJSON[index]));
  }

  //Updates graph based on current algorithm state
  function updateGraph() {
    let visual = algorithmController.getCurrentGraphVisual();
    GraphVisualApplier.apply(currentGraph, visual);

    setSideComponents(algorithmController.getCurrentSideComponents());

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
            <AlgorithmControlPanel algorithmController={algorithmController} updateGraph={updateGraph} />
          </Col>
          <Col className="col-4">
            <SidePanel components={sideComponents}/>
          </Col>
        </Row>
      </Container>

      
      <script src="https://cdnjs.cloudflare.com/ajax/libs/sigma.js/2.4.0/sigma.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/graphology/0.25.4/graphology.umd.min.js"></script>
    </div>

  );
}

export default App;
