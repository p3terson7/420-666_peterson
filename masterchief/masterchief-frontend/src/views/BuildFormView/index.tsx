import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import '../../App.css';
import {AdvancedForm} from "../../components/NewPcBuild/AdvancedForm";
import BeginnerForm from "../../components/NewPcBuild/BeginnerForm";

const BuildFormView = () => {
    const [isBeginnerView, setIsBeginnerView] = useState(true);

    return (
        <Container fluid className="background-home ">
            {isBeginnerView ? <BeginnerForm /> : <AdvancedForm />}
            <Button variant="link" onClick={() => setIsBeginnerView(!isBeginnerView)} className="toggle-form-view">
                {isBeginnerView ? "You already know your components? Choose This Option" : "Beginner? Choose This Option"}
            </Button>
        </Container>
    );
};

export default BuildFormView;