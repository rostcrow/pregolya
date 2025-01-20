import EdgeVisualAdapter from "./EdgeVisualAdapter";
import { EdgeState } from "./BFSAlgorithm";
import { EdgeAttributes } from "./BFSAlgorithm";
import { DEFAULT_EDGE_COLOR } from "./GraphFactory";

export default class BFSEdgeVisualAdapter extends EdgeVisualAdapter {

    toEdgeVisual(attributes) {

        let ret = {};

        switch(attributes[EdgeAttributes.STATE]) {
            case EdgeState.NORMAL:
               ret["color"] = DEFAULT_EDGE_COLOR;
               break;
            case EdgeState.HIGHLIGHTED:
                ret["color"] = "#ff0000";
                break;
            default:
        }

        return ret;
    }

}