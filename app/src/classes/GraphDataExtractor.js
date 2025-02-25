
import GraphData from "./GraphData";

export default class GraphDataExtractor {

    static extractData (graph) {

        //Type
        const directed = graph.getAttribute("directed");
        const weighted = graph.getAttribute("weighted");

        //Nodes
        let nodes = {};        
        graph.forEachNode((node, attributes) => {

            let attr = structuredClone(attributes);
            attr["key"] = node;

            nodes[node] = attr;
        });

        //Edges
        let edges = {};
        graph.forEachEdge((edge, attributes) => {

            let attr = structuredClone(attributes);
            attr["key"] = edge;
            attr["source"] = graph.source(edge);
            attr["target"] = graph.target(edge);

            edges[edge] = attr;
        });

        return new GraphData(directed, weighted, nodes, edges);
    }

}