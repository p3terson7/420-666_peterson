import React, {useState} from 'react';
import { Client } from '../../model/user';
import {authenticate, clientSignup, getUserId, login, signOut} from "../../services/authService";
import * as validation from "../../services/formValidation";
import 'bootstrap/dist/css/bootstrap.min.css';
import {GenericForm} from "../GenericForm";
import {useNavigate} from "react-router-dom";
import {SignInRequest} from "../../model/auth";
import {getUserById} from "../../services/userService";

interface Props {
    onSubmitSuccess: () => void;
}
const ClientSignupForm = ({onSubmitSuccess}: Props) => {
    const [unexpectedError, setUnexpectedError] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const navigate = useNavigate();

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

        await clientSignup(clientData)
            .then(() => {
                setUnexpectedError("");
            })
            .catch((error) => {
                if (error.response && error.response.status === 409) {
                    setUnexpectedError(error.response.data);
                    throw new Error(error.response.data);
                } else {
                    throw new Error('An unexpected error occurred.', error.response ? error.response.data : error.message);
                }
            });

        await automaticRedirect(rest.email, rest.password)
    };

    const automaticRedirect = async (email: string, password: string) => {
        const signInRequest: SignInRequest = {
            email: email,
            password: password,
        };

        await login(signInRequest)
            .then(async (response) => {
                authenticate(response.data);
                setSuccessMessage("Successfully signed up!")

                const id = getUserId();

                await getUserById(parseInt(id!))
                    .then(() => {
                        onSubmitSuccess();
                    })
                    .catch(() => {
                        signOut();
                        navigate("/pageNotFound");
                    });

            })
            .catch((error) => {
                setUnexpectedError("Unexpected Redirection Error.");
                throw new Error(error.response.data);
            });
    }

    return (
        <div className="row justify-content-center">
            <h1 style={{ fontFamily: "RetroGaming, sans-serif", color:'#FFC0CB', textShadow:'2px 2px 4px #000000' }}>
                Embark on the Quest!<br></br>Join us, and claim your destiny
            </h1>
            <GenericForm steps={formSteps} onSubmit={handleFormSubmit} unexpectedError={unexpectedError} successMessage={successMessage} width='25rem'/>
        </div>
    );
};

export default ClientSignupForm;
