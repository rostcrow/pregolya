//Importing libraries and build-in files
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@react-sigma/core/lib/react-sigma.min.css";
import { createContext, useState } from 'react';
import Container from 'react-bootstrap/esm/Container.js';

//Importing my components and classes
//  Components
import Topbar from './components/Topbar/Topbar.js';
import GraphCanvas from './components/GraphCanvas/GraphCanvas.js';
import BackButton from './components/BackButton/BackButton.js';
import GraphDropdown from './components/GraphDropdown/GraphDropdown.js';
import ForwardButton from './components/ForwardButton/ForwardButton.js';

//  Classes
import graphExamplesArray from "./graph_examples/all_examples.js";
import GraphFactory from './classes/GraphFactory.js';
import GraphVisualApplier from './classes/GraphVisualApplier.js';
import BFSAlgorithm from './classes/BFSAlgorithm.js';
import AlgorithmController from './classes/AlgorithmController.js';
import JumpToEndButton from './components/JumpToEndButton/JumpToEndButton.js';
import JumpToStartButton from './components/JumpToStartButton/JumpToStartButton.js';

export const ChoosingGraphContext = createContext(null);
export const CurrentGraphContext = createContext(null);

const graphsJSON = graphExamplesArray;
const graphFactory = new GraphFactory();
const firstGraph = graphFactory.createDisplayGraphFromJSON(graphsJSON[0]);
const algorithmController = new AlgorithmController();
algorithmController.setAlgorithm(new BFSAlgorithm(graphFactory.createAlgorithmGraphFromGraph(firstGraph)));

function App() {

  const [currentGraph, setCurrentGraph] = useState(firstGraph);
  const [refreshState, setRefreshState] = useState(true);

  //Handling dropdown choice
  function changeCurrentGraph (index) {
    setCurrentGraph(graphFactory.createDisplayGraphFromJSON(graphsJSON[index]));
  }

  //Updates graph based on current algorithm state
  function updateGraph() {
    let visual = algorithmController.getCurrentGraphVisual();
    GraphVisualApplier.apply(currentGraph, visual);

    setRefreshState(refreshState => !refreshState);
  }

  function handleJumpToStart() {
    algorithmController.jumpToStart();
    updateGraph();
  }

  //Handle back button
  function handleBack() {
    algorithmController.back();
    updateGraph();
  }

  //Handle next button
  function handleNext() {
    algorithmController.forward();
    updateGraph();
  }

  //Handle jump to end button
  function handleJumpToEnd() {
    algorithmController.jumpToEnd();
    updateGraph();
  }
  
  return (
    <div className="App">
      <Topbar />
      <GraphDropdown graphsJSON={graphsJSON} itemFunc={changeCurrentGraph} />
      <GraphCanvas graph={currentGraph} refreshState={refreshState}/>
      <Container>
        <JumpToStartButton func={handleJumpToStart} />
        <BackButton func={handleBack} />
        <ForwardButton func={handleNext} />
        <JumpToEndButton func={handleJumpToEnd} />
      </Container>
      

      <script src="https://cdnjs.cloudflare.com/ajax/libs/sigma.js/2.4.0/sigma.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/graphology/0.25.4/graphology.umd.min.js"></script>
    </div>

  );
}

export default App;
