
// IMPORT
// My classes
import EdgeStyler from "../../EdgeStyler";
import Globals from "../../Globals";
import { EdgeAttributes, EdgeState } from "./BiconnectedComponentsSearchAlgorithm";
import ErrorThrower from "../../ErrorThrower";

// CODE
// Globals
const DEFAULT_CURVATURE = 1;

// This class represents edge styler for search tree of biconnected components search
export default class BiconnectedComponentsSearchTreeEdgeStyler extends EdgeStyler {

    style(attributes) {

        let ret = {};

        let curve = false;

        // Returns if edge of given attributes should be curved
        function shouldBeCurved(attributes) {
            return attributes["type"] !== "loopArrow" && attributes["type"] !== "curvedArrow";
        }

        // Setting color
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
                curve = shouldBeCurved(attributes);
                break;
            default:
                ErrorThrower.notExpectedState();
        }

        // Setting curve
        if (curve) {
            ret["curvature"] = DEFAULT_CURVATURE;
            ret["type"] = "curvedArrow";
        }

        return ret;
    }


}