import AlgorithmController from "./AlgorithmController";
import AlgorithmMementoFactory from "./AlgorithmMementoFactory";
import BFSAlgorithm from "./BFSAlgorithm";
import BFSSideComponentsFactory from "./BFSSideComponentsFactory";
import GraphVisualAdapter from "./GraphVisualAdapter";
import BFSNodeVisualAdapter from "./BFSNodeVisualAdapter";
import BFSEdgeVisualAdapter from "./BFSEdgeVisualAdapter";

export default class BFSAlgorithmController extends AlgorithmController {

    constructor(graph) {
        let algorithm = new BFSAlgorithm(graph, "0");
        let algorithmMementoFactory = new AlgorithmMementoFactory(
            graph, 
            algorithm, 
            new GraphVisualAdapter(new BFSNodeVisualAdapter(), new BFSEdgeVisualAdapter()),
            new BFSSideComponentsFactory());

        super(algorithm, algorithmMementoFactory);
    }

}