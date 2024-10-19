import { useEffect, useState } from "react";
import Graph from "graphology";
import { SigmaContainer, useRegisterEvents, useSigma, useLoadGraph, } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";
import "./GraphCanvas.css";
import Card from 'react-bootstrap/Card';

// Component that loads the graph
function LoadGraph() {
  const loadGraph = useLoadGraph();
  
  useEffect(() => {
    
    let g = new Graph();
    g.addNode("0", {"x": 0, "y": 0, "size": 15, "color": "blue"});
    g.addNode("1", {"x": 10, "y": 70, "size": 15, "color": "blue"});
    g.addNode("2", {"x": 20, "y": 10, "size": 15, "color": "blue"});
    g.addNode("3", {"x": 30, "y": 60, "size": 15, "color": "blue"});
    g.addNode("4", {"x": 30, "y": 20, "size": 15, "color": "blue"});
    g.addNode("5", {"x": 20, "y": 50, "size": 15, "color": "blue"});
    g.addNode("6", {"x": 10, "y": 30, "size": 15, "color": "blue"});
    g.addNode("7", {"x": 0, "y": 40, "size": 15, "color": "blue"});
    g.addEdge("0", "1");
    g.addEdge("0", "2");
    g.addEdge("1", "2");
    g.addEdge("1", "3");
    g.addEdge("2", "3");
    g.addEdge("3", "7");
    g.addEdge("3", "5");
    g.addEdge("4", "6");
    g.addEdge("5", "6");
    g.addEdge("5", "7");
    loadGraph(g);
  
  }, [loadGraph]);

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
// Component that displays the graph
export default function GraphCanvas() {
  return (
    <>
      <Card className="w-75 mx-3 my-3 p-0">
        <Card.Body className="m-0 p-1">
          <SigmaContainer style={sigma_style} >
            <GraphEvents />
            <LoadGraph />
          </SigmaContainer>
        </Card.Body>
      </Card>
    </>
  );
};