import ErrorThrower from "./ErrorThrower";

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