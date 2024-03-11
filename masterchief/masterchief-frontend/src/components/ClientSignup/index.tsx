import React, {useEffect, useRef, useState} from 'react';
import { Client } from '../../model/user';
import { clientSignup } from "../../services/signupService";
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
    const [errors, setErrors] = useState({});
    const [client, setClient] = useState<Client>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        address: '',
        phone: '',
        type: 'client',
    });

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await clientSignup(client);
            console.log('Signup Success:', response.data);
        } catch (error) {
            console.error('Signup Error:', e.response ? e.response.data : e.message);
        }
    };

    useEffect(() => {
        if (step === 1 && stepOneContentRef.current) {
            setContainerHeight(`${stepOneContentRef.current.scrollHeight + 30}px`);
        } else if (step === 2 && stepTwoContentRef.current) {
            setContainerHeight(`${stepTwoContentRef.current.scrollHeight + 30}px`);
        }
    }, [step]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setClient(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const nextStep = () => {
        setStep(step + 1)
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
                                            <Form.Group>
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    name="email"
                                                    value={client.email}
                                                    onChange={handleChange}
                                                    placeholder="Enter email"
                                                    required
                                                />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    name="password"
                                                    value={client.password}
                                                    onChange={handleChange}
                                                    placeholder="Password"
                                                    required
                                                />
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
                                            <Form.Group>
                                                <Form.Label>First Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="firstName"
                                                    value={client.firstName}
                                                    onChange={handleChange}
                                                    placeholder="First Name"
                                                />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>Last Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="lastName"
                                                    value={client.lastName}
                                                    onChange={handleChange}
                                                    placeholder="Last Name"
                                                />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>Address</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="address"
                                                    value={client.address}
                                                    onChange={handleChange}
                                                    placeholder="Address"
                                                />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>Phone</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="phone"
                                                    value={client.phone}
                                                    onChange={handleChange}
                                                    placeholder="Phone"
                                                />
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
