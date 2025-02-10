import NodeVisualAdapter from "./NodeVisualAdapter";
import { NodeState } from "./BFSAlgorithm";
import { NodeAttributes } from "./BFSAlgorithm";

const GRAY_COLOR = "#888888";
const BLACK_COLOR = "#000000";

export default class BFSNodeVisualAdapter extends NodeVisualAdapter {

    toNodeVisual (key, attributes) {
        let ret = {};

        //Setting color
        switch(attributes[NodeAttributes.STATE]) {
            case NodeState.WHITE:
                ret["color"] = "#0D6EFD";
                break;
            case NodeState.GRAY:
                ret["color"] = GRAY_COLOR;
                break;
            case NodeState.BLACK:
                ret["color"] = BLACK_COLOR;
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