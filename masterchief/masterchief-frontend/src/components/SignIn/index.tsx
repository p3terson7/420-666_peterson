import React, {useState, useEffect, useCallback} from 'react';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import { GenericForm } from "../GenericForm";
import {useLocation, useNavigate} from "react-router-dom";
import {
    authenticate,
    getUserId,
    hasSessionExpiredRecently,
    isConnected,
    login,
    logout
} from "../../services/authService";
import * as validation from "../../services/formValidation";
import {SignInRequest} from "../../model/auth";
import {getUserById} from "../../services/userService";

const SignInForm = () => {
    const [unexpectedError, setUnexpectedError] = useState<string>("");
    const navigate = useNavigate();
    const [areCredentialsValid, setAreCredentialsValid] = useState<boolean>(true);
    const [isDisabled, setIsDisabled] = useState<boolean>(false);

    const navigateToUserTypeHomePage = (userType: string) => {
        switch (userType) {
            case "client":
                navigate("/clients");
                break;
            case "admin":
                navigate("/admins");
                break;
            default:
                navigate("/pageNotFound");
                break;
        }
    };

    const formFields = [
        [
            {
                label: 'Email',
                name: 'email',
                type: 'email',
                placeholder: 'Enter your email',
                validationRule: validation.validateEmail,
                errorMessage: 'Please enter a valid email address.',
            },
            {
                label: 'Password',
                name: 'password',
                type: 'password',
                placeholder: 'Enter your password',
                validationRule: validation.validateExisting,
                errorMessage: 'This field is required.',
            }
        ]
    ];

    const handleFormSubmit = async (formData: Record<string, string>) => {
        const { ...rest } = formData;
        const signInRequest: SignInRequest = {
            email: rest.email,
            password: rest.password,
        };

        setIsDisabled(true);

        login(signInRequest)
            .then((response) => {
                authenticate(response.data);

                const id = getUserId();

                if (id == null) {
                    logout();
                    navigate("/pageNotFound");
                    return;
                }

                getUserById(parseInt(id))
                    .then((res) => {
                        navigateToUserTypeHomePage(res.data.type!);
                    })
                    .catch((err) => {
                        console.error("Error fetching user by ID:", err.message);
                        console.error("Full error details:", err);
                        logout();
                        navigate("/pageNotFound");
                    });
            })
            .catch((error) => {
                console.log(error);
                if (error.response.status === 401 || error.response.status === 403) setAreCredentialsValid(false);

                setIsDisabled(false);
            });
    };

    return (
        <Container fluid className="background-gif">
            <div className="header-container">
                <h1 style={{ fontFamily: "RetroGaming, sans-serif", color:'#FFC0CB', textShadow:'2px 2px 4px #000000' }}>
                    Look Who's Back!<br/>We saved your spot
                </h1>
            </div>
            <GenericForm steps={formFields} onSubmit={handleFormSubmit} unexpectedError={unexpectedError} />
        </Container>
    );
};

export default SignInForm;
