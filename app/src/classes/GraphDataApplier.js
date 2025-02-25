
export default class GraphDataApplier {

    static applyAll(graph, graphData) {
        GraphDataApplier.applyType(graph, graphData);
        GraphDataApplier.applyNodesEdges(graph, graphData);
    }

    static applyType(graph, graphData) {
        GraphDataApplier.applyDirected(graph, graphData);
        GraphDataApplier.applyWeighted(graph, graphData);
    }

    static applyDirected(graph, graphData) {
        graph.setAttribute("directed", graphData.isDirected());

        const type = "un".repeat(!graphData.isDirected()) + "directed";
        graph.setAttribute("type", type);
    }

    static applyWeighted(graph, graphData) {
        graph.setAttribute(graph, graphData.isWeighted());
    }

    static applyNodesEdges(graph, graphData) {
        GraphDataApplier.applyNodes(graph, graphData);
        GraphDataApplier.applyEdges(graph, graphData);
    }

    static applyNodes(graph, graphData) {
        
        const nodes = graphData.getNodes();
        graph.forEachNode((node) => {
            let nodeAttributes = nodes[node];
            graph.mergeNodeAttributes(node, nodeAttributes);
        });
    }

    static applyEdges(graph, graphData) {

        const edges = graphData.getEdges();
        graph.forEachEdge((edge) => {
            let edgeAttributes = edges[edge];
            graph.mergeEdgeAttributes(edge, edgeAttributes);
        });
    }
}