
// IMPORT
// My classes
import ErrorThrower from "./ErrorThrower";

// CODE
/* 
    This abstract class is used for transforming info of edges inside algorithm graph
    to visual info of edge for display graph.
*/
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