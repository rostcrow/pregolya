
import { useContext } from "react";
import ListGroup from "react-bootstrap/ListGroup"
import { GraphContext } from "./AppControl";
import Globals from "../../classes/Globals";

export default function ComponentsList( {components, zeroComponentsMessage} ) {

    //Using context
    const graphContextValue = useContext(GraphContext);
    const graph = graphContextValue["graph"];
    const state = graphContextValue["state"];
    const setState = graphContextValue["setState"];

    //Checking empty
    const componentsNodes = components["nodes"];

    if (componentsNodes.length === 0) {
        return (
            <p>{zeroComponentsMessage}</p>
        );
    }

    //Handle funcs
    function handleOnMouseEnter(e) {

        const componentNumber = e.target.id;

        //Setting different size attribute for node inside wanted component
        const nodes = components["nodes"][componentNumber - 1];

        for (const index in nodes) {
            graph.setNodeAttribute(nodes[index], "size", 2 * Globals.Sizes.DEFAULT_NODE_SIZE);
        }

        //Setting different size attribute for node inside wanted component
        const edges = components["edges"][componentNumber - 1];
        for (const index in edges) {
            graph.setEdgeAttribute(edges[index], "size", 2 * Globals.Sizes.DEFAULT_EDGE_SIZE);
        }

        //Refreshing
        const nextState = !state;
        setState(nextState);
    }

    function handleOnMouseLeave(e) {

        //Resetting size attribute for all nodes
        graph.forEachNode((node) => {
            graph.setNodeAttribute(node, "size", Globals.Sizes.DEFAULT_NODE_SIZE);
        });

        //Resetting size attribute for all edges
        graph.forEachEdge((edge) => {
            graph.setEdgeAttribute(edge, "size", Globals.Sizes.DEFAULT_EDGE_SIZE);
        });

        //Refreshing
        const nextState = !state;
        setState(nextState);
    }


    //Generating list
    let componentsListItems = [];
    
    for (const index in componentsNodes) {

        const number = Number(index) + 1;
        
        const title = `Component ${number}`;
        const text = `Nodes: ${componentsNodes[index]}`;

        componentsListItems.push(
            <ListGroup.Item key={number} id={number} className="list-group-item-action" 
                onMouseEnter={(e) => handleOnMouseEnter(e)} onMouseLeave={(e) => handleOnMouseLeave(e)}>
                <h6>{title}</h6>
                {text}
            </ListGroup.Item>
        );
    }

    return (
        <ListGroup className="overflow-auto" style={{maxHeight: 500}}>
            {componentsListItems}
        </ListGroup>
    );

}