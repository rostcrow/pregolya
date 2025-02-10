
import AlgorithmController from "./AlgorithmController";
import GraphAttributesAdapter from "./GraphAttributesAdapter";

export default class AlgorithmFacade {

    #algorithmController;
    #graphAttributesAdapter;
    #sideComponentsFactory; 

    constructor(graph, algorithmTag, ...algorithmOptions) {

        const algorithmClass = algorithmTag.getAlgorithmClass();
        const nodeAttributesAdapterClass = algorithmTag.getNodeAttributesAdapterClass();
        const edgeAttributesAdapterClass = algorithmTag.getEdgeAttributesAdapterClass();
        const sideComponentsFactoryClass = algorithmTag.getSideComponentsFactoryClass();

        this.#algorithmController = new AlgorithmController (new algorithmClass (graph, ...algorithmOptions));
        this.#graphAttributesAdapter = new GraphAttributesAdapter (new nodeAttributesAdapterClass(), new edgeAttributesAdapterClass());
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

    getCurrentGraphAttributes() {
        let graphData = this.#algorithmController.getCurrentState().getGraphData();
        return this.#graphAttributesAdapter.adapt(graphData);
    }

    getCurrentSideComponents() {
        let state = this.#algorithmController.getCurrentState();
        return this.#sideComponentsFactory.createSideComponents(state);
    }

}