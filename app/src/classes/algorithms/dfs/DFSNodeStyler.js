
// IMPORT
// My classes
import NodeStyler from "../../NodeStyler";
import { NodeState } from "./DFSAlgorithm";
import { NodeAttributes } from "./DFSAlgorithm";
import Globals from "../../Globals";
import ErrorThrower from "../../ErrorThrower";

// CODE
// This class represents node styler of depth-first search
export default class DFSNodeStyler extends NodeStyler {

    style(attributes) {

        let ret = {};

        // Color
        switch(attributes[NodeAttributes.STATE]) {
            case NodeState.NOT_VISITED:
                ret["color"] = Globals.Colors.DEFAULT_NODE_COLOR;
                break;
            case NodeState.NEW_IN_STACK:
                ret["color"] = Globals.Colors.GREEN;
                break;
            case NodeState.IN_STACK:
                ret["color"] = Globals.Colors.GRAY;
                break;
            case NodeState.CURRENT:
                ret["color"] = Globals.Colors.RED;
                break;
            case NodeState.FINISHED:
                ret["color"] = Globals.Colors.BLACK;
                break;
            default:
                ErrorThrower.notExpectedState();
        }

        // Label
        const k = attributes["key"];
        const s = attributes[NodeAttributes.STATE];
        const vf = attributes[NodeAttributes.VISITED_FROM];

        const ov = attributes[NodeAttributes.ORDER_OF_VISIT];
        let ovStr = "null";
        if (ov !== null) {
            ovStr = `#${ov}`;
        }

        const tv = attributes[NodeAttributes.TIME_OF_VISIT];

        const of = attributes[NodeAttributes.ORDER_OF_FINISH];
        let ofStr = "null";
        if (of !== null) {
            ofStr = `#${of}`;
        }

        const tf = attributes[NodeAttributes.TIME_OF_FINISH];

        const label = 
`${k}
State: ${s}
Visited from: ${vf}
Order of visit: ${ovStr}
Time of visit: ${tv}
Order of finish: ${ofStr}
Time of finish: ${tf}`;

        ret["label"] = label;

        return ret;
    }

}