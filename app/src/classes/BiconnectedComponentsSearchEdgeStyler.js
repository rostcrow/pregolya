import EdgeStyler from "./EdgeStyler";
import { EdgeState, EdgeAttributes } from "./BiconnectedComponentsSearchAlgorithm";
import Globals from "./Globals";
import ErrorThrower from "./ErrorThrower";

export default class BiconnectedComponentsSearchEdgeStyler extends EdgeStyler {

    style(attributes) {

        let ret = {"forceLabel": true};

        switch (attributes[EdgeAttributes.STATE]) {
            case EdgeState.NORMAL:
                ret["color"] = Globals.Colors.DEFAULT_EDGE_COLOR;
                ret["label"] = "";
                break;
            case EdgeState.TREE:
                ret["color"] = Globals.Colors.DARK_GRAY;
                ret["label"] = "";
                break;
            case EdgeState.BRIDGE:
                ret["color"] = Globals.Colors.PINK;
                ret["label"] = "";
                break;
            case EdgeState.BACK:
                ret["color"] = Globals.Colors.LIGHT_ORANGE;
                ret["label"] = "B";
                break;
            default:
                ErrorThrower.notExpectedState();
        }

        return ret;
    }

}