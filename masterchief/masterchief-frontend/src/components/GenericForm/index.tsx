import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { GenericField } from './GenericField';

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateCurrentStep = () => {
        const currentFields = steps[currentStep];
        const newErrors: Record<string, string> = {};
        let isValid = true;

        currentFields.forEach(field => {
            if (field.validationRule && !field.validationRule(formData[field.name], formData)) {
                newErrors[field.name] = field.errorMessage || 'Invalid field';
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    const handleNext = () => {
        if (validateCurrentStep()) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrev = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateCurrentStep()) {
            await onSubmit(formData);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            {steps[currentStep].map((field) => (
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
            <div className="mt-3">
                {currentStep > 0 && (
                    <Button variant="secondary" onClick={handlePrev} className="me-2">
                        Previous
                    </Button>
                )}
                {currentStep < steps.length - 1 ? (
                    <Button variant="primary" onClick={handleNext}>
                        Next
                    </Button>
                ) : (
                    <Button variant="success" type="submit">
                        Submit
                    </Button>
                )}
            </div>
        </Form>
    );
};
