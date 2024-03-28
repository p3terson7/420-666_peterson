import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import LoginForm from '../SignIn/index';
import ClientSignupForm from '../ClientSignup/index';
import '../../App.css';
const AuthForm = () => {
    const [isLoginView, setIsLoginView] = useState(true); // True for login view, false for signup view

    return (
        <Container fluid className="background-gif">
            {isLoginView ? <LoginForm /> : <ClientSignupForm />}
            <Button variant="link" onClick={() => setIsLoginView(!isLoginView)}>
                <p>{isLoginView ? "Don't have an account? Sign up" : "Already have an account? Sign in"}</p>
            </Button>
        </Container>
    );
};

export default AuthForm;
