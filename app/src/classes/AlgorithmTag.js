
export default class AlgorithmTag {

    #name;
    #algorithmClass;
    #nodeVisualAdapterClass;
    #edgeVisualAdapterClass;
    #sideComponentsFactoryClass;
    #optionsFormClass;

    constructor(name, algorithmClass, nodeVisualAdapterClass, edgeVisualAdapterClass, sideComponentsFactoryClass, optionsFormClass) {
        this.#name = name;
        this.#algorithmClass = algorithmClass;
        this.#nodeVisualAdapterClass = nodeVisualAdapterClass;
        this.#edgeVisualAdapterClass = edgeVisualAdapterClass;
        this.#sideComponentsFactoryClass = sideComponentsFactoryClass;
        this.#optionsFormClass = optionsFormClass;
    }
    
    getName() {
        return this.#name;
    }

    getAlgorithmClass() {
        return this.#algorithmClass;
    }

    getNodeVisualAdapterClass() {
        return this.#nodeVisualAdapterClass;
    }

    getEdgeVisualAdapterClass() {
        return this.#edgeVisualAdapterClass;
    }

    getSideComponentsFactoryClass() {
        return this.#sideComponentsFactoryClass;
    }

    getOptionsFormClass() {
        return this.#optionsFormClass;
    }
}