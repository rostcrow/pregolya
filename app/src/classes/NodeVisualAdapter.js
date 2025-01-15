
export default class NodeVisualAdapter {
    constructor() {
        if (this.constructor === NodeVisualAdapter) {
            throw new Error("NodeVisualAdapter class is abstract");
        }

        if (this.toNodeVisual === undefined) {
            throw new Error("toNodeVisual method is not implemented");
        }
    }
}