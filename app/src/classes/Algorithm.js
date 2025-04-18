
// IMPORT
// My classes
import AdditionalData from "./AdditionalData";
import AlgorithmState from "./AlgorithmState";
import ErrorThrower from "./ErrorThrower";
import GraphDataExtractor from "./GraphDataExtractor";

// This abstract class represents algorithm and its action
export default class Algorithm {

    #graph;
    #finished;

    constructor (graph) {
        this.#graph = graph;
        this.#finished = false;

        if (this.constructor === Algorithm) {
            ErrorThrower.classIsAbstract("Algorithm");
        }

        if (this.forward === undefined) {
            ErrorThrower.methodNotImplemented("forward");
        }
    }

    // Returns graph
    getGraph() {
        return this.#graph;
    }

    // Returns additional data of algorithm
    getAdditionalData() {
        return new AdditionalData({});
    }

    // Returns current algorithm state of algorithm
    getState() {
        const graphData = GraphDataExtractor.extractData(this.#graph);
        const additionalData = this.getAdditionalData();

        return new AlgorithmState(graphData.clone(), additionalData.clone());
    }

    // Returns if algorithm is finished
    isFinished() {
        return this.#finished;
    }

    // Sets algorithm as finished
    setFinished() {
        this.#finished = true;
    }
}