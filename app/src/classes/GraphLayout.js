import ErrorThrower from "./ErrorThrower";

export default class GraphLayout {

    constructor () {        
        if (this.assign === undefined) {
            ErrorThrower.methodNotImplemented("assign");
        }
    }

}