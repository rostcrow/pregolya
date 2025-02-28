import EdgeStyler from "./EdgeStyler";
import { EdgeState } from "./DFSAlgorithm";
import { EdgeAttributes } from "./DFSAlgorithm";
import Globals from "./Globals";
import ErrorThrower from "./ErrorThrower";

export default class DFSEdgeStyler extends EdgeStyler {

    style(attributes) {

        let ret = {};

        switch (attributes[EdgeAttributes.STATE]) {
            case EdgeState.NORMAL:
                ret["color"] = Globals.Colors.DEFAULT_EDGE_COLOR;
                break;
            case EdgeState.TREE:
                ret["color"] = Globals.Colors.DARK_GRAY;
                break;
            case EdgeState.BACK:
                ret["color"] = Globals.Colors.LIGHT_ORANGE;
                break;
            case EdgeState.FORWARD:
                ret["color"] = Globals.Colors.LIGHT_PURPLE;
                break;
            case EdgeState.CROSS:
                ret["color"] = Globals.Colors.LIGHT_CYAN;
                break;
            default:
                ErrorThrower.notExpectedState();
        }

        return ret;
    }

}