
import Form from 'react-bootstrap/Form';
import AlgorithmOptionsForm from './AlgorithmOptionsForm';

export default class BFSAlgorithmOptionsForm extends AlgorithmOptionsForm {
    
    #startingNodeChange(e) {
        const func = this.getSetOptionsFunc();
        func([e.target.value]);
    }

    getComponents() {

        const graph = this.getGraph();
        const options = this.getOptions();

        let optionsHtml = [];
        graph.forEachNode((node) => {
            optionsHtml.push(<option key={node} value={node}>{node}</option>);
        });

        return (
            <>
                <Form.Label className='mt-3'>Starting node</Form.Label>
                <Form.Select value={options[0]} onChange={e => this.#startingNodeChange(e)}>
                    {optionsHtml}
                </Form.Select>           
            </>
        );

    }
}
