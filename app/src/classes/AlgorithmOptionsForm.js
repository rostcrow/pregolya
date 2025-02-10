import ErrorThrower from "./ErrorThrower";

export default class AlgorithmOptionsForm {

    #options;
    #setOptionsFunc;
    #graph;

    constructor(options, setOptionsFunc, graph) {
        this.#options = options;
        this.#setOptionsFunc = setOptionsFunc;
        this.#graph = graph;

        if (this.constructor === AlgorithmOptionsForm) {
            ErrorThrower.classIsAbstract("AlgorithmOptionsForm");
        }

        if (this.getComponents === undefined) {
            ErrorThrower.methodNotImplemented("getComponents");
        }
    }

    getOptions() {
        return this.#options;
    }

    getSetOptionsFunc() {
        return this.#setOptionsFunc;
    }

    getGraph() {
        return this.#graph;
    }

}