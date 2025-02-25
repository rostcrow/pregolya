
export default class AlgorithmTag {

    #name;
    #compatibleGraphTypes;
    #algorithmClass;
    #nodeStylerClass;
    #edgeStylerClass;
    #sideComponentsFactoryClass;
    #optionsFormClass;

    constructor(name, compatibleGraphTypes, algorithmClass, nodeStylerClass, edgeStylerClass, sideComponentsFactoryClass, optionsFormClass) {
        this.#name = name;
        this.#compatibleGraphTypes = compatibleGraphTypes;
        this.#algorithmClass = algorithmClass;
        this.#nodeStylerClass = nodeStylerClass;
        this.#edgeStylerClass = edgeStylerClass;
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

    getNodeStylerClass() {
        return this.#nodeStylerClass;
    }

    getEdgeStylerClass() {
        return this.#edgeStylerClass;
    }

    getSideComponentsFactoryClass() {
        return this.#sideComponentsFactoryClass;
    }

    getOptionsFormClass() {
        return this.#optionsFormClass;
    }
}