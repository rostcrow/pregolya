
// IMPORT
// Graphology
import noverlap from "graphology-layout-noverlap";
import random from "graphology-layout/random";

// My classes
import GraphologyGraphLayout from "./GraphologyGraphLayout";

// CODE
// This class represents layout which tries to set node positions, when edges are not overlapping
export default class NoOverlapGraphLayout extends GraphologyGraphLayout {
    constructor() {
        super(noverlap);
    }

    assign(graph) {
        // Flushing graph's x and y with random values
        random.assign(graph);

        // Assigning
        super.assign(graph);
    }
}