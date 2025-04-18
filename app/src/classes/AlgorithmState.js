
/* 
    This class represents state of algorithm in one step.
    It encapsulates data of graph, with which algorithm works and additional data of algorithm.
*/
export default class AlgorithmState {

    #graphData;
    #additionalData;

    constructor(graphData, additionalData) {
        this.#graphData = graphData;
        this.#additionalData = additionalData;
    }

    // Returns graph data
    getGraphData() {
        return this.#graphData;
    }

    // Returns additional data
    getAdditionalData() {
        return this.#additionalData;
    }
}