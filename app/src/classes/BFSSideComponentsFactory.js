
import ListGroup from 'react-bootstrap/ListGroup';
import SideComponent from './SideComponent';
import GraphView from '../components/js/GraphView';
import { EdgeAttributes, EdgeState, NodeAttributes, NodeState } from './BFSAlgorithm';
import TreeGraphLayout from './TreeGraphLayout';
import GraphTag from './GraphTag';
import SideComponentsFactory from "./SideComponentsFactory";
import Globals from './Globals';
import GraphDataExtractor from './GraphDataExtractor';
import GraphDataAdapter from './GraphDataAdapter';
import BFSNodeAttributesAdapter from './BFSNodeAttributesAdapter';
import BFSEdgeAttributesAdapter from './BFSEdgeAttributesAdapter';
import GraphDataApplier from './GraphDataApplier';

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

        let outputNodes = [];
        let outputEdges = [];

        //Counting nodes and edges
        for (const key in nodes) {
            if (nodes[key][NodeAttributes.STATE] !== NodeState.NOT_VISITED) {
                //Saving not visited nodes
                outputNodes.push(key);
            }
            
            if (nodes[key][NodeAttributes.VISITED_FROM] !== null) {

                //Determining state
                let state = EdgeState.USED;
                if (nodes[key][NodeAttributes.STATE] === NodeState.NEW_IN_QUEUE) {
                    state = EdgeState.HIGHLIGHTED;
                }

                //Making edge between child and its parent
                outputEdges.push({"source": nodes[key][NodeAttributes.VISITED_FROM], "target": key, "state": state});
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

        //Making graph
        let graph = new GraphTag(graphJSON).getDisplayGraph();

        //Filling with attributes
        graph.forEachNode((node) => {
            for (const attribute in nodes[node]) {
                graph.setNodeAttribute(node, attribute, nodes[node][attribute]);
            }
        });

        const graphEdges = graph.edges();
        for (let i = 0; i < graphEdges.length; i++) {
            graph.setEdgeAttribute(graphEdges[i], EdgeAttributes.STATE, outputEdges[i]["state"]);
        }

        //Setting visual appereance
        const outputGraphData = GraphDataExtractor.extractData(graph);
        const outputGraphAdapter = new GraphDataAdapter(new BFSNodeAttributesAdapter(), new BFSEdgeAttributesAdapter());
        const adaptedGraphData = outputGraphAdapter.adapt(outputGraphData);
        GraphDataApplier.apply(graph, adaptedGraphData);

        //Making component
        let treeComponent = <GraphView graph={graph} layout={new TreeGraphLayout()}></GraphView>;

        //ORDER OF VISIT
        const order = additionalData.get("order");

        let orderItems = [];
        for (const [index, node] of order.entries()) {

            //Setting text
            const text = 
                `#${node["order"]} ${node["key"]} (Visited from: ${node["visitedFrom"]}, Distance from start: ${node["distance"]})`;

            //Setting style
            let style = {};
            if (node["state"] === NodeState.NEW_IN_QUEUE) {
                style = {color: Globals.Colors.GREEN};
            }

            orderItems.push(<ListGroup.Item key={index} style={style}>{text}</ListGroup.Item>);
        }
        
        const orderComponent = 
            <ListGroup className='text-start overflow-auto' style={{maxHeight: 500}}>
                {orderItems}
            </ListGroup>

        return [new SideComponent("Queue", queueComponent), new SideComponent("Tree", treeComponent), 
            new SideComponent("Order of visit", orderComponent)];
    }

}