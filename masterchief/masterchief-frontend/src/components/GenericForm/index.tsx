import React, { useEffect, useRef, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { GenericField } from './GenericField';
import "../../App.css";
import Card from "react-bootstrap/Card";
import { useSnackbar } from 'notistack';

interface FieldConfig {
    label: string;
    type: string;
    name: string;
    options?: { label: string; value: string }[];
    validationRule?: (value: string, formData?: Record<string, string>) => boolean;
    errorMessage?: string;
    placeholder?: string;
}

interface GenericFormProps {
    steps: FieldConfig[][];
    onSubmit: (formData: Record<string, string>) => Promise<void>;
    unexpectedError?: string;
    successMessage?: string;
    width?: string;
}

export const GenericForm: React.FC<GenericFormProps> = ({ steps, onSubmit, unexpectedError, successMessage, width }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});
    const activeStepRef = useRef<HTMLDivElement>(null);
    const [attemptedNext, setAttemptedNext] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { enqueueSnackbar } = useSnackbar(); // Destructure enqueueSnackbar from useSnackbar hook

    const validateCurrentStep = () => {
        const currentFields = steps[currentStep];
        const newErrors: Record<string, string> = {};
        let isValid = true;

        currentFields.forEach(field => {
            const value = formData[field.name];
            if (field.validationRule && !field.validationRule(value, formData)) {
                newErrors[field.name] = field.errorMessage || 'Invalid field';
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    useEffect(() => {
        if (attemptedNext && validateCurrentStep()) {
            setCurrentStep(currentStep + 1);
            setAttemptedNext(false);
        } else {
            setAttemptedNext(false);
        }
    }, [attemptedNext, currentStep, formData]);

    useEffect(() => {
        if (isSubmitting) {
            if (unexpectedError) {
                enqueueSnackbar(unexpectedError, { variant: 'error' });
            }
            if (successMessage) {
                enqueueSnackbar(successMessage, { variant: 'success' });
            }
        }
        setIsSubmitting(false);
    }, [unexpectedError, successMessage, isSubmitting]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (currentStep === steps.length - 1 && validateCurrentStep()) {
            await onSubmit(formData)
                .then(() => {
                })
                .catch(error => {
                    console.error('Submission failed:', error);
                });
            setIsSubmitting(true);
        }
    };

    const handleNext = () => {
        setAttemptedNext(true);
    };

    const handlePrev = () => {
        setCurrentStep(currentStep - 1);
    };

    return (
        <Card className="d-flex form-background" style={{ width: width, height: 'auto', marginTop:'1rem' }}>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    {steps.map((stepFields, index) => (
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
                                    options={field.options}
                                />
                            ))}
                        </Container>
                    ))}
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
