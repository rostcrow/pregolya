import NodeVisualAdapter from "./NodeVisualAdapter";
import { NodeState } from "./BFSAlgorithm";

export default class BFSNodeVisualAdapter extends NodeVisualAdapter {

    toNodeVisual (attributes) {
        let ret = {};

        switch(attributes["state"]) {
            case NodeState.WHITE:
                ret["color"] = "#0000ff";
                break;
            case NodeState.GRAY:
                ret["color"] = "#00ff00";
                break;
            case NodeState.BLACK:
                ret["color"] = "#ff0000";
                break;
            default:
        }

        return ret;
    }

}