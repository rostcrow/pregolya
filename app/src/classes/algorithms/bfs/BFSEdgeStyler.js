import EdgeStyler from "../../EdgeStyler";
import { EdgeState, EdgeAttributes } from "./BFSAlgorithm";
import Globals from "../../Globals";

export default class BFSEdgeStyler extends EdgeStyler {

    style(attributes) {

        let ret = {};

        switch(attributes[EdgeAttributes.STATE]) {
            case EdgeState.NORMAL:
                ret["color"] = Globals.Colors.DEFAULT_EDGE_COLOR;
                break;
            case EdgeState.HIGHLIGHTED:
                ret["color"] = Globals.Colors.RED;
                break;
            case EdgeState.USED:
                ret["color"] = Globals.Colors.DARK_GRAY;
                break;
            default:
        }

        return ret;
    }

}