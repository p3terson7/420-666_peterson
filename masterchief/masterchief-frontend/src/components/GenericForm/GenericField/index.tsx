import React from 'react';
import Form from 'react-bootstrap/Form';
import "../../../App.css";
import {Container} from "react-bootstrap";

interface GenericFieldProps {
    label: string;
    type: string;
    name: string;
    value: string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isInvalid?: boolean;
    errorMessage?: string;
}

export const GenericField: React.FC<GenericFieldProps> = ({ label, type, name, value, placeholder, onChange, isInvalid, errorMessage }) => (
    <Form.Group className="mb-2" controlId={name}>
        <Form.Label>{label}</Form.Label>
        <Form.Control type={type} name={name} value={value} placeholder={placeholder} onChange={onChange} isInvalid={!!isInvalid} />
        {isInvalid && (
            <Container className="invalid-feedback fade-in" style={{ display: 'block' }}>
                {errorMessage}
            </Container>
        )}
    </Form.Group>
);