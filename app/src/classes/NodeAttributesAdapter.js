import ErrorThrower from "./ErrorThrower";

export default class NodeAttributesAdapter {
    constructor() {
        if (this.constructor === NodeAttributesAdapter) {
            ErrorThrower.classIsAbstract("NodeAttributesAdapter");
        }
    }

    adapt(key, attributes) {
        return {};
    }
}