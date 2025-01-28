
export default class AlgorithmMemento {

    #graphVisual;
    #algorithmData;

    constructor(graphVisual, algorithmData) {
        this.#graphVisual = graphVisual;
        this.#algorithmData = algorithmData;
    }

    getGraphVisual() {
        return this.#graphVisual;
    }

    getAlgorithmData() {
        return this.#algorithmData;
    }

}