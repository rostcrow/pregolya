import GraphLayout from "./GraphLayout";

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