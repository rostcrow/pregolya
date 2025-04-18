
// IMPORT
// My classes
import AlgorithmController from "./AlgorithmController";
import GraphDataStyler from "./GraphDataStyler";

/*
  This class represents facade for algorithm logic. 
  It is the only communication point from GUI to make algorithm actions.
  It can be set by giving graph, algorithm tag and options for the algorithm.
*/ 
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

    // Jumps to start
    jumpToStart() {
        this.#algorithmController.jumpToStart();
    }

    // Makes one step back
    back() {
        this.#algorithmController.back();
    }

    // Makes one step forward
    forward() {
        this.#algorithmController.forward();
    }

    // Jumps to end
    jumpToEnd() {
        this.#algorithmController.jumpToEnd();
    }

    // Returns if algorithm is on start
    algorithmIsOnStart() {
        return this.#algorithmController.algorithmIsOnStart();
    }

    // Returns if algorithm is on end
    algorithmIsOnEnd() {
        return this.#algorithmController.algorithmIsOnEnd();
    }

    // Returns current styled graph data
    getCurrentGraphData() {
        let graphData = this.#algorithmController.getCurrentState().getGraphData();
        return this.#graphDataStyler.style(graphData);
    }

    // Returns list of current side components
    getCurrentSideComponents() {
        let state = this.#algorithmController.getCurrentState();
        return this.#sideComponentsFactory.createSideComponents(state);
    }

}