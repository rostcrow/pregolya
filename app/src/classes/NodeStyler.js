import ErrorThrower from "./ErrorThrower";

export default class NodeStyler {

    constructor() {
        if (this.constructor === NodeStyler) {
            ErrorThrower.classIsAbstract("NodeStyler");
        }

        if (this.style === undefined) {
            ErrorThrower.methodNotImplemented("style");
        }
    }

}