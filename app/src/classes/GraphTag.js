
import GraphFactory from "./GraphFactory";
import JsonToGraphDataAdapter from "./JsonToGraphDataAdapter";
import Globals from "./Globals";

export default class GraphTag {

    #name;
    #graphData;

    constructor(json) {
        this.#name = json["name"];
        this.#graphData = JsonToGraphDataAdapter.adapt(json);
    }

    getName() {
        return this.#name;
    }

    getNameWithType() {

        const type = this.getType();
        const typeStrings = ["", " (directed)", " (weighted)", " (directed and weighted)"];

        return this.#name + typeStrings[type];
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