
// IMPORT
// React Bootstrap
import Form from 'react-bootstrap/Form';

// My classes
import AlgorithmOptionsForm from "../../AlgorithmOptionsForm";

// CODE
// This class represents option form for breadth-first search
export default class BFSAlgorithmOptionsForm extends AlgorithmOptionsForm {
    
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
