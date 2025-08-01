
// IMPORT
// My classes
import Algorithm from "../../Algorithm";
import ErrorThrower from "../../ErrorThrower";
import AdditionalData from "../../AdditionalData";

// CODE
// Globals
const State = {
    STARTING_NODE_TO_STACK: 0,
    NODE_FROM_STACK: 1,
    HANDLE_CURRENT: 2,
    NEW_ROOT_TO_STACK: 3,
    COUNT_COMPONENTS: 4
}

export const NodeAttributes = {
    STATE: 0,
    VISITED_FROM: 1,
    ORDER_OF_VISIT: 2,
    TIME_OF_VISIT: 3,
    ORDER_OF_FINISH: 4,
    TIME_OF_FINISH: 5,
    DEPTH: 6,
    LOWPOINT: 7,
    BICONNECTED_COMPONENTS: 8,
}

export const NodeState = {
    NOT_VISITED: "Not visited",
    NEW_IN_STACK: "New in stack",
    IN_STACK: "In stack",
    CURRENT: "Current",
    NOT_ARTICULATION: "Finished - Not articulation",
    ARTICULATION: "Finished - Articulation"
}

export const EdgeAttributes = {
    STATE: 0,
}

export const EdgeState = {
    NORMAL: "Not used",
    TREE: "Tree",
    BRIDGE: "Bridge",
    BACK: "Back"
}

// This class represents biconnected components search algorithm
export default class BiconnectedComponentsSearchAlgorithm extends Algorithm {

    #startingNode;
    #state;
    #stack;
    #currentNode;
    #orderOfVisit;
    #orderOfFinish;
    #time;
    #newRoot; // Node, which will become next root node for algorithm to continue

    constructor(graph, startingNode) {
        super(graph);

        // Initializing attributes
        this.#startingNode = startingNode;
        this.#state = State.STARTING_NODE_TO_STACK;
        this.#stack = [];
        this.#currentNode = null;
        this.#orderOfVisit = 1;
        this.#orderOfFinish = 1;
        this.#time = 1;
        this.#newRoot = null;

        // Setting up nodes
        graph.forEachNode((node) => {
            graph.setNodeAttribute(node, NodeAttributes.STATE, NodeState.NOT_VISITED);
            graph.setNodeAttribute(node, NodeAttributes.VISITED_FROM, null);
            graph.setNodeAttribute(node, NodeAttributes.ORDER_OF_VISIT, null);
            graph.setNodeAttribute(node, NodeAttributes.TIME_OF_VISIT, null);
            graph.setNodeAttribute(node, NodeAttributes.ORDER_OF_FINISH, null);
            graph.setNodeAttribute(node, NodeAttributes.TIME_OF_FINISH, null);
            graph.setNodeAttribute(node, NodeAttributes.DEPTH, null);
            graph.setNodeAttribute(node, NodeAttributes.LOWPOINT, null);
            graph.setNodeAttribute(node, NodeAttributes.BICONNECTED_COMPONENTS, null);
        });

        // Setting up edges
        graph.forEachEdge((edge) => {
            graph.setEdgeAttribute(edge, EdgeAttributes.STATE, EdgeState.NORMAL);
        });

    }

    forward() {

        let graph = this.getGraph();

        switch(this.#state) {
            case State.STARTING_NODE_TO_STACK:
                this.#stateStartingNodeToStack(graph);
                break;
            case State.NODE_FROM_STACK:
                this.#stateNodeFromStack(graph);
                break;
            case State.HANDLE_CURRENT:
                this.#stateHandleCurrent(graph);
                break;
            case State.NEW_ROOT_TO_STACK:
                this.#stateNewRootToStack(graph);
                break;
            case State.COUNT_COMPONENTS:
                this.#stateCountComponents(graph);
                break;
            default:
                ErrorThrower.notExpectedState();
        }

    }

    // Sets starting node and pushes it to stack
    #stateStartingNodeToStack(graph) {

        // Pushing starting node to stack
        this.#stack.push(this.#startingNode);
        graph.setNodeAttribute(this.#startingNode, NodeAttributes.STATE, NodeState.NEW_IN_STACK);
        graph.setNodeAttribute(this.#startingNode, NodeAttributes.ORDER_OF_VISIT, this.#orderOfVisit++);
        graph.setNodeAttribute(this.#startingNode, NodeAttributes.TIME_OF_VISIT, this.#time++);
        graph.setNodeAttribute(this.#startingNode, NodeAttributes.DEPTH, 0);

        // Switching state
        this.#state = State.NODE_FROM_STACK;
    }

    // Gets node from stack and sets it as current
    #stateNodeFromStack(graph) {

        //Last current change
        if (this.#currentNode !== null && graph.getNodeAttribute(this.#currentNode, NodeAttributes.STATE) === NodeState.CURRENT) {
            graph.setNodeAttribute(this.#currentNode, NodeAttributes.STATE, NodeState.IN_STACK);
        }

        //Popping from stack
        this.#currentNode = this.#stack[this.#stack.length - 1];
        graph.setNodeAttribute(this.#currentNode, NodeAttributes.STATE, NodeState.CURRENT);

        //Switching state
        this.#state = State.HANDLE_CURRENT;

    }

    /*
        Handles current node.

        Tries to finds unused edge from current node and use it.
        If this edge leads to unvisited node, this node is pushed to stack to be set as current in the next step.

        If no unused edge is found, determines if the current is articulation or not.
        Bridges are counted aswell.
        It also counts lowpoint for current.
        Then it pops current from stack and checks if stack is not empty.
        If stack is empty, tries to find new root.
    */
    #stateHandleCurrent(graph) {

        // Finding next appropriate edge
        const edges = graph.outboundEdges(this.#currentNode);
        let nextEdge = null;

        for (const edge of edges) {
            if (graph.getEdgeAttribute(edge, EdgeAttributes.STATE) === EdgeState.NORMAL) {
                nextEdge = edge;
                break;
            }
        }

        if (nextEdge !== null) {
            // Next edge found

            // Determining edge state
            let edgeState = null;
            const opposite = graph.opposite(this.#currentNode, nextEdge);
            const oppositeState = graph.getNodeAttribute(opposite, NodeAttributes.STATE);

            switch (oppositeState) {
                case NodeState.NOT_VISITED:
                    edgeState = EdgeState.TREE;
    
                    // Pushing to stack
                    this.#stack.push(opposite);
                    graph.setNodeAttribute(opposite, NodeAttributes.STATE, NodeState.NEW_IN_STACK);
                    graph.setNodeAttribute(opposite, NodeAttributes.VISITED_FROM, this.#currentNode);
                    graph.setNodeAttribute(opposite, NodeAttributes.ORDER_OF_VISIT, this.#orderOfVisit++);
                    graph.setNodeAttribute(opposite, NodeAttributes.TIME_OF_VISIT, this.#time++);

                    const currentDepth = graph.getNodeAttribute(this.#currentNode, NodeAttributes.DEPTH)
                    graph.setNodeAttribute(opposite, NodeAttributes.DEPTH, currentDepth + 1)

                    break;
    
                case NodeState.NEW_IN_STACK:
                case NodeState.IN_STACK:
                case NodeState.CURRENT:
                    edgeState = EdgeState.BACK;
                    break;
                
                default:
                    ErrorThrower.notExpectedState();
            }

            // Changing edge state
            graph.setEdgeAttribute(nextEdge, EdgeAttributes.STATE, edgeState);

            // Switching state
            if (edgeState === EdgeState.TREE) {
                this.#state = State.NODE_FROM_STACK;
            } else {
                this.#state = State.HANDLE_CURRENT;
            }

        } else {
            // Next edge not found

            // Determining articulation for current
            let articualtion = false;
            const currentDepth = graph.getNodeAttribute(this.#currentNode, NodeAttributes.DEPTH);
            const currentVisitedFrom = graph.getNodeAttribute(this.#currentNode, NodeAttributes.VISITED_FROM);
            const neighbors = graph.neighbors(this.#currentNode);

            if (currentVisitedFrom === null) {
                // Root node
                
                let num_children = 0;
                for (const neighbor of neighbors) {
                    if (graph.getNodeAttribute(neighbor, NodeAttributes.VISITED_FROM) === this.#currentNode) {
                        // Neighbor is child

                        num_children++;
                        if (num_children > 1) {
                            // Current is articulation point
                            articualtion = true;
                        }

                        if (graph.getNodeAttribute(neighbor, NodeAttributes.LOWPOINT) > currentDepth) {
                            // Potential bridge

                            const connectingEdges = graph.edges(this.#currentNode, neighbor);
                            if (connectingEdges.length === 1) {
                                // Connecting edge is a bridge
                                graph.setEdgeAttribute(connectingEdges[0], EdgeAttributes.STATE, EdgeState.BRIDGE);
                            }
                        }
                    }
                }

            } else {
                // Other nodes

                for (const neighbor of neighbors) {
                    if (graph.getNodeAttribute(neighbor, NodeAttributes.VISITED_FROM) === this.#currentNode) {
                        // Neighbor is child
    
                        if (graph.getNodeAttribute(neighbor, NodeAttributes.LOWPOINT) >= currentDepth) {
                            // Current is articulation point
                            articualtion = true;

                            if (graph.getNodeAttribute(neighbor, NodeAttributes.LOWPOINT) > currentDepth) {
                                // Potential bridge

                                const connectingEdges = graph.edges(this.#currentNode, neighbor);
                                if (connectingEdges.length === 1) {
                                    // Connecting edge is a bridge
                                    graph.setEdgeAttribute(connectingEdges[0], EdgeAttributes.STATE, EdgeState.BRIDGE);
                                }
                            }

                            break;
                        }
                    }
                }
            }

            // Setting state based on articulation
            if (articualtion) {
                graph.setNodeAttribute(this.#currentNode, NodeAttributes.STATE, NodeState.ARTICULATION);
            } else {
                graph.setNodeAttribute(this.#currentNode, NodeAttributes.STATE, NodeState.NOT_ARTICULATION);
            }

            // Counting low point
            let lowpoint = currentDepth;
            
            for (const neighbor of neighbors) {

                const neighborDepth = graph.getNodeAttribute(neighbor, NodeAttributes.DEPTH);
                const neighborLowpoint = graph.getNodeAttribute(neighbor, NodeAttributes.LOWPOINT);
                
                if (neighbor !== currentVisitedFrom) {
                    // Neighbor is not parent

                    if (neighborDepth < lowpoint) {
                        lowpoint = neighborDepth;
                    }
                }

                if (neighbor !== currentVisitedFrom && neighborLowpoint !== null) {
                    // Neighbor is child

                    if (graph.getNodeAttribute(neighbor, NodeAttributes.LOWPOINT) < lowpoint) {
                        lowpoint = graph.getNodeAttribute(neighbor, NodeAttributes.LOWPOINT);
                    }
                }
            }

            graph.setNodeAttribute(this.#currentNode, NodeAttributes.LOWPOINT, lowpoint);

            // Popping current from stack
            this.#stack.pop();
            graph.setNodeAttribute(this.#currentNode, NodeAttributes.ORDER_OF_FINISH, this.#orderOfFinish++);
            graph.setNodeAttribute(this.#currentNode, NodeAttributes.TIME_OF_FINISH, this.#time++);
            this.#currentNode = null;

            // Switching state
            if (this.#stack.length !== 0) {
                this.#state = State.NODE_FROM_STACK;
                return;
            }

            // Finding not visited node
            const nodes = graph.nodes();
            for (let i = 0; i < nodes.length; i++) {
                if (graph.getNodeAttribute(nodes[i], NodeAttributes.STATE) === NodeState.NOT_VISITED) {
                    // Found

                    this.#newRoot = nodes[i];
                    this.#state = State.NEW_ROOT_TO_STACK;
                    return;
                }
            }

            // Not found
            this.#state = State.COUNT_COMPONENTS;

        }
    }

    // Sets new root attributes and pushes it to stack
    #stateNewRootToStack(graph) {

        // Pushing new root node to stack
        this.#stack.push(this.#newRoot);
        graph.setNodeAttribute(this.#newRoot, NodeAttributes.STATE, NodeState.NEW_IN_STACK);
        graph.setNodeAttribute(this.#newRoot, NodeAttributes.ORDER_OF_VISIT, this.#orderOfVisit++);
        graph.setNodeAttribute(this.#newRoot, NodeAttributes.TIME_OF_VISIT, this.#time++);
        graph.setNodeAttribute(this.#newRoot, NodeAttributes.DEPTH, 0);

        // Switching state
        this.#state = State.NODE_FROM_STACK;

    }

    // Last step of algorithm. Counts components based on found articulations and bridges.
    #stateCountComponents(graph) {

        // Setting initial value for each node
        graph.forEachNode((node) => {
            graph.setNodeAttribute(node, NodeAttributes.BICONNECTED_COMPONENTS, []);
        });

        // Returns if node was visited
        function isVisited(node) {
            const components = graph.getNodeAttribute(node, NodeAttributes.BICONNECTED_COMPONENTS);
            return components.length !== 0;
        }

        // Returns if edge is bridge
        function isBridge(edge) {
            const state = graph.getEdgeAttribute(edge, EdgeAttributes.STATE);
            return state === EdgeState.BRIDGE;
        }

        // Returns if given node is part of given component
        function isPartOfComponent(node, component) {
            const components = graph.getNodeAttribute(node, NodeAttributes.BICONNECTED_COMPONENTS);
            for (const comp of components) {
                if (comp === component) {
                    return true;
                }
            }

            return false;
        }

        // Adds given node to given component
        function pushComponent(node, component) {
            const components = graph.getNodeAttribute(node, NodeAttributes.BICONNECTED_COMPONENTS);
            components.push(component);
            graph.setNodeAttribute(node, NodeAttributes.BICONNECTED_COMPONENTS, components);
        }

        // Sorting nodes to components
        let componentCounter = 1;

        // Making bridge connected nodes as 2 node components
        const edges = graph.edges();
        for (const edge of edges) {
            if (isBridge(edge)) {
                pushComponent(graph.source(edge), componentCounter);
                pushComponent(graph.target(edge), componentCounter);
                componentCounter++;
            }
        }

        // Making larger components
        function dfsVisit(node) {
            pushComponent(node, componentCounter);

            const edges = graph.edges(node);
            for (const edge of edges) {
                if (!isBridge(edge)) {
                    // Opposite node potentialy in same component

                    const opposite = graph.opposite(node, edge);

                    if (!isPartOfComponent(opposite, componentCounter)) {
                        dfsVisit(opposite);
                    }
                }
            }
        }

        const nodes = graph.nodes();        

        for (const node of nodes) {
            if (!isVisited(node)) {
                // Node is not part of any component yet
                dfsVisit(node);
                componentCounter++;
            }
        }

        // Algorithm ends
        this.setFinished();

    }

    getAdditionalData() {

        let graph = this.getGraph();

        // Returns JSON object containing all attributes for given node
        function getAttributes(node) {
            const attributes = structuredClone(graph.getNodeAttributes(node));
            attributes["key"] = node;

            return attributes;
        }

        // Stack
        let stack = [];
        for (const node of this.#stack) {
            stack.push(getAttributes(node));
        }

        // Order of visit
        let orderOfVisit = [];
        graph.forEachNode((node, attributes) => {
            if (attributes[NodeAttributes.ORDER_OF_VISIT] !== null) {
                orderOfVisit.push(getAttributes(node));
            }
        });

        orderOfVisit.sort((a, b) => {
            return a[NodeAttributes.ORDER_OF_VISIT] - b[NodeAttributes.ORDER_OF_VISIT];
        });

        // Order of finish
        let orderOfFinish = [];
        graph.forEachNode((node, attributes) => {
            if (attributes[NodeAttributes.ORDER_OF_FINISH] !== null) {
                orderOfFinish.push(getAttributes(node));
            }
        });

        orderOfFinish.sort((a, b) => {
            return a[NodeAttributes.ORDER_OF_FINISH] - b[NodeAttributes.ORDER_OF_FINISH];
        });

        // Components
        let componentsNodes = [];

        graph.forEachNode((node, attributes) => {

            const nodecomponents = attributes[NodeAttributes.BICONNECTED_COMPONENTS];

            for (const index in nodecomponents) {
                const nodecomponent = nodecomponents[index];

                // Checking accessibility of array in components variable
                if (componentsNodes.length < nodecomponent) {
                    // Not accessible, need to make
                    const d = nodecomponent - componentsNodes.length;
                    for (let i = 0; i < d; i++) {
                        componentsNodes.push([]);
                    }
                }

                // Pushing node to component
                componentsNodes[nodecomponent - 1].push(node);
            }

        });

        let componentsEdges = [];

        graph.forEachEdge((edge) => {

            const componentsSource = graph.getNodeAttribute(graph.source(edge), NodeAttributes.BICONNECTED_COMPONENTS);
            const componentsTarget = graph.getNodeAttribute(graph.target(edge), NodeAttributes.BICONNECTED_COMPONENTS);

            if (componentsSource !== null && componentsTarget !== null) {

                const intersection = componentsSource.filter(component => componentsTarget.includes(component));

                for (const inComponent of intersection) {
                    
                    // Checking accessibility of array in components variable
                    if (componentsEdges.length < inComponent) {
                        // Not accessible, need to make
                        const d = inComponent - componentsEdges.length;
                        for (let i = 0; i < d; i++) {
                            componentsEdges.push([]);
                        }
                    }
    
                    componentsEdges[inComponent - 1].push(edge);
                }
            }
        });

        const components = {"nodes": componentsNodes, "edges": componentsEdges};

        return new AdditionalData({"stack": stack, "orderOfVisit": orderOfVisit, "orderOfFinish": orderOfFinish,
            "components": components});
    }
}