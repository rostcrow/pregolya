
export default class EdgeVisualAdapter {

    constructor () {
        if (this.constructor === EdgeVisualAdapter) {
            throw new Error("EdgeVisaulAdapter class is abstract");
        }
    }

    toEdgeVisual(attributes) {
        return {}
    }
}