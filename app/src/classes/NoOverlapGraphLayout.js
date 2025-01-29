import noverlap from "graphology-layout-noverlap";
import GraphologyGraphLayout from "./GraphologyGraphLayout";
import random from "graphology-layout/random";

export default class NoOverlapGraphLayout extends GraphologyGraphLayout {
    constructor() {
        super(noverlap);
    }

    assign(graph) {
        //Flushing graph's x and y with random values
        random.assign(graph);

        //Assigning
        super.assign(graph);
    }
}