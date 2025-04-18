
// This static class represents global variables in our program
export default class Globals {

    static Sizes = {
        DEFAULT_NODE_SIZE: 10,
        DEFAULT_EDGE_SIZE: 6
    }

    static Colors = {
        DEFAULT_NODE_COLOR: "#0D6EFD",
        DEFAULT_EDGE_COLOR: "#CCCCCC",
        GRAY: "#888888",
        DARK_GRAY: "#666666",
        BLACK: "#000000",
        RED: "#DC3545",
        GREEN: "#14A44D",
        LIGHT_ORANGE: "#FFE599",
        LIGHT_PURPLE: "#CCCCFF",
        LIGHT_CYAN: "#CCFFFF",
        TEAL: "#17A2B8",
        PINK: "#F37199"
    }

    static GraphTypes = {
        NORMAL: "normal",
        DIRECTED: "directed",
        WEIGHTED: "weighted",
        DIRECTED_WEIGHTED: "directed and weighted"
    }
}