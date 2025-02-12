
export default class CompatibilityMessage {

    #compatible;
    #message;

    constructor(compatible, message) {
        this.#compatible = compatible;
        this.#message = message;
    }

    isCompatible() {
        return this.#compatible;
    }

    getMessage() {
        return this.#message;
    }

}