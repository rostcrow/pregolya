
export default class GraphDataApplier {

    static apply(graph, graphData) {

        let nodes = graphData.getNodes();
        let edges = graphData.getEdges();

        //Nodes
        graph.forEachNode((node) => {

            let nodeAttributes = nodes[node];

            for (const attribute in nodeAttributes) {
                graph.setNodeAttribute(node, attribute, nodeAttributes[attribute]);
            }
        });

        //Edges
        graph.forEachEdge((edge) => {

            let edgeAttributes = edges[edge];

            for (const attribute in edgeAttributes) {
                graph.setEdgeAttribute(edge, attribute, edgeAttributes[attribute]);
            }
        });
    }

}