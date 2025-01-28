import AlgorithmMementoFactory from "./AlgorithmMementoFactory";
import GraphVisualAdapter from "./GraphVisualAdapter";
import AlgorithmController from "./AlgorithmController";

export default class AlgorithmControllerFactory {

    static createAlgorithmController(graph, algorithmHeader, ...algorithmAttributes) {

        const algorithmClass = algorithmHeader.getAlgorithmClass();
        const nodeVisualAdapterClass = algorithmHeader.getNodeVisualAdapterClass();
        const edgeVisualAdapterClass = algorithmHeader.getEdgeVisualAdapterClass();
        const sideComponentsFactoryClass = algorithmHeader.getSideComponentsFactoryClass();

        const algorithm = new algorithmClass(graph, ...algorithmAttributes);
        const algorithmMementoFactory = new AlgorithmMementoFactory(
            graph,
            algorithm,
            new GraphVisualAdapter(new nodeVisualAdapterClass(), new edgeVisualAdapterClass())
        );

        return new AlgorithmController(algorithm, algorithmMementoFactory, new sideComponentsFactoryClass());
    }

}