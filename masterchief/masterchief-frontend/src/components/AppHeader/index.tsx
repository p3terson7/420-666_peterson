import React from "react";
import './Navbar.css';
import '../../App.css';
import {Container, Nav, Navbar} from "react-bootstrap";
import {UserIcon, InfoBox, MessageIcon, DashboardIcon, LogoutIcon, LoginIcon} from "../../assets/icons/icons";
import {isConnected, signOut} from "../../services/authService";
import {useNavigate} from "react-router-dom";

const AppHeader = () => {
    const navigate = useNavigate();

    const signOutButton = () => {
        signOut();
        navigate("/home/");
    }

    const signInButton = () => {
        navigate("/authentication/");
    }

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
                    {isConnected() && (
                        <>
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
                            <Container fluid className="navbar-item" onClick={signOutButton}>
                                <LogoutIcon />
                                <span className="icon-description">Sign out</span>
                            </Container>
                        </>
                    )}
                    {!isConnected() && (
                        <Container fluid className="navbar-item" onClick={signInButton}>
                            <LoginIcon />
                            <span className="icon-description">Sign In / Sign Up</span>
                        </Container>
                    )}
                </Nav>
            </div>
        </Navbar>
    );
}

export default AppHeader;