
// IMPORT
// My classes
import ErrorThrower from "../../ErrorThrower";
import Globals from "../../Globals";
import NodeStyler from "../../NodeStyler";
import { NodeAttributes, NodeState } from "./TarjanAlgorithm";

// CODE
// This class represents node styler for Tarjan algorithm
export default class TarjanNodeStyler extends NodeStyler {

    style(attributes) {

        let ret = {}

        // Color
        switch (attributes[NodeAttributes.STATE]) {
            case NodeState.NOT_VISITED:
                ret["color"] = Globals.Colors.DEFAULT_NODE_COLOR;
                break;
            case NodeState.NEW_IN_DFS_STACK:
                ret["color"] = Globals.Colors.GREEN;
                break;
            case NodeState.IN_DFS_STACK:
                ret["color"] = Globals.Colors.GRAY;
                break;
            case NodeState.CURRENT:
                ret["color"] = Globals.Colors.RED;
                break;
            case NodeState.NOT_IN_COMPONENT:
                ret["color"] = Globals.Colors.BLACK;
                break;
            case NodeState.IN_COMPONENT:
                ret["color"] = Globals.Colors.TEAL;
                break;
            default:
                ErrorThrower.notExpectedState();
        }

        // Label
        const key = attributes["key"];
        const state = attributes[NodeAttributes.STATE];
        const visited = attributes[NodeAttributes.VISITED];

        const visitedFrom = attributes[NodeAttributes.VISITED_FROM];
        const visitedFromStr = (visitedFrom === null)? "null" : visitedFrom;

        const orderOfVisit = attributes[NodeAttributes.ORDER_OF_VISIT];
        const orderOfVisitStr = (orderOfVisit === null)? "null" : `#${orderOfVisit}`;

        const timeOfVisit = attributes[NodeAttributes.TIME_OF_VISIT];
        const timeOfVisitStr = (timeOfVisit === null)? "null" : timeOfVisit;

        const orderOfFinish = attributes[NodeAttributes.ORDER_OF_FINISH];
        const orderOfFinishStr = (orderOfFinish === null)? "null" : `#${orderOfFinish}`;

        const timeOfFinish = attributes[NodeAttributes.TIME_OF_FINISH];
        const timeOfFinishStr = (timeOfFinish === null)? "null" : timeOfFinish;

        const lowlink = attributes[NodeAttributes.LOWLINK];
        const lowlinkStr = (lowlink === null)? "null" : lowlink;

        const inComponent = attributes[NodeAttributes.IN_COMPONENT];
        const inComponentStr = (inComponent === null)? "null" : inComponent;

        const label = 
`${key}
State: ${state}
Visited: ${visited}
Visited from: ${visitedFromStr}
Order of visit: ${orderOfVisitStr}
Time of visit: ${timeOfVisitStr}
Order of finish: ${orderOfFinishStr}
Time of finish: ${timeOfFinishStr}
Lowlink: ${lowlinkStr}
In component: ${inComponentStr}`;

        ret["label"] = label;

        return ret;
    }


}