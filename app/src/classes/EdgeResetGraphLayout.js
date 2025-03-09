import GraphLayout from "./GraphLayout"

import { indexParallelEdgesIndex, DEFAULT_EDGE_CURVATURE } from '@sigma/edge-curve';

export default class EdgeResetGraphLayout extends GraphLayout {

    assign(graph) {

        const isDirected = graph.getAttribute("directed");

        //Counting parallel index for each edge - used for curved edges
        indexParallelEdgesIndex(graph, { edgeIndexAttribute: "parallelIndex", edgeMaxIndexAttribute: "parallelMaxIndex"});

        //Resetting edge types
        graph.forEachEdge((edge, attributes, source, target) => {

            //Determining edge type
            if (source === target) {
                //Loop edge

                if (isDirected) {
                    graph.setEdgeAttribute(edge, "type", "loopArrow");
                } else {
                    graph.setEdgeAttribute(edge, "type", "loop");
                }
                
            } else {

                if (graph.getEdgeAttribute(edge, "parallelIndex") != null) {
                    //Parallel edge
                    
                    let parallelIndex = graph.getEdgeAttribute(edge, "parallelIndex");
                    let parallelMaxIndex = graph.getEdgeAttribute(edge, "parallelMaxIndex");

                    graph.setEdgeAttribute(edge, "curvature", 
                        DEFAULT_EDGE_CURVATURE + (3 * DEFAULT_EDGE_CURVATURE * parallelIndex) / (parallelMaxIndex || 1));
                    
                    if (isDirected) {
                        graph.setEdgeAttribute(edge, "type", "curvedArrow");
                    } else {
                        graph.setEdgeAttribute(edge, "type", "curved");
                    }

                } else {
                    //Non-parallel edge

                    if (isDirected) {
                        graph.setEdgeAttribute(edge, "type", "arrow");
                    } else {
                        graph.setEdgeAttribute(edge, "type", "line");
                    }
                }
            }
        });
    }

}