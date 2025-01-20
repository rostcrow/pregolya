import NodeVisualAdapter from "./NodeVisualAdapter";
import { NodeState } from "./BFSAlgorithm";
import { NodeAttributes } from "./BFSAlgorithm";

export default class BFSNodeVisualAdapter extends NodeVisualAdapter {

    toNodeVisual (key, attributes) {
        let ret = {};

        //Setting color
        switch(attributes[NodeAttributes.STATE]) {
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

        //Setting label
        let vf = attributes[NodeAttributes.VISITED_FROM];
        let dfsn = attributes[NodeAttributes.DISTANCE_FROM_START];

        ret["label"] = `${key}\nVisited from: ${vf}\nDistance from start: ${dfsn}`;

        return ret;
    }

}