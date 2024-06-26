import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import LoginForm from '../SignIn/index';
import ClientSignupForm from '../ClientSignup/index';
import '../../App.css';
import {getUserById} from "../../services/userService";
import {getUserId, signOut} from "../../services/authService";
import {useNavigate} from "react-router-dom";
const AuthForm = () => {
    const [isLoginView, setIsLoginView] = useState(true);
    const navigate = useNavigate();

    const handleSignupSuccess = async () => {
        const id = getUserId();
        await getUserById(parseInt(id!))
            .then(() => {
                navigate("/clients");
            })
            .catch(() => {
                signOut();
                navigate("/pageNotFound");
            });
    }
    return (
        <Container fluid className="background-gif font-open-sans">
            {isLoginView ? <LoginForm /> : <ClientSignupForm onSubmitSuccess={handleSignupSuccess}/>}
            <Button variant="link" onClick={() => setIsLoginView(!isLoginView)} className="toggle-form-view">
                {isLoginView ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </Button>
        </Container>
    );
};

export default AuthForm;
