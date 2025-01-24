import AlgorithmMemento from "./AlgorithmMemento";
import GraphVisitor from "./GraphVisitor";

export default class AlgorithmMementoFactory {

    #graph;
    #algorithm;
    #graphVisualAdapter;
    #sideComponentsFactory;

    constructor (graph, algorithm, graphVisualAdapter, sideComponentsFactory) {
        this.#graph = graph;
        this.#algorithm = algorithm;
        this.#graphVisualAdapter = graphVisualAdapter;
        this.#sideComponentsFactory = sideComponentsFactory;
    }   


    createAlgorithmMemento() {
        let graphData = GraphVisitor.extractData(this.#graph);
        let graphVisual = this.#graphVisualAdapter.toGraphVisual(graphData);

        let algorithmData = this.#algorithm.getData();
        let sideComponents = this.#sideComponentsFactory.createSideComponents(algorithmData);

        return new AlgorithmMemento(graphVisual, sideComponents);
    }

}