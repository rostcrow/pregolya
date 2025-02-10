
import EdgeAttributesAdapter from "./EdgeAttributesAdapter";
import Globals from "./Globals";

export default class DefaultEdgeAttributesAdapter extends EdgeAttributesAdapter {

    adapt(key, attributes) {
        return {"size": Globals.Sizes.DEFAULT_EDGE_SIZE, "color": Globals.Colors.DEFAULT_EDGE_COLOR};
    }

}