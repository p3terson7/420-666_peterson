import React, {useEffect, useRef, useState} from 'react';
import { Client } from '../../model/user';
import { clientSignup } from "../../services/authService";
import * as validation from "../../services/formValidation";
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import {GenericForm} from "../GenericForm";
import {useNavigate} from "react-router-dom";

const ClientSignupForm = () => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [unexpectedError, setUnexpectedError] = useState<string>("");
    const [isRedirecting, setIsRedirecting] = useState(false);
    const [redirectCount, setRedirectCount] = useState(3);
    const navigate = useNavigate();
    const [client, setClient] = useState<Client>({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        address: address,
        phone: phone,
        type: 'client',
    });

    const formSteps = [
        [
            {
                label: 'Email',
                name: 'email',
                type: 'email',
                placeholder: 'Enter email',
                validationRule: validation.validateEmail,
                errorMessage: 'Please enter a valid email address.',
            },
            {
                label: 'Password',
                name: 'password',
                type: 'password',
                placeholder: 'Password',
                validationRule: validation.validatePassword,
                errorMessage: 'Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a digit, and a special character.',
            },
            {
                label: 'Confirm Password',
                name: 'passwordConfirmation',
                type: 'password',
                placeholder: 'Confirm Password',
                validationRule: (value: string, formData: Record<string, string> = {}) => validation.validatePasswordConfirmation(formData['password'] || '', value),
                errorMessage: 'Passwords do not match.',
            }
        ],
        [
            {
                label: 'First Name',
                name: 'firstName',
                type: 'text',
                placeholder: 'First Name',
                validationRule: validation.validateExisting,
                errorMessage: 'This field is required.',
            },
            {
                label: 'Last Name',
                name: 'lastName',
                type: 'text',
                placeholder: 'Last Name',
                validationRule: validation.validateExisting,
                errorMessage: 'This field is required.',
            },
            {
                label: 'Address',
                name: 'address',
                type: 'text',
                placeholder: 'Address',
                validationRule: validation.validateExisting,
                errorMessage: 'This field is required.',
            },
            {
                label: 'Phone',
                name: 'phone',
                type: 'text',
                placeholder: 'Phone',
                validationRule: validation.validatePhone,
                errorMessage: 'Please enter a valid phone number.',
            }
        ],
    ];

    const handleFormSubmit = async (formData: Record<string, string>) => {
        const { passwordConfirmation, ...rest } = formData;
        const clientData: Client = {
            address: rest.address,
            phone: rest.phone,
            email: rest.email,
            password: rest.password,
            firstName: rest.firstName,
            lastName: rest.lastName,
            type: 'client',
        };

        try {
            const response = await clientSignup(clientData);
            setIsRedirecting(true);
            setUnexpectedError("");
        } catch (error: any) {
            if (error.response && error.response.status === 409) {
                setUnexpectedError(error.response.data);
                throw new Error(error.response.data);
            } else {
                throw new Error('An unexpected error occurred.', error.response ? error.response.data : error.message);
            }
        }
    };

    useEffect(() => {
        if (redirectCount === 0) {
            navigate('/');
            setIsRedirecting(false);
        } else if (isRedirecting) {
            const countDownInterval = setInterval(() => {
                setRedirectCount(redirectCount - 1);
            }, 1000);
            return () => clearInterval(countDownInterval);
        }
    }, [redirectCount, isRedirecting]);


    return (
        <Container fluid className="background-gif">
                <h1 style={{ fontFamily: "RetroGaming, sans-serif", color:'#FFC0CB', textShadow:'2px 2px 4px #000000' }}>
                    Embark on the Quest!<br></br>Join us, and claim your destiny
                </h1>
            <GenericForm steps={formSteps} onSubmit={handleFormSubmit} unexpectedError={unexpectedError} />
            {isRedirecting && (
                <div className="form-background mt-4 fade-in">
                    <h4 className="text-success m-1" style={{ fontFamily: "RetroGaming, sans-serif" }}>Redirecting to home page in {redirectCount}..</h4>
                </div>
            )}
        </Container>
    );
};

export default ClientSignupForm;
