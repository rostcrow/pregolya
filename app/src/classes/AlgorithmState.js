
export default class AlgorithmState {

    #graphData;
    #additionalData;

    constructor(graphData, additionalData) {
        this.#graphData = graphData;
        this.#additionalData = additionalData;
    }

    getGraphData() {
        return this.#graphData;
    }

    getAdditionalData() {
        return this.#additionalData;
    }
}