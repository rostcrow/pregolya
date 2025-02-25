import EdgeStyler from "./EdgeStyler";
import { EdgeState } from "./DFSAlgorithm";
import { EdgeAttributes } from "./DFSAlgorithm";
import Globals from "./Globals";
import ErrorThrower from "./ErrorThrower";

const DEFAULT_CURVATURE = 1;

export default class DFSEdgeStyler extends EdgeStyler {

    style(attributes) {

        let ret = {"forceLabel": true};

        let curve = false;

        function shouldBeCurved(attributes) {
            return attributes["type"] !== "loopArrow" && attributes["type"] !== "curvedArrow";
        }

        switch (attributes[EdgeAttributes.STATE]) {
            case EdgeState.NORMAL:
                ret["color"] = Globals.Colors.DEFAULT_EDGE_COLOR;
                ret["label"] = "";
                break;
            case EdgeState.TREE:
                ret["color"] = Globals.Colors.DARK_GRAY;
                ret["label"] = "";
                break;
            case EdgeState.BACK:
                ret["color"] = Globals.Colors.LIGHT_ORANGE;
                ret["label"] = "B";
                curve = shouldBeCurved(attributes);
                break;
            case EdgeState.FORWARD:
                ret["color"] = Globals.Colors.LIGHT_PURPLE;
                ret["label"] = "F";
                curve = shouldBeCurved(attributes);
                break;
            case EdgeState.CROSS:
                ret["color"] = Globals.Colors.LIGHT_CYAN;
                ret["label"] = "C";
                curve = shouldBeCurved(attributes);
                break;
            default:
                ErrorThrower.notExpectedState();
        }

        //Curving edge
        if (curve) {
            ret["curvature"] = DEFAULT_CURVATURE;
            ret["type"] = "curvedArrow";
        }

        return ret;
    }

}