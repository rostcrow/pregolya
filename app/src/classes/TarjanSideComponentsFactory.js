import SideComponentsFactory from "./SideComponentsFactory";
import SideComponent from "./SideComponent";
import { EdgeAttributes, EdgeState, NodeAttributes, NodeState } from "./TarjanAlgorithm";
import Globals from "./Globals";
import Table from "react-bootstrap/Table";
import ComponentsList from "../components/js/ComponentsList";
import GraphCanvas from "../components/js/GraphCanvas";
import GraphologyGraphLayout from "./GraphologyGraphLayout";
import circlepack from "graphology-layout/circlepack";
import circular from "graphology-layout/circular";
import TopologicalSortGraphLayout from "./TopologicalSortGraphLayout";
import GraphData from "./GraphData";
import GraphFactory from "./GraphFactory";
import GraphDataExtractor from "./GraphDataExtractor";
import GraphDataStyler from "./GraphDataStyler";
import TarjanNodeStyler from "./TarjanNodeStyler";
import TarjanEdgeStyler from "./TarjanEdgeStyler";
import GraphDataApplier from "./GraphDataApplier";
import GraphView from "../components/js/GraphView";
import TarjanTreeGraphLayout from "./TarjanTreeGraphLayout";
import Legend from "../components/js/Legend";
import GraphTagFactory from "./GraphTagFactory";

export default class TarjanSideComponentsFactory extends SideComponentsFactory {

    createSideComponents(algorithmState) {

        const graphData = algorithmState.getGraphData();
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
                    <thead className='border'>
                        <tr>
                            <th colSpan={3}>Top of stack</th>
                        </tr>
                        <tr>
                            <td>Node</td>
                            <td>Visited from</td>
                            <td>Time of visit</td>
                        </tr>
                    </thead>
                    <tbody className='border'>
                        {dfsStackItems}
                    </tbody>
                    <tfoot className='border'>
                        <tr>
                            <th colSpan={3}>Bottom of stack</th>
                        </tr>
                    </tfoot>
                </Table>
            </div>

        //DFS tree
        const nodes = graphData.getNodes();
        const edges = graphData.getEdges();

        const outputNodes = {};
        const outputEdges = {};

        //Adding nodes
        for (const key in nodes) {
            if (nodes[key][NodeAttributes.STATE] !== NodeState.NOT_VISITED) {
                outputNodes[key] = nodes[key];
            }
        }

        //Adding edges
        for (const key in edges) {
            if (edges[key][EdgeAttributes.STATE] !== EdgeState.NOT_VISITED) {
                outputEdges[key] = edges[key];
            }
        }

        //Making graph
        let treeGraphData = new GraphData(true, false, outputNodes, outputEdges);
        const treeGraph = GraphFactory.createDisplayGraph(treeGraphData);
        treeGraphData = GraphDataExtractor.extractData(treeGraph);

        //Styling graph
        const graphDataStyler = new GraphDataStyler(new TarjanNodeStyler(), new TarjanEdgeStyler());
        const styledData = graphDataStyler.style(treeGraphData);
        GraphDataApplier.applyNodesEdges(treeGraph, styledData);

        //Making component
        const treeComponent = <GraphView graph={treeGraph} layout={new TarjanTreeGraphLayout()} />;

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
                    <thead className='border'>
                        <tr>
                            <th colSpan={3}>Top of stack</th>
                        </tr>
                        <tr>
                            <td>Node</td>
                            <td>Time of visit</td>
                            <td>Lowlink</td>
                        </tr>
                    </thead>
                    <tbody className='border'>
                        {componentStackItems}
                    </tbody>
                    <tfoot className='border'>
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
                    <thead className='border'>
                        <tr>
                            <th>#</th>
                            <th>Node</th>
                            <th>Time of visit</th>
                            <th>Visited from</th>
                        </tr>
                    </thead>
                    <tbody className='border'>
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
                    <thead className='border'>
                        <tr>
                            <th>#</th>
                            <th>Node</th>
                            <th>Time of visit</th>
                            <th>Time of finish</th>
                        </tr>
                    </thead>
                    <tbody className='border'>
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
        const componentNamePrefix = "Comp. ";

        const componentsGraphNodes = [];
        for (let i = 0; i < componentsNodes.length; i++) {
            componentsGraphNodes.push(componentNamePrefix + String(i + 1));
        }
        
        const edgesBetweenComponents = additionalData.get("edgesBetweenComponents");

        const componentsGraphEdges = [];
        for (let s = 0; s < edgesBetweenComponents.length; s++) {
            for (let t = 0; t < edgesBetweenComponents[s].length; t++) {
                if (edgesBetweenComponents[s][t]) {
                    componentsGraphEdges.push(
                        {"source": componentNamePrefix + String(s + 1), "target": componentNamePrefix + String(t + 1)});
                }
            }
        }

        const json = {
            "directed": true,
            "weighted": false,
            "nodes": componentsGraphNodes,
            "edges": componentsGraphEdges
        };

        const componentsGraphTag = GraphTagFactory.createFromJson(json);
        const graph = componentsGraphTag.getDisplayGraph();

        for (let componentIndex = 0; componentIndex < componentsNodes.length; componentIndex++) {
            const component = componentsNodes[componentIndex];
            const num = componentIndex + 1;
            const name = componentNamePrefix + String(num);
            graph.setNodeAttribute(name, "label", `${name}\nNodes: ${component}`);
        }

        const layouts = {
            "Topological sort": new TopologicalSortGraphLayout(), "Circlepack": new GraphologyGraphLayout(circlepack), 
            "Circular": new GraphologyGraphLayout(circular)};

        const componentsGraphComponent = <GraphCanvas graph={graph} refreshState={false} layouts={layouts} graphPreview={false} />

        //Legend
        const legendData = [
            {"title": "Nodes", "type": "circle", "rows": [
                {"color": Globals.Colors.DEFAULT_NODE_COLOR, "key": NodeState.NOT_VISITED},
                {"color": Globals.Colors.GREEN, "key": NodeState.NEW_IN_DFS_STACK},
                {"color": Globals.Colors.GRAY, "key": NodeState.IN_DFS_STACK},
                {"color": Globals.Colors.RED, "key": NodeState.CURRENT},
                {"color": Globals.Colors.BLACK, "key": NodeState.NOT_IN_COMPONENT},
                {"color": Globals.Colors.TEAL, "key": NodeState.IN_COMPONENT},
            ]},
            {"title": "Edges", "type": "rectangle", "rows": [
                {"color": Globals.Colors.DEFAULT_EDGE_COLOR , "key": EdgeState.NOT_VISITED},
                {"color": Globals.Colors.RED , "key": EdgeState.HIGHLIGHTED},
                {"color": Globals.Colors.DARK_GRAY , "key": EdgeState.NOT_IN_COMPONENT},
                {"color": Globals.Colors.PINK , "key": EdgeState.IN_COMPONENT}
            ]}
        ]

        const legendComponent = <Legend data={legendData} />;

        return [new SideComponent("DFS stack", dfsStackComponent),
            new SideComponent("DFS Tree", treeComponent),
            new SideComponent("Component stack", componentStackComponent),
            new SideComponent("Order of visit", orderOfVisitComponent), 
            new SideComponent("Order of finish", orderOfFinishComponent),
            new SideComponent("Components", componentsComponent), 
            new SideComponent("Components graph", componentsGraphComponent),
            new SideComponent("Legend", legendComponent)
        ];
    }

}