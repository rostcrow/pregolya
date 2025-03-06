
import Graph from "graphology";
import Globals from "./Globals";
import { indexParallelEdgesIndex, DEFAULT_EDGE_CURVATURE } from '@sigma/edge-curve';
import ErrorThrower from "./ErrorThrower";

export default class GraphFactory {

    static createAlgorithmGraph(graphData) {
        
        const type = "un".repeat(!graphData.isDirected()) + "directed";
        let graph = new Graph({multi: true, type: type});

        const nodes = graphData.getNodes();
        const edges = graphData.getEdges();

        //Setting graph type
        graph.setAttribute("directed", graphData.isDirected());
        graph.setAttribute("weighted", graphData.isWeighted());

        //Adding nodes
        for (const key in nodes) {
            graph.addNode(nodes[key]["key"]);
        }

        //Adding edges
        for (const key in edges) {

            graph.addEdgeWithKey(key, edges[key]["source"], edges[key]["target"]);

            //Adding weigth
            if (graphData.isWeighted()) {
                graph.setEdgeAttribute(key, "weight", edges[key]["weight"]);
            }
        }

        return graph;
    }

    static createDisplayGraph(graphData) {

        let graph = this.createAlgorithmGraph(graphData).copy();

        const nodes = graphData.getNodes();
        const edges = graphData.getEdges();

        //Setting attributes to nodes
        graph.forEachNode((node) => {

            //Setting default visual attributes
            const defaultAttributes = {"size": Globals.Sizes.DEFAULT_NODE_SIZE, "color": Globals.Colors.DEFAULT_NODE_COLOR, "label": node};
            graph.mergeNodeAttributes(node, defaultAttributes);

            //Setting attributes from graph data
            const nodeAttributes = nodes[node];
            graph.mergeNodeAttributes(node, nodeAttributes);
        });

        //Counting parallel index for each edge - used for curved edges
        indexParallelEdgesIndex(graph, { edgeIndexAttribute: "parallelIndex", edgeMaxIndexAttribute: "parallelMaxIndex"});

        //Setting attributes to edges
        graph.forEachEdge((edge, attributes, source, target) => {

            //Setting default visual attributes
            const defaultAttributes = {"size": Globals.Sizes.DEFAULT_EDGE_SIZE, "color": Globals.Colors.DEFAULT_EDGE_COLOR};
            graph.mergeEdgeAttributes(edge, defaultAttributes);

            //Setting weight label
            if (graphData.isWeighted()) {
                if (graph.hasEdgeAttribute(edge, "weight")) {

                    let weight = graph.getEdgeAttribute(edge, "weight").toString();
                    graph.setEdgeAttribute(edge, "label", weight);
                    graph.setEdgeAttribute(edge, "forceLabel", true);

                } else {
                    //Edge in weighted graph doesn't have weight
                    ErrorThrower.edgeWithoutWeight();
                }
            }

            //Determining edge type
            if (source === target) {
                //Loop edge

                if (graphData.isDirected()) {
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
                    
                    if (graphData.isDirected()) {
                        graph.setEdgeAttribute(edge, "type", "curvedArrow");
                    } else {
                        graph.setEdgeAttribute(edge, "type", "curved");
                    }

                } else {
                    //Non-parallel edge

                    if (graphData.isDirected()) {
                        graph.setEdgeAttribute(edge, "type", "arrow");
                    } else {
                        graph.setEdgeAttribute(edge, "type", "line");
                    }
                }
            }

            //Setting attributes from graph data
            const edgeAttributes = edges[edge];
            graph.mergeEdgeAttributes(edge, edgeAttributes);

        });

        return graph;

    }
}