
/*
    This class represents algorithm in our program.
    It encapsulates all classes need to implement algorithm in our program.
*/ 
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
    
    // Returns name
    getName() {
        return this.#name;
    }

    // Returns compatibility table
    getCompatibilityTable() {
        return this.#compatibilityTable;
    }

    // Returns class, in which algorithm is implemented
    getAlgorithmClass() {
        return this.#algorithmClass;
    }

    // Return node styler
    getNodeStylerClass() {
        return this.#nodeStylerClass;
    }

    // Returns edge styler
    getEdgeStylerClass() {
        return this.#edgeStylerClass;
    }

    // Returns side components factory
    getSideComponentsFactoryClass() {
        return this.#sideComponentsFactoryClass;
    }

    // Returns option form
    getOptionsFormClass() {
        return this.#optionsFormClass;
    }
}