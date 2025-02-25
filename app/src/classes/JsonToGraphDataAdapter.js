import GraphData from "./GraphData";

export default class JsonToGraphDataAdapter {

    static adapt(json) {

        //Nodes
        let nodes = {};

        for (const key in json["nodes"]) {
            nodes[key] = {"key": key};
        }

        //Edges
        let edges = {};

        for (const [index, edge] of json["edges"].entries()) {
            
            let edgeObject = {};

            edgeObject["key"] = String(index);
            edgeObject["source"] = edge["source"];
            edgeObject["target"] = edge["target"];

            if (json["weighted"]) {
                edgeObject["weight"] = edge["weight"];
            }

            edges[String(index)] = edgeObject;
        }

        return new GraphData(json["directed"], json["weighted"], nodes, edges);

    }


}