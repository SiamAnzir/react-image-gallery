import React from "react";
import {Container, Nav, Navbar, NavItem} from "react-bootstrap";
import image from "../assets/image.png";

const Header = () => {
    return(
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container className="justify-content-center">
                <Nav className="navbar-brand">
                    <Nav.Link className="text-white d-flex align-items-center">
                        <img src={image} alt="asf" style={{height:"40px" , width:"40px" , paddingRight:"0.5rem"}}/>
                        <span>Image Gallery</span>
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}
export default Header;