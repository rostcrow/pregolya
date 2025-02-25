import ErrorThrower from "./ErrorThrower";

export default class EdgeStyler {

    constructor() {
        if (this.constructor === EdgeStyler) {
            ErrorThrower.classIsAbstract("EdgeStyler");
        }

        if (this.style === undefined) {
            ErrorThrower.methodNotImplemented("style");
        }
    }
}