
export default class EdgeVisualAdapter {

    constructor () {
        if (this.constructor === EdgeVisualAdapter) {
            throw new Error("EdgeVisaulAdapter class is abstract");
        }

        if (this.toEdgeVisual === undefined) {
            throw new Error("Method 'toEdgeVisual' is not implemented");
        }
    }
}