import React from 'react';
import { Form, Container } from 'react-bootstrap';

interface GenericFieldProps {
    label: string;
    type: string;
    name: string;
    value?: any;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isInvalid?: boolean;
    errorMessage?: string;
    options?: { label: string; value: string }[];
    charCount?: number;
}

export const GenericField: React.FC<GenericFieldProps> = ({ label, type, name, value, placeholder, onChange, isInvalid, errorMessage, options, charCount }) => {
    const handleRegularCheckboxChange = (checkboxValue: string, checked: boolean) => {
        let newValue: string[];

        if (Array.isArray(value)) {
            if (checked) {
                newValue = value.filter((value: any) => value !== 'no_rgb');
                newValue.push(checkboxValue);
            } else {
                newValue = value.filter((value: any) => value !== checkboxValue);
            }
        } else {
            newValue = checked ? [checkboxValue] : [];
        }

        onChange({ target: { name, value: newValue } } as any);
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value: checkboxValue, checked } = e.target;

        if (checkboxValue === 'no_rgb') {
            handleNoRGBCheckboxChange(checked);
        } else {
            handleRegularCheckboxChange(checkboxValue, checked);
        }
    };

    const handleNoRGBCheckboxChange = (checked: boolean) => {
        if (checked) {
            onChange({ target: { name: 'noob_RGB_accessories', value: ['no_rgb'] } } as any);
        } else {
            onChange({ target: { name: 'noob_RGB_accessories', value: [] } } as any);
        }
    };

    const renderFormControl = () => {
        switch (type) {
            case 'checkbox':
                return (
                    <>
                        {options && options.map((option, index) => (
                            <div key={index} className="custom-checkbox-container">
                                <div>
                                    <div className="custom-checkbox">
                                        <input
                                            type="checkbox"
                                            name={name}
                                            id={`${name}-${index}`}
                                            value={option.value}
                                            onChange={handleCheckboxChange}
                                            checked={value && value.includes(option.value)}
                                            className="custom-checkbox-input"
                                        />
                                        <label htmlFor={`${name}-${index}`} className="custom-checkbox-label bg-dark p-3">
                                            {option.label}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </>
                );
            case 'textarea':
                return (
                    <>
                        <Form.Control
                            as="textarea"
                            name={name}
                            value={value}
                            placeholder={placeholder}
                            onChange={onChange}
                            isInvalid={isInvalid}
                        />
                        {charCount! > 200 && (
                            <div className="charCounter text-center" style={{ color: charCount! > 255 ? '#ff4d6b' : '#DBDEE1'}}>
                                {255 - charCount!}
                            </div>
                        )}
                    </>
                );
            case 'select':
                return (
                    <Form.Control
                        as="select"
                        name={name}
                        value={value}
                        onChange={onChange}
                        isInvalid={isInvalid}
                    >
                        <option value="">Select an option</option>
                        {options && options.map((option, index) => (
                            <option key={index} value={option.value}>{option.label}</option>
                        ))}
                    </Form.Control>
                );
            default:
                return (
                    <Form.Control
                        type={type}
                        name={name}
                        value={value}
                        placeholder={placeholder}
                        onChange={onChange}
                        isInvalid={isInvalid}
                    />
                );
        }
    };

    return (
        <Form.Group controlId={name}>
            <Form.Label>{label}</Form.Label>
            <div className="checkbox-container">
                {renderFormControl()}
            </div>
            {isInvalid && (
                <Container className="invalid-feedback fade-in" style={{ display: 'block' }}>
                    {errorMessage}
                </Container>
            )}
        </Form.Group>
    );
};
