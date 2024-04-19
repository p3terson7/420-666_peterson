import React from 'react';
import {GenericForm} from "../../GenericForm";
import '@fortawesome/fontawesome-free/css/all.css';
const BeginnerForm = () => {

    const textAreaValidationMessages = (value:any) => {
        if (!!value) {
            return "This field is required"
        }
        else if (value.length > 255) {
            return "Message too long!"
        }
    }
    const formSteps = [
        [
            {
                type: 'checkbox',
                name: 'noob_usage_checkbox',
                label: 'Common use case(s) for your PC',
                options: [
                    { label: 'Gaming', value: 'gaming' },
                    { label: 'School or Office Work', value: 'office_work' },
                    { label: 'Graphic Design and Creative Work', value: 'graphic_design' },
                    { label: 'Media Consumption & Entertainment', value: 'media_entertainment' },
                    { label: 'Programming and Software Development', value: 'software_development' },
                    { label: 'Other', value: 'other' },
                ],
                validationRule: (value:any) => !!value && value.length != 0,
                errorMessage: 'Please select at least one option.',
            },
            {
                label: 'Briefly describe how you plan on using your PC',
                name: 'noob_usage_message',
                type: 'textarea',
                placeholder: 'I plan to use my PC to play games and watch cat videos.',
                validationRule: (value:any) => !!value && value.length <= 255,
                errorMessage: 'Ce champ est requis.',
            },
        ],
        [
            {
                label: 'Do you want RGB accessories?',
                name: 'noob_RGB_accessories',
                type: 'checkbox',
                options: [
                    { label: 'Fans', value: 'fans' },
                    { label: 'LED Strips', value: 'strip' },
                    { label: 'CPU Cooler', value: 'cpu_cooler' },
                    { label: 'RAM', value: 'ram' },
                    { label: 'GPU', value: 'gpu' },
                    { label: 'Motherboard', value: 'mobo' },
                    { label: 'Cables', value: 'cables' },
                    { label: 'Other', value: 'other' },
                    { label: 'No, but how nice of you for asking', value: 'no_rgb' },
                ],
                validationRule: (value:any) => value.length != 0,
                errorMessage: 'Please select at least one option.',
            },
        ],
        [
            {
                label: 'Do you have a budget?',
                name: 'noob_budget',
                type: 'select',
                options: [
                    { label: 'Not really, I\'m seeking the most cost-effective option', value: 'nan' },
                    { label: 'Budget Around $500: Basic Performance & Affordability', value: '500' },
                    { label: 'Budget Around $700: Balanced Performance for Work & Entertainment', value: '700' },
                    { label: 'Budget Around $1000: Enhanced Performance for Demanding Tasks', value: '1000' },
                    { label: 'Budget Over $1000: Premium Performance for High-End Needs', value: '1000+' }
                ],
                validationRule: (value:any) => !!value,
                errorMessage: 'Veuillez sélectionner une option.',
            },
        ],
        [
            {
                label: 'Are you confident in handling computer setup? Our expertise includes seamless Windows installation, smooth startup processes, driver installations, BIOS optimization, and advanced overclocking if needed. Let us take care of your setup worries.',
                name: 'config',
                type: 'select',
                options: [
                    { label: 'Oui, je suis à l\'aise', value: 'a_l\'aise' },
                    { label: 'Non, j\'aurais besoin d\'assistance', value: 'pas_a_l\'aise' },
                ],
                validationRule: (value:any) => !!value,
                errorMessage: 'Veuillez sélectionner une option.',
            },
            {
                label: 'If you have any specific requirements or questions, please write them here.',
                name: 'noob_other_message',
                type: 'textarea',
            },
        ],
        [],
    ];

    const handleFormSubmit = async (formData:any) => {
        console.log('Form submitted:', formData);
    };

    return (
        <div style={{fontSize: '20px'}}>
            <h2>Beginner Form</h2>
            <GenericForm
                steps={formSteps}
                onSubmit={handleFormSubmit}
                unexpectedError="An unexpected error occurred."
                successMessage="Form submitted successfully!"
            />
        </div>
    );
};

export default BeginnerForm;
