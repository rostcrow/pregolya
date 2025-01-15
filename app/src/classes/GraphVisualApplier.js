
export default class GraphVisualApplier {

    static apply(graph, visual) {

        //Nodes
        graph.forEachNode((node) => {

            let nodeVisual = visual["nodes"][node];

            for (const attr in nodeVisual) {
                graph.setNodeAttribute(node, attr, nodeVisual[attr]);
            }
        });

        //Edges
        graph.forEachEdge((edge) => {

            let edgeVisual = visual["edges"][edge];

            for (const attr in edgeVisual) {
                graph.setNodeAttribute(edge, attr, edgeVisual[attr]);
            }
        });

    }

}