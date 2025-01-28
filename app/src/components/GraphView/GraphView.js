//Importing libraries and build-in files
import { useEffect } from "react";
import { SigmaContainer, useSigma, useLoadGraph, ControlsContainer, FullScreenControl,} from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";
import Card from 'react-bootstrap/Card';
import EdgeCurveProgram, { EdgeCurvedArrowProgram } from "@sigma/edge-curve";
import {EdgeRectangleProgram, EdgeArrowProgram} from "sigma/rendering";
import { MultiGraph } from "graphology";

//Importing layouts
import circlepack from "graphology-layout/circlepack";

//Importing my classes
import EdgeLoopProgram from "../../programs/EdgeLoopProgram/EdgeLoopProgram.ts";
import EdgeLoopArrowProgram from "../../programs/EdgeLoopArrowProgram/EdgeLoopArrowProgram.ts";
import RescaleControl from "../RescaleControl/RescaleControl.js";
import ZoomControl from "../ZoomControl/ZoomControl.js";
import MyNodeProgram from "../../programs/MyNodeProgram/MyNodeProgram.ts";

// Component that loads the graph
function LoadGraph( {graph} ) {
  const loadGraph = useLoadGraph();
  const sigma = useSigma();

  useEffect(() => {

    //Setting layout
    circlepack.assign(graph);

    //Loading graph
    loadGraph(graph);

  }, [loadGraph, sigma, graph]);

  return null;
};

//Component that refreshes graph when state changes
function Refresher( {state} ) {

    const sigma = useSigma();
  
    useEffect (() => {
      sigma.refresh();
    }, [sigma, state]);
  
}

const sigmaStyle = {height: "300px", width: "100%", margin: "0px", padding: "0px"};
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

export default function GraphView ( {graph, refreshState} ) {

    return (
        <Card className="m-0 p-0">
            <Card.Body className="m-0 p-1">
                <SigmaContainer style={sigmaStyle} settings={sigmaSettings} graph={MultiGraph}>
                    <LoadGraph graph={graph}/>
                    <Refresher state={refreshState}/>
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