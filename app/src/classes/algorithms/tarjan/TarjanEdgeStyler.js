
import EdgeStyler from "../../EdgeStyler";
import ErrorThrower from "../../ErrorThrower";
import Globals from "../../Globals";
import { EdgeAttributes, EdgeState } from "./TarjanAlgorithm";

export default class TarjanEdgeStyler extends EdgeStyler {

    style(attributes) {

        let ret = {};

        switch (attributes[EdgeAttributes.STATE]) {
            case EdgeState.NOT_VISITED:
                ret["color"] = Globals.Colors.DEFAULT_EDGE_COLOR;
                break;
            case EdgeState.HIGHLIGHTED:
                ret["color"] = Globals.Colors.RED;
                break;
            case EdgeState.NOT_IN_COMPONENT:
                ret["color"] = Globals.Colors.DARK_GRAY;
                break;
            case EdgeState.IN_COMPONENT:
                ret["color"] = Globals.Colors.PINK;
                break;
            default:
                ErrorThrower.notExpectedState();
        }

        return ret;

    }

}