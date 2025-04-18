
// IMPORT
// My classes
import GraphLayout from "./GraphLayout";

// CODE
// This class represents graph layout taken from Graphology library
export default class GraphologyGraphLayout extends GraphLayout {

    #graphologyLayout

    constructor(graphologyLayout) {
        super();
        this.#graphologyLayout = graphologyLayout;
    }

    assign(graph) {
        this.#graphologyLayout.assign(graph);
    }

}