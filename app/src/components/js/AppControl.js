
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
import GraphDataApplier from '../../classes/GraphDataApplier.js';
import AlgorithmTag from '../../classes/AlgorithmTag.js';
import BFSAlgorithm from '../../classes/BFSAlgorithm.js';
import BFSNodeAttributesAdapter from '../../classes/BFSNodeAttributesAdapter.js';
import BFSEdgeAttributesAdapter from '../../classes/BFSEdgeAttributesAdapter.js';
import BFSSideComponentsFactory from '../../classes/BFSSideComponentsFactory.js';
import AlgorithmFacade from '../../classes/AlgorithmFacade.js';
import GraphAlgorithmForm from './GraphAlgorithmForm.js';
import BFSAlgorithmOptionsForm from '../../classes/BFSAlgorithmOptionsForm.js';
import GraphTag from '../../classes/GraphTag.js';

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
  "Breadth-first search (BFS)", 
  BFSAlgorithm, BFSNodeAttributesAdapter, BFSEdgeAttributesAdapter, BFSSideComponentsFactory, BFSAlgorithmOptionsForm
);

const algorithmTags = [bfs];
const firstAlgorithmFacade = new AlgorithmFacade(firstAlgGraph, algorithmTags[0], "0");

export default function AppControl() {

    //States
    const [currentVisibleGraph, setCurrentVisibleGraph] = useState(firstGraph);
    const [currentWorkingGraph, setCurrentWorkingGraph] = useState(firstGraph);

    const [selectedGraphIndex, setSelectedGraphIndex] = useState(-1);
    const [graphPreview, setGraphPreview] = useState(false);
    const [selectedAlgorithmIndex, setSelectedAlgorithmIndex] = useState(-1);
    const [options, setOptions] = useState([]);
    const [optionsForm, setOptionsForm] = useState(null);

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
            setCurrentVisibleGraph(graphTags[graphIndex].getDisplayGraph());
            setGraphPreview(true);
        }

        changeAlgorithmOptionsForm(graphIndex, selectedAlgorithmIndex);
    }

    //Handling algorithm change in form
    function changeAlgorithm (algorithmIndex) {
        setSelectedAlgorithmIndex(algorithmIndex);
        changeAlgorithmOptionsForm(selectedGraphIndex, algorithmIndex);
    }

    //Handling options form change
    function changeAlgorithmOptionsForm (graphIndex, algorithmIndex) {

        if (graphIndex !== -1 && algorithmIndex !== -1) {
            //Options form shown

            const optionsFormClass = algorithmTags[algorithmIndex].getOptionsFormClass();
            const optionsForm = new optionsFormClass(options, setOptions, graphTags[graphIndex].getAlgorithmGraph());
            const defaultOptions = optionsForm.getDefaultOptions();

            setOptions(defaultOptions);
            setOptionsForm(optionsForm);

        } else {
            //Options form hidden

            setOptions([]);
            setOptionsForm(null);
        }
    }

    //Handling form change
    function changeCurrents() {
        const graphTag = graphTags[selectedGraphIndex];
        const graph = graphTag.getDisplayGraph();
        const algorithmGraph = graphTag.getAlgorithmGraph();
        const algorithmFacade = new AlgorithmFacade(algorithmGraph, algorithmTags[selectedAlgorithmIndex], ...options);

        setSelectedGraphIndex(-1);
        setSelectedAlgorithmIndex(-1);
        setOptions([]);
        setOptionsForm(null);
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
      const graphAttributes = currentAlgorithmFacade.getCurrentGraphAttributes();
      GraphDataApplier.apply(currentWorkingGraph, graphAttributes);
      setGraphRefreshState(graphRefreshState => !graphRefreshState);
  
      //Updating SidePanel
      const sideComp = currentAlgorithmFacade.getCurrentSideComponents();
      setSideComponents(sideComp);
    }

    return (
        <>
            <GraphAlgorithmForm graphTags={graphTags} algorithmTags={algorithmTags} 
                graphIndex={selectedGraphIndex} changeGraphFunc={changeGraph}
                algorithmIndex={selectedAlgorithmIndex} changeAlgorithmFunc={changeAlgorithm}
                changeCurrentsFunc={changeCurrents} optionsForm={optionsForm}/>
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
