
//Importing libraries and build-in files
import random  from "graphology-layout/random";

//Importing my classes
import GraphLayout from "./GraphLayout";

export default class FlushGraphLayout extends GraphLayout {

    assign(graph) {
        //Flushing graph's x and y with random values
        random.assign(graph);

        //Assigning
        super.assign(graph);
    }
}