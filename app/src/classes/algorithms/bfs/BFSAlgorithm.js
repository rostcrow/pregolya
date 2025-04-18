
// IMPORT
// My classes
import AdditionalData from "../../AdditionalData";
import Algorithm from "../../Algorithm";
import ErrorThrower from "../../ErrorThrower";

// CODE
// Globals
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
    ORDER_OF_VISIT: 1,
    VISITED_FROM: 2,
    DISTANCE_FROM_START: 3
}

export const NodeState = {
    NOT_VISITED: "Not visited",
    NEW_IN_QUEUE: "New in queue",
    IN_QUEUE: "In queue",
    CURRENT: "Current",
    FINISHED: "Finished"
}

export const EdgeAttributes = {
    STATE: 0
}

export const EdgeState = {
    NORMAL: "Not used",
    HIGHLIGHTED: "Highlighted",
    USED: "Used"
}

// This class represents breadth-first search algorithm
export default class BFSAlgorithm extends Algorithm {

    #startingNode;
    #state;
    #queue;
    #currentNode;
    #currentNodeNeighbors;
    #highlightedEdge;
    #newRootNode; // Node, which will become next root node for algorithm to continue 
    #orderOfVisit;

    constructor(graph, startingNode) {
        super(graph);

        // Initializing attributes
        this.#startingNode = startingNode;
        this.#state = State.STARTING_NODE_TO_QUEUE;
        this.#queue = [];
        this.#currentNode = null;
        this.#currentNodeNeighbors = [];
        this.#highlightedEdge = null;
        this.#newRootNode = null;
        this.#orderOfVisit = 1;

        // Setting state for all nodes
        graph.forEachNode((node) => {
            graph.setNodeAttribute(node, NodeAttributes.STATE, NodeState.NOT_VISITED);
            graph.setNodeAttribute(node, NodeAttributes.VISITED_FROM, null);
            graph.setNodeAttribute(node, NodeAttributes.DISTANCE_FROM_START, INFINITY);
            graph.setNodeAttribute(node, NodeAttributes.ORDER_OF_VISIT, null);
        });

        // Setting state for all edges
        graph.forEachEdge((edge) => {
            graph.setEdgeAttribute(edge, EdgeAttributes.STATE, EdgeState.NORMAL);
        });
    }

    forward() {

        let graph = this.getGraph();

        // Setting highlighted edge to normal
        if (this.#highlightedEdge !== null) {
            graph.setEdgeAttribute(this.#highlightedEdge, EdgeAttributes.STATE, EdgeState.USED);
        }
        
        // Choosing function to call
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

    // Sets starting node and pushes is it to queue 
    #stateStartingNodeToQueue(graph) {

        // Setting starting node
        this.#queue.push(this.#startingNode);
        graph.setNodeAttribute(this.#startingNode, NodeAttributes.STATE, NodeState.NEW_IN_QUEUE);
        graph.setNodeAttribute(this.#startingNode, NodeAttributes.DISTANCE_FROM_START, 0);
        graph.setNodeAttribute(this.#startingNode, NodeAttributes.ORDER_OF_VISIT, this.#orderOfVisit++);

        // Switching state
        this.#state = State.NODE_FROM_QUEUE;
    }

    // Gets node from queue and sets its attributes and neighbors
    #stateNodeFromQueue (graph) {

        // Getting node from queue
        this.#currentNode = this.#queue.shift();
        graph.setNodeAttribute(this.#currentNode, NodeAttributes.STATE, NodeState.CURRENT);

        // Setting neighbors
        this.#currentNodeNeighbors = [];
        const neighbors = graph.outboundNeighbors(this.#currentNode);
        for (const neighbor of neighbors) {
            if (graph.getNodeAttribute(neighbor, NodeAttributes.STATE) === NodeState.NOT_VISITED) {
                this.#currentNodeNeighbors.push(neighbor);
            }
        }

        // Switching state
        if (this.#currentNodeNeighbors.length === 0) {
            this.#state = State.CURRENT_NODE_FINISHED;
        } else {
            this.#state = State.NEIGHBOR_TO_QUEUE;
        }
    }

    // Sets current node as finished, tries to find new root if queue is empty
    #stateCurrentNodeFinished(graph) {

        // Resetting queue novelty
        this.#resetQueueNovelty(graph);

        // Setting current node as finished
        graph.setNodeAttribute(this.#currentNode, NodeAttributes.STATE, NodeState.FINISHED);
        this.#currentNode = null;

        // Switching state
        if (this.#queue.length !== 0) {
            this.#state = State.NODE_FROM_QUEUE;
            return;
        }

        // Trying to find not visited node
        let nodes = graph.nodes();
        for (let i = 0; i < nodes.length; i++) {
            if (graph.getNodeAttribute(nodes[i], NodeAttributes.STATE) === NodeState.NOT_VISITED) {
                // Found
                this.#newRootNode = nodes[i];
                this.#state = State.NEW_ROOT_TO_QUEUE;
                return;
            }
        }

        // Not found, algorithm ends
        this.setFinished();

    }

    // Sets attributes of new root node and pushes it to queue
    #stateNewRootToQueue(graph) {

        // Pushing to queue
        this.#queue.push(this.#newRootNode);
        graph.setNodeAttribute(this.#newRootNode, NodeAttributes.STATE, NodeState.NEW_IN_QUEUE);
        graph.setNodeAttribute(this.#newRootNode, NodeAttributes.ORDER_OF_VISIT, this.#orderOfVisit++);

        // Switching state
        this.#state = State.NODE_FROM_QUEUE;
    }
    
    // Pushes next neighbor of current node to queue and sets it's attributes 
    #stateNeighborToQueue(graph) {

        // Resetting queue novelty
        this.#resetQueueNovelty(graph);

        // Getting neighbor
        let neighbor = this.#currentNodeNeighbors.shift();

        // Pushing neighbor to queue
        this.#queue.push(neighbor);
        graph.setNodeAttribute(neighbor, NodeAttributes.STATE, NodeState.NEW_IN_QUEUE);
        graph.setNodeAttribute(neighbor, NodeAttributes.VISITED_FROM, this.#currentNode);
        graph.setNodeAttribute(neighbor, NodeAttributes.ORDER_OF_VISIT, this.#orderOfVisit++);

        // Counting distance from starting node
        let distance;
        const previousDistance = graph.getNodeAttribute(this.#currentNode, NodeAttributes.DISTANCE_FROM_START);
        if (previousDistance === INFINITY) {
            distance = INFINITY;
        } else {
            distance = previousDistance + 1;
        }
        
        graph.setNodeAttribute(neighbor, NodeAttributes.DISTANCE_FROM_START, distance);

        // Highlighting edge
        this.#highlightedEdge = graph.outboundEdges(this.#currentNode, neighbor)[0];
        graph.setEdgeAttribute(this.#highlightedEdge, EdgeAttributes.STATE, EdgeState.HIGHLIGHTED);

        // Switching state
        if (this.#currentNodeNeighbors.length === 0) {
            this.#state = State.CURRENT_NODE_FINISHED;
        } else {
            this.#state = State.NEIGHBOR_TO_QUEUE;
        }
    }

    // Sets all nodes in queue to state IN_QUEUE
    #resetQueueNovelty(graph) {

        if (this.#queue.length !== 0) {
            const topNode = this.#queue[this.#queue.length - 1];
            graph.setNodeAttribute(topNode, NodeAttributes.STATE, NodeState.IN_QUEUE);
        }
    }

    getAdditionalData() {

        let graph = this.getGraph();

        // Returns json object containing important values for given node
        function getJSON (node) {
            const state = graph.getNodeAttribute(node, NodeAttributes.STATE);
            const order = graph.getNodeAttribute(node, NodeAttributes.ORDER_OF_VISIT);
            const visitedFrom = graph.getNodeAttribute(node, NodeAttributes.VISITED_FROM);
            const distance = graph.getNodeAttribute(node, NodeAttributes.DISTANCE_FROM_START);
            return {"key": node, "order": order, "state": state, "visitedFrom": visitedFrom, "distance": distance};
        }

        // Current node
        let resCurrentNode = null;

        if (this.#currentNode !== null) {
            resCurrentNode = getJSON(this.#currentNode);
        }

        // Queue
        let resQueue = [];
        for (const node of this.#queue) {
            resQueue.push(getJSON(node));
        }

        // Order of visit
        let order = [];
        graph.forEachNode((node, attributes) => {
            if (attributes[NodeAttributes.ORDER_OF_VISIT] !== null) {
                order.push(getJSON(node));
            }
        });

        order.sort((a, b) => {
            return a["order"] - b["order"];
        });

        return new AdditionalData({"currentNode": resCurrentNode, "queue": resQueue, "order": order});
    }

}