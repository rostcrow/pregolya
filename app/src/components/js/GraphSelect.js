
import Form from 'react-bootstrap/Form';

export default function GraphSelect( {graphsJSON, selected, changeFunc} ) {

    let options = [];
    for (const [index, graph] of graphsJSON.entries()) {
        const graphName = graph["attributes"]["name"];
        options.push(<option key={index} value={index}>{graphName}</option>);
    }

    function handleChange(e) {
        changeFunc(Number(e.target.value));
    }

    return (
        <>
            <Form.Label>Choose graph</Form.Label>
            <Form.Select value={selected} onChange={e => handleChange(e)}>
                <option key="-1" value="-1">...</option>
                {options}
            </Form.Select>
        </>

    );
}