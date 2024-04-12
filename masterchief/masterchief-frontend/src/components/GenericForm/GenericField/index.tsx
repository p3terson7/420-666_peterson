import React from 'react';
import Form from 'react-bootstrap/Form';
import "../../../App.css";
import {Container} from "react-bootstrap";

interface GenericFieldProps {
    label: string;
    type: string;
    name: string;
    value: any;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isInvalid?: boolean;
    errorMessage?: string;
}

export const GenericField: React.FC<GenericFieldProps> = ({ label, type, name, value, placeholder, onChange, isInvalid, errorMessage }) => {
    let formControl: JSX.Element | null;

    switch (type) {
        case 'checkbox':
            formControl = <Form.Check label={label} checked={value} onChange={onChange} isInvalid={isInvalid} />;
            break;
        case 'textarea':
            formControl = <Form.Control as="textarea" name={name} value={value} placeholder={placeholder} onChange={onChange} isInvalid={isInvalid} />;
            break;
        case 'select':
            formControl = (
                <Form.Control as="select" name={name} value={value} onChange={onChange} isInvalid={isInvalid}>
                    {placeholder && <option value="">{placeholder}</option>}
                    {/* Render options here */}
                </Form.Control>
            );
            break;
        default:
            formControl = <Form.Control type={type} name={name} value={value} placeholder={placeholder} onChange={onChange} isInvalid={isInvalid} />;
            break;
    }

    return (
        <Form.Group className="mb-2" controlId={name}>
            <Form.Label>{label}</Form.Label>
            {formControl}
            {isInvalid && (
                <Container className="invalid-feedback fade-in" style={{ display: 'block' }}>
                    {errorMessage}
                </Container>
            )}
        </Form.Group>
    );
};
