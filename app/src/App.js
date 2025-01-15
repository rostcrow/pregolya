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
import GraphLoader from "./classes/GraphLoader.js";
import GraphStyler from './classes/GraphStyler.js';
import GraphDropdown from './components/GraphDropdown/GraphDropdown.js';

export const ChoosingGraphContext = createContext(null);
export const CurrentGraphContext = createContext(null);

const graphsJSON = graphExamplesArray;
const graphLoader = new GraphLoader();
const graphStyler = new GraphStyler();

function App() {

  //Init
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
      <ChoosingGraphContext.Provider value={{graphsJSON, changeCurrentGraph}}>
        <GraphDropdown />
      </ChoosingGraphContext.Provider>
      <CurrentGraphContext.Provider value={{currentGraph}}>
        <GraphCanvas />
      </CurrentGraphContext.Provider>

      <script src="https://cdnjs.cloudflare.com/ajax/libs/sigma.js/2.4.0/sigma.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/graphology/0.25.4/graphology.umd.min.js"></script>
    </div>

  );
}

export default App;
