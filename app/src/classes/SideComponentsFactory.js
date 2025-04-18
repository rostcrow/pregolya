
// IMPORT
// My classes
import ErrorThrower from "./ErrorThrower";

// CODE
// This abstract class represents factory for creating side components from algorithm state
export default class SideComponentsFactory {

    constructor () {
        if (this.constructor === SideComponentsFactory) {
            ErrorThrower.classIsAbstract("SideComponentsFactory");
        }

        if (this.createSideComponents === undefined) {
            ErrorThrower.methodNotImplemented("createSideComponents");
        }
    }

}