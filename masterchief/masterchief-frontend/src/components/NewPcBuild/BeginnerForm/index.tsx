import React, {useEffect, useState} from 'react';
import {GenericForm} from "../../GenericForm";
import '../../../App.css';
import {getUserById} from "../../../services/userService";
import {getUserId} from "../../../services/authService";
import {User} from "../../../model/user";
import {useNavigate} from "react-router-dom";
import Popup from 'reactjs-popup';
import ClientSignup from "../../ClientSignup";
import {saveBeginnerForm} from "../../../services/formService";
import {createConversation, getUserConversations, sendMessage} from "../../../services/messagingService";
import {Conversation} from "../../../model/conversation";
import {enqueueSnackbar} from "notistack";

const BeginnerForm = () => {
    const [currentUser, setCurrentUser] = useState<User>();
    const [currentUserAdmin, setCurrentUserAdmin] = useState<User>();
    const [unexpectedError, setUnexpectedError] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [conversations, setConversations] = useState<Conversation[]>([])
    const [activeConversation, setActiveConversation] = useState<Conversation>();
    const navigate = useNavigate();
    const userId = getUserId();

    useEffect(() => {
        if (!currentUser) {
            getCurrentUser();
            getCurrentAdmin();
        }
    }, []);

    const getCurrentUser = async () => {
        await getUserById(parseInt(getUserId()!))
            .then(response => {
                setCurrentUser(response.data);
            })
            .catch(error => {
                console.log('No user fetched', error.messages);
            });
    };

    const getCurrentAdmin = async () => {
        await getUserById(25!)
            .then(response => {
                setCurrentUserAdmin(response.data);
            })
            .catch(error => {
                console.log('No user fetched', error.messages);
            });
    };

    const handleFormSubmit = async (formData: any) => {
        console.log('Form submitted:', formData);

        if (!currentUser) {
            setShowPopup(true);
            return;
        }

        const BeginnerForm = {
            client: currentUser!,
            useCases: formData.noob_usage_checkbox,
            description: formData.noob_usage_message,
            rgbAccessories: formData.noob_RGB_accessories,
            budget: formData.noob_budget,
            configuration: formData.config,
            specificRequirements: formData.noob_other_message,
            type: 'beginner'
        };

        await saveBeginnerForm(BeginnerForm)
            .then(async () => {
                setUnexpectedError("");
                await sendBuildAsMessage(BeginnerForm)
                    .then(async () => {
                        enqueueSnackbar("Build submitted successfully!", {variant: "success"})
                        setSuccessMessage("Build submitted successfully!");
                        navigate('/clients/conversations');
                    });
            })
            .catch((error) => {
                setUnexpectedError(error.response.data);
                throw new Error(error.response.data);
            });

        console.log(BeginnerForm);
    };

    const handlePopupClose = async () => {
        await getCurrentUser();
        setShowPopup(false);
    };

    useEffect(() => {
        if (!userId) return;

        getUserConversations(parseInt(userId))
            .then(response => {
                setConversations(response.data);
                setActiveConversation(response.data[0])
            })
            .catch(error => {
                enqueueSnackbar("Failed to fetch conversations", {variant: "error"});
                throw new Error(error);
            });

        if (!activeConversation) {
            setActiveConversation(conversations[0]);
        }

    }, [userId]);

    const sendBuildAsMessage = async (formData: any) => {
        try {
            if (!currentUser) return;

            const conversation: Conversation = {
                client: currentUser!,
                admin: currentUserAdmin!,
            };
            await createConversation(conversation);

            const userConversationsResponse = await getUserConversations(parseInt(userId!));

            const messageContent = `${objectToString(formData)}`;
            await sendMessage({
                sender: currentUser,
                content: messageContent,
                timestamp: new Date().toISOString(),
                conversation: userConversationsResponse.data[0],
            });
        } catch (error:any) {
           throw new Error("Failed to send build as message : ", error);
        }
    };


    function objectToString(formData: any) {
        const labels: { [key: string]: string } = {
            useCases: 'Use Cases',
            description: 'Description',
            rgbAccessories: 'RGB Accessories',
            budget: 'Budget',
            configuration: 'Configuration',
            specificRequirements: 'Specific Requirements',
        };

        let result = "New build submitted:\n";
        for (const key in formData) {
            if (Object.prototype.hasOwnProperty.call(formData, key) && key !== 'client' && key !== 'type') {
                const label = labels[key] || key;
                const value = key === 'specificRequirements' && formData[key] === undefined ? 'None' : formData[key];
                result += `${label}: ${value}\n`;
            }
        }
        return result;
    }

    const formSteps = [
        [
            {
                type: 'checkbox',
                name: 'noob_usage_checkbox',
                label: 'Common use case(s) for your PC',
                options: [
                    { label: 'Gaming', value: 'Gaming' },
                    { label: 'School or Office Work', value: 'Office Work' },
                    { label: 'Graphic Design and Creative Work', value: 'Graphic Design' },
                    { label: 'Media Consumption & Entertainment', value: 'Media & Entertainment' },
                    { label: 'Programming and Software Development', value: 'Software Development' },
                    { label: 'Other', value: 'Other' },
                ],
                validationRule: (value:any) => !!value && value.length !== 0,
                errorMessage: 'Please select at least one option.',
            },
            {
                label: 'Briefly describe how you plan on using your PC',
                name: 'noob_usage_message',
                type: 'textarea',
                placeholder: 'I plan to use my PC to play games and watch cat videos.',
                validationRule: (value:any) => !!value && value.length <= 255,
                errorMessage: 'This field is required, and must be less than 255 characters long.',
            },
        ],
        [
            {
                label: 'Do you want RGB accessories?',
                name: 'noob_RGB_accessories',
                type: 'checkbox',
                options: [
                    { label: 'Fans', value: 'Fans' },
                    { label: 'LED Strips', value: 'LED Strips' },
                    { label: 'CPU Cooler', value: 'CPU Cooler' },
                    { label: 'RAM', value: 'RAM' },
                    { label: 'GPU', value: 'GPU' },
                    { label: 'Motherboard', value: 'Motherboard' },
                    { label: 'Cables', value: 'Cables' },
                    { label: 'Other', value: 'Other' },
                    { label: 'No, but how nice of you for asking', value: 'No, but how nice of you for asking' },
                ],
                validationRule: (value:any) => !!value && value.length !== 0,
                errorMessage: 'Please select at least one option.',
            },
        ],
        [
            {
                label: 'Do you have a budget?',
                name: 'noob_budget',
                type: 'select',
                options: [
                    { label: 'Not really, I\'m seeking the most cost-effective option', value: 'Most Cost-Effective Option' },
                    { label: 'Budget Around $500: Basic Performance & Affordability', value: 'Around 500$' },
                    { label: 'Budget Around $700: Balanced Performance for Work & Entertainment', value: 'Around 700$' },
                    { label: 'Budget Around $1000: Enhanced Performance for Demanding Tasks', value: 'Around 1000$' },
                    { label: 'Budget Over $1000: Premium Performance for High-End Needs', value: 'Beyond 1000$' }
                ],
                validationRule: (value:any) => !!value,
                errorMessage: 'Please select an option.',
            },
        ],
        [
            {
                label: 'Are you confident in handling computer setup?',
                subLabel: 'Our expertise includes seamless Windows installation, smooth startup processes, driver installations, BIOS optimization, and advanced overclocking if needed. Let us take care of your setup worries.',
                name: 'config',
                type: 'select',
                options: [
                    { label: 'Yes, I would appreciate some assistance', value: 'With Assistance' },
                    { label: 'No, I don\'t require assistance', value: 'Without Assistance' },
                ],
                validationRule: (value:any) => !!value,
                errorMessage: 'Please select an option.',
                labelClassName: 'lighter-font-label'
            },
            {
                label: 'If you have any specific requirements or questions, please write them here.',
                name: 'noob_other_message',
                type: 'textarea',
            },
        ],
    ];

    return (
        <div style={{ fontSize: '20px' }}>
            <h2>Beginner Form</h2>
            <GenericForm
                steps={formSteps}
                onSubmit={handleFormSubmit}
                unexpectedError={unexpectedError}
                successMessage={successMessage}
            />
            <Popup open={showPopup} onClose={handlePopupClose} position="right center" className="custom-popup">
                <ClientSignup onSubmitSuccess={handlePopupClose} />
            </Popup>
        </div>
    );
};

export default BeginnerForm;
