
const HORIZONTAL_SPACE = 10;
const VERTICAL_SPACE = 30;

export default class TreeLayout {

    assign(graph) {

        //Finding root nodes
        let rootNodes = [];

        graph.forEachNode((node, attributes) => {
            if (graph.inNeighbors(node).length === 0) {
                attributes["level"] = 0;
                rootNodes.push(node);
            }
        });

        //Recursive function to set level for nodes
        function setLevelToChildren(node) {
            const level = graph.getNodeAttribute(node, "level");
            const children = graph.outNeighbors(node);
            graph.setNodeAttribute(node, "children", children);

            for (const n of children) {
                graph.setNodeAttribute(n, "level", level + 1);
                setLevelToChildren(n);
            }
        }
        
        //Setting level to nodes
        for (const node of rootNodes) {
            setLevelToChildren(node);
        }

        //Counting maximum level
        let maxLevel = -1;
        graph.forEachNode((node, attributes) => {
            if (attributes["level"] > maxLevel) {
                maxLevel = attributes["level"];
            }
        });

        //Setting counter for each level
        let levelCounter = [];
        for (let i = 0; i < maxLevel + 1; i++) {
            levelCounter.push(0);
        }

        //Recursive function to set position to node and its children
        function setPositionToChildren(node) {
            const level = graph.getNodeAttribute(node, "level");

            graph.setNodeAttribute(node, "x", HORIZONTAL_SPACE * levelCounter[level]++);
            graph.setNodeAttribute(node, "y", -1 * VERTICAL_SPACE * level);

            const children = graph.getNodeAttribute(node, "children");
            for (const n of children) {
                setPositionToChildren(n);
            }
        }

        //Setting positions to nodes
        for (const node of rootNodes) {
            setPositionToChildren(node);
        }

    }


}