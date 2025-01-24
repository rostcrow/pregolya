import BFSComponentCreator from "./BFSComponentCreator";

export default class Algorithm {

    #graph;
    #visualAdapter;
    #componentCreator;
    #finished;

    constructor (graph, visaulAdapter, componentCreator) {
        this.#graph = graph;
        this.#visualAdapter = visaulAdapter;
        this.#componentCreator = componentCreator;
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

    getComponentData() {
        return {};
    }

    getData() {
        return {"visual": this.getGraphVisual(), "components": new BFSComponentCreator().createComponents(this.getComponentData())};
    }

    getSideComponents() {
        return this.#componentCreator.createComponents(this.getComponentData());
    }

    isFinished() {
        return this.#finished;
    }

    setFinished() {
        this.#finished = true;
    }
}