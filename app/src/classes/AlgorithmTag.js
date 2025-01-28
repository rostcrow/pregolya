
export default class AlgorithmTag {

    #name;
    #algorithmClass;
    #nodeVisualAdapterClass;
    #edgeVisualAdapterClass;
    #sideComponentsFactoryClass;

    constructor(name, algorithmClass, nodeVisualAdapterClass, edgeVisualAdapterClass, sideComponentsFactoryClass) {
        this.#name = name;
        this.#algorithmClass = algorithmClass;
        this.#nodeVisualAdapterClass = nodeVisualAdapterClass;
        this.#edgeVisualAdapterClass = edgeVisualAdapterClass;
        this.#sideComponentsFactoryClass = sideComponentsFactoryClass;
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

}