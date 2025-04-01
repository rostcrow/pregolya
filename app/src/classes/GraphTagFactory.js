import GraphTag from "./GraphTag";
import JSONToGraphDataAdapter from "./JSONToGraphDataAdapter";

export default class GraphTagFactory {

    static createFromJson(json) {
        const name = json["name"];
        const graphData = JSONToGraphDataAdapter.adapt(json);

        return new GraphTag(name, graphData);
    }

}