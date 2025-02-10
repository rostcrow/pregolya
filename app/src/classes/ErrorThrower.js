
export default class ErrorThrower {
    
    static #throw(message) {
        throw new Error(message);
    }

    static classIsAbstract(className) {
        this.#throw(`${className} class is abstract`);
    }

    static methodNotImplemented(methodName) {
        this.#throw(`Method '${methodName}' is not implemented`);
    }

    static edgeWithoutWeight() {
        this.#throw("Edge doesn't have 'weight' attribute");
    }
}