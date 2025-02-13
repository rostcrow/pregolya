import AdditionalData from "./AdditionalData";
import Algorithm from "./Algorithm";

const INFINITY = "∞";

const State = {
    SETTING_STARTING_NODE: 0,
    NODE_FROM_QUEUE: 1,
    COLORING_NEIGHBORS: 2
}

export const NodeAttributes = {
    STATE: 0,
    VISITED_FROM: 1,
    DISTANCE_FROM_START: 2
}

export const NodeState = {
    WHITE: 0,
    GRAY: 1,
    BLACK: 2
}

export const EdgeAttributes = {
    STATE: 0
}

export const EdgeState = {
    NORMAL: 0,
    HIGHLIGHTED: 1
}

export default class BFSAlgorithm extends Algorithm {

    #startingNode;
    #state;
    #queue;
    #currentNode;
    #currentNodeNeighbors;
    #highlightedEdge;

    constructor(graph, startingNode) {
        super(graph);

        //Initializing attributes
        this.#startingNode = startingNode;
        this.#state = State.SETTING_STARTING_NODE;
        this.#queue = [];
        this.#currentNode = -1;
        this.#currentNodeNeighbors = [];
        this.#highlightedEdge = -1;

        //Setting state for all nodes
        graph.forEachNode((node) => {
            graph.setNodeAttribute(node, NodeAttributes.STATE, NodeState.WHITE);
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
        if (this.#highlightedEdge !== -1) {
            graph.setEdgeAttribute(this.#highlightedEdge, EdgeAttributes.STATE, EdgeState.NORMAL);
        }
        
        switch (this.#state) {
            case State.SETTING_STARTING_NODE:
                this.#stateSettingStartingNode(graph);
                break;

            case State.NODE_FROM_QUEUE:
                this.#stateNodeFromQueue(graph);
                break;

            case State.COLORING_NEIGHBORS:
                this.#stateColoringNeighbors(graph);
                break;

            default:
                throw new Error("Not expected state");

        }

    }

    #stateSettingStartingNode(graph) {

        //Setting starting node
        this.#queue.push(this.#startingNode);
        graph.setNodeAttribute(this.#startingNode, NodeAttributes.STATE, NodeState.GRAY);
        graph.setNodeAttribute(this.#startingNode, NodeAttributes.DISTANCE_FROM_START, 0);

        //Changing state
        this.#state = State.NODE_FROM_QUEUE;

    }

    #stateNodeFromQueue (graph) {

        //Getting node from queue
        this.#currentNode = this.#queue.shift();
        graph.setNodeAttribute(this.#currentNode, NodeAttributes.STATE, NodeState.BLACK);

        //Setting neighbors
        this.#currentNodeNeighbors = [];
        const neighbors = graph.outboundNeighbors(this.#currentNode);
        for (const neighbor of neighbors) {
            if (graph.getNodeAttribute(neighbor, NodeAttributes.STATE) === NodeState.WHITE) {
                this.#currentNodeNeighbors.push(neighbor);
            }
        }

        //Switching state
        if (this.#currentNodeNeighbors.length === 0) {
            if (this.#queue.length === 0) {
                this.#searchWhiteNode(graph);
            }
        } else {
            this.#state = State.COLORING_NEIGHBORS;
        }
    }
    
    #stateColoringNeighbors(graph) {

        //Getting neighbor
        let neighbor = this.#currentNodeNeighbors.shift();

        //Coloring neighbor
        this.#queue.push(neighbor);
        graph.setNodeAttribute(neighbor, NodeAttributes.STATE, NodeState.GRAY);
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
            if (this.#queue.length === 0) {
                this.#searchWhiteNode();
            } else {
                this.#state = State.NODE_FROM_QUEUE;
            }
        }
    }

    #searchWhiteNode(graph) {

        let nodes = graph.nodes();
        let nodesLength = nodes.length;
        for (let i = 0; i < nodesLength; i++) {
            if (graph.getNodeAttribute(nodes[i], NodeAttributes.STATE) === NodeState.WHITE) {
                //Found

                this.#queue.push(nodes[i]);
                graph.setNodeAttribute(nodes[i], NodeAttributes.STATE, NodeState.GRAY);
                break;
            }
        }

        if (this.#queue.length === 0) {
            //Not found, algorithm ends
            
            this.setFinished();
            return;
        }

        //Found, algorithm continues
        this.#state = State.NODE_FROM_QUEUE;
    }

    getAdditionalData() {
        return new AdditionalData({"queue": this.#queue});
    }

}