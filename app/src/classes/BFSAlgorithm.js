import Algorithm from "./Algorithm";
import BFSNodeVisualAdapter from "./BFSNodeVisualAdapter";
import GraphVisualAdapter from "./GraphVisualAdapter";

export default class BFSAlgorithm extends Algorithm {

    #queue;

    constructor(graph) {
        super(graph, new GraphVisualAdapter(new BFSNodeVisualAdapter(), null));
        this.#queue = [];

        this.#init();
    }

    #init() {

        let graph = this.getGraph();

        //Setting state for all nodes
        graph.forEachNode((node) => {
            graph.setNodeAttribute(node, "state", 0);
        });

        //Setting starting node
        let startingNode = this.getGraph().nodes()[0];
        this.#queue.push(startingNode);
        graph.setNodeAttribute(startingNode, "state", 1);
    }

    next() {
        let graph = this.getGraph();

        if (this.#queue.length !== 0) {

            //Popping from queue
            let currentNode = this.#queue.shift();
            graph.setNodeAttribute(currentNode, "state", 2);

            //Pushing neighbours to queue
            graph.forEachNeighbor(currentNode, (neighbor, attributes) => {
                if (attributes["state"] === 0) {
                    this.#queue.push(neighbor);
                    graph.setNodeAttribute(neighbor, "state", 1);
                }
            });
        }
    }

}