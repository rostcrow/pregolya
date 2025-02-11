
import Form from 'react-bootstrap/Form';

export default function AlgorithmSelect ({tags, selected, changeFunc}) {

    let options = [];
    for (const [index, tag] of tags.entries()) {
        options.push(<option key={index} value={index}>{tag.getName()}</option>)
    }

    function handleChange(e) {
        changeFunc(Number(e.target.value));
    } 

    return (
        <>
            <Form.Label>Choose algorithm</Form.Label>
            <Form.Select value={selected} onChange={e => handleChange(e)}>
                <option key="-1" value="-1">...</option>
                {options}
            </Form.Select>
        </>
    );
}