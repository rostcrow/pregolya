//Importing libraries and build-in files
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@react-sigma/core/lib/react-sigma.min.css";
import { createContext, useState } from 'react';

//Importing my components and classes
//  Components
import Topbar from './components/Topbar/Topbar.js';
import GraphCanvas from './components/GraphCanvas/GraphCanvas.js';

//  Classes
import graphExamplesArray from "./graph_examples/all_examples.js";
import GraphDropdown from './components/GraphDropdown/GraphDropdown.js';
import GraphFactory from './classes/GraphFactory.js';
import NextButton from './components/NextButton/NextButton.js';
import GraphVisualApplier from './classes/GraphVisualApplier.js';
import BFSAlgorithm from './classes/BFSAlgorithm.js';

export const ChoosingGraphContext = createContext(null);
export const CurrentGraphContext = createContext(null);

const graphsJSON = graphExamplesArray;
const graphFactory = new GraphFactory();
const firstGraph = graphFactory.createDisplayGraphFromJSON(graphsJSON[1]);
const firstAlg = new BFSAlgorithm(graphFactory.createAlgorithmGraphFromGraph(firstGraph));

function App() {

  const [currentGraph, setCurrentGraph] = useState(firstGraph);
  const [refreshState, setRefreshState] = useState(true);
  const [currentAlgorithm, setCurrentAlgorithm] = useState(firstAlg);

  //Handling dropdown choice
  function changeCurrentGraph (index) {
    setCurrentGraph(graphFactory.createDisplayGraphFromJSON(graphsJSON[index]));
  }

  //Handle next button
  function handleNext() {
    
    currentAlgorithm.next();
    let visual = currentAlgorithm.getGraphVisual();
    GraphVisualApplier.apply(currentGraph, visual);

    setRefreshState(refreshState => !refreshState);
  }
  
  return (
    <div className="App">
      <Topbar />
      <ChoosingGraphContext.Provider value={{graphsJSON, changeCurrentGraph}}>
        <GraphDropdown />
      </ChoosingGraphContext.Provider>
      <GraphCanvas graph={currentGraph} refreshState={refreshState}/>
      <NextButton func={handleNext} />

      <script src="https://cdnjs.cloudflare.com/ajax/libs/sigma.js/2.4.0/sigma.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/graphology/0.25.4/graphology.umd.min.js"></script>
    </div>

  );
}

export default App;
