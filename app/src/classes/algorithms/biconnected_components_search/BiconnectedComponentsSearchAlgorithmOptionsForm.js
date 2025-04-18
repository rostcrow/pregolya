
// IMPORT
// My classes
import AlgorithmOptionsForm from "../../AlgorithmOptionsForm";
import Form from "react-bootstrap/Form";

// CODE
// This class represents options form for biconnected components search
export default class BiconnectedComponentsSearchAlgorithmOptionsForm extends AlgorithmOptionsForm {
    
    getDefaultOptions() {
        let firstNode = this.getGraph().nodes()[0]
        return [firstNode];
    }

    // Changes starting node option
    #startingNodeChange(e) {

        let options = this.getOptions();
        const setOptionsFunc = this.getSetOptionsFunc();

        options[0] = e.target.value;

        setOptionsFunc([...options]);
    }

    getComponents() {

        const options = this.getOptions();
        const graph = this.getGraph();

        // Making options
        let optionsHtml = [];
        graph.forEachNode((node) => {
            optionsHtml.push(<option key={node} value={node}>{node}</option>);
        });

        return (
            <div className="text-start">
                <Form.Label>Starting node</Form.Label>
                <Form.Select value={options[0]} onChange={e => this.#startingNodeChange(e)}>
                    {optionsHtml}
                </Form.Select>           
            </div>
        );

    }

}