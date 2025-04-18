
// This class represents additional data created by algorithm
export default class AdditionalData {

    #data;

    constructor(data) {
        this.#data = data;
    }

    // Gets data by given name
    get(name) {
        return this.#data[name];
    }

    // Returns clone of object
    clone() {
        return new AdditionalData(structuredClone(this.#data));
    }

}