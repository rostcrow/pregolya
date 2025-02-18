import AdditionalData from "./AdditionalData";
import Algorithm from "./Algorithm";
import ErrorThrower from "./ErrorThrower";

const INFINITY = "∞";

const State = {
    STARTING_NODE_TO_QUEUE: 0,
    NODE_FROM_QUEUE: 1,
    CURRENT_NODE_FINISHED: 2,
    NEW_ROOT_TO_QUEUE: 3,
    NEIGHBOR_TO_QUEUE: 4
}

export const NodeAttributes = {
    STATE: 0,
    VISITED_FROM: 1,
    DISTANCE_FROM_START: 2
}

export const NodeState = {
    NOT_VISITED: 0,
    IN_QUEUE: 1,
    CURRENT: 2,
    FINISHED: 3
}

export const EdgeAttributes = {
    STATE: 0
}

export const EdgeState = {
    NORMAL: 0,
    HIGHLIGHTED: 1,
    USED: 2
}

export default class BFSAlgorithm extends Algorithm {

    #startingNode;
    #state;
    #queue;
    #currentNode;
    #currentNodeNeighbors;
    #highlightedEdge;
    #newRootNode;

    constructor(graph, startingNode) {
        super(graph);

        //Initializing attributes
        this.#startingNode = startingNode;
        this.#state = State.STARTING_NODE_TO_QUEUE;
        this.#queue = [];
        this.#currentNode = null;
        this.#currentNodeNeighbors = [];
        this.#highlightedEdge = null;
        this.#newRootNode = null;

        //Setting state for all nodes
        graph.forEachNode((node) => {
            graph.setNodeAttribute(node, NodeAttributes.STATE, NodeState.NOT_VISITED);
            graph.setNodeAttribute(node, NodeAttributes.VISITED_FROM, null);
            graph.setNodeAttribute(node, NodeAttributes.DISTANCE_FROM_START, INFINITY);
        });

        //Setting state for all edges
        graph.forEachEdge((edge) => {
            graph.setEdgeAttribute(edge, EdgeAttributes.STATE, EdgeState.NORMAL);
        });
    }

    forward() {

        let graph = this.getGraph();

        //Setting highlighted edge to normal
        if (this.#highlightedEdge !== null) {
            graph.setEdgeAttribute(this.#highlightedEdge, EdgeAttributes.STATE, EdgeState.USED);
        }
        
        //Choosing function to call
        switch (this.#state) {
            case State.STARTING_NODE_TO_QUEUE:
                this.#stateStartingNodeToQueue(graph);
                break;

            case State.NODE_FROM_QUEUE:
                this.#stateNodeFromQueue(graph);
                break;

            case State.CURRENT_NODE_FINISHED:
                this.#stateCurrentNodeFinished(graph);
                break;
            
            case State.NEW_ROOT_TO_QUEUE:
                this.#stateNewRootToQueue(graph);
                break;

            case State.NEIGHBOR_TO_QUEUE:
                this.#stateNeighborToQueue(graph);
                break;

            default:
                ErrorThrower.notExpectedState();

        }

    }

    #stateStartingNodeToQueue(graph) {

        //Setting starting node
        this.#queue.push(this.#startingNode);
        graph.setNodeAttribute(this.#startingNode, NodeAttributes.STATE, NodeState.IN_QUEUE);
        graph.setNodeAttribute(this.#startingNode, NodeAttributes.DISTANCE_FROM_START, 0);

        //Switching state
        this.#state = State.NODE_FROM_QUEUE;

    }

    #stateNodeFromQueue (graph) {

        //Getting node from queue
        this.#currentNode = this.#queue.shift();
        graph.setNodeAttribute(this.#currentNode, NodeAttributes.STATE, NodeState.CURRENT);

        //Setting neighbors
        this.#currentNodeNeighbors = [];
        const neighbors = graph.outboundNeighbors(this.#currentNode);
        for (const neighbor of neighbors) {
            if (graph.getNodeAttribute(neighbor, NodeAttributes.STATE) === NodeState.NOT_VISITED) {
                this.#currentNodeNeighbors.push(neighbor);
            }
        }

        //Switching state
        if (this.#currentNodeNeighbors.length === 0) {
            this.#state = State.CURRENT_NODE_FINISHED;
        } else {
            this.#state = State.NEIGHBOR_TO_QUEUE;
        }
    }

    #stateCurrentNodeFinished(graph) {

        //Setting current node as finished
        graph.setNodeAttribute(this.#currentNode, NodeAttributes.STATE, NodeState.FINISHED);

        //Switching state
        if (this.#queue.length !== 0) {
            this.#state = State.NODE_FROM_QUEUE;
            return;
        }

        //Trying to find not visited node
        let nodes = graph.nodes();
        for (let i = 0; i < nodes.length; i++) {
            if (graph.getNodeAttribute(nodes[i], NodeAttributes.STATE) === NodeState.NOT_VISITED) {
                //Found

                this.#newRootNode = nodes[i];
                this.#state = State.NEW_ROOT_TO_QUEUE;
                return;
            }
        }

        //Not found, algorithm ends
        this.setFinished();

    }

    #stateNewRootToQueue(graph) {

        //Pushing to queue
        this.#queue.push(this.#newRootNode);
        graph.setNodeAttribute(this.#newRootNode, NodeAttributes.STATE, NodeState.IN_QUEUE);

        //Switching state
        this.#state = State.NODE_FROM_QUEUE;
    }
    
    #stateNeighborToQueue(graph) {

        //Getting neighbor
        let neighbor = this.#currentNodeNeighbors.shift();

        //Pushing neighbor to queue
        this.#queue.push(neighbor);
        graph.setNodeAttribute(neighbor, NodeAttributes.STATE, NodeState.IN_QUEUE);
        graph.setNodeAttribute(neighbor, NodeAttributes.VISITED_FROM, this.#currentNode);

        //Counting distance from starting node
        let distance;
        const previousDistance = graph.getNodeAttribute(this.#currentNode, NodeAttributes.DISTANCE_FROM_START);
        if (previousDistance === INFINITY) {
            distance = INFINITY;
        } else {
            distance = previousDistance + 1;
        }
        
        graph.setNodeAttribute(neighbor, NodeAttributes.DISTANCE_FROM_START, distance);

        //Highlighting edge
        this.#highlightedEdge = graph.edges(this.#currentNode, neighbor)[0];
        graph.setEdgeAttribute(this.#highlightedEdge, EdgeAttributes.STATE, EdgeState.HIGHLIGHTED);


        //Switching state
        if (this.#currentNodeNeighbors.length === 0) {
            this.#state = State.CURRENT_NODE_FINISHED;
        } else {
            this.#state = State.NEIGHBOR_TO_QUEUE;
        }
    }

    getAdditionalData() {
        return new AdditionalData({"queue": this.#queue});
    }

}