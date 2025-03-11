
export default class CompatibilityTable {

    #compatible;
    #convertible;
    #inCompatible;

    constructor(compatible, convertible, inCompatible) {
        this.#compatible = compatible;
        this.#convertible = convertible;
        this.#inCompatible = inCompatible;
    }

    isCompatible(graphType) {
        return this.#compatible.includes(graphType);
    }

    isConvertible(graphType) {
        return Object.keys(this.#convertible).includes(String(graphType));
    }

    isInCompatible(graphType) {
        return this.#inCompatible.includes(graphType);
    }

    getConvertibleTo (graphType) {
        if (this.isConvertible(graphType)) {
            return this.#convertible[graphType];
        }

        return null;
    }

    getCompatible() {
        return this.#compatible;
    }

    getConvertibleKeys() {
        return Object.keys(this.#convertible);
    }


}