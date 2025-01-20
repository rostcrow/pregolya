
const DEFAULT_GRAPH_VISUAL = {"nodes": {}, "edges": {}};

export default class Algorithm {

    #graph;
    #visualAdapter;
    #stepHistory;
    #currentStep;

    constructor (graph, visaulAdapter) {
        this.#graph = graph;
        this.#visualAdapter = visaulAdapter;
        this.#stepHistory = [DEFAULT_GRAPH_VISUAL];
        this.#currentStep = 0;

        if (this.constructor === Algorithm) {
            throw new Error("Algorithm class is abstract");
        }

        if (this.next === undefined) {
            throw new Error("Method 'next' is not implemented");
        }
    }

    back() {
        if (this.#currentStep > 0) {
            this.#currentStep--;
        }
    }

    next() {
        if (this.#currentStep === this.#stepHistory.length - 1) {
            this.nextAlg();
            this.#stepHistory.push(this.#createGraphVisual());
        }
        this.#currentStep++;
    }

    nextAlg() {
        throw new Error("Method 'nextAlg' should be overriden by concrete algorithm class");
    }

    getGraph() {
        return this.#graph;
    }

    #createGraphVisual() {

        //Getting graph attributes
        let graphAttributes = DEFAULT_GRAPH_VISUAL;

        this.#graph.forEachNode((node, attributes) => {
            graphAttributes["nodes"][node] = attributes;
        });

        this.#graph.forEachEdge((edge, attributes) => {
            graphAttributes["edges"][edge] = attributes;
        });

        //Adapting
        return this.#visualAdapter.toGraphVisual(graphAttributes);

    }

    getGraphVisual() {

        if (this.#currentStep >= 0 && this.#currentStep < this.#stepHistory.length) {
            return this.#stepHistory[this.#currentStep];
        }

        return DEFAULT_GRAPH_VISUAL;
        
    }
}