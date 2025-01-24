import ErrorThrower from "./ErrorThrower";

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

        if (this.getData === undefined) {
            ErrorThrower.methodNotImplemented("getData");
        }
    }

    getGraph() {
        return this.#graph;
    }

    isFinished() {
        return this.#finished;
    }

    setFinished() {
        this.#finished = true;
    }
}