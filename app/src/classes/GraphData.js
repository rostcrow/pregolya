
export default class GraphData {

    #nodes;
    #edges;

    constructor (nodes, edges) {
        this.#nodes = nodes;
        this.#edges = edges;
    }

    getNodes() {
        return this.#nodes;
    }

    getEdges() {
        return this.#edges;
    }

    clone() {
        return new GraphData(structuredClone(this.#nodes), structuredClone(this.#edges));
    }
    
}