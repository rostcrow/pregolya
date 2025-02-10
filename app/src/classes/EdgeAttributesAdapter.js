import ErrorThrower from "./ErrorThrower"

export default class EdgeAttributesAdapter {

    constructor () {
        if (this.constructor === EdgeAttributesAdapter) {
            ErrorThrower.classIsAbstract("EdgeAttributesAdapter");
        }
    }

    adapt(key, attributes) {
        return {}
    }
}