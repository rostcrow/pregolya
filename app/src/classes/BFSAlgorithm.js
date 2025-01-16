import Algorithm from "./Algorithm";
import BFSEdgeVisualAdapter from "./BFSEdgeVisualAdapter";
import BFSNodeVisualAdapter from "./BFSNodeVisualAdapter";
import GraphVisualAdapter from "./GraphVisualAdapter";

const State = {
    NODE_FROM_QUEUE: 0,
    COLORING_NEIGHBORS: 1
}

export const NodeState = {
    WHITE: 0,
    GRAY: 1,
    BLACK: 2
}

export const EdgeState = {
    NORMAL: 0,
    HIGHLIGHTED: 1
}

export default class BFSAlgorithm extends Algorithm {

    #queue;
    #state;
    #currentNode;
    #currentNodeNeighbors;
    #highlightedEdge;

    constructor(graph) {
        super(graph, new GraphVisualAdapter(new BFSNodeVisualAdapter(), new BFSEdgeVisualAdapter()));
        this.#init();
    }

    #init() {

        //Initializing attributes
        this.#queue = [];
        this.#state = State.NODE_FROM_QUEUE;
        this.#currentNode = -1;
        this.#currentNodeNeighbors = [];
        this.#highlightedEdge = -1;

        let graph = this.getGraph();

        //Setting state for all nodes
        graph.forEachNode((node) => {
            graph.setNodeAttribute(node, "state", NodeState.WHITE);
        });

        //Setting starting node
        let startingNode = this.getGraph().nodes()[0];
        this.#queue.push(startingNode);
        graph.setNodeAttribute(startingNode, "state", NodeState.GRAY);

        //Setting state for all edges
        graph.forEachEdge((edge) => {
            graph.setEdgeAttribute(edge, "state", EdgeState.NORMAL);
        });
    }

    next() {
        let graph = this.getGraph();

        //Setting highlighted edge to normal
        if (this.#highlightedEdge !== -1) {
            graph.setEdgeAttribute(this.#highlightedEdge, "state", EdgeState.NORMAL);
        }
        
        switch (this.#state) {
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

    #stateNodeFromQueue (graph) {
        //Checking queue
        if (this.#queue.length === 0) {

            //Searching for WHITE node
            let nodes = graph.nodes();
            let nodesLength = nodes.length;
            for (let i = 0; i < nodesLength; i++) {
                if (graph.getNodeAttribute(nodes[i], "state") === NodeState.WHITE) {
                    //Found

                    this.#queue.push(nodes[i]);
                    break;
                }
            }

            if (this.#queue.length === 0) {
                //Not found
                
                return;
            }
        }

        //Getting node from queue
        this.#currentNode = this.#queue.shift();
        graph.setNodeAttribute(this.#currentNode, "state", NodeState.BLACK);

        //Setting neighbors
        this.#currentNodeNeighbors = graph.neighbors(this.#currentNode);

        //Switching state
        if (this.#currentNodeNeighbors.length !== 0) {
            this.#state = State.COLORING_NEIGHBORS;
        }
    }
    
    #stateColoringNeighbors(graph) {

        let noNeighborColored = false;

        while (true) {
            if (this.#currentNodeNeighbors.length !== 0) {

                //Getting neighbor
                let neighbor = this.#currentNodeNeighbors.shift();

                if (graph.getNodeAttribute(neighbor, "state") === NodeState.WHITE) {
                    //Coloring neighbor

                    this.#queue.push(neighbor);
                    graph.setNodeAttribute(neighbor, "state", NodeState.GRAY);

                    //Highlighting edge
                    this.#highlightedEdge = graph.edges(this.#currentNode, neighbor)[0];
                    graph.setEdgeAttribute(this.#highlightedEdge, "state", EdgeState.HIGHLIGHTED);

                    break;

                } else {
                    //Neighbor already colored
                    continue;
                }

            } else {
                //No neighbors left
                noNeighborColored = true;
                break;
            }
        }

        //Switching state if needed
        if (this.#currentNodeNeighbors.length === 0) {
            this.#state = State.NODE_FROM_QUEUE

            if (noNeighborColored) {
                //Nothing happened, run again
                this.next();
            }
        }

    }

}