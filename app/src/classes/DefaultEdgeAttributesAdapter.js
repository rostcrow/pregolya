
import EdgeAttributesAdapter from "./EdgeAttributesAdapter";

export const DEFAULT_EDGE_COLOR = "#CCCCCC";
const DEFAULT_EDGE_SIZE = 6;

export default class DefaultEdgeAttributesAdapter extends EdgeAttributesAdapter {


    adapt(key, attributes) {
        return {"size": DEFAULT_EDGE_SIZE, "color": DEFAULT_EDGE_COLOR};
    }

}