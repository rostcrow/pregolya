//Importing libraries and build-in files
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@react-sigma/core/lib/react-sigma.min.css";
import { useState } from 'react';

//Importing my components and classes
//  Components
import Topbar from './components/Topbar/Topbar.js';
import GraphCanvas from './components/GraphCanvas/GraphCanvas.js';

//  Classes
import graphExamplesArray from "./graph_examples/all_examples.js";
import GraphLoader from "./classes/GraphLoader.js";
import GraphStyler from './classes/GraphStyler.js';
import GraphDropdown from './components/GraphDropdown/GraphDropdown.js';

function App() {

  //Init
  let graphsJSON = graphExamplesArray;

  const graphLoader = new GraphLoader();
  const graphStyler = new GraphStyler();

  let firstGraph = graphLoader.load(graphsJSON[0]);
  graphStyler.style(firstGraph);

  const [currentGraph, setCurrentGraph] = useState(firstGraph);

  //Handling dropdown choice
  function changeCurrentGraph (index) {
    let nextGraph = graphLoader.load(graphsJSON[index]);
    graphStyler.style(nextGraph);

    setCurrentGraph(nextGraph);
  }
  
  return (
    <div className="App">
      <Topbar />
      <GraphDropdown graphsJSON={graphsJSON} itemsFunc={changeCurrentGraph}/>
      <GraphCanvas graph={currentGraph}/>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/sigma.js/2.4.0/sigma.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/graphology/0.25.4/graphology.umd.min.js"></script>
      <script src="./plugins/sigma.plugins.dragNodes/sigma.plugins.dragNodes.js"></script>
      <script src="./plugins/sigma.renderers.edgeLabels.min.js"></script>
    </div>

  );
}

export default App;
