
// IMPORT
// React Bootstrap
import Table from "react-bootstrap/Table";

// My components
import Legend from "../../../components/js/Legend";
import GraphView from "../../../components/js/GraphView";

// My classes
import SideComponentsFactory from "../../SideComponentsFactory";
import SideComponent from "../../SideComponent";
import { EdgeAttributes, EdgeState, NodeAttributes, NodeState } from "./DFSAlgorithm";
import Globals from "../../Globals";
import GraphData from "../../GraphData";
import GraphFactory from "../../GraphFactory";
import GraphDataStyler from "../../GraphDataStyler";
import DFSNodeStyler from "./DFSNodeStyler";
import DFSTreeEdgeStyler from "./DFSTreeEdgeStyler";
import GraphDataApplier from "../../GraphDataApplier";
import DFSTreeGraphLayout from "./DFSTreeGraphLayout";
import GraphDataExtractor from "../../GraphDataExtractor";

// CODE
// This class represents side components factory for depth-first search
export default class DFSSideComponentsFactory extends SideComponentsFactory {

    createSideComponents(algorithmState) {

        const graphData = algorithmState.getGraphData();
        const additionalData = algorithmState.getAdditionalData();

        // Stack
        const stack = structuredClone(additionalData.get("stack"));
        stack.reverse();

        let stackItems = [];
        for (const node of stack) {
            
            // Color
            let style = {};
            if (node[NodeAttributes.STATE] === NodeState.NEW_IN_STACK) {
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

            stackItems.push(
                <tr key={k}>
                    <td style={style}>{k}</td>
                    <td style={style}>{vf}</td>
                    <td style={style}>{tv}</td>
                </tr>
            );
        }

        const stackComponent =
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
                        {stackItems}
                    </tbody>
                    <tfoot className='border'>
                        <tr>
                            <th colSpan={3}>Bottom of stack</th>
                        </tr>
                    </tfoot>
                </Table>
            </div>

        // Tree
        const nodes = graphData.getNodes();
        const edges = graphData.getEdges();

        const outputNodes = {};
        const outputEdges = {};

        // Adding nodes
        for (const key in nodes) {
            if (nodes[key][NodeAttributes.STATE] !== NodeState.NOT_VISITED) {
                outputNodes[key] = nodes[key];
            }
        }

        // Adding edges
        for (const key in edges) {
            if (edges[key][EdgeAttributes.STATE] !== EdgeState.NORMAL) {
                // Visited edge

                let edge = edges[key];

                // Changing direction of edge if needed
                const sourceNode = edge["source"];
                const targetNode = edge["target"];

                if (edges[key][EdgeAttributes.STATE] === EdgeState.TREE) {
                    // Tree edge

                    if (nodes[sourceNode][NodeAttributes.VISITED_FROM] === targetNode) {
                        edge["source"] = targetNode;
                        edge["target"] = sourceNode;
                    }
                } else if (edges[key][EdgeAttributes.STATE] === EdgeState.BACK) {
                    // Back edge

                    if (nodes[sourceNode][NodeAttributes.TIME_OF_VISIT] < nodes[targetNode][NodeAttributes.TIME_OF_VISIT]) {
                        edge["source"] = targetNode;
                        edge["target"] = sourceNode;
                    }
                }

                outputEdges[key] = edge;
            }
        }

        // Making graph
        let treeGraphData = new GraphData(true, false, outputNodes, outputEdges);
        const treeGraph = GraphFactory.createDisplayGraph(treeGraphData);
        treeGraphData = GraphDataExtractor.extractData(treeGraph);

        // Styling graph
        const graphDataStyler = new GraphDataStyler (new DFSNodeStyler(), new DFSTreeEdgeStyler());
        let styledData = graphDataStyler.style(treeGraphData);
        GraphDataApplier.applyNodesEdges(treeGraph, styledData);

        // Making component
        const treeComponent = <GraphView graph={treeGraph} layout={new DFSTreeGraphLayout()}></GraphView>;

        // Order of visit
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
            if (node[NodeAttributes.STATE] === NodeState.NEW_IN_STACK) {
                style = {color: Globals.Colors.GREEN};
            } else if (node[NodeAttributes.STATE] === NodeState.CURRENT) {
                style = {color: Globals.Colors.RED};
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

        // Order of finish
        const orderOfFinish = additionalData.get("orderOfFinish");

        let orderOfFinishItems = [];
        for (const node of orderOfFinish) {

            const k = node["key"];
            const of = node[NodeAttributes.ORDER_OF_FINISH];
            const tv = node[NodeAttributes.TIME_OF_VISIT];
            const tf = node[NodeAttributes.TIME_OF_FINISH];
            
            orderOfFinishItems.push(
                <tr key={k}>
                    <td>{of}</td>
                    <td>{k}</td>
                    <td>{tv}</td>
                    <td>{tf}</td>
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

        // Legend
        let edgesRows = [
            {"color": Globals.Colors.DEFAULT_EDGE_COLOR, "key": EdgeState.NORMAL},
            {"color": Globals.Colors.DARK_GRAY, "key": EdgeState.TREE},
            {"color": Globals.Colors.LIGHT_ORANGE, "key": EdgeState.BACK}
        ];

        if (graphData.isDirected()) {
            edgesRows = [
                {"color": Globals.Colors.DEFAULT_EDGE_COLOR, "key": EdgeState.NORMAL},
                {"color": Globals.Colors.DARK_GRAY, "key": EdgeState.TREE},
                {"color": Globals.Colors.LIGHT_ORANGE, "key": EdgeState.BACK},
                {"color": Globals.Colors.LIGHT_PURPLE, "key": EdgeState.FORWARD},
                {"color": Globals.Colors.LIGHT_CYAN, "key": EdgeState.CROSS}
            ];
        }

        const legendData = [
            {"title": "Nodes", "type": "circle", "rows": [
                {"color": Globals.Colors.DEFAULT_NODE_COLOR, "key": NodeState.NOT_VISITED},
                {"color": Globals.Colors.GREEN, "key": NodeState.NEW_IN_STACK},
                {"color": Globals.Colors.GRAY, "key": NodeState.IN_STACK},
                {"color": Globals.Colors.RED, "key": NodeState.CURRENT},
                {"color": Globals.Colors.BLACK, "key": NodeState.FINISHED},
            ]},
            {"title": "Edges", "type": "rectangle", "rows": edgesRows},
        ]

        const legendComponent = <Legend data={legendData} />

        return [new SideComponent("Stack", stackComponent), new SideComponent("Tree", treeComponent), 
            new SideComponent("Order of visit", orderOfVisitComponent), 
            new SideComponent("Order of finish", orderOfFinishComponent), 
            new SideComponent("Legend", legendComponent)];
    }

}