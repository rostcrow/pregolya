import NodeAttributesAdapter from "./NodeAttributesAdapter";
import { NodeState } from "./DFSAlgorithm";
import { NodeAttributes } from "./DFSAlgorithm";
import Globals from "./Globals";

export default class DFSNodeAttributesAdapter extends NodeAttributesAdapter {

    adapt(key, attributes) {
        let ret = {};

        //Setting color
        switch(attributes[NodeAttributes.STATE]) {
            case NodeState.WHITE:
                ret["color"] = Globals.Colors.DEFAULT_NODE_COLOR;
                break;
            case NodeState.GRAY:
                ret["color"] = Globals.Colors.GRAY;
                break;
            case NodeState.BLACK:
                ret["color"] = Globals.Colors.BLACK;
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