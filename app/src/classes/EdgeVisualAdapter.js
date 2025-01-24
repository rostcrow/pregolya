import ErrorThrower from "./ErrorThrower"

export default class EdgeVisualAdapter {

    constructor () {
        if (this.constructor === EdgeVisualAdapter) {
            ErrorThrower.classIsAbstract("EdgeVisualAdapter");
        }
    }

    toEdgeVisual(key, attributes) {
        return {}
    }
}