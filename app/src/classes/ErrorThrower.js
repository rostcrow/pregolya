
// This static class is used to throw errors in our program.
export default class ErrorThrower {
    
    // Throws Error of given message
    static #throw(message) {
        throw new Error(message);
    }

    // Throws Error of trying to create object of abstract class
    static classIsAbstract(className) {
        this.#throw(`${className} class is abstract`);
    }

    // Throws Error of not implementing mandatory method in child class
    static methodNotImplemented(methodName) {
        this.#throw(`Method '${methodName}' is not implemented`);
    }

    // Throws Error of edge having no weight attribute, eventhough it is expected
    static edgeWithoutWeight() {
        this.#throw("Edge doesn't have 'weight' attribute");
    }

    // Throws Error of unexpected state, usually in switch statements
    static notExpectedState() {
        this.#throw("Unexpected state");
    }

    // Throws Error of graph having cycle, eventhough it shouldn't have one
    static graphHasCycle() {
        this.#throw("Graph has cycle");
    }
}