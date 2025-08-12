
// IMPORT
// React Bootstrap
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { BsGithub } from "react-icons/bs";

// CODE
// Static component for showing navigation bar wih app name
export default function Title() {
    return (
        <>
            <Navbar bg='primary' data-bs-theme='dark'>
                <Container>
                    <Navbar.Collapse color='primary' className='justify-content-start'>
                        <Navbar.Brand>
                            Pregolya
                        </Navbar.Brand>
                        <Navbar.Text>
                            Visualizer of graph algorithms
                        </Navbar.Text>
                    </Navbar.Collapse>
                    <Navbar.Collapse className='justify-content-end ms-1'>
                            <a href="https://github.com/rostcrow/pregolya">
                                <BsGithub size={32}/>
                            </a>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );

}