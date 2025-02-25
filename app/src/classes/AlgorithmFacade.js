
import AlgorithmController from "./AlgorithmController";
import GraphDataStyler from "./GraphDataStyler";

export default class AlgorithmFacade {

    #algorithmController;
    #graphDataStyler;
    #sideComponentsFactory; 

    constructor(graph, algorithmTag, ...algorithmOptions) {

        const algorithmClass = algorithmTag.getAlgorithmClass();
        const nodeStylerClass = algorithmTag.getNodeStylerClass();
        const edgeStylerClass = algorithmTag.getEdgeStylerClass();
        const sideComponentsFactoryClass = algorithmTag.getSideComponentsFactoryClass();

        this.#algorithmController = new AlgorithmController (new algorithmClass (graph, ...algorithmOptions));
        this.#graphDataStyler = new GraphDataStyler (new nodeStylerClass(), new edgeStylerClass());
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

    getCurrentGraphData() {
        let graphData = this.#algorithmController.getCurrentState().getGraphData();
        return this.#graphDataStyler.style(graphData);
    }

    getCurrentSideComponents() {
        let state = this.#algorithmController.getCurrentState();
        return this.#sideComponentsFactory.createSideComponents(state);
    }

}