import EdgeAttributesAdapter from "./EdgeAttributesAdapter";
import { EdgeState } from "./BFSAlgorithm";
import { EdgeAttributes } from "./BFSAlgorithm";
import Globals from "./Globals";

export default class BFSEdgeAttributesAdapter extends EdgeAttributesAdapter {

    adapt(key, attributes) {

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