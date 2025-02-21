import NodeAttributesAdapter from "./NodeAttributesAdapter";
import { NodeState } from "./DFSAlgorithm";
import { NodeAttributes } from "./DFSAlgorithm";
import Globals from "./Globals";
import ErrorThrower from "./ErrorThrower";

export default class DFSNodeAttributesAdapter extends NodeAttributesAdapter {

    adapt(key, attributes) {

        let ret = {};

        //Color
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

        //Label
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
`${key}
Visited from: ${vf}
Order of visit: ${ovStr}
Time of visit: ${tv}
Order of finish: ${ofStr}
Time of finish: ${tf}`;

        ret["label"] = label;

        return ret;
    }

}