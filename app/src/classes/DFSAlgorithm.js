
import AdditionalData from "./AdditionalData";
import Algorithm from "./Algorithm";
import ErrorThrower from "./ErrorThrower";

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
    NOT_VISITED: 0,
    NEW_IN_STACK: 1,
    IN_STACK: 2,
    CURRENT: 3,
    FINISHED: 4
}

export const EdgeAttributes = {
    STATE: 0,
}

export const EdgeState = {
    NORMAL: 0,
    TREE: 1,
    BACK: 2,
    FORWARD: 3,
    CROSS: 4
}

export default class DFSAlgorithm extends Algorithm {

    #startingNode;
    #state;
    #stack;
    #currentNode;
    #orderOfVisit;
    #orderOfFinish;
    #time;
    #newRoot;

    constructor(graph, startingNode) {
        super(graph);

        //Initializing attributes
        this.#startingNode = startingNode;
        this.#state = State.STARTING_NODE_TO_STACK;
        this.#stack = [];
        this.#currentNode = null;
        this.#orderOfVisit = 1;
        this.#orderOfFinish = 1;
        this.#time = 1;
        this.#newRoot = null;

        //Setting up nodes
        graph.forEachNode((node) => {
            graph.setNodeAttribute(node, NodeAttributes.STATE, NodeState.NOT_VISITED);
            graph.setNodeAttribute(node, NodeAttributes.VISITED_FROM, null);
            graph.setNodeAttribute(node, NodeAttributes.ORDER_OF_VISIT, null);
            graph.setNodeAttribute(node, NodeAttributes.TIME_OF_VISIT, null);
            graph.setNodeAttribute(node, NodeAttributes.ORDER_OF_FINISH, null);
            graph.setNodeAttribute(node, NodeAttributes.TIME_OF_FINISH, null);
        });

        //Setting up edges
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

    #stateStartingNodeToStack(graph) {

        //Pushing starting node to stack
        this.#stack.push(this.#startingNode);
        graph.setNodeAttribute(this.#startingNode, NodeAttributes.STATE, NodeState.NEW_IN_STACK);
        graph.setNodeAttribute(this.#startingNode, NodeAttributes.ORDER_OF_VISIT, this.#orderOfVisit++);
        graph.setNodeAttribute(this.#startingNode, NodeAttributes.TIME_OF_VISIT, this.#time++);

        //Switching state
        this.#state = State.NODE_FROM_STACK;
    }

    #stateNodeFromStack(graph) {

        //Last current change
        if (this.#currentNode !== null && graph.getNodeAttribute(this.#currentNode, NodeAttributes.STATE) === NodeState.CURRENT) {
            graph.setNodeAttribute(this.#currentNode, NodeAttributes.STATE, NodeState.IN_STACK);
        }

        //Popping from stack
        this.#currentNode = this.#stack[this.#stack.length - 1];
        graph.setNodeAttribute(this.#currentNode, NodeAttributes.STATE, NodeState.CURRENT);

        //Switching state
        this.#state = State.HANDLE_CURRENT;

    }

    #stateHandleCurrent(graph) {

        //Finding next appropriate edge
        const edges = graph.outboundEdges(this.#currentNode);
        let nextEdge = null;

        for (const edge of edges) {
            if (graph.getEdgeAttribute(edge, EdgeAttributes.STATE) === EdgeState.NORMAL) {
                nextEdge = edge;
                break;
            }
        }

        if (nextEdge !== null) {
            //Next edge found

            //Determining edge state
            let edgeState = null;
            const opposite = graph.opposite(this.#currentNode, nextEdge);
            const oppositeState = graph.getNodeAttribute(opposite, NodeAttributes.STATE);

            switch (oppositeState) {
                case NodeState.NOT_VISITED:
                    edgeState = EdgeState.TREE;
    
                    //Pushing to stack
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

            //Changing edge state
            graph.setEdgeAttribute(nextEdge, EdgeAttributes.STATE, edgeState);

            //Switching state
            if (edgeState === EdgeState.TREE) {
                this.#state = State.NODE_FROM_STACK;
            } else {
                this.#state = State.HANDLE_CURRENT;
            }

        } else {
            //Next edge not found

            //Setting current as finished
            this.#stack.pop();
            graph.setNodeAttribute(this.#currentNode, NodeAttributes.STATE, NodeState.FINISHED);
            graph.setNodeAttribute(this.#currentNode, NodeAttributes.ORDER_OF_FINISH, this.#orderOfFinish++);
            graph.setNodeAttribute(this.#currentNode, NodeAttributes.TIME_OF_FINISH, this.#time++);
            this.#currentNode = null;

            //Switching state
            if (this.#stack.length !== 0) {
                this.#state = State.NODE_FROM_STACK;
                return;
            }

            //Finding not visited node
            const nodes = graph.nodes();
            for (let i = 0; i < nodes.length; i++) {
                if (graph.getNodeAttribute(nodes[i], NodeAttributes.STATE) === NodeState.NOT_VISITED) {
                    //Found

                    this.#newRoot = nodes[i];
                    this.#state = State.NEW_ROOT_TO_STACK;
                    return;
                }
            }

            //Not found, algorithm ends
            this.setFinished();

        }
    }

    #stateNewRootToStack(graph) {

        //Pushing starting node to stack
        this.#stack.push(this.#newRoot);
        graph.setNodeAttribute(this.#newRoot, NodeAttributes.STATE, NodeState.NEW_IN_STACK);
        graph.setNodeAttribute(this.#newRoot, NodeAttributes.ORDER_OF_VISIT, this.#orderOfVisit++);
        graph.setNodeAttribute(this.#newRoot, NodeAttributes.TIME_OF_VISIT, this.#time++);

        //Switching state
        this.#state = State.NODE_FROM_STACK;

    }

    getAdditionalData() {
        return new AdditionalData({});
    }

}