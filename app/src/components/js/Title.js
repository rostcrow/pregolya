
// IMPORT
// React Bootstrap
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

// CODE
// Static component for showing navigation bar wih app name
export default function Title() {
    return (
        <>
            <Navbar bg='primary' data-bs-theme='dark'>
                <Container>
                    <Navbar.Collapse color='primary'>
                        <Navbar.Brand>
                            Pregolya
                        </Navbar.Brand>
                        <Navbar.Text>
                            Visualizer of graph algorithms
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );

}