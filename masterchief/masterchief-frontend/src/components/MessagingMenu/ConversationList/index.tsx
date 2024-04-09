import {useEffect, useState} from "react";
import {getUserConversations} from "../../../services/messagingService";
import {getUserId, signOut} from "../../../services/authService";
import {useNavigate} from "react-router-dom";
import {Conversation} from "../../../model/conversation";
import '../MessagingStylesheet.css';

export const ConversationList = () => {
    const [conversations, setConversations] = useState<Conversation[]>()
    const userId = getUserId();
    const navigate = useNavigate();

    useEffect(() => {
        if (!userId) {
            signOut();
            navigate("/pageNotFound");
            return;
        }

        getUserConversations(parseInt(userId))
            .then(response => {
                setConversations(response.data);
            })
    }, [userId]);

    return (
            <ul>
                {conversations?.map(conversation => (
                    <li key={conversation.id}>{conversation.id}</li> // these will become ConversationRow components
                ))}
            </ul>
    );
}
