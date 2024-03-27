import "../../App.css";
import React from "react";
import Container from "react-bootstrap/Container";

const PageNotFound = () => {

    return (
        <>
            <Container fluid className="background-gif">
                <div>
                    <h1 style={{ fontFamily: "RetroGaming, sans-serif", color:'#FFC0CB', textShadow:'2px 2px 4px #000000' }}>
                        404 Page Not Found...
                    </h1>
                </div>
            </Container>
        </>
    );
};

export default PageNotFound;
