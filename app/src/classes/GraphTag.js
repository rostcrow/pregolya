
import GraphFactory from "./GraphFactory";
import Globals from "./Globals";

export default class GraphTag {

    #name;
    #graphData;

    constructor(name, graphData) {
        this.#name = name;
        this.#graphData = graphData;
    }

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

    clone() {
        return new GraphTag(this.#name, this.#graphData.clone());
    }

    setDirected(directed) {
        this.#graphData.setDirected(directed);
    }

    setWeighted(weighted) {
        this.#graphData.setWeighted(weighted);
    }

    getName() {
        return this.#name;
    }

    getNameWithType() {

        const type = this.getType();;

        return `${this.#name} (${type})`;
    }

    isDirected() {
        return this.#graphData.isDirected();
    }

    isWeighted() {
        return this.#graphData.isWeighted();
    }

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

    getDisplayGraph() {
        return GraphFactory.createDisplayGraph(this.#graphData);
    }

    getAlgorithmGraph() {
        return GraphFactory.createAlgorithmGraph(this.#graphData);
    }
}