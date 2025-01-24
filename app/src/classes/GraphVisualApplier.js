
export default class GraphVisualApplier {

    static apply(graph, visual) {

        let nodesVisual = visual.getNodes();
        let edgesVisual = visual.getEdges();

        //Nodes
        graph.forEachNode((node) => {

            let nodeVisual = nodesVisual[node];

            for (const attr in nodeVisual) {
                graph.setNodeAttribute(node, attr, nodeVisual[attr]);
            }
        });

        //Edges
        graph.forEachEdge((edge) => {

            let edgeVisual = edgesVisual[edge];

            for (const attr in edgeVisual) {
                graph.setEdgeAttribute(edge, attr, edgeVisual[attr]);
            }
        });

    }

}