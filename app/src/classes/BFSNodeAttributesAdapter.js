import NodeAttributesAdapter from "./NodeAttributesAdapter";
import { NodeState } from "./BFSAlgorithm";
import { NodeAttributes } from "./BFSAlgorithm";
import Globals from "./Globals";

export default class BFSNodeAttributesAdapter extends NodeAttributesAdapter {

    adapt(key, attributes) {
        let ret = {};

        //Setting color
        switch(attributes[NodeAttributes.STATE]) {
            case NodeState.NOT_VISITED:
                ret["color"] = Globals.Colors.DEFAULT_NODE_COLOR;
                break;
            case NodeState.IN_QUEUE:
                ret["color"] = Globals.Colors.GRAY;
                break;
            case NodeState.CURRENT:
                ret["color"] = Globals.Colors.RED;
                break;
            case NodeState.FINISHED:
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