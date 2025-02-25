
export default class GraphData {

    #directed;
    #weighted;
    #nodes;
    #edges;

    constructor (directed, weighted, nodes, edges) {
        this.#directed = directed;
        this.#weighted = weighted;
        this.#nodes = nodes;
        this.#edges = edges;
    }

    isDirected() {
        return this.#directed;
    }

    isWeighted() {
        return this.#weighted;
    }

    getNodes() {
        return structuredClone(this.#nodes);
    }

    getEdges() {
        return structuredClone(this.#edges);
    }

    setDirected(directed) {
        this.#directed = directed;
    }

    setWeighted(weighted) {
        this.#weighted = weighted;
    }

    setNodes(nodes) {
        this.#nodes = structuredClone(nodes);
    }

    setEdges(edges) {
        this.#edges = structuredClone(edges);
    }
    
    clone() {
        return new GraphData(this.isDirected(), this.isWeighted(), this.getNodes(), this.getEdges());
    }
}