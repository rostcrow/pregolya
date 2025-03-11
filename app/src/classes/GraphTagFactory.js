import GraphTag from "./GraphTag";
import JsonToGraphDataAdapter from "./JsonToGraphDataAdapter";

export default class GraphTagFactory {

    static createFromJson(json) {
        const name = json["name"];
        const graphData = JsonToGraphDataAdapter.adapt(json);

        return new GraphTag(name, graphData);
    }

}