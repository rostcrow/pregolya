//Importing libraries and build-in files
import { useEffect, useState } from "react";
import { SigmaContainer, useRegisterEvents, useSigma, useLoadGraph, ControlsContainer, FullScreenControl,} from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";
import Card from 'react-bootstrap/Card';
import EdgeCurveProgram, { EdgeCurvedArrowProgram } from "@sigma/edge-curve";
import {EdgeRectangleProgram, EdgeArrowProgram} from "sigma/rendering";
import { MultiGraph } from "graphology";

//Importing layouts
import circlepack from "graphology-layout/circlepack";
import circular from "graphology-layout/circular";
import random from "graphology-layout/random";

//Importing my classes
import EdgeLoopProgram from "../../programs/EdgeLoopProgram/EdgeLoopProgram.ts";
import EdgeLoopArrowProgram from "../../programs/EdgeLoopArrowProgram/EdgeLoopArrowProgram.ts";
import LayoutControl from "../LayoutControl/LayoutControl.js";
import GraphologyGraphLayout from "../../classes/GraphologyGraphLayout.js";
import NoOverlapGraphLayout from "../../classes/NoOverlapGraphLayout.js";
import RescaleControl from "../RescaleControl/RescaleControl.js";
import ZoomControl from "../ZoomControl/ZoomControl.js";
import MyNodeProgram from "../../programs/MyNodeProgram/MyNodeProgram.ts";

//Importing css
import "./GraphCanvas.css";

//Layouts
const layouts = {
  "Circlepack": new GraphologyGraphLayout(circlepack), "Circular": new GraphologyGraphLayout(circular), 
  "No overlap": new NoOverlapGraphLayout(), "Random": new GraphologyGraphLayout(random)};

const layoutKeys = Object.keys(layouts);
const layoutKeysLength = layoutKeys.length;
let currentLayoutKeyIndex = 0;

// Component that loads the graph
function LoadGraph( {graph, layoutKey} ) {
  const loadGraph = useLoadGraph();
  const sigma = useSigma();

  useEffect(() => {

    //Setting autoscale
    sigma.setCustomBBox(null);

    //Assigning layout
    layouts[layoutKey].assign(graph);

    //Loading graph
    loadGraph(graph);

  }, [loadGraph, sigma, graph, layoutKey]);

  return null;
};

// Component that handles graph events 
function GraphEvents() {
  const registerEvents = useRegisterEvents();
  const sigma = useSigma();
  const [draggedNode, setDraggedNode] = useState(null);

  useEffect(() => {
    // Register the events
    registerEvents({
      downNode: (e) => {
        setDraggedNode(e.node);
        sigma.getGraph().setNodeAttribute(e.node, "highlighted", true);
      },
      // On mouse move, if the drag mode is enabled, we change the position of the draggedNode
      mousemovebody: (e) => {
        if (!draggedNode) return;
        // Get new position of node
        const pos = sigma.viewportToGraph(e);
        sigma.getGraph().setNodeAttribute(draggedNode, "x", pos.x);
        sigma.getGraph().setNodeAttribute(draggedNode, "y", pos.y);

        // Prevent sigma to move camera:
        e.preventSigmaDefault();
        e.original.preventDefault();
        e.original.stopPropagation();
      },
      // On mouse up, we reset the autoscale and the dragging mode
      mouseup: () => {
        if (draggedNode) {
          setDraggedNode(null);
          sigma.getGraph().removeNodeAttribute(draggedNode, "highlighted");
        }
      },
      // Disable the autoscale at the first down interaction
      mousedown: () => {
        if (!sigma.getCustomBBox()) sigma.setCustomBBox(sigma.getBBox());
      },
    });
  }, [registerEvents, sigma, draggedNode]);

  return null;
}

//Component that refreshes graph when state changes
function Refresher( {state} ) {

  const sigma = useSigma();

  useEffect (() => {
    sigma.refresh();
  }, [sigma, state]);

}

const sigmaStyle = {height: "500px", width: "100%", margin: "0px", padding: "0px"};
const sigmaSettings = {allowInvalidContainer: true, renderEdgeLabels: true, defaultEdgeType: "line", 
  nodeProgramClasses: {
    circle: MyNodeProgram
  },
  edgeProgramClasses: {
  line: EdgeRectangleProgram,
  arrow: EdgeArrowProgram,
  curved: EdgeCurveProgram,
  curvedArrow: EdgeCurvedArrowProgram,
  loop: EdgeLoopProgram,
  loopArrow: EdgeLoopArrowProgram
}};

// Component that displays the graph
export default function GraphCanvas( {graph, refreshState} ) {

  const [currentLayoutKey, setCurrentLayoutKey] = useState(layoutKeys[currentLayoutKeyIndex]);

  //Handling layout key change
  function changeLayoutKey() {
    currentLayoutKeyIndex = (currentLayoutKeyIndex + 1) % layoutKeysLength;
    setCurrentLayoutKey(layoutKeys[currentLayoutKeyIndex]);
  }

  return (
    <>
      <Card className="mx-3 my-3 p-0">
        <Card.Body className="m-0 p-1">
          <SigmaContainer style={sigmaStyle} settings={sigmaSettings} graph={MultiGraph}>
            <GraphEvents />
            <LoadGraph graph={graph} layoutKey={currentLayoutKey}/>
            <Refresher state={refreshState} />
            <ControlsContainer position="bottom-right">
              <ZoomControl />
              <RescaleControl />
              <FullScreenControl/>
              <LayoutControl layoutKey={currentLayoutKey} changeLayoutKeyFunc={changeLayoutKey}/>
            </ControlsContainer>
          </SigmaContainer>
        </Card.Body>
      </Card>
    </>
  );
};