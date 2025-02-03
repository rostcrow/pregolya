import Nav from 'react-bootstrap/Nav';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';

export default function SidePanel ( {sideComponents} ) {

    const [componentIndex, setComponentIndex] = useState(0);

    let navItems = [];
    let tabComponents = [];

    for (const [index, sideComponent] of sideComponents.entries()) {
        navItems.push(<Nav.Item key={index}><Nav.Link key={index} eventKey={index} onClick={() => handleClick(index)}>{sideComponent.getName()}</Nav.Link></Nav.Item>);

        //Counting if sideComponent is hidden or not
        if (index === componentIndex) {
            //Visible
            tabComponents.push(
                <div key={index}>
                    {sideComponent.getComponent()}
                </div>
            );
        } else {
            //Hidden
            tabComponents.push(
                <div key={index} style={{height: 0, marginBottom: 0, padding: 0, visibility: "hidden"}}>
                    {sideComponent.getComponent()}
                </div>
            );
        }
    }

    function handleClick(index) {
        setComponentIndex(index);
    }

    return (
        <>
            <Nav className="mt-2" variant="tabs" defaultActiveKey="0">
                {navItems}
            </Nav>
            <Container className="pt-2">
                {tabComponents}
            </Container>
        </>
    );

}