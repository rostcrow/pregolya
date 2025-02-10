
import NodeAttributesAdapter from "./NodeAttributesAdapter";
import Globals from "./Globals";

export default class DefaultNodeAttributesAdapter extends NodeAttributesAdapter {

    adapt(key, attributes) {
        return {"size": Globals.Sizes.DEFAULT_NODE_SIZE, "color": Globals.Colors.DEFAULT_NODE_COLOR, "label": key};
    }

}