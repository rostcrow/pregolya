
export default class ComponentCreator {

    constructor () {
        if (this.constructor === ComponentCreator) {
            throw new Error ("ComponentCreator class is abstract");
        }

        if (this.createComponents === undefined) {
            throw new Error ("Method 'createComponents' is not implemented");
        }
    }

}