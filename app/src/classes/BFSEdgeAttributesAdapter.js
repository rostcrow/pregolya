import EdgeAttributesAdapter from "./EdgeAttributesAdapter";
import { EdgeState } from "./BFSAlgorithm";
import { EdgeAttributes } from "./BFSAlgorithm";
import Globals from "./Globals";

export default class BFSEdgeVisualAdapter extends EdgeAttributesAdapter {

    adapt(key, attributes) {

        let ret = {};

        switch(attributes[EdgeAttributes.STATE]) {
            case EdgeState.NORMAL:
                ret["color"] = Globals.DEFAULT_EDGE_COLOR;
                break;
            case EdgeState.HIGHLIGHTED:
                ret["color"] = "#ff0000";
                break;
            default:
        }

        return ret;
    }

}