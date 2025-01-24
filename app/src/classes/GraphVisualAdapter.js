
import GraphData from "./GraphData";

export default class GraphVisualAdapter {
    
    #nodeVisualAdapter;
    #edgeVisualAdapter;

    constructor (nodeVisualAdapter, edgeVisualAdapter) {
        this.#nodeVisualAdapter = nodeVisualAdapter;
        this.#edgeVisualAdapter = edgeVisualAdapter;
    }

    toGraphVisual (graphData) {
        
        let nodes = graphData.getNodes();
        let edges = graphData.getEdges();

        let retNodes = {};
        let retEdges = {};

        //Adapting nodes
        for (const key in nodes) {
            retNodes[key] = this.#nodeVisualAdapter.toNodeVisual(key, nodes[key]);
        }

        //Adapting edges
        for (const key in edges) {
            retEdges[key] = this.#edgeVisualAdapter.toEdgeVisual(edges[key]);
        }

        return new GraphData(retNodes, retEdges);
    }

}