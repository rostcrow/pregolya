import AlgorithmOptionsForm from "../../AlgorithmOptionsForm";
import Form from "react-bootstrap/Form";

export default class TarjanAlgorithmOptionsForm extends AlgorithmOptionsForm {

    getDefaultOptions() {
        return ["0"];
    }

    #startingNodeChange(e) {

        let options = this.getOptions();
        const setOptionsFunc = this.getSetOptionsFunc();

        options[0] = e.target.value;

        setOptionsFunc([...options]);
    }

    getComponents() {

        const options = this.getOptions();
        const graph = this.getGraph();

        let optionsHtml = [];
        graph.forEachNode((node) => {
            optionsHtml.push(<option key={node} value={node}>{node}</option>);
        });

        return (
            <Form className="text-start">
                <Form.Label>Starting node</Form.Label>
                <Form.Select value={options[0]} onChange={e => this.#startingNodeChange(e)}>
                    {optionsHtml}
                </Form.Select>           
            </Form>
        );

    }

}