
import { useContext } from "react";
import ListGroup from "react-bootstrap/ListGroup"
import { GraphContext } from "./AppControl";
import Globals from "../../classes/Globals";

export default function ComponentsList( {components} ) {

    //Using context
    const graphContextValue = useContext(GraphContext);
    const graph = graphContextValue["graph"];
    const state = graphContextValue["state"];
    const setState = graphContextValue["setState"];

    //Checking empty
    if (components.length === 0) {
        return (
            <p>Components are counted as the last step of algorithm</p>
        );
    }

    //Handle funcs
    function handleOnMouseEnter(e) {

        //Setting different size attribute for node inside wanted component
        const componentNumber = e.target.id;
        const nodes = components[componentNumber - 1];

        for (const index in nodes) {
            graph.setNodeAttribute(nodes[index], "size", 2 * Globals.Sizes.DEFAULT_NODE_SIZE);
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

        //Refreshing
        const nextState = !state;
        setState(nextState);
    }


    //Generating list
    let componentsListItems = [];
    for (const index in components) {

        const number = Number(index) + 1;
        
        const title = `Component ${number}`;
        const text = `Nodes: ${components[index]}`;

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