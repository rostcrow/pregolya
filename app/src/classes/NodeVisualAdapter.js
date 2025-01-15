
export default class NodeVisualAdapter {
    constructor() {
        if (this.constructor === NodeVisualAdapter) {
            throw new Error("NodeVisualAdapter class is abstract");
        }
    }

    toNodeVisual(attributes) {
        return {};
    }
}