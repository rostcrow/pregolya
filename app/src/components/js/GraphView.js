
// IMPORT
// React
import { useEffect } from "react";

// React Bootstrap
import Card from 'react-bootstrap/Card';

// React Sigma
import { SigmaContainer, useSigma, useLoadGraph, ControlsContainer, FullScreenControl,} from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";

// Sigma.js
import EdgeCurveProgram, { EdgeCurvedArrowProgram } from "@sigma/edge-curve";
import {EdgeRectangleProgram, EdgeArrowProgram} from "sigma/rendering";

// Graphology
import { MultiGraph } from "graphology";

// My components
import RescaleControl from "./RescaleControl.js";
import ZoomControl from "./ZoomControl.js";

// My programs
import EdgeLoopProgram from "../../programs/EdgeLoopProgram/EdgeLoopProgram.ts";
import EdgeLoopArrowProgram from "../../programs/EdgeLoopArrowProgram/EdgeLoopArrowProgram.ts";
import MyNodeProgram from "../../programs/MyNodeProgram/MyNodeProgram.ts";

// CODE
// Component that loads the graph
function LoadGraph( {graph, layout} ) {
  const loadGraph = useLoadGraph();
  const sigma = useSigma();

  useEffect(() => {

    //Setting layout
    layout.assign(graph);

    //Loading graph
    loadGraph(graph);

  }, [loadGraph, sigma, graph, layout]);

  return null;
};

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

// Component that displays the graph WITHOUT ability of maneuvering nodes. Similar to GraphCanvas.
export default function GraphView ( {graph, layout} ) {

    return (
        <Card className="m-0 p-0">
            <Card.Body className="m-0 p-1">
                <SigmaContainer style={sigmaStyle} settings={sigmaSettings} graph={MultiGraph}>
                    <LoadGraph graph={graph} layout={layout}/>
                    <ControlsContainer position="bottom-right">
                        <ZoomControl />
                        <RescaleControl />
                        <FullScreenControl />
                    </ControlsContainer>
                </SigmaContainer>
            </Card.Body>
        </Card>
    );

}