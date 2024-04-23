import React, {useEffect, useRef} from 'react';
import { Form, Container } from 'react-bootstrap';
import Select from 'react-select';

interface GenericFieldProps {
    label: string;
    subLabel?: string;
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

export const GenericField: React.FC<GenericFieldProps> = ({ label, subLabel, type, name, value, placeholder, onChange, isInvalid, errorMessage, options, charCount }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleInput = () => {
        const textarea = textareaRef.current;

        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;

        }
    };

    useEffect(() => {
        handleInput();
    }, [value, charCount]);

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

    const customStyles = {
        control: (provided: any) => ({
            ...provided,
            backgroundColor: '#282c34',
            border: 'none',
            outline: 'none',
            boxShadow: 'none',
            marginBottom: '0.5rem',
            transition: 'background-color 0.3s ease',
            '&:hover': {
                backgroundColor: '#212429',
            },
            '&:focus-within': {
                backgroundColor: '#212429',
            },
        }),
        option: (provided: any, state: { isSelected: any; isFocused: any; }) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#5c6bc0' : state.isFocused ? '#7986cb' : '#282c34',
            color: '#FDFDFD',
            padding: '0.5rem 1rem',
        }),
        menu: (provided: any) => ({
            ...provided,
            backgroundColor: '#282c34',
        }),
        menuPortal: (provided: any) => ({
            ...provided,
            zIndex: 9999,
        }),
        singleValue: (provided: any) => ({
            ...provided,
            color: '#FDFDFD',
        }),
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
                                        <label htmlFor={`${name}-${index}`} className="custom-checkbox-label p-3">
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
                            ref={textareaRef}
                            name={name}
                            value={value}
                            placeholder={placeholder}
                            onChange={onChange}
                            isInvalid={isInvalid}
                            className="custom-textarea"
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
                    <>
                        <Select
                            className="custom-select"
                            menuPortalTarget={document.body}
                            theme={(theme) => ({
                                ...theme,
                                borderRadius: 5,
                            })}
                            options={options}
                            value={options?.find(option => option.value === value)}
                            onChange={(selectedOption) => {
                                onChange({ target: { name, value: selectedOption?.value } } as any);
                            }}
                            styles={customStyles}
                            isSearchable={true}
                            placeholder="Select an option..."
                            blurInputOnSelect={true}
                        />
                    </>
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
            <Form.Label>
                <>
                    {label}
                    {subLabel && <div className="form-sub-label"> {subLabel}</div>}
                </>
            </Form.Label>
            <div className="checkbox-container">
                {renderFormControl()}
            </div>
            {isInvalid && (
                <Container className="d-block invalid-feedback fade-in m-0">
                    {errorMessage}
                </Container>
            )}
        </Form.Group>
    );
};
