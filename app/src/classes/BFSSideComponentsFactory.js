
import ListGroup from 'react-bootstrap/ListGroup';
import SideComponent from './SideComponent';
import GraphView from '../components/js/GraphView';
import { NodeAttributes, NodeState } from './BFSAlgorithm';
import TreeGraphLayout from './TreeGraphLayout';
import GraphTag from './GraphTag';
import SideComponentsFactory from "./SideComponentsFactory";
import Globals from './Globals';

export default class BFSSideComponentsFactory extends SideComponentsFactory {

    createSideComponents(algorithmState) {

        const graphData = algorithmState.getGraphData();
        const additionalData = algorithmState.getAdditionalData();

        function getText(node) {
            return `${node["key"]} (Visited from: ${node["visitedFrom"]}, Distance from start: ${node["distance"]})`;
        }

        //Queue
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

            //Settign style
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
                <ListGroup>
                    {items}
                </ListGroup> 
            </>;

        //Tree
        const nodes = graphData.getNodes();

        let outputNodes = [];
        let outputEdges = [];

        //Counting nodes and edges
        for (const key in nodes) {
            if (nodes[key][NodeAttributes.STATE] !== NodeState.WHITE) {
                //Saving nonwhite nodes
                outputNodes.push(key);
            }
            
            if (nodes[key][NodeAttributes.VISITED_FROM] !== null) {
                //Making edge between child and its parent
                outputEdges.push({"source": nodes[key][NodeAttributes.VISITED_FROM], "target": key});
            }
        }

        //Making json
        let graphJSON = 
            {
                "directed": true, 
                "weighted": false,
                "nodes": outputNodes,
                "edges": outputEdges
            };

        //Making graph and component
        let graph = new GraphTag(graphJSON).getDisplayGraph();
        let treeComponent = <GraphView graph={graph} layout={new TreeGraphLayout()}></GraphView>;

        return [new SideComponent("Queue", queueComponent), new SideComponent("Tree", treeComponent)];
    }

}