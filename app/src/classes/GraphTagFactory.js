
// IMPORT
// My classes
import GraphTag from "./GraphTag";
import JSONToGraphDataAdapter from "./JSONToGraphDataAdapter";

// CODE
// This static class represents factory for making graph tags
export default class GraphTagFactory {

    // Creates and returns graph tag from given JSON
    static createFromJson(json) {
        const name = json["name"];
        const graphData = JSONToGraphDataAdapter.adapt(json);

        return new GraphTag(name, graphData);
    }

}