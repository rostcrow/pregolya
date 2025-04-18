
// IMPORT
// My classes
import ErrorThrower from "./ErrorThrower";

// CODE
// This abstract class represents form for selecting options of algortihm
export default class AlgorithmOptionsForm {

    #options;
    #setOptionsFunc;
    #graph;

    constructor(options, setOptionsFunc, graph) {
        this.#options = options;
        this.#setOptionsFunc = setOptionsFunc;
        this.#graph = graph;

        if (this.constructor === undefined) {
            ErrorThrower.classIsAbstract("AlgorithmOptionsForm");
        }

        if (this.getDefaultOptions === undefined) {
            ErrorThrower.methodNotImplemented("getDefaultOptions");
        }

        if (this.getComponents === undefined) {
            ErrorThrower.methodNotImplemented("getComponents");
        }
    }

    // Returns options
    getOptions() {
        return this.#options;
    }

    // Sets options
    setOptions(options) {
        this.#options = options;
    }

    // Returns set option
    getSetOptionsFunc() {
        return this.#setOptionsFunc;
    }

    // Returns graph
    getGraph() {
        return this.#graph;
    }

}