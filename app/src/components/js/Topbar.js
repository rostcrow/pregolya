import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

export default function Topbar() {
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