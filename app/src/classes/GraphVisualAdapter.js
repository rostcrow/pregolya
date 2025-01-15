
export default class GraphVisualAdapter {
    
    #nodeAttributesAdapter;
    #edgeAttributesAdapter;

    constructor (nodeAttributesAdapter, edgeAttributesAdapter) {
        this.#nodeAttributesAdapter = nodeAttributesAdapter;
        this.#edgeAttributesAdapter = edgeAttributesAdapter;
    }

    toGraphVisual (graphAttributes) {
        let ret = {"nodes": {}, "edges": {}};

        //Adapting nodes
        for (const key in graphAttributes["nodes"]) {
            ret["nodes"][key] = this.#nodeAttributesAdapter.toNodeVisual(graphAttributes["nodes"][key]);
        }

        //Adapting edges
        //TODO

        return ret;
    }

}