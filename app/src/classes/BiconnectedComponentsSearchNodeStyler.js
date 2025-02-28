import NodeStyler from "./NodeStyler";
import { NodeAttributes, NodeState } from "./BiconnectedComponentsSearchAlgorithm";
import Globals from "./Globals";
import ErrorThrower from "./ErrorThrower";

export default class BiconnectedComponentsSearchNodeStyler extends NodeStyler {

    style(attributes) {

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
            case NodeState.NOT_ARTICULATION:
                ret["color"] = Globals.Colors.BLACK;
                break;
            case NodeState.ARTICULATION:
                ret["color"] = Globals.Colors.TEAL;
                break;
            default:
                ErrorThrower.notExpectedState();
        }

        //Label
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

        const d = attributes[NodeAttributes.DEPTH];
        let dStr = "null";
        if (d !== null) {
            dStr = `${d}`;
        }

        const lp = attributes[NodeAttributes.LOWPOINT];
        let lpStr = "null";
        if (lp !== null) {
            lpStr = `${lp}`;
        }

        const label = 
`${k}
State: ${s}
Visited from: ${vf}
Order of visit: ${ovStr}
Time of visit: ${tv}
Order of finish: ${ofStr}
Time of finish: ${tf}
Depth: ${dStr}
Lowpoint: ${lpStr}`;

        ret["label"] = label;

        return ret;
    }

}