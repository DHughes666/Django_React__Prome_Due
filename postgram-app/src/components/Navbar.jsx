import { 
    Navbar, 
    Container, 
    Image, 
    NavDropdown, 
    Nav } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import { randomAvatar } from "../utils";

const NavigationBar = () => {
    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand className="fw-bold" href="#home">
                    Postgram
                </Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <NavDropdown>
                            <NavDropdown.Item>
                                Profile
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}