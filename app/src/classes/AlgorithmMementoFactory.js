import AlgorithmMemento from "./AlgorithmMemento";
import GraphVisitor from "./GraphVisitor";

export default class AlgorithmMementoFactory {

    #graph;
    #algorithm;
    #graphVisualAdapter;

    constructor (graph, algorithm, graphVisualAdapter) {
        this.#graph = graph;
        this.#algorithm = algorithm;
        this.#graphVisualAdapter = graphVisualAdapter;
    }   

    createAlgorithmMemento() {
        const graphData = GraphVisitor.extractData(this.#graph);
        const graphVisual = this.#graphVisualAdapter.toGraphVisual(graphData);

        const algorithmData = structuredClone(this.#algorithm.getData());

        return new AlgorithmMemento(graphVisual, algorithmData);
    }

}