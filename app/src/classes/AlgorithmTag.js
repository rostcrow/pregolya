
export default class AlgorithmTag {

    #name;
    #compatibleGraphTypes;
    #algorithmClass;
    #nodeAttributesAdapterClass;
    #edgeAttributesAdapterClass;
    #sideComponentsFactoryClass;
    #optionsFormClass;

    constructor(name, compatibleGraphTypes, algorithmClass, nodeAttributesAdapterClass, edgeAttributesAdapterClass, sideComponentsFactoryClass, optionsFormClass) {
        this.#name = name;
        this.#compatibleGraphTypes = compatibleGraphTypes;
        this.#algorithmClass = algorithmClass;
        this.#nodeAttributesAdapterClass = nodeAttributesAdapterClass;
        this.#edgeAttributesAdapterClass = edgeAttributesAdapterClass;
        this.#sideComponentsFactoryClass = sideComponentsFactoryClass;
        this.#optionsFormClass = optionsFormClass;
    }
    
    getName() {
        return this.#name;
    }

    getCompatibleGraphTypes() {
        return this.#compatibleGraphTypes;
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