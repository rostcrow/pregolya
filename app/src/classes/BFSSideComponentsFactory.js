
import SideComponent from './SideComponent';
import SideComponentsFactory from "./SideComponentsFactory";
import Globals from './Globals';
import { EdgeAttributes, EdgeState, NodeAttributes, NodeState } from './BFSAlgorithm';
import GraphDataStyler from './GraphDataStyler';
import BFSNodeStyler from './BFSNodeStyler';
import BFSEdgeStyler from './BFSEdgeStyler';
import GraphData from './GraphData';
import GraphFactory from './GraphFactory';
import GraphView from '../components/js/GraphView';
import BFSTreeGraphLayout from './BFSTreeGraphLayout';
import GraphDataApplier from './GraphDataApplier';
import Table from "react-bootstrap/Table";
import Legend from '../components/js/Legend';

export default class BFSSideComponentsFactory extends SideComponentsFactory {

    createSideComponents(algorithmState) {

        const graphData = algorithmState.getGraphData();
        const additionalData = algorithmState.getAdditionalData();

        //QUEUE
        const currentNode = additionalData.get("currentNode");

        const currrentNodeItemStyle = {color: Globals.Colors.RED};
        let currentNodeItem;
        if (currentNode !== null) {

            let vf = currentNode["visitedFrom"]
            if (vf === null) {
                vf = "null";
            }

            currentNodeItem = 
                <tr>
                    <td style={currrentNodeItemStyle}>{currentNode["key"]}</td>
                    <td style={currrentNodeItemStyle}>{vf}</td>
                    <td style={currrentNodeItemStyle}>{currentNode["distance"]}</td>
                </tr>;
        } else {

            currentNodeItem = 
                <tr>
                    <td colSpan={3} style={currrentNodeItemStyle}>None</td>
                </tr>;
        }

        let queue = additionalData.get("queue");

        let items = [];
        for (const node of queue) {

            //Setting style
            let style = {};
            if (node["state"] === NodeState.NEW_IN_QUEUE) {
                style = {color: Globals.Colors.GREEN};
            }

            let vf = node["visitedFrom"]
            if (vf === null) {
                vf = "null";
            }

            //Pushing item
            items.push(
                <tr key={node["key"]}>
                    <td style={style}>{node["key"]}</td>
                    <td style={style}>{vf}</td>
                    <td style={style}>{node["distance"]}</td>
                </tr>
            );
        }

        const queueComponent = 
            <>
                <div className="overflow-auto" style={{maxHeight: 500}}>
                    <Table hover={true}>
                        <thead>
                            <tr>
                                <th colSpan={3}>Current node</th>
                            </tr>
                            <tr>
                                <td>Node</td>
                                <td>Visited from</td>
                                <td>Distance from start</td>
                            </tr>
                        </thead>
                        <tbody>
                            {currentNodeItem}
                        </tbody>
                    </Table>
                </div>
                <div className="overflow-auto" style={{maxHeight: 500}}>
                    <Table hover={true}>
                        <thead>
                            <tr>
                                <th colSpan={3}>Front of queue</th>
                            </tr>
                            <tr>
                                <td>Node</td>
                                <td>Visited from</td>
                                <td>Distance from start</td>
                            </tr>
                        </thead>
                        <tbody>
                            {items}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colSpan={3}>Back of queue</th>
                            </tr>
                        </tfoot>
                    </Table>
                </div>
            </>;

        //TREE
        const nodes = graphData.getNodes();
        const edges = graphData.getEdges();

        //Creating output nodes
        let outputNodes = {};
        for (const key in nodes) {
            if (nodes[key][NodeAttributes.STATE] !== NodeState.NOT_VISITED) {
                outputNodes[key] = nodes[key];
            }
        }

        //Creating output edges
        let outputEdges = {};
        for (const key in edges) {
            if (edges[key][EdgeAttributes.STATE] !== EdgeState.NORMAL) {
                
                let edge = edges[key];

                //Changing direction of edge if needed
                const sourceNode = edge["source"];
                const targetNode = edge["target"];

                if (nodes[sourceNode][NodeAttributes.VISITED_FROM] === targetNode) {
                    edge["source"] = targetNode;
                    edge["target"] = sourceNode;
                }

                outputEdges[key] = edge;
            }
        }

        //Making graph
        const treeGraphData = new GraphData(true, false, outputNodes, outputEdges);
        const treeGraph = GraphFactory.createDisplayGraph(treeGraphData);

        //Styling graph
        const graphDataStyler = new GraphDataStyler(new BFSNodeStyler(), new BFSEdgeStyler());
        const styledTreeGraphData = graphDataStyler.style(treeGraphData);
        GraphDataApplier.applyAll(treeGraph, styledTreeGraphData);

        //Making component
        const treeComponent = <GraphView graph={treeGraph} layout={new BFSTreeGraphLayout()}></GraphView>;

        //ORDER OF VISIT
        const order = additionalData.get("order");

        let orderItems = [];
        for (const node of order) {

            //Setting style
            let style = {};
            if (node["state"] === NodeState.NEW_IN_QUEUE) {
                style = {color: Globals.Colors.GREEN};
            } else if (node["state"] === NodeState.CURRENT) {
                style = {color: Globals.Colors.RED};
            }

            let vf = node["visitedFrom"]
            if (vf === null) {
                vf = "null";
            }

            orderItems.push(
                <tr key={node["key"]}>
                    <td style={style}>{node["order"]}</td>
                    <td style={style}>{node["key"]}</td>
                    <td style={style}>{vf}</td>
                    <td style={style}>{node["distance"]}</td>
                </tr>
            );
        }
        
        const orderComponent = 
            <div className="overflow-auto" style={{maxHeight: 500}}>
                <Table hover={true}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Node</th>
                            <th>Visited from</th>
                            <th>Distance from start</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderItems}
                    </tbody>
                </Table>
            </div>;

        //LEGEND
        const legendData = [
            {"title": "Nodes", "type": "circle", "rows": [
                {"color": Globals.Colors.DEFAULT_NODE_COLOR, "key": NodeState.NOT_VISITED},
                {"color": Globals.Colors.GREEN, "key": NodeState.NEW_IN_QUEUE},
                {"color": Globals.Colors.GRAY, "key": NodeState.IN_QUEUE},
                {"color": Globals.Colors.RED, "key": NodeState.CURRENT},
                {"color": Globals.Colors.BLACK, "key": NodeState.FINISHED},
            ]},
            {"title": "Edges", "type": "rectangle", "rows": [
                {"color": Globals.Colors.DEFAULT_EDGE_COLOR, "key": EdgeState.NORMAL},
                {"color": Globals.Colors.RED, "key": EdgeState.HIGHLIGHTED},
                {"color": Globals.Colors.DARK_GRAY, "key": EdgeState.USED}
            ]},
        ]

        const legendComponent = <Legend data={legendData} />

        return [new SideComponent("Queue", queueComponent), new SideComponent("Tree", treeComponent),
            new SideComponent("Order of visit", orderComponent), new SideComponent("Legend", legendComponent)];
    }

}