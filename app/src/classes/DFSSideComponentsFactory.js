
import ListGroup from 'react-bootstrap/ListGroup';
import SideComponent from './SideComponent';
import GraphView from '../components/js/GraphView';
import { NodeAttributes, NodeState } from './DFSAlgorithm';
import TreeGraphLayout from './TreeGraphLayout';
import GraphTag from './GraphTag';
import SideComponentsFactory from "./SideComponentsFactory";

export default class DFSSideComponentsFactory extends SideComponentsFactory {

    createSideComponents(algorithmState) {

        const graphData = algorithmState.getGraphData();
        const additionalData = algorithmState.getAdditionalData();

        //Stack
        let stack = additionalData.get("stack");

        let items = [];
        for (const [index, node] of stack.entries()) {
            items.push(<ListGroup.Item key={index}>{node}</ListGroup.Item>);
        }

        let stackComponent = 
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

        return [new SideComponent("Stack", stackComponent), new SideComponent("Tree", treeComponent)];
    }

}