
import ListGroup from "react-bootstrap/ListGroup";
import SideComponentsFactory from "./SideComponentsFactory";
import SideComponent from "./SideComponent";
import { NodeAttributes, NodeState } from "./DFSAlgorithm";
import Globals from "./Globals";

export default class DFSSideComponentsFactory extends SideComponentsFactory {

    createSideComponents(algorithmState) {

        const additionalData = algorithmState.getAdditionalData();

        //Stack
        const stack = structuredClone(additionalData.get("stack"));
        stack.reverse();

        let stackItems = [];
        for (const [index, node] of stack.entries()) {
            
            //Color
            let style = {};
            if (node[NodeAttributes.STATE] === NodeState.NEW_IN_STACK) {
                style = {color: Globals.Colors.GREEN};
            } else if (node[NodeAttributes.STATE] === NodeState.CURRENT) {
                style = {color: Globals.Colors.RED};
            }

            //Text
            const k = node["key"];
            const vf = node[NodeAttributes.VISITED_FROM];
            const tv = node[NodeAttributes.TIME_OF_VISIT];

            const text = `${k} (Visited from: ${vf}, Time of visit: ${tv})`;

            stackItems.push(<ListGroup.Item key={index} style={style}>{text}</ListGroup.Item>);
        }

        const stackComponent =
            <ListGroup>
                {stackItems}
            </ListGroup>;

        return [new SideComponent("Stack", stackComponent)];
    }

}