
// This static class applies given graph data to existing graph
export default class GraphDataApplier {

    // Applies everything
    static applyAll(graph, graphData) {
        GraphDataApplier.applyType(graph, graphData);
        GraphDataApplier.applyNodesEdges(graph, graphData);
    }

    // Applies only type of graph data
    static applyType(graph, graphData) {
        GraphDataApplier.applyDirected(graph, graphData);
        GraphDataApplier.applyWeighted(graph, graphData);
    }

    // Applies only directed variable
    static applyDirected(graph, graphData) {
        graph.setAttribute("directed", graphData.isDirected());

        const type = "un".repeat(!graphData.isDirected()) + "directed";
        graph.setAttribute("type", type);
    }

    // Applies only weighted variable
    static applyWeighted(graph, graphData) {
        graph.setAttribute(graph, graphData.isWeighted());
    }

    // Applies attributes of nodes and edges
    static applyNodesEdges(graph, graphData) {
        GraphDataApplier.applyNodes(graph, graphData);
        GraphDataApplier.applyEdges(graph, graphData);
    }

    // Applies only attributes of nodes
    static applyNodes(graph, graphData) {
        
        const nodes = graphData.getNodes();
        graph.forEachNode((node) => {
            let nodeAttributes = nodes[node];
            graph.mergeNodeAttributes(node, nodeAttributes);
        });
    }

    // Applies only attributes of edges
    static applyEdges(graph, graphData) {

        const edges = graphData.getEdges();
        graph.forEachEdge((edge) => {
            let edgeAttributes = edges[edge];
            graph.mergeEdgeAttributes(edge, edgeAttributes);
        });
    }
}