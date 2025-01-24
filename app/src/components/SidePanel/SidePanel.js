import Nav from 'react-bootstrap/Nav';
import { useState } from 'react';

export default function SidePanel ( {components} ) {

    const [componentIndex, setComponentIndex] = useState(0);

    let navItems = [];
    for (const [index, [key, ]] of Object.entries(Object.entries(components))) {
        navItems.push(<Nav.Item><Nav.Link onClick={() => handleClick(index)}>{key}</Nav.Link></Nav.Item>);
    }

    let tabComponents = [];
    for (const key in components) {
        tabComponents.push(components[key]);
    }

    function handleClick(index) {
        setComponentIndex(index);
    }

    return (
        <>
            <Nav className="mt-2" variant="tabs" defaultActiveKey="0">
                {navItems}
            </Nav>
            {tabComponents[componentIndex]}
        </>


        
    );

}