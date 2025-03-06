import SideComponentsFactory from "./SideComponentsFactory";
import SideComponent from "./SideComponent";
import { NodeAttributes, NodeState } from "./TarjanAlgorithm";
import Globals from "./Globals";
import Table from "react-bootstrap/Table";

export default class TarjanSideComponentsFactory extends SideComponentsFactory {

    createSideComponents(algorithmState) {

        const additionalData = algorithmState.getAdditionalData();

        //DFS stack
        const dfsStack = structuredClone(additionalData.get("dfsStack"));
        dfsStack.reverse();

        let dfsStackItems = [];
        for (const node of dfsStack) {
            
            //Color
            let style = {};
            if (node[NodeAttributes.STATE] === NodeState.NEW_IN_DFS_STACK) {
                style = {color: Globals.Colors.GREEN};
            } else if (node[NodeAttributes.STATE] === NodeState.CURRENT) {
                style = {color: Globals.Colors.RED};
            }

            const k = node["key"];
            let vf = node[NodeAttributes.VISITED_FROM];
            if (vf === null) {
                vf = "null";
            }
            const tv = node[NodeAttributes.TIME_OF_VISIT];

            dfsStackItems.push(
                <tr key={k}>
                    <td style={style}>{k}</td>
                    <td style={style}>{vf}</td>
                    <td style={style}>{tv}</td>
                </tr>
            );
        }

        const dfsStackComponent =
            <div className="overflow-auto" style={{maxHeight: 500}}>
                <Table>
                    <thead>
                        <tr>
                            <th colSpan={3}>Top of stack</th>
                        </tr>
                        <tr>
                            <td>Node</td>
                            <td>Visited from</td>
                            <td>Time of visit</td>
                        </tr>
                    </thead>
                    <tbody>
                        {dfsStackItems}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colSpan={3}>Bottom of stack</th>
                        </tr>
                    </tfoot>
                </Table>
            </div>

        return [new SideComponent("DFS stack", dfsStackComponent)];
    }

}