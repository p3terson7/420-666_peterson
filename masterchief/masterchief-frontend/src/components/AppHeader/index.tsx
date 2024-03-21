import React from "react";
import './Navbar.css';
import '../../App.css';
import {Container, Nav, Navbar} from "react-bootstrap";
import {UserIcon, InfoBox, MessageIcon, DashboardIcon} from "../../assets/icons/icons";


const AppHeader = () => {
    return (
        <Navbar className="navbar">
            <div className="navbar-left">
                <Container fluid className="navbar-item p-0" style={{background: 'none'}}>
                    <DashboardIcon />
                </Container>
                <Navbar.Brand className="navbar-brand" style={{ fontFamily: "RetroGaming", color: '#373c41'}}>PROTOTYPE</Navbar.Brand>
            </div>
            <div className="navbar-right">
                <Nav className="navbar-menu">
                    <Container fluid className="navbar-item" style={{background: 'none'}}>
                        <UserIcon />
                        <span className="icon-description">Profile</span>
                    </Container>
                    <Container fluid className="navbar-item" style={{background: 'none'}}>
                        <MessageIcon />
                        <span className="icon-description">Messages</span>
                    </Container>
                    <Container fluid className="navbar-item" style={{background: 'none'}}>
                        <InfoBox />
                        <span className="icon-description">Info</span>
                    </Container>
                </Nav>
            </div>
        </Navbar>
    );
}

export default AppHeader;