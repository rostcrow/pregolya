import { NodeAttributes } from "./BFSAlgorithm";
import GraphLayout from "./GraphLayout";

const HORIZONTAL_SPACE = 10;
const VERTICAL_SPACE = 30;

export default class BFSTreeGraphLayout extends GraphLayout {

    assign(graph) {

        //Helpful func to sort nodes by order of visit
        function sortByOrderOfVisit(nodeList) {

            function compareOrderOfVisit(a, b) {
                const orderA = graph.getNodeAttribute(a, NodeAttributes.ORDER_OF_VISIT);
                const orderB = graph.getNodeAttribute(b, NodeAttributes.ORDER_OF_VISIT);

                return orderA - orderB;
            }

            nodeList.sort(compareOrderOfVisit);
        }   
        
        //Finding root nodes
        let nodesQueue = [];

        graph.forEachNode((node) => {
            if (graph.inNeighbors(node).length === 0) {
                graph.setNodeAttribute(node, "level", 0);
                nodesQueue.push(node);
            }
        });

        //Sorting root nodes
        sortByOrderOfVisit(nodesQueue);

        //Preparing level counter
        const levelCounter = [0];

        //Setting position to nodes
        while(nodesQueue.length !== 0) {

            //Getting node from queue
            const node = nodesQueue.shift();

            //Getting level
            const level = graph.getNodeAttribute(node, "level");

            //Checking level counter length
            if (levelCounter.length < level + 1) {
                //Level counter is short

                //Adding levels to counter
                const d = level + 1 - levelCounter.length;
                for (let i = 0; i < d; i++) {
                    levelCounter.push(0);
                }
            }

            //Setting position
            graph.setNodeAttribute(node, "x", HORIZONTAL_SPACE * levelCounter[level]++);
            graph.setNodeAttribute(node, "y", -1 * VERTICAL_SPACE * level);

            //Getting children in order
            let children = structuredClone(graph.outNeighbors(node));
            sortByOrderOfVisit(children);
            
            //Setting level to children and pushing to queue
            for (const child of children) {
                graph.setNodeAttribute(child, "level", level + 1);
                nodesQueue.push(child);
            }
        }
    }
}