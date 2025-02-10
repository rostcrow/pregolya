
import NodeAttributesAdapter from "./NodeAttributesAdapter";

export const DEFAULT_NODE_COLOR = "#0D6EFD";
const DEFAULT_NODE_SIZE = 10;


export default class DefaultNodeAttributesAdapter extends NodeAttributesAdapter {

    adapt(key, attributes) {
        return {"size": DEFAULT_NODE_SIZE, "color": DEFAULT_NODE_COLOR, "label": key};
    }

}