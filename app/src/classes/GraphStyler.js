import { indexParallelEdgesIndex, DEFAULT_EDGE_CURVATURE} from "@sigma/edge-curve";

const DEFAULT_NODE_COLOR = "#0000FF";
const DEFAULT_NODE_SIZE = 15;
const DEFAULT_EDGE_SIZE = 5;

export default class GraphStyler{
    constructor(nodeColor = DEFAULT_NODE_COLOR, nodeSize = DEFAULT_NODE_SIZE, edgeSize = DEFAULT_EDGE_SIZE) {
        this.nodeColor = nodeColor;
        this.nodeSize = nodeSize;
        this.edgeSize = edgeSize;
    }

    style(graph) {
        let nodes = graph.nodes();
        let nodesLength = nodes.length;
        for (let i = 0; i < nodesLength; i++) {
            let node = nodes[i];

            graph.setNodeAttribute(node, "size", this.nodeSize);
            graph.setNodeAttribute(node, "color", this.nodeColor);
        }

        let edges = graph.edges();
        let edgesLength = edges.length;
        for (let i = 0; i < edgesLength; i++) {
            let edge = edges[i];

            graph.setEdgeAttribute(edge, "size", this.edgeSize);

            if (graph.getAttribute("weighted")) {
                graph.setEdgeAttribute(edge, "label", graph.getEdgeAttribute(edge, "weight").toString());
                graph.setEdgeAttribute(edge, "forceLabel", true);
            }

            graph.setEdgeAttribute(edge, "parallelIndex", "");
            graph.setEdgeAttribute(edge, "parallelMaxIndex", "");
        }

        //Determining edge types
        indexParallelEdgesIndex(graph, { edgeIndexAttribute: "parallelIndex", edgeMaxIndexAttribute: "parallelMaxIndex"});

        for (let i = 0; i < edgesLength; i++) {
            let edge = edges[i];

            if (graph.getEdgeAttribute(edge, "parallelMaxIndex") != null) {

                //Parallel edge
                let parallelIndex = graph.getEdgeAttribute(edge, "parallelIndex");
                let parallelMaxIndex = graph.getEdgeAttribute(edge, "parallelMaxIndex");

                graph.setEdgeAttribute(edge, "curvature", 
                    DEFAULT_EDGE_CURVATURE + (3 * DEFAULT_EDGE_CURVATURE * parallelIndex) / (parallelMaxIndex || 1));
                
                if (graph.getAttribute("directed")) {
                    graph.setEdgeAttribute(edge, "type", "curvedArrow");
                } else {
                    graph.setEdgeAttribute(edge, "type", "curved");
                }
            } else {

                //Non-parallel edge
                if (graph.getAttribute("directed")) {
                    graph.setEdgeAttribute(edge, "type", "arrow");
                } else {
                    graph.setEdgeAttribute(edge, "type", "line");
                }
            }
        }
    }
}