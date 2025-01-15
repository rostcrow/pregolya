
export default class Algorithm {

    #graph;
    #visualAdapter;

    constructor (graph, visaulAdapter) {
        this.#graph = graph;
        this.#visualAdapter = visaulAdapter;

        if (this.constructor === Algorithm) {
            throw new Error("Algorithm class is abstract");
        }

        if (this.next === undefined) {
            throw new Error("Method 'next' is not implemented");
        }
    }

    getGraph() {
        return this.#graph;
    }

    getGraphVisual() {

        //Getting graph attributes
        let graphAttributes = {"nodes": {}, "edges": {}};

        this.#graph.forEachNode((node, attributes) => {
            graphAttributes["nodes"][node] = attributes;
        });

        this.#graph.forEachEdge((edge, attributes) => {
            graphAttributes["edges"][edge] = attributes;
        });

        //Adapting
        return this.#visualAdapter.toGraphVisual(graphAttributes);
    }
}