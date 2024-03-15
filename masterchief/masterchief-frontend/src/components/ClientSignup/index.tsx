import React, {useEffect, useRef, useState} from 'react';
import { Client } from '../../model/user';
import { clientSignup } from "../../services/signupService";
import * as validation from "../../services/formValidation";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import {GenericForm} from "../GenericForm";

const ClientSignupForm = () => {
    const [step, setStep] = useState(1);
    const [containerHeight, setContainerHeight] = useState('auto');
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
    const [unexpectedError, setUnexpectedError] = useState<string>("");
    const [errors, setErrors] = useState<validation.Errors>({});
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
            // {
            //     label: 'Confirm Password',
            //     name: 'passwordConfirmation',
            //     type: 'password',
            //     placeholder: 'Confirm Password',
            //     // Assuming validatePasswordConfirmation is adapted to use formData for comparison
            //     validationRule: (value, formData) => formData ? validation.validatePasswordConfirmation(formData['password'], value) : false,
            //     errorMessage: 'Passwords do not match.',
            // }
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

    // const handleSubmit = async (e: any) => {
    //     e.preventDefault();
    //     if (validateStepTwo()) {
    //         try {
    //             const response = await clientSignup(client);
    //             setStep(3);
    //             console.log('Signup Success:', response.data);
    //         } catch (error) {
    //             console.error('Signup Error:', e.response ? e.response.data : e.message);
    //         }
    //     }
    // };

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
            console.log('Signup Success:', response.data);
            // Handle successful signup
        } catch (error:any) {
            console.error('Signup Error:', error.response ? error.response.data : error.message);
            // Handle signup error
        }
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        if (name === "password-confirm") {
            setPasswordConfirmation(value);
        }
        setClient(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <Container fluid className="background-gif">
            <Row className="m-auto">
                <Col>
                    <h1 style={{ fontFamily: "RetroGaming, sans-serif"}} className="mb-4">Welcome!</h1>
                    <GenericForm steps={formSteps} onSubmit={handleFormSubmit} />
                </Col>
            </Row>
        </Container>
    );
};

export default ClientSignupForm;
