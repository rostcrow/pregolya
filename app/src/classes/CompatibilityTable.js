
/*
    This class represents a table of compatibility of algorithm for graph types.
    It classifies graph types to 3 groups:

    compatible - graph type is compatible with algorithm
    convertible - graph type is not compatible with algorithm, 
                but it can be converted to different one, which compatible is
    inCompatible - graph type is not compatible with algorithm 
*/
export default class CompatibilityTable {

    #compatible;
    #convertible;
    #inCompatible;

    constructor(compatible, convertible, inCompatible) {
        this.#compatible = compatible;
        this.#convertible = convertible;
        this.#inCompatible = inCompatible;
    }

    // Returns if graph type is compatible with algorithm
    isCompatible(graphType) {
        return this.#compatible.includes(graphType);
    }

    // Returns if graph type is convertible to be compatible with algorithm
    isConvertible(graphType) {
        return Object.keys(this.#convertible).includes(String(graphType));
    }

    // Returns if graph is not compatible
    isInCompatible(graphType) {
        return this.#inCompatible.includes(graphType);
    }

    /*
        Returns graph type, to which is input graph type convertible to.
        Returns null, if input graph type is not convertible
    */
    getConvertibleTo (graphType) {
        if (this.isConvertible(graphType)) {
            return this.#convertible[graphType];
        }

        return null;
    }

    // Returns all compatible graph types
    getCompatible() {
        return this.#compatible;
    }

    // Returns all convertible graph types
    getConvertibleKeys() {
        return Object.keys(this.#convertible);
    }


}