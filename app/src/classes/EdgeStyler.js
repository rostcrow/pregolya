
// IMPORT 
// My classes
import ErrorThrower from "./ErrorThrower";

// CODE
/* 
    This abstract class is used for transforming info of edges inside algorithm graph
    to visual info of edge for display graph.
*/
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