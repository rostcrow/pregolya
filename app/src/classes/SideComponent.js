
// This class represents side component in SidePanel component
export default class SideComponent {

    #name;
    #component;

    constructor(name, component) {
        this.#name = name;
        this.#component = component;
    }

    // Returns name
    getName() {
        return this.#name;
    }

    // Returns React component
    getComponent() {
        return this.#component;
    }

}