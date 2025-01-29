
import GraphData from "./GraphData";

export default class GraphDataExtractor {

    static extractData (graph) {

        let nodes = {};        
        graph.forEachNode((node, attributes) => {
            nodes[node] = attributes;
        });

        let edges = {};
        graph.forEachEdge((edge, attributes) => {
            edges[edge] = attributes;
        });

        return new GraphData(nodes, edges);
    }

}