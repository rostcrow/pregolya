
// IMPORT
// React
import { useEffect, useState } from "react";

// React boostrap
import Card from 'react-bootstrap/Card';

// React Sigma
import { SigmaContainer, useRegisterEvents, useSigma, useLoadGraph, ControlsContainer, FullScreenControl,} from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";

// Sigma.js
import EdgeCurveProgram, { EdgeCurvedArrowProgram } from "@sigma/edge-curve";
import {EdgeRectangleProgram, EdgeArrowProgram} from "sigma/rendering";

// Graphology
import { MultiGraph } from "graphology";

// My components
import LayoutControl from "./LayoutControl.js";
import RescaleControl from "./RescaleControl.js";
import ZoomControl from "./ZoomControl.js";

// My classes
import EdgeResetGraphLayout from "../../classes/EdgeResetGraphLayout.js";

// My programs
import EdgeLoopProgram from "../../programs/EdgeLoopProgram/EdgeLoopProgram.ts";
import EdgeLoopArrowProgram from "../../programs/EdgeLoopArrowProgram/EdgeLoopArrowProgram.ts";
import MyNodeProgram from "../../programs/MyNodeProgram/MyNodeProgram.ts";

// My css
import "../css/GraphCanvas.css";

// CODE
// Component that loads the graph
function LoadGraph( {graph, layout} ) {
  const loadGraph = useLoadGraph();
  const sigma = useSigma();

  useEffect(() => {

    // Setting autoscale
    sigma.setCustomBBox(null);

    // Assigning layout
    layout.assign(graph);

    // Loading graph
    loadGraph(graph);

  }, [loadGraph, sigma, graph, layout]);

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

// Component that refreshes graph when state changes
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

// Component that displays the graph with ability of maneuvering nodes
export default function GraphCanvas( {graph, refreshState, layouts} ) {

  const [currentLayoutKeyIndex, setCurrentLayoutKeyIndex] = useState(0);

  const layoutKeys = Object.keys(layouts);
  const layoutKeysLen = layoutKeys.length;

  const currentLayoutKey = layoutKeys[currentLayoutKeyIndex];
  const currentLayout = layouts[currentLayoutKey];

  // Handles layout key change
  function changeLayoutKey() {
    
    // Resetting graphs edges
    new EdgeResetGraphLayout().assign(graph);

    // Changing layout
    setCurrentLayoutKeyIndex(currentLayoutKeyIndex => (currentLayoutKeyIndex + 1) % layoutKeysLen);
  }

  return (
    <>
      <Card className="p-0">
        <Card.Body className="m-0 p-1">
          <SigmaContainer style={sigmaStyle} settings={sigmaSettings} graph={MultiGraph}>
            <GraphEvents />
            <LoadGraph graph={graph} layout={currentLayout}/>
            <Refresher state={refreshState} />
            <ControlsContainer position="bottom-right">
              <ZoomControl />
              <RescaleControl />
              <LayoutControl layoutKey={currentLayoutKey} changeLayoutKeyFunc={changeLayoutKey}/>
              <FullScreenControl/>
            </ControlsContainer>
          </SigmaContainer>
        </Card.Body>
      </Card>
    </>
  );
};