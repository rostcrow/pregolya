import EdgeAttributesAdapter from "./EdgeAttributesAdapter";
import { EdgeState } from "./DFSAlgorithm";
import { EdgeAttributes } from "./DFSAlgorithm";
import Globals from "./Globals";
import ErrorThrower from "./ErrorThrower";

export default class DFSEdgeAttributesAdapter extends EdgeAttributesAdapter {

    adapt(key, attributes) {

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
            case EdgeState.BACK:
                ret["color"] = Globals.Colors.LIGHT_ORANGE;
                ret["label"] = "B";
                break;
            case EdgeState.FORWARD:
                ret["color"] = Globals.Colors.LIGHT_PURPLE;
                ret["label"] = "F";
                break;
            case EdgeState.CROSS:
                ret["color"] = Globals.Colors.LIGHT_CYAN;
                ret["label"] = "C";
                break;
            default:
                ErrorThrower.notExpectedState();
        }

        return ret;
    }

}