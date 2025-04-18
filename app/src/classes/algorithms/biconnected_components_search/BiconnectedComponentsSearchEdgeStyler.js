
// IMPRORT
// My classes
import EdgeStyler from "../../EdgeStyler";
import { EdgeState, EdgeAttributes } from "./BiconnectedComponentsSearchAlgorithm";
import Globals from "../../Globals";
import ErrorThrower from "../../ErrorThrower";

// CODE
// This class represents edge styler for biconnected components search
export default class BiconnectedComponentsSearchEdgeStyler extends EdgeStyler {

    style(attributes) {

        let ret = {};

        switch (attributes[EdgeAttributes.STATE]) {
            case EdgeState.NORMAL:
                ret["color"] = Globals.Colors.DEFAULT_EDGE_COLOR;
                break;
            case EdgeState.TREE:
                ret["color"] = Globals.Colors.DARK_GRAY;
                break;
            case EdgeState.BRIDGE:
                ret["color"] = Globals.Colors.PINK;
                break;
            case EdgeState.BACK:
                ret["color"] = Globals.Colors.LIGHT_ORANGE;
                break;
            default:
                ErrorThrower.notExpectedState();
        }

        return ret;
    }

}