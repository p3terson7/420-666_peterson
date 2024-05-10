import React from "react";
import "../../App.css";
import "./Home.css";
import HomePageComparisonTable from "./ComparisonTable";
import {Button, Col, Container, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

export const HomePage = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate("/build");
    }

    return (
        <div className="papa-div">
            <Container fluid className="home-page-background">
                <div className="text-start p-4">
                    <h1 className="title" style={{fontWeight: "900", letterSpacing: "2px", fontSize: "64px"}}>
                        From
                        <span style={{
                            fontFamily: "RetroGaming, sans-serif",
                            fontWeight: "900",
                            letterSpacing: "0.5px"
                        }}> pixels </span>
                        <br></br>
                        <span style={{fontWeight: "250"}}> to </span>
                        performance
                    </h1>
                    <h1 className="sublabel">
                        Crafting Computers for Everyone!
                    </h1>
                </div>
            </Container>

            <Container className="py-5">
                <Row>
                    <Col>
                        <h2 className="opening-insights">Opening Insights</h2>
                        <p className="text-muted opening-insights-subtext">
                            Step into our world of bespoke computing! We're not just about building computers; we're about crafting experiences. With personalized service at the forefront, we guarantee that every interaction is human-centered, not machine-driven. Join us in creating something extraordinary, where service is more than just a word—it's a commitment to genuine connection.
                        </p>
                    </Col>
                </Row>
            </Container>

            <Container className="py-5 bg-light" style={{borderRadius: '5px'}}>
                <HomePageComparisonTable/>
            </Container>

            <Container className="py-5">
                <Row>
                    <Col>
                        <h2 className="get-started-text">Get Started Today!</h2>
                        <p className="get-started-text">
                            Ready to build your custom computer? Click the button below to get started!
                        </p>
                        <div className="btn-container">
                            <Button variant="primary" onClick={handleGetStarted}>
                                Get Started
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>

            <footer className="py-2 text-center text-white footer">
                <Container>
                    <p>&copy; 2024 Prototype. All rights reserved.</p>
                </Container>
            </footer>
        </div>
    );
}
