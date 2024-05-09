import {Button, Col, Container, Row} from "react-bootstrap";
import "../../App.css";
import React from "react";
import "./Home.css";

export const HomePage = () => {
    return (
        <div className="papa-div">
            <Container fluid className="home-page-background">
                <div className="text-start p-4" style={{ fontWeight: '800' }}>
                    <h1 style={{ fontSize: '42px', fontWeight: 600, color:'#D8D8D8' }}>
                        From
                        <span style={{ fontFamily: "RetroGaming, sans-serif" }}> Pixels </span>
                        To Performance
                    </h1>
                    <h1 style={{ fontSize: '28px', fontWeight: 250, color:'#BEBEBE' }}>
                        Crafting Computers for Everyone!
                    </h1>
                </div>
            </Container>

            {/* Introduction Section */}
            <Container className="py-5">
                <Row>
                    <Col>
                        <h2>Introduction</h2>
                        <p>Provide a brief overview of your service. Explain what makes it unique and why visitors should be interested.</p>
                    </Col>
                </Row>
            </Container>

            {/* Key Features Section */}
            <Container className="py-5 bg-light">
                <Row>
                    <Col>
                        <h2>Key Features</h2>
                        <ul>
                            <li>Feature 1</li>
                            <li>Feature 2</li>
                            <li>Feature 3</li>
                            {/* Add more features as needed */}
                        </ul>
                    </Col>
                </Row>
            </Container>

            {/* Call-to-Action Section */}
            <Container className="py-5">
                <Row>
                    <Col>
                        <h2>Get Started Today!</h2>
                        <p>Ready to build your custom computer? Click the button below to get started!</p>
                        <Button variant="primary">Get Started</Button>
                    </Col>
                </Row>
            </Container>

            {/* Footer Section */}
            <footer className="py-4 text-center bg-dark text-white">
                <Container>
                    <p>&copy; 2024 Prototype. All rights reserved.</p>
                </Container>
            </footer>
        </div>
    );
}
