
import Graph from "graphology";
import { indexParallelEdgesIndex, DEFAULT_EDGE_CURVATURE} from "@sigma/edge-curve";
import GraphAttributesAdapter from "./GraphAttributesAdapter";
import DefaultNodeAttributesAdapter from "./DefaultNodeAttributesAdapter";
import DefaultEdgeAttributesAdapter from "./DefaultEdgeAttributesAdapter";
import GraphAttributesApplier from "./GraphAttributesApplier";
import GraphDataExtractor from "./GraphDataExtractor";
import ErrorThrower from "./ErrorThrower";

export default class GraphTag {

    #name;
    #directed;
    #weighted;
    #rawGraph;

    constructor(json) {
        this.#name = json["name"];
        this.#directed = json["directed"];
        this.#weighted = json["weighted"];
        this.#rawGraph = this.#getRawGraph(json["nodes"], json["edges"]);
    }

    getName() {
        return this.#name;
    }

    isDirected() {
        return this.#directed;
    }

    isWeighted() {
        return this.#weighted;
    }

    #getRawGraph(nodes, edges) {
        
        const type = "un".repeat(!this.#directed) + "directed";
        let graph = new Graph({multi: true, type: type});

        //Adding nodes
        for (const node of nodes) {
            graph.addNode(node);
        }

        //Creating edge key generator
        function incrementalId() {
            let i = 0;

            return () => i++;
        }

        const edgeKeyGenerator = incrementalId();

        //Adding edges
        for (const edge of edges) {
            const key = edgeKeyGenerator();
            graph.addEdgeWithKey(key, edge["source"], edge["target"]);

            //Adding weigth
            if (this.#weighted) {
                graph.setEdgeAttribute(key, "weight", edge["weight"]);
            }
        }

        return graph;
    }

    getDisplayGraph() {

        let graph = this.#rawGraph.copy();

        //Setting default attributes to nodes and edges
        const graphData = GraphDataExtractor.extractData(graph);
        const graphAttributesAdapter = 
            new GraphAttributesAdapter(new DefaultNodeAttributesAdapter(), new DefaultEdgeAttributesAdapter());
        const adaptedData = graphAttributesAdapter.adapt(graphData);

        GraphAttributesApplier.apply(graph, adaptedData);
        
        //Setting edges
        graph.forEachEdge((edge) => {

            //Setting weight label
            if (this.#weighted) {
                if (graph.hasEdgeAttribute(edge, "weight")) {

                    let weight = graph.getEdgeAttribute(edge, "weight").toString();
                    graph.setEdgeAttribute(edge, "label", weight);
                    graph.setEdgeAttribute(edge, "forceLabel", true);

                } else {
                    //Edge in weighted graph doesn't have weight
                    ErrorThrower.edgeWithoutWeight();
                }
            }
        });

        //Determining edge types
        indexParallelEdgesIndex(graph, { edgeIndexAttribute: "parallelIndex", edgeMaxIndexAttribute: "parallelMaxIndex"});

        graph.forEachEdge((edge, attributes, source, target) => {

            if (source === target) {
                //Loop edge

                if (this.#directed) {
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
                    
                    if (this.#directed) {
                        graph.setEdgeAttribute(edge, "type", "curvedArrow");
                    } else {
                        graph.setEdgeAttribute(edge, "type", "curved");
                    }

                } else {
                    //Non-parallel edge

                    if (this.#directed) {
                        graph.setEdgeAttribute(edge, "type", "arrow");
                    } else {
                        graph.setEdgeAttribute(edge, "type", "line");
                    }
                }
            }
        });

        return graph;
    }

    getAlgorithmGraph() {
        return this.#rawGraph.copy();
    }

}