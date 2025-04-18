
// IMPORT
// My classes
import GraphFactory from "./GraphFactory";
import Globals from "./Globals";

// CODE
// This class represents named graph
export default class GraphTag {

    #name;
    #graphData;

    constructor(name, graphData) {
        this.#name = name;
        this.#graphData = graphData;
    }

    // Converts graph to graph of different type
    convertTo(graphType) {
        
        switch (graphType) {
            case Globals.GraphTypes.NORMAL:
                this.setDirected(false);
                this.setWeighted(false);
                break;
            case Globals.GraphTypes.DIRECTED:
                this.setDirected(true);
                this.setWeighted(false);
                break;
            case Globals.GraphTypes.WEIGHTED:
                this.setDirected(false);
                this.setWeighted(true);
                break;
            case Globals.GraphTypes.DIRECTED_WEIGHTED:
                this.setDirected(true);
                this.setWeighted(true);
                break;
            default:
                
        }
    }

    // Returns clone of object
    clone() {
        return new GraphTag(this.#name, this.#graphData.clone());
    }

    // Sets directed
    setDirected(directed) {
        this.#graphData.setDirected(directed);
    }

    // Sets weighted
    setWeighted(weighted) {
        this.#graphData.setWeighted(weighted);
    }

    // Returns name of the graph
    getName() {
        return this.#name;
    }

    // Returns string of format: name (type)
    getNameWithType() {

        const type = this.getType();;

        return `${this.#name} (${type})`;
    }

    // Returns if graph is directed
    isDirected() {
        return this.#graphData.isDirected();
    }

    // Returns if graph is weighted
    isWeighted() {
        return this.#graphData.isWeighted();
    }

    // Return type of graph
    getType() {
        if (this.#graphData.isDirected() && this.#graphData.isWeighted()) {
            return Globals.GraphTypes.DIRECTED_WEIGHTED;
        }

        if (this.#graphData.isDirected()) {
            return Globals.GraphTypes.DIRECTED;
        }

        if (this.#graphData.isWeighted()) {
            return Globals.GraphTypes.WEIGHTED;
        }

        return Globals.GraphTypes.NORMAL;
    }

    // Creates and returns display graph
    getDisplayGraph() {
        return GraphFactory.createDisplayGraph(this.#graphData);
    }

    // Creates and returns algorithm graph
    getAlgorithmGraph() {
        return GraphFactory.createAlgorithmGraph(this.#graphData);
    }
}