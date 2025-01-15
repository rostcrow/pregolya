
import Graph from "graphology";
import { indexParallelEdgesIndex, DEFAULT_EDGE_CURVATURE} from "@sigma/edge-curve";

const DEFAULT_NODE_COLOR = "#0000FF";
const DEFAULT_NODE_SIZE = 15;
const DEFAULT_EDGE_SIZE = 8;

export default class GraphFactory {

    #createRawGraph (graph, keepEdgeKeys) {

        //Creating new raw graph
        console.log(graph.type.toString());
        let rawGraph = new Graph({multi: true, type: graph.type});
        if (rawGraph.type == "directed") {
            rawGraph.setAttribute("directed", true);
        } else {
            rawGraph.setAttribute("directed", false);
        }
        rawGraph.setAttribute("weighted", graph.getAttribute("weighted"));

        //Creating nodes
        graph.forEachNode((node) => {
            rawGraph.addNode(node);
        });

        /*
            Creating edge key generator
            Used only when keepEdgeKeys is false
        */
        function incrementalId() {
            let i = 0;

            return () => i++;
        }

        const edgeKeyGenerator = incrementalId();

        //Creating edges
        graph.forEachEdge((edge, attributes, source, target) => {
            
            //Setting key
            let key;

            if (keepEdgeKeys) {
                //Using old key
                key = edge;
            } else {
                //Using newly generated key
                key = edgeKeyGenerator();
            }

            //Creating edge
            rawGraph.addEdgeWithKey(key, source, target);

            //Adding weight attribute if needed
            if (graph.hasEdgeAttribute(edge, "weight")) {
                let weight = graph.getEdgeAttribute(edge, "weight");
                rawGraph.setEdgeAttribute(key, "weight", weight);
            }
        });

        return rawGraph;
    }

    #createGraphFromJSON (jsonObject) {
        let directed = jsonObject['attributes']['directed'];
        let directedString = "un".repeat(!directed) + "directed";

        let graph = new Graph({multi: true, type: directedString});
        graph.import(jsonObject);
        return graph;
    }

    createDisplayGraphFromGraph(graph, keepEdgeKeys) {
        
        let displayGraph = this.#createRawGraph(graph, keepEdgeKeys);
        console.log("Display: " + displayGraph.type);

        //Setting size and color to nodes
        displayGraph.forEachNode((node) => {
            displayGraph.setNodeAttribute(node, "size", DEFAULT_NODE_SIZE);
            displayGraph.setNodeAttribute(node, "color", DEFAULT_NODE_COLOR);
        })

        //Setting edges
        displayGraph.forEachEdge((edge) => {

            //Setting edge size
            displayGraph.setEdgeAttribute(edge, "size", DEFAULT_EDGE_SIZE);

            //Setting weight label
            if (displayGraph.getAttribute("weighted")) {
                if (displayGraph.hasEdgeAttribute(edge, "weight")) {

                    let weight = displayGraph.getEdgeAttribute(edge, "weight").toString();
                    displayGraph.setEdgeAttribute(edge, "label", weight);
                    displayGraph.setEdgeAttribute(edge, "forceLabel", true);

                } else {
                    //Edge in weighted graph doesn't have weight
                    console.log("ERROR: Edge in weighted graph doesn't have weight attribute");
                }
            }
            
            //Setting variables for parallel edges
            displayGraph.setEdgeAttribute(edge, "parallelIndex", "");
            displayGraph.setEdgeAttribute(edge, "parallelMaxIndex", "");
        });

        //Determining edge types
        indexParallelEdgesIndex(displayGraph, { edgeIndexAttribute: "parallelIndex", edgeMaxIndexAttribute: "parallelMaxIndex"});

        displayGraph.forEachEdge((edge, attributes, source, target) => {

            if (source === target) {
                //Loop edge

                if (displayGraph.getAttribute("directed")) {
                    displayGraph.setEdgeAttribute(edge, "type", "loopArrow");
                } else {
                    displayGraph.setEdgeAttribute(edge, "type", "loop");
                }
                
            } else {

                if (displayGraph.getEdgeAttribute(edge, "parallelIndex") != null) {
                    //Parallel edge
                    
                    let parallelIndex = displayGraph.getEdgeAttribute(edge, "parallelIndex");
                    let parallelMaxIndex = displayGraph.getEdgeAttribute(edge, "parallelMaxIndex");

                    displayGraph.setEdgeAttribute(edge, "curvature", 
                        DEFAULT_EDGE_CURVATURE + (3 * DEFAULT_EDGE_CURVATURE * parallelIndex) / (parallelMaxIndex || 1));
                    
                    if (displayGraph.getAttribute("directed")) {
                        displayGraph.setEdgeAttribute(edge, "type", "curvedArrow");
                    } else {
                        displayGraph.setEdgeAttribute(edge, "type", "curved");
                    }

                } else {
                    //Non-parallel edge

                    if (displayGraph.getAttribute("directed")) {
                        displayGraph.setEdgeAttribute(edge, "type", "arrow");
                    } else {
                        displayGraph.setEdgeAttribute(edge, "type", "line");
                    }
                }
            }
        });

        return displayGraph;
    }

    createDisplayGraphFromJSON (json) {
        let jsonGraph = this.#createGraphFromJSON(json);
        return this.createDisplayGraphFromGraph (jsonGraph, false);
    }

}