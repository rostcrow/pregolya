
export default class Algorithm {

    #graph;
    #visualAdapter;
    #finished;

    constructor (graph, visaulAdapter) {
        this.#graph = graph;
        this.#visualAdapter = visaulAdapter;
        this.#finished = false;

        if (this.constructor === Algorithm) {
            throw new Error("Algorithm class is abstract");
        }

        if (this.init === undefined) {
            throw new Error("Method 'init' is not implemented");
        }

        if (this.forward === undefined) {
            throw new Error("Method 'forward' is not implemented");
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

    isFinished() {
        return this.#finished;
    }

    setFinished() {
        this.#finished = true;
    }
}