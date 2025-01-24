import Nav from 'react-bootstrap/Nav';
import { useState } from 'react';

export default function SidePanel ( {sideComponents} ) {

    const [componentIndex, setComponentIndex] = useState(0);

    let navItems = [];
    let tabComponents = [];

    for (const [index, sideComponent] of sideComponents.entries()) {
        navItems.push(<Nav.Item key={index}><Nav.Link eventKey={index} onClick={() => handleClick(index)}>{sideComponent.getName()}</Nav.Link></Nav.Item>);
        tabComponents.push(sideComponent.getComponent());
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