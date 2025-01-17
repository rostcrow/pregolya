
export default class GraphVisualAdapter {
    
    #nodeVisualAdapter;
    #edgeVisualAdapter;

    constructor (nodeVisualAdapter, edgeVisualAdapter) {
        this.#nodeVisualAdapter = nodeVisualAdapter;
        this.#edgeVisualAdapter = edgeVisualAdapter;
    }

    toGraphVisual (graphAttributes) {
        let ret = {"nodes": {}, "edges": {}};

        //Adapting nodes
        for (const key in graphAttributes["nodes"]) {
            ret["nodes"][key] = this.#nodeVisualAdapter.toNodeVisual(key, graphAttributes["nodes"][key]);
        }

        //Adapting edges
        for (const key in graphAttributes["edges"]) {
            ret["edges"][key] = this.#edgeVisualAdapter.toEdgeVisual(graphAttributes["edges"][key]);
        }

        return ret;
    }

}