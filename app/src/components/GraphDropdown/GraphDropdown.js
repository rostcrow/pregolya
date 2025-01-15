import Stack from 'react-bootstrap/Stack'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useContext } from 'react';
import { ChoosingGraphContext } from '../../App.js';

export default function GraphDropdown( ) {

    const {
        graphsJSON,
        changeCurrentGraph
    } = useContext(ChoosingGraphContext);

    let dropdownItems = [];
    for (const [index, graph] of graphsJSON.entries()) {
        let graphName = graph["attributes"]["name"];
        dropdownItems.push(<Dropdown.Item key={graphName} onClick={() => changeCurrentGraph(index)}>{graphName}</Dropdown.Item>);
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