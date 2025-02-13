
const SCHEMA = {
    "type": "object",
    "properties": {
        "name": { "type": "string" },
        "directed": { "type": "boolean" },
        "weighted": { "type": "boolean" },
        "nodes": {
            "type": "array",
            "items": {
                "type": "string"
            }
        },
        "edges": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "source": { "type": "string" },
                    "target": { "type": "string" }
                },
                "required": ["source", "target"]
            },
        }
    },
    "required": ["directed", "weighted", "nodes", "edges"] 
};

const SCHEMA_WEIGHTED = {
    "type": "object",
    "properties": {
        "name": { "type": "string" },
        "directed": { "type": "boolean" },
        "weighted": { "type": "boolean" },
        "nodes": {
            "type": "array",
            "items": {
                "type": "string"
            }
        },
        "edges": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "source": { "type": "string" },
                    "target": { "type": "string" },
                    "weight": { "type": "number" }
                },
                "required": ["source", "target", "weight"]
            },
        }
    },
    "required": ["directed", "weighted", "nodes", "edges"] 
};

export default class JSONValidator {

    static validate(instance) {

        //Helpful funcs
        function getStackFromError(error) {
            return error["stack"];
        }


        let Validator = require("jsonschema").Validator;
        let v = new Validator();

        //Validating standard schema
        let result = v.validate(instance, SCHEMA);

        if (!result.valid) {
            //Not valid schema, returning errors
            return result.errors.map(getStackFromError);
        }

        if (instance["weighted"]) {
            //Validating schema for weighted graph

            result = v.validate(instance, SCHEMA_WEIGHTED);

            if (!result.valid) {
                //Not valid schema, returning errors
                return result.errors.map(getStackFromError);
            }
        }
        
        //Valid
        return [];
    }
}