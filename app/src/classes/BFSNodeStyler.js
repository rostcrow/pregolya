import NodeStyler from "./NodeStyler";
import { NodeState } from "./BFSAlgorithm";
import { NodeAttributes } from "./BFSAlgorithm";
import Globals from "./Globals";

export default class BFSNodeStyler extends NodeStyler {

    style(attributes) {
        let ret = {};

        //Setting color
        switch(attributes[NodeAttributes.STATE]) {
            case NodeState.NOT_VISITED:
                ret["color"] = Globals.Colors.DEFAULT_NODE_COLOR;
                break;
            case NodeState.NEW_IN_QUEUE:
                ret["color"] = Globals.Colors.GREEN;
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
        const k = attributes["key"];

        const ov = attributes[NodeAttributes.ORDER_OF_VISIT];
        let ovStr = "null";
        if (ov !== null) {
            ovStr = `#${ov}`;
        }

        const vf = attributes[NodeAttributes.VISITED_FROM];
        const dfsn = attributes[NodeAttributes.DISTANCE_FROM_START];

        ret["label"] = `${k}\nOrder of visit: ${ovStr}\nVisited from: ${vf}\nDistance from start: ${dfsn}`;

        return ret;
    }

}