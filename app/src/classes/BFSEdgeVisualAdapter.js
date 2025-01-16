import EdgeVisualAdapter from "./EdgeVisualAdapter";
import { EdgeState } from "./BFSAlgorithm";

export default class BFSEdgeVisualAdapter extends EdgeVisualAdapter {

    toEdgeVisual(attributes) {

        let ret = {};

        switch(attributes["state"]) {
            case EdgeState.NORMAL:
               ret["color"] = "#cccccc";
               break;
            case EdgeState.HIGHLIGHTED:
                ret["color"] = "#ff0000";
                break;
            default:
        }

        return ret;
    }

}