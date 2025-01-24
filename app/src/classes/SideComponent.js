
export default class SideComponent {

    #name;
    #component;

    constructor(name, component) {
        this.#name = name;
        this.#component = component;
    }

    getName() {
        return this.#name;
    }

    getComponent() {
        return this.#component;
    }

}