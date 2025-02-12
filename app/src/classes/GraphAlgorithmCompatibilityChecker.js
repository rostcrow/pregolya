import CompatibilityMessage from "./CompatibilityMessage";

export default class GraphAlgorithmCompatibilityChecker {

    static check(graphTag, algortihmTag) {

        const graphType = graphTag.getType();
        const compatibleGraphTypes = algortihmTag.getCompatibleGraphTypes();

        //Checking compatibility
        for (const compatibleGraphType of compatibleGraphTypes) {
            if (graphType === compatibleGraphType) {
                return new CompatibilityMessage(true, "Compatible");
            }
        }

        //Generating message
        const algorithmName = algortihmTag.getName();

        const typeStrings = ["normal", "directed", "weighted", "directed and weighted"];

        const graphTypeString = typeStrings[graphType];

        let compatibleTypes = "";
        for (const [index, compatibleGraphType] of compatibleGraphTypes.entries()) {
            if (index > 0) {
                compatibleTypes += ", ";
            }

            compatibleTypes += typeStrings[compatibleGraphType];
        }

        const message = 
            `${algorithmName} doesn't support graph type: ${graphTypeString}. Algorithm supports these graph types: ${compatibleTypes}.`;

        return new CompatibilityMessage(false, message);
    }


}