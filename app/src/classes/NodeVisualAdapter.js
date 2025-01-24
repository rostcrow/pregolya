import ErrorThrower from "./ErrorThrower";

export default class NodeVisualAdapter {
    constructor() {
        if (this.constructor === NodeVisualAdapter) {
            ErrorThrower.classIsAbstract("NodeVisualAdapter");
        }
    }

    toNodeVisual(key, attributes) {
        return {};
    }
}