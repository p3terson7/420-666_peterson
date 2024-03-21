import React from "react";
import './Navbar.css';
import '../../App.css';
import {Container, Nav, Navbar} from "react-bootstrap";
import {UserIcon, InfoBox, MessageIcon, DashboardIcon} from "../../assets/icons/icons";


const AppHeader = () => {
    return (
        <Navbar className="navbar">
            <div className="navbar-left">
                <Container fluid className="navbar-item p-0">
                    <DashboardIcon />
                </Container>
                <Navbar.Brand className="navbar-brand">PROTOTYPE</Navbar.Brand>
            </div>
            <div className="navbar-right">
                <Nav className="navbar-menu">
                    <Container fluid className="navbar-item">
                        <UserIcon />
                        <span className="icon-description">Profile</span>
                    </Container>
                    <Container fluid className="navbar-item">
                        <MessageIcon />
                        <span className="icon-description">Messages</span>
                    </Container>
                    <Container fluid className="navbar-item">
                        <InfoBox />
                        <span className="icon-description">Info</span>
                    </Container>
                </Nav>
            </div>
        </Navbar>
    );
}

export default AppHeader;