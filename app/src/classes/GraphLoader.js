import Graph from 'graphology';

export default class GraphLoader {
    load(jsonObject) {
        let directed = jsonObject['attributes']['directed'];
        let directedString = "un".repeat(!directed) + "directed";

        let graph = new Graph({multi: true, type: directedString});
        graph.import(jsonObject);
        return graph;
    }
}