import SideComponentsFactory from "./SideComponentsFactory";
import SideComponent from "./SideComponent";
import { NodeAttributes, NodeState } from "./TarjanAlgorithm";
import Globals from "./Globals";
import Table from "react-bootstrap/Table";
import ComponentsList from "../components/js/ComponentsList";
import GraphTag from "./GraphTag";
import GraphCanvas from "../components/js/GraphCanvas";
import GraphologyGraphLayout from "./GraphologyGraphLayout";
import circlepack from "graphology-layout/circlepack";
import circular from "graphology-layout/circular";
import TopologicalSortGraphLayout from "./TopologicalSortGraphLayout";

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

        //Component stack
        const componentStack = structuredClone(additionalData.get("componentStack"));
        componentStack.reverse();

        let componentStackItems = [];
        for (const node of componentStack) {
            
            //Color
            let style = {};
            if (node[NodeAttributes.STATE] === NodeState.NEW_IN_DFS_STACK) {
                style = {color: Globals.Colors.GREEN};
            } else if (node[NodeAttributes.STATE] === NodeState.CURRENT) {
                style = {color: Globals.Colors.RED};
            }

            const k = node["key"];
            let tv = node[NodeAttributes.TIME_OF_VISIT];
            if (tv === null) {
                tv = "null";
            }

            let ll = node[NodeAttributes.LOWLINK];
            if (ll === null) {
                ll = "null";
            }

            componentStackItems.push(
                <tr key={k}>
                    <td style={style}>{k}</td>
                    <td style={style}>{tv}</td>
                    <td style={style}>{ll}</td>
                </tr>
            );
        }

        const componentStackComponent =
            <div className="overflow-auto" style={{maxHeight: 500}}>
                <Table>
                    <thead>
                        <tr>
                            <th colSpan={3}>Top of stack</th>
                        </tr>
                        <tr>
                            <td>Node</td>
                            <td>Time of visit</td>
                            <td>Lowlink</td>
                        </tr>
                    </thead>
                    <tbody>
                        {componentStackItems}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colSpan={3}>Bottom of stack</th>
                        </tr>
                    </tfoot>
                </Table>
            </div>

        //Order of visit
        const orderOfVisit = additionalData.get("orderOfVisit");

        let orderOfVisitItems = [];
        for (const node of orderOfVisit) {

            const k = node["key"];
            const ov = node[NodeAttributes.ORDER_OF_VISIT];
            const tv = node[NodeAttributes.TIME_OF_VISIT];
            let vf = node[NodeAttributes.VISITED_FROM];
            if (vf === null) {
                vf = "null";
            }

            //Style
            let style = {};
            switch (node[NodeAttributes.STATE]) {
                case NodeState.NEW_IN_DFS_STACK:
                    style["color"] = Globals.Colors.GREEN;
                    break;
                case NodeState.CURRENT:
                    style["color"] = Globals.Colors.RED;
                    break;
                case NodeState.IN_COMPONENT:
                    style["color"] = Globals.Colors.TEAL;
                    break;
                default:
            }

            orderOfVisitItems.push(
                <tr key={k}>
                    <td style={style}>{ov}</td>
                    <td style={style}>{k}</td>
                    <td style={style}>{tv}</td>
                    <td style={style}>{vf}</td>
                </tr>
            );
        }

        const orderOfVisitComponent = 
            <div className="overflow-auto" style={{maxHeight: 500}}>
                <Table hover={true}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Node</th>
                            <th>Time of visit</th>
                            <th>Visited from</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderOfVisitItems}
                    </tbody>
                </Table>
            </div>;

        //Order of finish
        const orderOfFinish = additionalData.get("orderOfFinish");

        let orderOfFinishItems = [];
        for (const node of orderOfFinish) {

            let style = {};
            if (node[NodeAttributes.STATE] === NodeState.IN_COMPONENT) {
                style["color"] = Globals.Colors.TEAL;
            }

            const k = node["key"];
            const of = node[NodeAttributes.ORDER_OF_FINISH];
            const tv = node[NodeAttributes.TIME_OF_VISIT];
            const tf = node[NodeAttributes.TIME_OF_FINISH];
            
            orderOfFinishItems.push(
                <tr key={k}>
                    <td style={style}>{of}</td>
                    <td style={style}>{k}</td>
                    <td style={style}>{tv}</td>
                    <td style={style}>{tf}</td>
                </tr>
            );
        }

        const orderOfFinishComponent = 
            <div className="overflow-auto" style={{maxHeight: 500}}>
                <Table hover={true}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Node</th>
                            <th>Time of visit</th>
                            <th>Time of finish</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderOfFinishItems}
                    </tbody>
                </Table>
            </div>;

        //Components
        const components = additionalData.get("components");
        const componentsComponent = <ComponentsList components={components}
            zeroComponentsMessage={"No components"}/>;

        //Components graph
        const componentsNodes = components["nodes"];

        const componentsGraphNodes = [];
        for (let i = 0; i < componentsNodes.length; i++) {
            componentsGraphNodes.push(String(i + 1));
        }
        
        const edgesBetweenComponents = additionalData.get("edgesBetweenComponents");

        const componentsGraphEdges = [];
        for (let s = 0; s < edgesBetweenComponents.length; s++) {
            for (let t = 0; t < edgesBetweenComponents[s].length; t++) {
                if (edgesBetweenComponents[s][t]) {
                    componentsGraphEdges.push({"source": String(s + 1), "target": String(t + 1)});
                }
            }
        }

        const json = {
            "directed": true,
            "weighted": false,
            "nodes": componentsGraphNodes,
            "edges": componentsGraphEdges
        };

        const graph = new GraphTag(json).getDisplayGraph();

        for (let componentIndex = 0; componentIndex < componentsNodes.length; componentIndex++) {
            const component = componentsNodes[componentIndex];
            const num = componentIndex + 1;
            graph.setNodeAttribute(String(componentIndex + 1), "label", `${num}\nNodes: ${component}`);
        }

        const layouts = {
            "Topological sort": new TopologicalSortGraphLayout(), "Circlepack": new GraphologyGraphLayout(circlepack), 
            "Circular": new GraphologyGraphLayout(circular)};

        const componentsGraphComponent = <GraphCanvas graph={graph} refreshState={false} layouts={layouts} graphPreview={false} />

        return [new SideComponent("DFS stack", dfsStackComponent), new SideComponent("Component stack", componentStackComponent),
            new SideComponent("Order of visit", orderOfVisitComponent), 
            new SideComponent("Order of finish", orderOfFinishComponent),
            new SideComponent("Components", componentsComponent), 
            new SideComponent("Components graph", componentsGraphComponent)
        ];
    }

}