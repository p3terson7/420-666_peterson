import React from "react";
import './Navbar.css';
import '../../App.css';
import {Button, Container, Nav, Navbar} from "react-bootstrap";

const AppHeader = () => {
    return (
        <Navbar className="navbar">
            <Navbar.Brand className="navbar-brand">Prototype</Navbar.Brand>
            <Nav className="navbar-menu">
                <Button>
                    ay
                    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M3 3h2v18H3V3zm16 0H5v2h14v14H5v2h16V3h-2zm-8 6h2V7h-2v2zm2 8h-2v-6h2v6z" fill="currentColor"/>
                    </svg>
                </Button>
                <a className="navbar-item" href="/services">Services</a>
                <a className="navbar-item" href="/contact">Contact</a>
            </Nav>
        </Navbar>
    );
}

export default AppHeader;