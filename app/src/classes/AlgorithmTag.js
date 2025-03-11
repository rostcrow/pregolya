
export default class AlgorithmTag {

    #name;
    #compatibilityTable;
    #algorithmClass;
    #nodeStylerClass;
    #edgeStylerClass;
    #sideComponentsFactoryClass;
    #optionsFormClass;

    constructor(name, compatibilityTable, algorithmClass, nodeStylerClass, edgeStylerClass, sideComponentsFactoryClass, optionsFormClass) {
        this.#name = name;
        this.#compatibilityTable = compatibilityTable;
        this.#algorithmClass = algorithmClass;
        this.#nodeStylerClass = nodeStylerClass;
        this.#edgeStylerClass = edgeStylerClass;
        this.#sideComponentsFactoryClass = sideComponentsFactoryClass;
        this.#optionsFormClass = optionsFormClass;
    }
    
    getName() {
        return this.#name;
    }

    getCompatibilityTable() {
        return this.#compatibilityTable;
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