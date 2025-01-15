import NodeVisualAdapter from "./NodeVisualAdapter";

export default class BFSNodeVisualAdapter extends NodeVisualAdapter {

    toNodeVisual (attributes) {
        let ret = {};

        switch(attributes["state"]) {
            case 0:
                ret["color"] = "#0000ff";
                break;
            case 1:
                ret["color"] = "#00ff00";
                break;
            case 2:
                ret["color"] = "#ff0000";
                break;
            default:
        }

        return ret;
    }

}