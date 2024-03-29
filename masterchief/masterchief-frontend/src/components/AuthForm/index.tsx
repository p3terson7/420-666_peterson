import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import LoginForm from '../SignIn/index';
import ClientSignupForm from '../ClientSignup/index';
import '../../App.css';
const AuthForm = () => {
    const [isLoginView, setIsLoginView] = useState(true);

    return (
        <Container fluid className="background-gif font-open-sans">
            {isLoginView ? <LoginForm /> : <ClientSignupForm />}
            <Button variant="link" onClick={() => setIsLoginView(!isLoginView)} className="toggle-form-view">
                {isLoginView ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </Button>
        </Container>
    );
};

export default AuthForm;
