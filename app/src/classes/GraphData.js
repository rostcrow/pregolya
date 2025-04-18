
// This class represents data of graph
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

    // Returns if graph is directed
    isDirected() {
        return this.#directed;
    }

    // Returns if graph is weighted
    isWeighted() {
        return this.#weighted;
    }

    // Returns nodes of graph
    getNodes() {
        return structuredClone(this.#nodes);
    }

    // Returns edges of graph
    getEdges() {
        return structuredClone(this.#edges);
    }

    // Sets directed
    setDirected(directed) {
        this.#directed = directed;
    }

    // Sets weighted
    setWeighted(weighted) {
        this.#weighted = weighted;
    }

    // Sets nodes
    setNodes(nodes) {
        this.#nodes = structuredClone(nodes);
    }

    // Sets edges
    setEdges(edges) {
        this.#edges = structuredClone(edges);
    }
    
    // Returns clone of object
    clone() {
        return new GraphData(this.isDirected(), this.isWeighted(), this.getNodes(), this.getEdges());
    }
}