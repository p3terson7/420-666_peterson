import React, {useEffect, useRef, useState} from 'react';
import { Client } from '../../model/user';
import { clientSignup } from "../../services/signupService";
import * as validation from "../../services/formValidation";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';

const ClientSignupForm = () => {
    const [step, setStep] = useState(1);
    const [containerHeight, setContainerHeight] = useState('auto');
    const stepOneContentRef = useRef<HTMLDivElement>(null);
    const stepTwoContentRef = useRef<HTMLDivElement>(null);
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

    const validateStepOne = () => {
        const newErrors: typeof errors = {};
        if (!validation.validateEmail(client.email)) {
            newErrors.email = "Please enter a valid email address.";
        }
        if (!validation.validatePassword(client.password)) {
            newErrors.password = "Password must be at least 8 characters long and include uppercase, lowercase, digit, and special character.";
        }
        if (!validation.validatePasswordConfirmation(client.password, passwordConfirmation)) {
            newErrors.passwordConfirmation = "Passwords do not match.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const validateStepTwo = () => {
        const newErrors: typeof errors = {};
        if (!validation.validateExisting(client.firstName!)) {
            newErrors.firstName = "This field is required.";
        }
        if (!validation.validateExisting(client.lastName!)) {
            newErrors.lastName = "This field is required.";
        }
        if (!validation.validateExisting(client.address)) {
            newErrors.address = "This field is required.";
        }
        if (!validation.validatePhone(client.phone)) {
            newErrors.phone = "Please enter a valid phone number.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (validateStepTwo()) {
            try {
                const response = await clientSignup(client);
                console.log('Signup Success:', response.data);
            } catch (error) {
                console.error('Signup Error:', e.response ? e.response.data : e.message);
            }
        }
    };

    useEffect(() => {
        if (step === 1 && stepOneContentRef.current) {
            setTimeout(() => {
                setContainerHeight(`${stepOneContentRef.current!.scrollHeight + 35}px`);
            }, 10);
        } else if (step === 2 && stepTwoContentRef.current) {
            setTimeout(() => {
                setContainerHeight(`${stepTwoContentRef.current!.scrollHeight + 35}px`);
            }, 10);
        }
    }, [step, Object.keys(errors).length]);

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

    const nextStep = () => {
        if (validateStepOne()) {
            setStep(step + 1);
        }
    }

    const prevStep = () => {
        setStep(step - 1)
    }

    return (
        <Container fluid className="background-gif">
            <Row className="m-auto">
                <Col>
                    <h1 style={{ fontFamily: "RetroGaming, sans-serif"}} className="mb-4">Welcome!</h1>
                    <Card className="form-background" style={{ width: '25rem', borderRadius: '0.5rem', height: containerHeight }}>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Container ref={stepOneContentRef} className={`form-section ${step === 1 ? 'form-section-active' : ''}`}>
                                    {step === 1 && (
                                        <>
                                            <Form.Group className={"mb-2"}>
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    name="email"
                                                    value={client.email}
                                                    onChange={handleChange}
                                                    placeholder="Enter email"
                                                    required
                                                    isInvalid={!!errors.email}
                                                />
                                                {errors.email && (
                                                    <div className="invalid-feedback fade-in" style={{ display: 'block' }}>
                                                        {errors.email}
                                                    </div>
                                                    )}
                                            </Form.Group>
                                            <Form.Group className={"mb-2"}>
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    name="password"
                                                    value={client.password}
                                                    onChange={handleChange}
                                                    placeholder="Password"
                                                    required
                                                    isInvalid={!!errors.password}
                                                />
                                                {errors.password && (
                                                    <div className="invalid-feedback fade-in" style={{ display: 'block' }}>
                                                        {errors.password}
                                                    </div>
                                                )}
                                            </Form.Group>
                                            <Form.Group className="mb-2">
                                                <Form.Label>Confirm Password</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    name="password-confirm"
                                                    value={passwordConfirmation}
                                                    onChange={handleChange}
                                                    placeholder="Confirm Password"
                                                    isInvalid={!!errors.passwordConfirmation}
                                                />
                                                {errors.passwordConfirmation && (
                                                    <div className="invalid-feedback d-block fade-in">
                                                        {errors.passwordConfirmation}
                                                    </div>
                                                )}
                                            </Form.Group>
                                            <Container className="btn-container">
                                                <Button variant="primary" type="button" onClick={nextStep}>
                                                    Next
                                                </Button>
                                            </Container>
                                        </>
                                    )}
                                </Container>
                                <Container ref={stepTwoContentRef} className={`form-section ${step === 2 ? 'form-section-active' : ''}`}>
                                    {step === 2 && (
                                        <>
                                            <Form.Group className={"mb-2"}>
                                                <Form.Label>First Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="firstName"
                                                    value={client.firstName}
                                                    onChange={handleChange}
                                                    placeholder="First Name"
                                                    isInvalid={!!errors.firstName}
                                                />
                                                {errors.firstName && (
                                                    <div className="invalid-feedback fade-in" style={{ display: 'block' }}>
                                                        {errors.firstName}
                                                    </div>
                                                )}
                                            </Form.Group>
                                            <Form.Group className={"mb-2"}>
                                                <Form.Label>Last Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="lastName"
                                                    value={client.lastName}
                                                    onChange={handleChange}
                                                    placeholder="Last Name"
                                                    isInvalid={!!errors.lastName}
                                                />
                                                {errors.lastName && (
                                                    <div className="invalid-feedback fade-in" style={{ display: 'block' }}>
                                                        {errors.lastName}
                                                    </div>
                                                )}
                                            </Form.Group>
                                            <Form.Group className={"mb-2"}>
                                                <Form.Label>Address</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="address"
                                                    value={client.address}
                                                    onChange={handleChange}
                                                    placeholder="Address"
                                                    isInvalid={!!errors.address}
                                                />
                                                {errors.address && (
                                                    <div className="invalid-feedback fade-in" style={{ display: 'block' }}>
                                                        {errors.address}
                                                    </div>
                                                )}
                                            </Form.Group>
                                            <Form.Group className={"mb-2"}>
                                                <Form.Label>Phone</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="phone"
                                                    value={client.phone}
                                                    onChange={handleChange}
                                                    placeholder="Phone"
                                                    isInvalid={!!errors.phone}
                                                />
                                                {errors.phone && (
                                                    <div className="invalid-feedback fade-in" style={{ display: 'block' }}>
                                                        {errors.phone}
                                                    </div>
                                                )}
                                            </Form.Group>
                                            <Row>
                                                <Col>
                                                    <Container className="btn-container">
                                                        <Button variant="secondary" type="button" onClick={prevStep}>
                                                            Back
                                                        </Button>
                                                    </Container>
                                                </Col>
                                                <Col>
                                                    <Container className="btn-container">
                                                        <Button variant="primary" type="submit">
                                                            Submit
                                                        </Button>
                                                    </Container>
                                                </Col>
                                            </Row>
                                        </>
                                    )}
                                </Container>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ClientSignupForm;
