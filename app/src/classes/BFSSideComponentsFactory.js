
import ListGroup from 'react-bootstrap/ListGroup';
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

export default class BFSSideComponentsFactory extends SideComponentsFactory {

    createSideComponents(algorithmState) {

        const graphData = algorithmState.getGraphData();
        const additionalData = algorithmState.getAdditionalData();

        function getText(node) {
            return `${node["key"]} (Visited from: ${node["visitedFrom"]}, Distance from start: ${node["distance"]})`;
        }

        //QUEUE
        const currentNode = additionalData.get("currentNode");
        let currentText;
        if (currentNode !== null) {
            currentText = getText(currentNode);
        } else {
            currentText = "No current node";
        }

        let queue = additionalData.get("queue");

        let items = [];
        for (const [index, node] of queue.entries()) {

            //Generating text
            const text = getText(node);

            //Setting style
            let style = {};
            if (node["state"] === NodeState.NEW_IN_QUEUE) {
                style = {color: Globals.Colors.GREEN};
            }

            //Pushing item
            items.push(<ListGroup.Item key={index} style={style}>{text}</ListGroup.Item>);
        }

        const queueComponent = 
            <>
                <ListGroup className='mb-3'>
                    <ListGroup.Item key={-1} style={{color: Globals.Colors.RED}}>{currentText}</ListGroup.Item>
                </ListGroup>
                <ListGroup className='overflow-auto' style={{maxHeight: 500}}>
                    {items}
                </ListGroup> 
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
                <tr>
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

        return [new SideComponent("Queue", queueComponent), new SideComponent("Tree", treeComponent),
            new SideComponent("Order of visit", orderComponent)];
    }

}