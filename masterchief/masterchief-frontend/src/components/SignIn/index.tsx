import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import { GenericForm } from "../GenericForm";
import {useNavigate} from "react-router-dom";
import {
    authenticate,
    getUserId,
    login,
    signOut
} from "../../services/authService";
import * as validation from "../../services/formValidation";
import {SignInRequest} from "../../model/auth";
import {getUserById} from "../../services/userService";
import {enqueueSnackbar} from "notistack";

const SignInForm = () => {
    const [unexpectedError, setUnexpectedError] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const navigate = useNavigate();
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

        await login(signInRequest)
            .then((response) => {
                authenticate(response.data);
                setSuccessMessage(`Successfully logged in!`);
                const id = getUserId();

                if (id == null) {
                    signOut();
                    navigate("/pageNotFound");
                    return;
                }

                getUserById(parseInt(id))
                    .then((res) => {
                        navigateToUserTypeHomePage(res.data.type!);
                    })
                    .catch((err) => {
                        signOut();
                        navigate("/pageNotFound");
                    });
            })
            .catch((error) => {
                if (error.response.status === 401 || error.response.status === 403) {
                    setUnexpectedError("Invalid email or password.");
                    throw new Error(error.response.data);
                }
            });
        setUnexpectedError("");
    };

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

    return (
        <Container fluid className="background-gif">
            <div className="header-container">
                <h1 style={{ fontFamily: "RetroGaming, sans-serif", color:'#FFC0CB', textShadow:'2px 2px 4px #000000' }}>
                    Look Who's Back!<br/>We saved your spot
                </h1>
            </div>
            <GenericForm steps={formFields} onSubmit={handleFormSubmit} unexpectedError={unexpectedError} successMessage={successMessage} />
        </Container>
    );
};

export default SignInForm;
