
export default class AdditionalData {

    #data;

    constructor(data) {
        this.#data = data;
    }

    getData() {
        return this.#data;
    }

    clone() {
        return new AdditionalData(structuredClone(this.#data));
    }

}