
export default class AlgorithmTag {

    #name;
    #algorithmClass;
    #nodeAttributesAdapterClass;
    #edgeAttributesAdapterClass;
    #sideComponentsFactoryClass;
    #optionsFormClass;

    constructor(name, algorithmClass, nodeAttributesAdapterClass, edgeAttributesAdapterClass, sideComponentsFactoryClass, optionsFormClass) {
        this.#name = name;
        this.#algorithmClass = algorithmClass;
        this.#nodeAttributesAdapterClass = nodeAttributesAdapterClass;
        this.#edgeAttributesAdapterClass = edgeAttributesAdapterClass;
        this.#sideComponentsFactoryClass = sideComponentsFactoryClass;
        this.#optionsFormClass = optionsFormClass;
    }
    
    getName() {
        return this.#name;
    }

    getAlgorithmClass() {
        return this.#algorithmClass;
    }

    getNodeAttributesAdapterClass() {
        return this.#nodeAttributesAdapterClass;
    }

    getEdgeAttributesAdapterClass() {
        return this.#edgeAttributesAdapterClass;
    }

    getSideComponentsFactoryClass() {
        return this.#sideComponentsFactoryClass;
    }

    getOptionsFormClass() {
        return this.#optionsFormClass;
    }
}