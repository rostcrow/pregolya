
// IMPORT
// My classes
import ErrorThrower from "../../ErrorThrower";
import GraphLayout from "../../GraphLayout";

// CODE
// Globals
const DISTANCE_BETWEEN_NODES = 10;
const BASE_CURVATURE = 1;
const INC_CURVATURE = 1;

// This class represents layout which sorts given graph topologically from left to right
export default class TopologicalSortGraphLayout extends GraphLayout {

    assign (graph) {

        let graphCopy = graph.copy()

        let sorted = []
        let nodesWithNoIncEdge = []

        // Finding starting nodes
        graphCopy.forEachNode((node) => {

            const inEdges = graphCopy.inEdges(node);
            if (inEdges.length === 0) {
                nodesWithNoIncEdge.push(node);
            }

        });

        // Main algorithm
        while(nodesWithNoIncEdge.length !== 0) {

            const node = nodesWithNoIncEdge.shift();
            sorted.push(node);

            let outEdges = graphCopy.outEdges(node);
            for (const edge of outEdges) {

                const opposite = graphCopy.opposite(node, edge);
                graphCopy.dropEdge(edge);

                const inEdges = graphCopy.inEdges(opposite);
                if (inEdges.length === 0) {
                    nodesWithNoIncEdge.push(opposite);
                }
            }
        }

        // Cycle check
        if (graphCopy.edges().length !== 0) {
            // Graph has a cycle
            ErrorThrower.graphHasCycle();
            return;
        }

        // Giving position to each node
        let x = 0;
        for (const node of sorted) {

            graph.setNodeAttribute(node, "x", x);
            graph.setNodeAttribute(node, "y", 0);

            x += DISTANCE_BETWEEN_NODES;

            // Curving out edges
            const outEdges = graph.outEdges(node);
            const outEdgesLen = outEdges.length;

            for (let i = 0; i < outEdgesLen; i++) {
                const edge = outEdges[i];

                const curvature = (1 - 2 * (i % 2)) * (BASE_CURVATURE + (i / 2) * INC_CURVATURE);
                graph.setEdgeAttribute(edge, "curvature", curvature);
                graph.setEdgeAttribute(edge, "type", "curvedArrow");
            }

        }

    }    


}