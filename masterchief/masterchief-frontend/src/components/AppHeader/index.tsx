import React from "react";
import './Navbar.css';
import '../../App.css';
import {Container, Nav, Navbar} from "react-bootstrap";
import {UserIcon, InfoBox, MessageIcon, DashboardIcon, LogoutIcon, LoginIcon} from "../../assets/icons/icons";
import {getAuthorities, isConnected, signOut} from "../../services/authService";
import {useNavigate} from "react-router-dom";
import {Authority} from "../../model/auth";

const AppHeader = () => {
    const navigate = useNavigate();

    const signOutButton = () => {
        signOut();
        navigate("/home/");
    }

    const signInButton = () => {
        navigate("/authentication/");
    }

    const messagesButton = () => {
        if (isConnected() && getAuthorities()?.includes(Authority.ADMIN)){
            navigate("/admins/conversations/");
        }
        else if (isConnected() && getAuthorities()?.includes(Authority.CLIENT)) {
            navigate("/clients/conversations/");
        }
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
                            <Container fluid className="navbar-item" onClick={messagesButton}>
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