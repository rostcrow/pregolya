
//Libraries
import { useState, useRef, createContext, } from 'react';
import Container from 'react-bootstrap/esm/Container.js';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//Components
import GraphCanvas from './GraphCanvas.js';
import AlgorithmControlPanel from './AlgorithmControlPanel.js';
import SidePanel from './SidePanel.js';

//Classes
import graphExamplesArray from "../../graph_examples/all_examples.js";
import GraphDataApplier from '../../classes/GraphDataApplier.js';
import AlgorithmTag from '../../classes/AlgorithmTag.js';
import BFSAlgorithm from '../../classes/BFSAlgorithm.js';
import BFSNodeStyler from "../../classes/BFSNodeStyler.js";
import BFSEdgeStyler from "../../classes/BFSEdgeStyler.js";
import BFSSideComponentsFactory from '../../classes/BFSSideComponentsFactory.js';
import AlgorithmFacade from '../../classes/AlgorithmFacade.js';
import GraphAlgorithmForm from './GraphAlgorithmForm.js';
import BFSAlgorithmOptionsForm from '../../classes/BFSAlgorithmOptionsForm.js';
import GraphTag from '../../classes/GraphTag.js';
import NullAlgorithmOptionsForm from '../../classes/NullAlgorithmOptionsForm.js';
import DFSAlgorithm from '../../classes/DFSAlgorithm.js';
import DFSSideComponentsFactory from '../../classes/DFSSideComponentsFactory.js';
import DFSNodeStyler from "../../classes/DFSNodeStyler.js";
import DFSEdgeStyler from "../../classes/DFSEdgeStyler.js";
import DFSAlgorithmOptionsForm from '../../classes/DFSAlgorithmOptionsForm.js';
import Globals from '../../classes/Globals.js';
import BiconnectedComponentsSearchAlgorithm from "../../classes/BiconnectedComponentsSearchAlgorithm.js";
import BiconnectedComponentsSearchNodeStyler from "../../classes/BiconnectedComponentsSearchNodeStyler.js";
import BiconnectedComponentsSearchEdgeStyler from "../../classes/BiconnectedComponentsSearchEdgeStyler.js";
import BiconnectedComponentsSearchAlgorithmOptionsForm from "../../classes/BiconnectedComponentsSearchAlgorithmOptionsForm.js";
import BiconnectedComponentsSearchSideComponentsFactory from "../../classes/BiconnectedComponentsSearchSideComponentsFactory.js";


//Initializing graphs
const graphsJSON = graphExamplesArray;
const graphTags = [];
for (const graphJSON of graphsJSON) {
    graphTags.push(new GraphTag(graphJSON));
}

const firstGraph = graphTags[0].getDisplayGraph();
const firstAlgGraph = graphTags[0].getAlgorithmGraph();

//Initializing algorithms
const bfs = new AlgorithmTag(
  "Breadth-first search (BFS)", [Globals.GraphTypes.NORMAL, Globals.GraphTypes.DIRECTED],
  BFSAlgorithm, BFSNodeStyler, BFSEdgeStyler, BFSSideComponentsFactory, BFSAlgorithmOptionsForm
);

const dfs = new AlgorithmTag(
    "Depth-first search (DFS)", [Globals.GraphTypes.NORMAL, Globals.GraphTypes.DIRECTED],
    DFSAlgorithm, DFSNodeStyler, DFSEdgeStyler, DFSSideComponentsFactory, DFSAlgorithmOptionsForm
  );

const bcs = new AlgorithmTag(
    "Biconnected components search", [Globals.GraphTypes.NORMAL],
    BiconnectedComponentsSearchAlgorithm, BiconnectedComponentsSearchNodeStyler,
    BiconnectedComponentsSearchEdgeStyler, BiconnectedComponentsSearchSideComponentsFactory,
    BiconnectedComponentsSearchAlgorithmOptionsForm
)

const algorithmTags = [bfs, dfs, bcs];
const firstAlgorithmFacade = new AlgorithmFacade(firstAlgGraph, algorithmTags[0], "0");

//Initializing options form
const firstOptionsForm = new NullAlgorithmOptionsForm();

//Creating graph context
export const GraphContext = createContext(null);

export default function AppControl() {

    //States and refs
    const [visibleGraph, setVisibleGraph] = useState(firstGraph);
    const [workingGraph, setWorkingGraph] = useState(firstGraph);

    const [chosenGraph, setChosenGraph] = useState(null);
    const [graphPreview, setGraphPreview] = useState(false);
    const [selectedGraphIndex, setSelectedGraphIndex] = useState(-1);
    const [selectedAlgorithmIndex, setSelectedAlgorithmIndex] = useState(-1);

    const [options, setOptions] = useState(firstOptionsForm.getDefaultOptions());
    const [optionsForm, setOptionsForm] = useState(firstOptionsForm);

    const [graphRefreshState, setGraphRefreshState] = useState(true);
    const [sideComponents, setSideComponents] = useState(firstAlgorithmFacade.getCurrentSideComponents());

    const [algorithmFacade, setAlgorithmFacade] = useState(firstAlgorithmFacade);
    const [algorithmControlState, setAlgorithmControlState] = useState("start");
    const running = useRef(false);
  
    //Handles change of graph in select
    function handleChangeSelectedGraphIndex(index) {

        setSelectedGraphIndex(index);

        clearFileInput();

        let localChosenGraph;
            
        if (index === -1) {
            localChosenGraph = null;
            setVisibleGraph(workingGraph);
            setGraphPreview(false);
        } else {
            localChosenGraph = graphTags[index]; 
            setVisibleGraph(graphTags[index].getDisplayGraph());
            setGraphPreview(true);
        }

        setChosenGraph(localChosenGraph);
        changeOptionsForm(localChosenGraph, algorithmTags[selectedAlgorithmIndex]);
    }

    //Handles importing graph from file
    function handleChangeImportedGraph(graphTag) {

        if (graphTag === null) {
            //Unsuccessful import

            if (selectedGraphIndex === -1) {
                //Clearing preview of previously imported
                setChosenGraph(null);
                setVisibleGraph(workingGraph);
                setGraphPreview(false);
    
                changeOptionsForm(null, algorithmTags[selectedAlgorithmIndex]);
            }

            return;
        } 

        //Successful import
        setChosenGraph(graphTag);
        setVisibleGraph(graphTag.getDisplayGraph());
        setGraphPreview(true);
        setSelectedGraphIndex(-1);

        changeOptionsForm(graphTag, algorithmTags[selectedAlgorithmIndex]);
    }

    //Handles change of algorithm in select
    function handleChangeSelectedAlgorithmIndex(index) {
        
        setSelectedAlgorithmIndex(index);
        changeOptionsForm(chosenGraph, algorithmTags[index]);
    }

    //Changes options form based on chosen graph and algorithm
    function changeOptionsForm (graphTag, algorithmTag) {

        let newOptionsForm = new NullAlgorithmOptionsForm();

        if (graphTag !== null && algorithmTag !== undefined) {
            //Options form shown
            const optionsFormClass = algorithmTag.getOptionsFormClass();
            newOptionsForm = new optionsFormClass(options, setOptions, graphTag.getAlgorithmGraph());
        }

        //Setting default options
        const defaultOptions = newOptionsForm.getDefaultOptions();
        newOptionsForm.setOptions(defaultOptions);
        setOptions(defaultOptions);

        //Setting options form
        setOptionsForm(newOptionsForm);
    }

    //Handles change of controlled graph and algorithm
    function handleChangeWorkspace() {

        const displayGraph = chosenGraph.getDisplayGraph();
        const algorithmGraph = chosenGraph.getAlgorithmGraph();
        const localAlgorithmFacade = new AlgorithmFacade(algorithmGraph, algorithmTags[selectedAlgorithmIndex], ...options);

        setVisibleGraph(displayGraph);
        setWorkingGraph(displayGraph);
        setChosenGraph(null);
        setGraphPreview(false);
        setSelectedGraphIndex(-1);
        clearFileInput();
        setSelectedAlgorithmIndex(-1);
            
        const nullOptionsForm = new NullAlgorithmOptionsForm();
        setOptions(nullOptionsForm.getDefaultOptions());
        setOptionsForm(nullOptionsForm);

        setAlgorithmFacade(localAlgorithmFacade);
        setSideComponents(localAlgorithmFacade.getCurrentSideComponents());
        running.current = false;
        setAlgorithmControlState("start");

        
    }

    //Handles form clear
    function handleClearForm() {

        setSelectedGraphIndex(-1);
        clearFileInput();
        setChosenGraph(null);
        setSelectedAlgorithmIndex(-1);
        setVisibleGraph(workingGraph);
        setGraphPreview(false);

    }

    //Clears file input located in GraphAlgorithmForm
    function clearFileInput() {
        document.getElementById("file-input").value='';
    }

    //Updates graph and side panel
    function update() {
  
      //Updating GraphCanvas
      const graphData = algorithmFacade.getCurrentGraphData();
      GraphDataApplier.applyNodesEdges(workingGraph, graphData);
      setGraphRefreshState(graphRefreshState => !graphRefreshState);
  
      //Updating SidePanel
      const sideComp = algorithmFacade.getCurrentSideComponents();
      setSideComponents(sideComp);
    }

    //Creating graph context value used for potential side panel interactivity
    const graphContextValue = {
        "graph": visibleGraph, 
        "state": graphRefreshState,
        "setState": setGraphRefreshState
    }

    return (
        <>
            <GraphAlgorithmForm graphTags={graphTags} selectedGraphIndex={selectedGraphIndex} 
                changeSelectedGraphIndexFunc={handleChangeSelectedGraphIndex} changeImportedGraphFunc={handleChangeImportedGraph}
                chosenGraph={chosenGraph} algorithmTags={algorithmTags} selectedAlgorithmIndex={selectedAlgorithmIndex}
                changeSelectedAlgorithmIndexFunc={handleChangeSelectedAlgorithmIndex}
                optionsForm={optionsForm} submitFunc={handleChangeWorkspace} clearFunc={handleClearForm} />
            <Container className='px-5 mb-5' fluid={true}>
                <Row className='p-0 m-0'>
                    <Col className="col-12 col-lg-8 p-0 pe-lg-2 m-0">
                        <GraphCanvas graph={visibleGraph} refreshState={graphRefreshState} graphPreview={graphPreview}/>
                        <AlgorithmControlPanel running={running} controlState={algorithmControlState} 
                            setControlStateFunc={setAlgorithmControlState} 
                            algorithmFacade={algorithmFacade} updateFunc={update} graphPreview={graphPreview} />
                    </Col>
                    <Col className="col-12 col-lg-4 pt-2 pb-0 ps-0 pe-0 pt-lg-0 pb-lg-0 ps-lg-2 pe-lg-0 m-0">
                        <GraphContext.Provider value={graphContextValue}>
                            <SidePanel sideComponents={sideComponents} graphPreview={graphPreview}/>
                        </GraphContext.Provider>
                    </Col>
                </Row>
            </Container>
        </>
    );

}
