
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
                    <Navbar.Brand color='primary'>Pregolya - Visualizer of graph algorithms</Navbar.Brand>
                </Container>
            </Navbar>
        </>
    );

}