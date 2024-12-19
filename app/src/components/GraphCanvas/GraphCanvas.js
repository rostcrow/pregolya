import { useEffect, useState } from "react";
import { AiOutlineZoomIn, AiOutlineZoomOut, } from "react-icons/ai";
import { MdFilterCenterFocus, } from "react-icons/md";
import { SigmaContainer, useRegisterEvents, useSigma, useLoadGraph, ControlsContainer, ZoomControl, FullScreenControl,} from "@react-sigma/core";
import circlepack from "graphology-layout/circlepack";
import "@react-sigma/core/lib/react-sigma.min.css";
import "./GraphCanvas.css";
import Card from 'react-bootstrap/Card';
import { MultiGraph } from "graphology";
import EdgeCurveProgram, { EdgeCurvedArrowProgram } from "@sigma/edge-curve";
import {EdgeRectangleProgram, EdgeArrowProgram} from "sigma/rendering";
import EdgeLoopProgram from "../../programs/EdgeLoopProgram.ts";

// Component that loads the graph
function LoadGraph( {graph} ) {
  const loadGraph = useLoadGraph();

  useEffect(() => {

    //Assigning circlepack layout
    circlepack.assign(graph);

    //Loading graph
    loadGraph(graph);

  }, [loadGraph, graph,]);

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


const sigma_style = {height: "500px", width: "100%", margin: "0px", padding: "0px"};
const sigma_settings = {allowInvalidContainer: true, renderEdgeLabels: true, defaultEdgeType: "line", edgeProgramClasses: {
  line: EdgeRectangleProgram,
  arrow: EdgeArrowProgram,
  curved: EdgeCurveProgram,
  curvedArrow: EdgeCurvedArrowProgram,
  loop: EdgeLoopProgram
}};
// Component that displays the graph
export default function GraphCanvas( {graph} ) {
  return (
    <>
      <Card className="w-75 mx-3 my-3 p-0">
        <Card.Body className="m-0 p-1">
          <SigmaContainer style={sigma_style} settings={sigma_settings} graph={MultiGraph}>
            <GraphEvents />
            <LoadGraph graph={graph}/>
            <ControlsContainer position="bottom-right">
              <ZoomControl labels={{ zoomIn: "Zoom in", zoomOut: "Zoom out", reset: "Reset zoom"}}>
                <AiOutlineZoomIn />
                <AiOutlineZoomOut />
                <MdFilterCenterFocus />
              </ZoomControl>
              <FullScreenControl/>
            </ControlsContainer>
          </SigmaContainer>
        </Card.Body>
      </Card>
    </>
  );
};