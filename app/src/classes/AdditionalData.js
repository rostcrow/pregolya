
export default class AdditionalData {

    #data;

    constructor(data) {
        this.#data = data;
    }

    get(name) {
        return this.#data[name];
    }

    clone() {
        return new AdditionalData(structuredClone(this.#data));
    }

}