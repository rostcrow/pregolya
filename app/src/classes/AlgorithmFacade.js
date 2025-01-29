
import AlgorithmController from "./AlgorithmController";
import GraphVisualAdapter from "./GraphVisualAdapter";

export default class AlgorithmFacade {

    #algorithmController;
    #graphVisualAdapter;
    #sideComponentsFactory; 

    constructor(graph, algorithmTag, ...algorithmAttributes) {

        const algorithmClass = algorithmTag.getAlgorithmClass();
        const nodeVisualAdapterClass = algorithmTag.getNodeVisualAdapterClass();
        const edgeVisualAdapterClass = algorithmTag.getEdgeVisualAdapterClass();
        const sideComponentsFactoryClass = algorithmTag.getSideComponentsFactoryClass();

        this.#algorithmController = new AlgorithmController (new algorithmClass (graph, ...algorithmAttributes));
        this.#graphVisualAdapter = new GraphVisualAdapter (new nodeVisualAdapterClass(), new edgeVisualAdapterClass());
        this.#sideComponentsFactory = new sideComponentsFactoryClass();
    }

    jumpToStart() {
        this.#algorithmController.jumpToStart();
    }

    back() {
        this.#algorithmController.back();
    }

    forward() {
        this.#algorithmController.forward();
    }

    jumpToEnd() {
        this.#algorithmController.jumpToEnd();
    }

    algorithmIsOnStart() {
        return this.#algorithmController.algorithmIsOnStart();
    }

    algorithmIsOnEnd() {
        return this.#algorithmController.algorithmIsOnEnd();
    }

    getCurrentGraphVisual() {
        let graphData = this.#algorithmController.getCurrentState().getGraphData();
        return this.#graphVisualAdapter.toGraphVisual(graphData);
    }

    getCurrentSideComponents() {
        let state = this.#algorithmController.getCurrentState();
        return this.#sideComponentsFactory.createSideComponents(state);
    }

}