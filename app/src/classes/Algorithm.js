import AdditionalData from "./AdditionalData";
import AlgorithmState from "./AlgorithmState";
import ErrorThrower from "./ErrorThrower";
import GraphDataExtractor from "./GraphDataExtractor";

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

    getGraph() {
        return this.#graph;
    }

    getAdditionalData() {
        return new AdditionalData({});
    }

    getState() {
        const graphData = GraphDataExtractor.extractData(this.#graph);
        const additionalData = this.getAdditionalData();

        return new AlgorithmState(graphData.clone(), additionalData.clone());
    }

    isFinished() {
        return this.#finished;
    }

    setFinished() {
        this.#finished = true;
    }
}