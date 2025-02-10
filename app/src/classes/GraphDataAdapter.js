
import GraphData from "./GraphData";

export default class GraphDataAdapter {
    
    #nodeAttributesAdapter;
    #edgeAttributesAdapter;

    constructor (nodeAttributesAdapter, edgeAttributesAdapter) {
        this.#nodeAttributesAdapter = nodeAttributesAdapter;
        this.#edgeAttributesAdapter = edgeAttributesAdapter;
    }

    adapt(graphData) {
        
        let nodes = graphData.getNodes();
        let edges = graphData.getEdges();

        let retNodes = {};
        let retEdges = {};

        //Adapting nodes
        for (const key in nodes) {
            retNodes[key] = this.#nodeAttributesAdapter.adapt(key, nodes[key]);
        }

        //Adapting edges
        for (const key in edges) {
            retEdges[key] = this.#edgeAttributesAdapter.adapt(key, edges[key]);
        }

        return new GraphData(retNodes, retEdges);
    }

}