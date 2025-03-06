import AdditionalData from "./AdditionalData";
import Algorithm from "./Algorithm";
import ErrorThrower from "./ErrorThrower";

const State = {
    SETTING_STARTING_NODE: 1,
    CHANGE_CURRENT: 2,
    HANDLE_CURRENT: 3,
    NEW_STARTING_NODE: 4
}

export const NodeAttributes = {
    STATE: 0,
    VISITED: 1,
    VISITED_FROM: 2,
    ORDER_OF_VISIT: 3,
    TIME_OF_VISIT: 4,
    ORDER_OF_FINISH: 5,
    TIME_OF_FINISH: 6,
    LOWLINK: 7,
    IN_COMPONENT: 8
}

export const NodeState = {
    NOT_VISITED: "Not visited",
    NEW_IN_DFS_STACK: "New in DFS stack",
    IN_DFS_STACK: "In DFS stack",
    CURRENT: "Current",
    NOT_IN_COMPONENT: "Finished - Not part of component",
    IN_COMPONENT: "Finished - Part of component"
}

export const EdgeAttributes = {
    STATE: 0
}

export const EdgeState = {
    NOT_VISITED: "Not visited",
    HIGHLIGHTED: "Highlighted",
    NOT_IN_COMPONENT: "Visited - Not part of component",
    IN_COMPONENT: "Part of component"
}

export default class TarjanAlgorithm extends Algorithm {

    #state;
    #startingNode;
    #dfsStack;
    #time;
    #orderOfVisit;
    #orderOfFinish;
    #componentStack;
    #components;
    #currentNode;
    #currentNeighbors;
    #componentCounter;
    #highlightedEdge;
    #newStartingNode;

    constructor(graph, startingNode) {
        super(graph);

        //Initializing attributes
        this.#state = State.SETTING_STARTING_NODE;
        this.#startingNode = startingNode;
        this.#dfsStack = [];
        this.#time = 1;
        this.#orderOfVisit = 1;
        this.#orderOfFinish = 1;
        this.#componentStack = [];
        this.#components = [];
        this.#currentNode = null;
        this.#currentNeighbors = [];
        this.#componentCounter = 1;
        this.#highlightedEdge = null;
        this.#newStartingNode = null;

        //Setting initial value to nodes
        graph.forEachNode((node) => {
            graph.setNodeAttribute(node, NodeAttributes.STATE, NodeState.NOT_VISITED);
            graph.setNodeAttribute(node, NodeAttributes.VISITED, false);
            graph.setNodeAttribute(node, NodeAttributes.VISITED_FROM, null);
            graph.setNodeAttribute(node, NodeAttributes.ORDER_OF_VISIT, null);
            graph.setNodeAttribute(node, NodeAttributes.TIME_OF_VISIT, null);
            graph.setNodeAttribute(node, NodeAttributes.ORDER_OF_FINISH, null);
            graph.setNodeAttribute(node, NodeAttributes.TIME_OF_FINISH, null);
            graph.setNodeAttribute(node, NodeAttributes.LOWLINK, null);
            graph.setNodeAttribute(node, NodeAttributes.IN_COMPONENT, null);
        });

        //Setting initial value to edges
        graph.forEachEdge((edge) => {
            graph.setEdgeAttribute(edge, EdgeAttributes.STATE, EdgeState.NOT_VISITED);
        });
    }

    forward() {
        
        const graph = this.getGraph();

        //Dehighlighting edge
        if (this.#highlightedEdge !== null) {
            graph.setEdgeAttribute(this.#highlightedEdge, EdgeAttributes.STATE, EdgeState.NOT_IN_COMPONENT);
            this.#highlightedEdge = null;
        }

        switch(this.#state) {
            case State.SETTING_STARTING_NODE:
                this.#stateSettingStartingNode(graph);
                break;
            case State.CHANGE_CURRENT:
                this.#stateChangeCurrent(graph);
                break;
            case State.HANDLE_CURRENT:
                this.#stateHandleCurrent(graph);
                break;
            case State.NEW_STARTING_NODE:
                this.#stateNewStartingNode(graph);
                break;
            default:
                ErrorThrower.notExpectedState();
        }

    }

    #stateSettingStartingNode(graph) {

        //Setting starting node
        this.#dfsStack.push(this.#startingNode);
        graph.setNodeAttribute(this.#startingNode, NodeAttributes.STATE, NodeState.NEW_IN_DFS_STACK);
        graph.setNodeAttribute(this.#startingNode, NodeAttributes.VISITED, true);
        graph.setNodeAttribute(this.#startingNode, NodeAttributes.VISITED_FROM, null);
        graph.setNodeAttribute(this.#startingNode, NodeAttributes.ORDER_OF_VISIT, this.#orderOfVisit++);
        graph.setNodeAttribute(this.#startingNode, NodeAttributes.TIME_OF_VISIT, this.#time);
        graph.setNodeAttribute(this.#startingNode, NodeAttributes.LOWLINK, this.#time++);
        this.#componentStack.push(this.#startingNode);

        //Switching state
        this.#state = State.CHANGE_CURRENT;
    }

    #stateChangeCurrent(graph) {

        //Changing current
        if (this.#currentNode !== null) {
            graph.setNodeAttribute(this.#currentNode, NodeAttributes.STATE, NodeState.IN_DFS_STACK);
        }
       
        this.#currentNode = this.#dfsStack[this.#dfsStack.length - 1];
        graph.setNodeAttribute(this.#currentNode, NodeAttributes.STATE, NodeState.CURRENT);
        this.#currentNeighbors = graph.outNeighbors(this.#currentNode);

        //Switching state
        this.#state = State.HANDLE_CURRENT;
    }

    #stateHandleCurrent(graph) {

        //Visiting next neighbor
        while (this.#currentNeighbors.length !== 0) {

            const neighbor = this.#currentNeighbors.shift();
            if (!graph.getNodeAttribute(neighbor, NodeAttributes.VISITED)) {
                //Visiting
                this.#dfsStack.push(neighbor);
                graph.setNodeAttribute(neighbor, NodeAttributes.STATE, NodeState.NEW_IN_DFS_STACK);
                graph.setNodeAttribute(neighbor, NodeAttributes.VISITED, true);
                graph.setNodeAttribute(neighbor, NodeAttributes.VISITED_FROM, this.#currentNode);
                graph.setNodeAttribute(neighbor, NodeAttributes.ORDER_OF_VISIT, this.#orderOfVisit++);
                graph.setNodeAttribute(neighbor, NodeAttributes.TIME_OF_VISIT, this.#time);
                graph.setNodeAttribute(neighbor, NodeAttributes.LOWLINK, this.#time++);
                this.#componentStack.push(neighbor);

                //Higlighting edge
                this.#highlightedEdge = graph.outEdges(this.#currentNode, neighbor)[0];
                graph.setEdgeAttribute(this.#highlightedEdge, EdgeAttributes.STATE, EdgeState.HIGHLIGHTED);

                //Switching state
                this.#state = State.CHANGE_CURRENT;

                return;
            }

            if (graph.getNodeAttribute(neighbor, NodeAttributes.IN_COMPONENT) === null) {
                const currentLowlink = graph.getNodeAttribute(this.#currentNode, NodeAttributes.LOWLINK);
                const neighborLowlink = graph.getNodeAttribute(neighbor, NodeAttributes.LOWLINK);
                graph.setNodeAttribute(this.#currentNode, NodeAttributes.LOWLINK, Math.min(currentLowlink, neighborLowlink));
            }
        }

        //Checking component finish
        const currentTimeOfVisit = graph.getNodeAttribute(this.#currentNode, NodeAttributes.TIME_OF_VISIT);
        const currentLowlink = graph.getNodeAttribute(this.#currentNode, NodeAttributes.LOWLINK);

        if (currentTimeOfVisit === currentLowlink) {
            //Component finished
            const finishedComponent = [];

            //Popping component stack until current popped
            while(true) {
                const node = this.#componentStack.pop();
                graph.setNodeAttribute(node, NodeAttributes.IN_COMPONENT, this.#componentCounter);
                graph.setNodeAttribute(node, NodeAttributes.STATE, NodeState.IN_COMPONENT);
                finishedComponent.push(node);

                if (node === this.#currentNode) {
                    break;
                }
            }

            //Coloring edges inside component
            for (const nodeIndex in finishedComponent) {
                const node = finishedComponent[nodeIndex];
                const edges = graph.outEdges(node);

                for (const edgeIndex in edges) {
                    const edge = edges[edgeIndex];
                    const opposite = graph.opposite(node, edge);

                    if (graph.getNodeAttribute(opposite, NodeAttributes.IN_COMPONENT) === this.#componentCounter) {
                        //Edge is inside component
                        graph.setEdgeAttribute(edge, EdgeAttributes.STATE, EdgeState.IN_COMPONENT);
                    }
                }

            }

            //Pushing component to result
            this.#components.push(structuredClone(finishedComponent));
            this.#componentCounter++;
        }

        //Finishing current
        this.#dfsStack.pop();
        graph.setNodeAttribute(this.#currentNode, NodeAttributes.ORDER_OF_FINISH, this.#orderOfFinish++);
        graph.setNodeAttribute(this.#currentNode, NodeAttributes.TIME_OF_FINISH, this.#time++);

        if (graph.getNodeAttribute(this.#currentNode, NodeAttributes.IN_COMPONENT) === null) {
            graph.setNodeAttribute(this.#currentNode, NodeAttributes.STATE, NodeState.NOT_IN_COMPONENT);
        }

        this.#currentNode = null;

        //Switching state
        if (this.#dfsStack.length === 0) {
            //Looking for next node

            const nodes = graph.nodes();
            for (const index in nodes) {
                const node = nodes[index];

                if (!graph.getNodeAttribute(node, NodeAttributes.VISITED)) {
                    //Found

                    this.#newStartingNode = node;
                    this.#state = State.NEW_STARTING_NODE;

                    return;
                }
            }

            //Not found - algorithm ends
            this.setFinished();
            return;
        }

        this.#state = State.CHANGE_CURRENT;
    }

    #stateNewStartingNode(graph) {

        this.#dfsStack.push(this.#newStartingNode);
        graph.setNodeAttribute(this.#newStartingNode, NodeAttributes.STATE, NodeState.NEW_IN_DFS_STACK);
        graph.setNodeAttribute(this.#newStartingNode, NodeAttributes.VISITED, true);
        graph.setNodeAttribute(this.#newStartingNode, NodeAttributes.VISITED_FROM, null);
        graph.setNodeAttribute(this.#newStartingNode, NodeAttributes.ORDER_OF_VISIT, this.#orderOfVisit++);
        graph.setNodeAttribute(this.#newStartingNode, NodeAttributes.TIME_OF_VISIT, this.#time);
        graph.setNodeAttribute(this.#newStartingNode, NodeAttributes.LOWLINK, this.#time++);
        this.#componentStack.push(this.#newStartingNode);

        this.#state = State.CHANGE_CURRENT;
    }

    getAdditionalData() {

        let graph = this.getGraph();

        function getAttributes(node) {
            
            let attributes = structuredClone(graph.getNodeAttributes(node));
            attributes["key"] = node;

            return attributes;
        }

        //DFS stack
        const dfsStackOut = []
        for (const node of this.#dfsStack) {
            dfsStackOut.push(getAttributes(node));
        }

        //Component stack
        const componentStackOut = [];
        for (const node of this.#componentStack) {
            componentStackOut.push(getAttributes(node));
        }

        //Order of visit
        let orderOfVisit = [];
        graph.forEachNode((node, attributes) => {
            if (attributes[NodeAttributes.TIME_OF_VISIT] !== null) {
                orderOfVisit.push(getAttributes(node));
            }
        });

        orderOfVisit.sort((a, b) => {
            return a[NodeAttributes.ORDER_OF_VISIT] - b[NodeAttributes.ORDER_OF_VISIT];
        });

        //Order of finish
        let orderOfFinish = [];
        graph.forEachNode((node, attributes) => {
            if (attributes[NodeAttributes.TIME_OF_FINISH] !== null) {
                orderOfFinish.push(getAttributes(node));
            }
        });

        orderOfFinish.sort((a, b) => {
            return a[NodeAttributes.ORDER_OF_FINISH] - b[NodeAttributes.ORDER_OF_FINISH];
        });

        return new AdditionalData({"dfsStack": dfsStackOut, "componentStack": componentStackOut, 
            "orderOfVisit": orderOfVisit, "orderOfFinish": orderOfFinish});
    }

}