
export default class AlgorithmMemento {

    #graphVisual;
    #sideComponents;

    constructor(graphVisual, sideComponents) {
        this.#graphVisual = graphVisual;
        this.#sideComponents = sideComponents;
    }

    getGraphVisual() {
        return this.#graphVisual;
    }

    getSideComponents() {
        return this.#sideComponents;
    }

}