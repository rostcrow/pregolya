
export default class SideComponentsFactory {

    constructor () {
        if (this.constructor === SideComponentsFactory) {
            throw new Error ("SideComponentsFactory class is abstract");
        }

        if (this.createSideComponents === undefined) {
            throw new Error ("Method 'createSideComponents' is not implemented");
        }
    }

}