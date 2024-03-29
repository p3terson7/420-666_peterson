import {Container} from "react-bootstrap";
import "../../App.css";
import React from "react";

export const HomePage = () => {
    return (
        <Container fluid className="background-home">
            <h1 style={{ fontFamily: "RetroGaming, sans-serif", color:'#5c6bc0', textShadow:'1px 1px 2px #000000' }}>
                Home Page
            </h1>
        </Container>
    );
}