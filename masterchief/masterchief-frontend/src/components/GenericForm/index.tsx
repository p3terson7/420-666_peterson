import React, {useEffect, useRef, useState} from 'react';
import {Button, Container, Form} from 'react-bootstrap';
import { GenericField } from './GenericField';
import "../../App.css";
import Card from "react-bootstrap/Card";

interface FieldConfig {
    label: string;
    type: string;
    name: string;
    validationRule?: (value: string, formData?: Record<string, string>) => boolean;
    errorMessage?: string;
    placeholder?: string;
}

interface GenericFormProps {
    steps: FieldConfig[][];
    onSubmit: (formData: Record<string, string>) => Promise<void>;
}

export const GenericForm: React.FC<GenericFormProps> = ({ steps, onSubmit }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});
    const activeStepRef = useRef<HTMLDivElement>(null);
    const [containerHeight, setContainerHeight] = useState('auto');
    const [attemptedNext, setAttemptedNext] = useState(false);

    const validateCurrentStep = () => {
        const currentFields = steps[currentStep];
        const newErrors: Record<string, string> = {};
        let isValid = true;

        currentFields.forEach(field => {
            console.log("Field validation : ", field.validationRule, field.validationRule!(formData[field.name], formData));
            const value = formData[field.name];
            if (field.validationRule && !field.validationRule(value, formData)) {
                newErrors[field.name] = field.errorMessage || 'Invalid field';
                isValid = false;
            }
        });

        setErrors(newErrors);
        console.log("Errors: ", errors);
        return isValid;
    };

    useEffect(() => {
        if (attemptedNext && validateCurrentStep()) {
            setCurrentStep(currentStep + 1);
            setAttemptedNext(false);
        } else {
            setAttemptedNext(false);
        }
        console.log("Current step: ", currentStep, steps.length);

    }, [attemptedNext, currentStep, formData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        console.log(formData);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (currentStep === steps.length - 1) {
            await onSubmit(formData);
            setCurrentStep(currentStep + 1);
        }
    };

    const handleNext = () => {
        setAttemptedNext(true);
    };

    const handlePrev = () => {
        setCurrentStep(currentStep - 1);
    };

    return (
        <Card className="form-background" style={{ width: '25rem', borderRadius: '0.5rem', height: containerHeight }}>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    {currentStep === steps.length ? (
                        <Container className="form-section form-section-active">
                            <div className="signup-success">
                                <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" style={{ marginBottom: '20px', color: '#4BB543' }}>
                                    <path fill="currentColor" d="M9 19l-7-7 1.41-1.42L9 16.17l11.59-11.59L22 6l-13 13z"/>
                                </svg>
                                <h2>Signup Successful!</h2>
                                <p>Your account has been successfully created. You're now a part of the Prototype community!</p>
                                <Button variant="success" onClick={() => {/* Navigate to dashboard or login page */}}>Proceed to Home Page</Button>
                            </div>
                        </Container>
                    ) : (
                        steps.map((stepFields, index) => (
                            <Container
                                ref={currentStep === index ? activeStepRef : null}
                                key={index}
                                className={`form-section ${currentStep === index ? 'form-section-active' : ''}`}
                            >
                                {stepFields.map(field => (
                                    <GenericField
                                        key={field.name}
                                        label={field.label}
                                        type={field.type}
                                        name={field.name}
                                        value={formData[field.name] || ''}
                                        placeholder={field.placeholder}
                                        onChange={handleChange}
                                        isInvalid={!!errors[field.name]}
                                        errorMessage={errors[field.name]}
                                    />
                                ))}
                            </Container>
                        ))
                    )}
                    <Container className="btn-container">
                        {currentStep > 0 && currentStep < steps.length && (
                            <Button variant="secondary" onClick={handlePrev}>
                                Previous
                            </Button>
                        )}
                        {currentStep < steps.length - 1 && (
                            <Button variant="primary" onClick={handleNext}>
                                Next
                            </Button>
                        )}
                        {currentStep === steps.length - 1 && (
                            <Button type="submit">
                                Submit
                            </Button>
                        )}
                    </Container>
                </Form>
            </Card.Body>
        </Card>
    );
};