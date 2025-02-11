
import Form from 'react-bootstrap/Form';

export default class BFSAlgorithmOptionsForm {
    
    #options;
    #setOptionsFunc;
    #graph;

    constructor(options, setOptionsFunc, graph) {
        this.#options = options;
        this.#setOptionsFunc = setOptionsFunc;
        this.#graph = graph;
    }

    getDefaultOptions() {
        return [0];
    }

    #startingNodeChange(e) {

        this.#options[0] = Number(e.target.value);

        this.#setOptionsFunc([...this.#options]);
    }

    getComponents() {

        let optionsHtml = [];
        this.#graph.forEachNode((node) => {
            optionsHtml.push(<option key={node} value={node}>{node}</option>);
        });

        return (
            <>
                <Form.Label className='mt-3'>Starting node</Form.Label>
                <Form.Select value={this.#options[0]} onChange={e => this.#startingNodeChange(e)}>
                    {optionsHtml}
                </Form.Select>           
            </>
        );

    }
}
