import EdgeAttributesAdapter from "./EdgeAttributesAdapter";
import { EdgeState } from "./BFSAlgorithm";
import { EdgeAttributes } from "./BFSAlgorithm";

export default class BFSEdgeVisualAdapter extends EdgeAttributesAdapter {

    adapt(key, attributes) {

        let ret = {};

        switch(attributes[EdgeAttributes.STATE]) {
            case EdgeState.NORMAL:
                ret["color"] = "#CCCCCC";
                break;
            case EdgeState.HIGHLIGHTED:
                ret["color"] = "#ff0000";
                break;
            default:
        }

        return ret;
    }

}