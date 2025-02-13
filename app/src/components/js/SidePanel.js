import Nav from 'react-bootstrap/Nav';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

export default function SidePanel ( {sideComponents, graphPreview} ) {

    //Setting states
    const [componentIndex, setComponentIndex] = useState(0);

    //Setting items and components
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

    //Handling click
    function handleClick(index) {
        setComponentIndex(index);
    }

    //Setting style based on graph preview boolean
    let style = {};
    if (graphPreview) {
        style = {visibility: "hidden"};
    }

    return (
        <Card className="m-0 p-0 bg-light" style={style}>
            <Card.Body>
                <Nav className="mt-1" variant="pills" defaultActiveKey="0">
                    {navItems}
                </Nav>
                <Container className="pt-2">
                    {tabComponents}
                </Container>
            </Card.Body>

        </Card>
    );

}