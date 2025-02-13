import EdgeAttributesAdapter from "./EdgeAttributesAdapter";
import { EdgeState } from "./DFSAlgorithm";
import { EdgeAttributes } from "./DFSAlgorithm";
import Globals from "./Globals";

export default class DFSEdgeAttributesAdapter extends EdgeAttributesAdapter {

    adapt(key, attributes) {

        let ret = {};

        switch(attributes[EdgeAttributes.STATE]) {
            case EdgeState.NORMAL:
                ret["color"] = Globals.Colors.DEFAULT_EDGE_COLOR;
                break;
            case EdgeState.HIGHLIGHTED:
                ret["color"] = Globals.Colors.RED;
                break;
            default:
        }

        return ret;
    }

}