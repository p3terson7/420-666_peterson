import React from 'react';
import {GenericForm} from "../../GenericForm";

const BeginnerForm = () => {
    const formSteps = [
        [
            {
                label: 'Quel usage allez-vous faire de l’ordinateur? Veuillez brièvement détailler ci-dessous',
                name: 'noob_usage_message',
                type: 'textarea',
                placeholder: 'Ex: Je stream du Warzone en qualité Ultra sur Twitch de jour, je pirate les systèmes du Pentagone de soir',
                validationRule: (value:any) => !!value,
                errorMessage: 'Ce champ est requis.',
            },
        ],
        [
            {
                label: 'En termes d’accessoires lumineux (RGB), que voulez-vous intégrer?',
                name: 'noob_RGB_accessories',
                type: 'checkboxGroup',
                options: [
                    { label: 'Ventilateurs', value: 'noob_Ventilateurs_RGB' },
                    { label: 'Bande LED', value: 'noob_Bande_LED' },
                    { label: 'Refroidisseur CPU', value: 'noob_RGB_CPU_Cooler' },
                    { label: 'Mémoire Vive', value: 'noob_RGB_RAM' },
                    { label: 'Carte Graphique', value: 'noob_RGB_GPU' },
                    { label: 'Carte mère', value: 'noob_RGB_Motherboard' },
                    { label: 'Câbles', value: 'noob_RGB_Cables' },
                    { label: 'Autre (Détaillez ci-dessous)', value: 'noob_Other_Accessories' },
                    { label: 'Rien, je suis épileptique', value: 'noob_Nothing_RGB' },
                ],
            },
        ],
        [
            {
                label: 'Quel est votre budget?',
                name: 'noob_budget',
                type: 'select',
                options: [
                    'Entre 300 et 400$ (Parfait pour le travail de bureau de base)',
                    'Entre 400 et 500$ (Parfait le travail de bureau de base et travaux d’école)',
                    'Entre 500 et 700$ (Parfait pour travaux d’école et gaming léger)',
                    'Entre 700 et 1000$ (Parfait pour tout gaming à qualité intermédiaire)',
                    'Entre 1000 et 1500$ (Parfait pour tout gaming à qualité avancée)',
                    'Plus de 1500$ (Machine de guerre)',
                ],
                validationRule: (value:any) => !!value,
                errorMessage: 'Veuillez sélectionner une option.',
            },
        ],
        [
            {
                label: 'Êtes-vous à l’aise avec la configuration de l’ordinateur? (Installation de Windows, Startup, Installation des Pilotes, Manipulations BIOS, Overclocking si nécessaire)',
                name: 'config',
                type: 'radioGroup',
                options: [
                    { label: 'Oui, je suis à l\'aise', value: 'a_l\'aise' },
                    { label: 'Non, j\'aurais besoin d\'assistance', value: 'pas_a_l\'aise' },
                ],
            },
            {
                label: 'Si vous avez des spécifications particulières ou des questions, écrivez les ici.',
                name: 'noob_other_message',
                type: 'textarea',
            },
        ],
        [
        ],
    ];

    const handleFormSubmit = async (formData:any) => {
        // Handle form submission logic for the beginner form
    };

    return (
        <div className="p-5 container bg-light" style={{ borderRadius: '7px', border: '1px solid blueviolet' }}>
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
