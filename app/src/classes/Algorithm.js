
export default class Algorithm {

    #graph;
    #finished;

    constructor (graph) {
        this.#graph = graph;
        this.#finished = false;

        if (this.constructor === Algorithm) {
            throw new Error("Algorithm class is abstract");
        }

        if (this.forward === undefined) {
            throw new Error("Method 'forward' is not implemented");
        }

        if (this.getData === undefined) {
            throw new Error ("Method 'getData' is not implemented");
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