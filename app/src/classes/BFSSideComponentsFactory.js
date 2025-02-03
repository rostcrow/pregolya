
import ListGroup from 'react-bootstrap/ListGroup';
import SideComponent from './SideComponent';
import GraphView from '../components/js/GraphView';
import GraphFactory from './GraphFactory';
import { NodeAttributes, NodeState } from './BFSAlgorithm';
import TreeGraphLayout from './TreeGraphLayout';

export default class BFSSideComponentsFactory {

    createSideComponents(algorithmState) {

        const graphData = algorithmState.getGraphData();
        const additionalData = algorithmState.getAdditionalData();

        //Queue
        let queue = additionalData.get("queue");

        let items = [];
        for (const [index, node] of queue.entries()) {
            items.push(<ListGroup.Item key={index}>{node}</ListGroup.Item>);
        }

        let queueComponent = 
            <ListGroup>
                {items}
            </ListGroup>;

        //Tree
        const nodes = graphData.getNodes();

        let outputNodes = [];
        let outputEdges = [];

        //Counting nodes and edges
        for (const key in nodes) {
            if (nodes[key][NodeAttributes.STATE] !== NodeState.WHITE) {
                //Saving nonwhite nodes
                outputNodes.push({"key": key});
            }
            
            if (nodes[key][NodeAttributes.VISITED_FROM] !== null) {
                //Making edge between child and its parent
                outputEdges.push({"source": nodes[key][NodeAttributes.VISITED_FROM], "target": key});
            }
        }

        //Making json
        let graphJSON = 
            {
                "attributes": {"directed": true, "weighted": false},
                "nodes": outputNodes,
                "edges": outputEdges
            };

        //Making graph and component
        let graph = new GraphFactory().createDisplayGraphFromJSON(graphJSON);
        let treeComponent = <GraphView graph={graph} layout={new TreeGraphLayout()}></GraphView>;

        return [new SideComponent("Queue", queueComponent), new SideComponent("Tree", treeComponent)];
    }

}