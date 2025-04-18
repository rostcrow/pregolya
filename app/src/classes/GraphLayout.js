
// IMPORT
// My classes
import ErrorThrower from "./ErrorThrower";

// This abstract class represents layout of graph
export default class GraphLayout {

    constructor () {        
        if (this.assign === undefined) {
            ErrorThrower.methodNotImplemented("assign");
        }
    }

}