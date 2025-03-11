
//Libraries
import { useState, useRef, createContext, } from 'react';
import Container from 'react-bootstrap/esm/Container.js';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//Components
import GraphCanvas from './GraphCanvas.js';
import AlgorithmControlPanel from './AlgorithmControlPanel.js';
import SidePanel from './SidePanel.js';
import GraphForm from './GraphForm.js';
import AlgorithmForm from "./AlgorithmForm.js";
import Card from 'react-bootstrap/Card';

//Classes
import graphExamplesArray from "../../graph_examples/all_examples.js";
import GraphDataApplier from '../../classes/GraphDataApplier.js';
import AlgorithmTag from '../../classes/AlgorithmTag.js';
import BFSAlgorithm from '../../classes/BFSAlgorithm.js';
import BFSNodeStyler from "../../classes/BFSNodeStyler.js";
import BFSEdgeStyler from "../../classes/BFSEdgeStyler.js";
import BFSSideComponentsFactory from '../../classes/BFSSideComponentsFactory.js';
import AlgorithmFacade from '../../classes/AlgorithmFacade.js';
import BFSAlgorithmOptionsForm from '../../classes/BFSAlgorithmOptionsForm.js';
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
import TarjanAlgorithm from '../../classes/TarjanAlgorithm.js';
import TarjanNodeStyler from '../../classes/TarjanNodeStyler.js';
import TarjanEdgeStyler from '../../classes/TarjanEdgeStyler.js';
import TarjanSideComponentsFactory from '../../classes/TarjanSideComponentsFactory.js';
import TarjanAlgorithmOptionsForm from '../../classes/TarjanAlgorithmOptionsForm.js';
import circlepack from "graphology-layout/circlepack";
import circular from "graphology-layout/circular";
import random from "graphology-layout/random";
import GraphologyGraphLayout from "../../classes/GraphologyGraphLayout.js";
import NoOverlapGraphLayout from "../../classes/NoOverlapGraphLayout.js";
import CompatibilityTable from '../../classes/CompatibilityTable.js';
import GraphTagFactory from '../../classes/GraphTagFactory.js';
import { clearFileInput } from './GraphForm.js';

//Initializing graphs
const graphsJSON = graphExamplesArray;
const graphTags = [];
for (const graphJSON of graphsJSON) {
    graphTags.push(GraphTagFactory.createFromJson(graphJSON));
}

const firstGraph = graphTags[0].getDisplayGraph();
const firstAlgGraph = graphTags[0].getAlgorithmGraph();

//Initializing algorithms
const bfs = new AlgorithmTag(
  "Breadth-first search (BFS)", 
  new CompatibilityTable(
    [Globals.GraphTypes.NORMAL, Globals.GraphTypes.DIRECTED],
    {[Globals.GraphTypes.WEIGHTED]: Globals.GraphTypes.NORMAL, 
     [Globals.GraphTypes.DIRECTED_WEIGHTED]: Globals.GraphTypes.DIRECTED   
    }, []
  ),
  BFSAlgorithm, BFSNodeStyler, BFSEdgeStyler, BFSSideComponentsFactory, BFSAlgorithmOptionsForm
);

const dfs = new AlgorithmTag(
    "Depth-first search (DFS)", 
    new CompatibilityTable(
        [Globals.GraphTypes.NORMAL, Globals.GraphTypes.DIRECTED],
        {[Globals.GraphTypes.WEIGHTED]: Globals.GraphTypes.NORMAL, 
         [Globals.GraphTypes.DIRECTED_WEIGHTED]: Globals.GraphTypes.DIRECTED   
        }, []
    ),
    DFSAlgorithm, DFSNodeStyler, DFSEdgeStyler, DFSSideComponentsFactory, DFSAlgorithmOptionsForm
);

const bcs = new AlgorithmTag(
    "Biconnected components search", 
    new CompatibilityTable(
        [Globals.GraphTypes.NORMAL],
        {[Globals.GraphTypes.DIRECTED]: Globals.GraphTypes.NORMAL,
         [Globals.GraphTypes.WEIGHTED]: Globals.GraphTypes.NORMAL, 
         [Globals.GraphTypes.DIRECTED_WEIGHTED]: Globals.GraphTypes.NORMAL   
        }, []
    ),
    BiconnectedComponentsSearchAlgorithm, BiconnectedComponentsSearchNodeStyler,
    BiconnectedComponentsSearchEdgeStyler, BiconnectedComponentsSearchSideComponentsFactory,
    BiconnectedComponentsSearchAlgorithmOptionsForm
);

const tarjan = new AlgorithmTag(
    "Tarjan algorithm",
    new CompatibilityTable(
        [Globals.GraphTypes.DIRECTED],
        {[Globals.GraphTypes.DIRECTED_WEIGHTED]: Globals.GraphTypes.DIRECTED},
        [Globals.GraphTypes.NORMAL, Globals.GraphTypes.WEIGHTED]
    ), 
    TarjanAlgorithm, TarjanNodeStyler, TarjanEdgeStyler, 
    TarjanSideComponentsFactory, TarjanAlgorithmOptionsForm
);

const algorithmTags = [bfs, dfs, bcs, tarjan];
const firstAlgorithmFacade = new AlgorithmFacade(firstAlgGraph, algorithmTags[0], "0");

//Initializing layouts
const layouts = {
    "Circlepack": new GraphologyGraphLayout(circlepack), "Circular": new GraphologyGraphLayout(circular), 
    "No overlap": new NoOverlapGraphLayout(), "Random": new GraphologyGraphLayout(random)};

//Creating graph context
export const GraphContext = createContext(null);

//App states
const AppStates = {
    GRAPH_PREVIEW: 0,
    GRAPH_CHOSEN: 1,
    ALGORITHM: 2
}

export default function AppControl() {

    //States and refs
    const [previousAppState, setPreviousAppState] = useState(AppStates.ALGORITHM);
    const [appState, setAppState] = useState(AppStates.ALGORITHM);

    const [previousGraphTag, setPreviousGraphTag] = useState(graphTags[0]);
    const [chosenGraphTagIndex, setChosenGraphTagIndex] = useState(-1);
    const [chosenGraphTag, setChosenGraphTag] = useState(graphTags[0]);

    const [previousAlgorithmTagIndex, setPreviousAlgorithmTagIndex] = useState(0);
    const [chosenAlgorithmTagIndex, setChosenAlgorithmTagIndex] = useState(0);
    const [options, setOptions] = useState(null);
    const [optionsForm, setOptionsForm] = useState(null);

    const [visibleGraph, setVisibleGraph] = useState(firstGraph);
    const [workingGraph, setWorkingGraph] = useState(firstGraph);

    const [graphRefreshState, setGraphRefreshState] = useState(true);
    const [sideComponents, setSideComponents] = useState(firstAlgorithmFacade.getCurrentSideComponents());

    const [algorithmFacade, setAlgorithmFacade] = useState(firstAlgorithmFacade);
    const [algorithmControlState, setAlgorithmControlState] = useState("start");
    const running = useRef(false);
    
    //Initializing opitons form
    if (options === null && optionsForm === null) {
        handleAlgorithmTagChooseChange(0);
    }
    
    //Handles graph choose change
    function handleGraphTagChooseChange (graphTagIndex) {

        setChosenGraphTagIndex(graphTagIndex);

        if (graphTagIndex === -1) {
            //Cleared
            setChosenGraphTag(previousGraphTag);
            setVisibleGraph(workingGraph);
            setAppState(previousAppState);

        } else {
            //Showing graph preview
            clearFileInput();
            setChosenGraphTag(graphTags[graphTagIndex]);
            setVisibleGraph(graphTags[graphTagIndex].getDisplayGraph());
            setAppState(AppStates.GRAPH_PREVIEW);

        }
    }

    //Handles graph input
    function handleGraphInputChange ( graphTag ) {

        if (graphTag === null) {
            //Input failure

            if (chosenGraphTagIndex === -1) {
                //Clearing preview of previously inputted
                setChosenGraphTag(previousGraphTag);
                setVisibleGraph(workingGraph);
                setAppState(previousAppState);
            }

            return;
        }

        //Successful input
        setChosenGraphTagIndex(-1);
        setChosenGraphTag(graphTag);
        setVisibleGraph(graphTag.getDisplayGraph());
        setAppState(AppStates.GRAPH_PREVIEW);

    }

    //Handles graph form submit
    function handleGraphFormSubmit () {

        setPreviousAppState(AppStates.GRAPH_CHOSEN);
        setAppState(AppStates.GRAPH_CHOSEN);
        setPreviousGraphTag(chosenGraphTag);
        setChosenGraphTagIndex(-1);
        clearFileInput();
        setVisibleGraph(chosenGraphTag.getDisplayGraph());
        setWorkingGraph(chosenGraphTag.getDisplayGraph());
        handleAlgorithmTagChooseChange(0);

    }

    //Handles graph form clear changes
    function handleGraphFormClearChanges() {
        
        setAppState(previousAppState);
        setChosenGraphTagIndex(-1);
        setChosenGraphTag(previousGraphTag);
        clearFileInput();
        setVisibleGraph(workingGraph);

    }

    //Handles algorithm choose change
    function handleAlgorithmTagChooseChange(algorithmTagIndex) {

        setChosenAlgorithmTagIndex(algorithmTagIndex);

        //Setting options
        const optionsFormClass = algorithmTags[algorithmTagIndex].getOptionsFormClass()
        const newOptionsForm = new optionsFormClass(options, setOptions, chosenGraphTag.getAlgorithmGraph());

        const defaultOptions = newOptionsForm.getDefaultOptions();
        newOptionsForm.setOptions(defaultOptions);
        setOptions(defaultOptions);
        setOptionsForm(newOptionsForm);

    }

    //Handles algortihm form submit
    function handleAlgorithmFormSubmit() {

        let graphTag = chosenGraphTag;

        //Checking convertibility
        const algorithmTag = algorithmTags[chosenAlgorithmTagIndex];
        const compatibilityTable = algorithmTag.getCompatibilityTable();
        const graphType = graphTag.getType();

        if (compatibilityTable.isConvertible(graphType)) {
            //Graph should be converted
            const graphTagCopy = graphTag.clone();
            const convertibleTo = compatibilityTable.getConvertibleTo(graphType);
            graphTagCopy.convertTo(convertibleTo);

            graphTag = graphTagCopy;
            setChosenGraphTag(graphTag);
            setPreviousGraphTag(graphTag);
        }

        const displayGraph = graphTag.getDisplayGraph();
        const algorithmGraph = graphTag.getAlgorithmGraph();
        const localAlgorithmFacade = new AlgorithmFacade(algorithmGraph, algorithmTags[chosenAlgorithmTagIndex], ...options);

        setVisibleGraph(displayGraph);
        setWorkingGraph(displayGraph);
        setAppState(AppStates.ALGORITHM);
        setPreviousAppState(AppStates.ALGORITHM);
        handleAlgorithmTagChooseChange(chosenAlgorithmTagIndex);
        setPreviousAlgorithmTagIndex(chosenAlgorithmTagIndex);

        setAlgorithmFacade(localAlgorithmFacade);
        setSideComponents(localAlgorithmFacade.getCurrentSideComponents());
        running.current = false;
        setAlgorithmControlState("start");

    }

    //Handles algorithm form clear changes
    function handleAlgorithmFormClearChanges() {

        handleAlgorithmTagChooseChange(previousAlgorithmTagIndex);

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

    //Determining displayed components based on app state
    let algorithmFormDisplay = 'block';
    let algorithmControlPanelDisplay = 'block';
    let sidePanelDisplay = 'block';
    let graphCardClassName = 'p-0 bg-light';

    if (appState === AppStates.GRAPH_PREVIEW) {
        algorithmFormDisplay = 'none';
        algorithmControlPanelDisplay = 'none';
        sidePanelDisplay = 'none';
        graphCardClassName += ' border border-5 border-primary-subtle'; 
    } else if (appState === AppStates.GRAPH_CHOSEN) {
        algorithmControlPanelDisplay = 'none';
        sidePanelDisplay = 'none';
    }

    return (
        <>
            <GraphForm graphTags={graphTags} graphTagIndex={chosenGraphTagIndex} 
                handleGraphChooseChange={handleGraphTagChooseChange} handleGraphInputChange={handleGraphInputChange} 
                handleSubmit={handleGraphFormSubmit} handleClear={handleGraphFormClearChanges}/>
            <div className='m-0 p-0' style={{display: algorithmFormDisplay}}>
                <AlgorithmForm algorithmTags={algorithmTags} algortihmTagIndex={chosenAlgorithmTagIndex} 
                    handleAlgorithmChooseChange={handleAlgorithmTagChooseChange} optionsForm={optionsForm}
                    handleSubmit={handleAlgorithmFormSubmit} handleClear={handleAlgorithmFormClearChanges} 
                    graphTag={chosenGraphTag}/>
            </div>

            <Container className='px-5 mb-5' fluid={true}>
                <Row className='p-0 m-0'>
                    <Col className="col-12 col-xl-8 p-0 pe-xl-2 mt-0">
                        <Card className={graphCardClassName}>
                            <Card.Body className='m-0 p-0'>
                                <GraphCanvas graph={visibleGraph} refreshState={graphRefreshState} layouts={layouts} />
                                
                                <div className='p-0 m-0' style={{display: algorithmControlPanelDisplay}}>
                                    <AlgorithmControlPanel running={running} controlState={algorithmControlState} 
                                        setControlStateFunc={setAlgorithmControlState} 
                                        algorithmFacade={algorithmFacade} updateFunc={update} />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="col-12 col-xl-4 pt-3 pb-0 ps-0 pe-0 pt-xl-0 pb-xl-0 ps-xl-2 pe-xl-0 m-xl-0">
                        <GraphContext.Provider value={graphContextValue}>
                            <div className='p-0 m-0' style={{display: sidePanelDisplay}}>
                                <SidePanel sideComponents={sideComponents} />
                            </div>
                        </GraphContext.Provider>
                    </Col>
                </Row>
            </Container>
        </>
    );

}
