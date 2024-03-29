import "../../App.css";
import React from "react";
import Container from "react-bootstrap/Container";

const PageNotFound = () => {

    return (
        <>
            <Container fluid className="background-redirect">
                <div>
                    <h1 style={{ fontFamily: "RetroGaming, sans-serif", color:'#36393E', textShadow:'2px 2px 4px #000000' }}>
                        404 Not Found...
                    </h1>
                </div>
            </Container>
        </>
    );
};

export default PageNotFound;
