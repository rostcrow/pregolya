import Stack from 'react-bootstrap/Stack'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function GraphDropdown( {graphsJSON, itemFunc} ) {

    let dropdownItems = [];
    for (const [index, graph] of graphsJSON.entries()) {
        let graphName = graph["attributes"]["name"];
        dropdownItems.push(<Dropdown.Item key={graphName} onClick={() => itemFunc(index)}>{graphName}</Dropdown.Item>);
    }

    return (
        <>
            <Stack direction='horizontal' className="m-3">
                <DropdownButton title="Choose graph">
                    {dropdownItems}        
                </DropdownButton>            
            </Stack>
        </>
    );
}