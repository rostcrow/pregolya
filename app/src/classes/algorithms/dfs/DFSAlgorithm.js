
// IMPORT
// My classes
import AdditionalData from "../../AdditionalData";
import Algorithm from "../../Algorithm";
import ErrorThrower from "../../ErrorThrower";

// CODE
// Globals
const State = {
    STARTING_NODE_TO_STACK: 0,
    NODE_FROM_STACK: 1,
    HANDLE_CURRENT: 2,
    NEW_ROOT_TO_STACK: 3
}

export const NodeAttributes = {
    STATE: 0,
    VISITED_FROM: 1,
    ORDER_OF_VISIT: 2,
    TIME_OF_VISIT: 3,
    ORDER_OF_FINISH: 4,
    TIME_OF_FINISH: 5,
}

export const NodeState = {
    NOT_VISITED: "Not visited",
    NEW_IN_STACK: "New in stack",
    IN_STACK: "In stack",
    CURRENT: "Current",
    FINISHED: "Finished"
}

export const EdgeAttributes = {
    STATE: 0,
}

export const EdgeState = {
    NORMAL: "Not used",
    TREE: "Tree",
    BACK: "Back",
    FORWARD: "Forward",
    CROSS: "Cross"
}

// This class represents depth-first search algorithm
export default class DFSAlgorithm extends Algorithm {

    #startingNode;
    #state;
    #stack;
    #currentNode;
    #orderOfVisit;
    #orderOfFinish;
    #time;
    #newRoot; // Node, which will become next root node for algorithm to continue 

    constructor(graph, startingNode) {
        super(graph);

        // Initializing attributes
        this.#startingNode = startingNode;
        this.#state = State.STARTING_NODE_TO_STACK;
        this.#stack = [];
        this.#currentNode = null;
        this.#orderOfVisit = 1;
        this.#orderOfFinish = 1;
        this.#time = 1;
        this.#newRoot = null;

        // Setting up nodes
        graph.forEachNode((node) => {
            graph.setNodeAttribute(node, NodeAttributes.STATE, NodeState.NOT_VISITED);
            graph.setNodeAttribute(node, NodeAttributes.VISITED_FROM, null);
            graph.setNodeAttribute(node, NodeAttributes.ORDER_OF_VISIT, null);
            graph.setNodeAttribute(node, NodeAttributes.TIME_OF_VISIT, null);
            graph.setNodeAttribute(node, NodeAttributes.ORDER_OF_FINISH, null);
            graph.setNodeAttribute(node, NodeAttributes.TIME_OF_FINISH, null);
        });

        // Setting up edges
        graph.forEachEdge((edge) => {
            graph.setEdgeAttribute(edge, EdgeAttributes.STATE, EdgeState.NORMAL);
        });

    }

    forward() {

        let graph = this.getGraph();

        switch(this.#state) {
            case State.STARTING_NODE_TO_STACK:
                this.#stateStartingNodeToStack(graph);
                break;
            case State.NODE_FROM_STACK:
                this.#stateNodeFromStack(graph);
                break;
            case State.HANDLE_CURRENT:
                this.#stateHandleCurrent(graph);
                break;
            case State.NEW_ROOT_TO_STACK:
                this.#stateNewRootToStack(graph);
                break;
            default:
                ErrorThrower.notExpectedState();
        }

    }

    // Sets starting node and pushes it to stack
    #stateStartingNodeToStack(graph) {

        // Pushing starting node to stack
        this.#stack.push(this.#startingNode);
        graph.setNodeAttribute(this.#startingNode, NodeAttributes.STATE, NodeState.NEW_IN_STACK);
        graph.setNodeAttribute(this.#startingNode, NodeAttributes.ORDER_OF_VISIT, this.#orderOfVisit++);
        graph.setNodeAttribute(this.#startingNode, NodeAttributes.TIME_OF_VISIT, this.#time++);

        // Switching state
        this.#state = State.NODE_FROM_STACK;
    }

    // Gets node from stack and sets it as current
    #stateNodeFromStack(graph) {

        // Last current change
        if (this.#currentNode !== null && graph.getNodeAttribute(this.#currentNode, NodeAttributes.STATE) === NodeState.CURRENT) {
            graph.setNodeAttribute(this.#currentNode, NodeAttributes.STATE, NodeState.IN_STACK);
        }

        // Popping from stack
        this.#currentNode = this.#stack[this.#stack.length - 1];
        graph.setNodeAttribute(this.#currentNode, NodeAttributes.STATE, NodeState.CURRENT);

        // Switching state
        this.#state = State.HANDLE_CURRENT;

    }

    /*
        Handles current node.

        Tries to find unused edge from current node.
        If this edge leads to unvisited node, the node is pushed to stack to be set as current in the next step.

        If no edge is found, it pops current from stack.
        Checks if stack is empty. If it is, it tries to find new root node.
        If no new root node is found, algorithm ends.
    */
    #stateHandleCurrent(graph) {

        // Finding next appropriate edge
        const edges = graph.outboundEdges(this.#currentNode);
        let nextEdge = null;

        for (const edge of edges) {
            if (graph.getEdgeAttribute(edge, EdgeAttributes.STATE) === EdgeState.NORMAL) {
                nextEdge = edge;
                break;
            }
        }

        if (nextEdge !== null) {
            // Next edge found

            // Determining edge state
            let edgeState = null;
            const opposite = graph.opposite(this.#currentNode, nextEdge);
            const oppositeState = graph.getNodeAttribute(opposite, NodeAttributes.STATE);

            switch (oppositeState) {
                case NodeState.NOT_VISITED:
                    edgeState = EdgeState.TREE;
    
                    // Pushing to stack
                    this.#stack.push(opposite);
                    graph.setNodeAttribute(opposite, NodeAttributes.STATE, NodeState.NEW_IN_STACK);
                    graph.setNodeAttribute(opposite, NodeAttributes.VISITED_FROM, this.#currentNode);
                    graph.setNodeAttribute(opposite, NodeAttributes.ORDER_OF_VISIT, this.#orderOfVisit++);
                    graph.setNodeAttribute(opposite, NodeAttributes.TIME_OF_VISIT, this.#time++);
                    break;
    
                case NodeState.NEW_IN_STACK:
                case NodeState.IN_STACK:
                case NodeState.CURRENT:
                    edgeState = EdgeState.BACK;
                    break;
    
                case NodeState.FINISHED:
                    const currentTimeOfVisit = graph.getNodeAttribute(this.#currentNode, NodeAttributes.TIME_OF_VISIT);
                    const oppositeTimeOfVisit = graph.getNodeAttribute(opposite, NodeAttributes.TIME_OF_VISIT);
    
                    if (currentTimeOfVisit < oppositeTimeOfVisit) {
                        edgeState = EdgeState.FORWARD;
                    } else if (currentTimeOfVisit > oppositeTimeOfVisit) {
                        edgeState = EdgeState.CROSS;
                    }
                    break;
                
                default:
                    ErrorThrower.notExpectedState();
            }

            // Changing edge state
            graph.setEdgeAttribute(nextEdge, EdgeAttributes.STATE, edgeState);

            // Switching state
            if (edgeState === EdgeState.TREE) {
                this.#state = State.NODE_FROM_STACK;
            } else {
                this.#state = State.HANDLE_CURRENT;
            }

        } else {
            // Next edge not found

            // Setting current as finished
            this.#stack.pop();
            graph.setNodeAttribute(this.#currentNode, NodeAttributes.STATE, NodeState.FINISHED);
            graph.setNodeAttribute(this.#currentNode, NodeAttributes.ORDER_OF_FINISH, this.#orderOfFinish++);
            graph.setNodeAttribute(this.#currentNode, NodeAttributes.TIME_OF_FINISH, this.#time++);
            this.#currentNode = null;

            // Switching state
            if (this.#stack.length !== 0) {
                this.#state = State.NODE_FROM_STACK;
                return;
            }

            // Finding not visited node
            const nodes = graph.nodes();
            for (let i = 0; i < nodes.length; i++) {
                if (graph.getNodeAttribute(nodes[i], NodeAttributes.STATE) === NodeState.NOT_VISITED) {
                    // Found

                    this.#newRoot = nodes[i];
                    this.#state = State.NEW_ROOT_TO_STACK;
                    return;
                }
            }

            // Not found, algorithm ends
            this.setFinished();

        }
    }

    // Sets new root and pushes it to stack
    #stateNewRootToStack(graph) {

        // Pushing starting node to stack
        this.#stack.push(this.#newRoot);
        graph.setNodeAttribute(this.#newRoot, NodeAttributes.STATE, NodeState.NEW_IN_STACK);
        graph.setNodeAttribute(this.#newRoot, NodeAttributes.ORDER_OF_VISIT, this.#orderOfVisit++);
        graph.setNodeAttribute(this.#newRoot, NodeAttributes.TIME_OF_VISIT, this.#time++);

        // Switching state
        this.#state = State.NODE_FROM_STACK;

    }

    getAdditionalData() {

        let graph = this.getGraph();

        // Gets all attributes of node as JSON object
        function getAttributes(node) {
            const attributes = structuredClone(graph.getNodeAttributes(node));
            attributes["key"] = node;

            return attributes;
        }

        // Stack
        let stack = [];
        for (const node of this.#stack) {
            stack.push(getAttributes(node));
        }

        // Order of visit
        let orderOfVisit = [];
        graph.forEachNode((node, attributes) => {
            if (attributes[NodeAttributes.ORDER_OF_VISIT] !== null) {
                orderOfVisit.push(getAttributes(node));
            }
        });

        orderOfVisit.sort((a, b) => {
            return a[NodeAttributes.ORDER_OF_VISIT] - b[NodeAttributes.ORDER_OF_VISIT];
        });

        // Order of finish
        let orderOfFinish = [];
        graph.forEachNode((node, attributes) => {
            if (attributes[NodeAttributes.ORDER_OF_FINISH] !== null) {
                orderOfFinish.push(getAttributes(node));
            }
        });

        orderOfFinish.sort((a, b) => {
            return a[NodeAttributes.ORDER_OF_FINISH] - b[NodeAttributes.ORDER_OF_FINISH];
        });

        return new AdditionalData({"stack": stack, "orderOfVisit": orderOfVisit, "orderOfFinish": orderOfFinish});
    }

}