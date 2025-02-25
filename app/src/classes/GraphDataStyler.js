
import GraphData from "./GraphData";

export default class GraphDataStyler {

    #nodeStyler;
    #edgeStyler;

    constructor (nodeStyler, edgeStyler) {
        this.#nodeStyler = nodeStyler;
        this.#edgeStyler = edgeStyler;
    }

    style(graphData) {
        
        const directed = graphData.isDirected();
        const weighted = graphData.isWeighted();
        let nodes = graphData.getNodes();
        let edges = graphData.getEdges();

        let retNodes = {};
        let retEdges = {};

        //Styling nodes
        for (const key in nodes) {
            retNodes[key] = this.#nodeStyler.style(nodes[key]);
        }

        //Styling edges
        for (const key in edges) {
            retEdges[key] = this.#edgeStyler.style(edges[key]);
        }

        return new GraphData(directed, weighted, retNodes, retEdges);
    }
}